(() => {
  'use strict';

  // ==========================================================================
  // CONFIGURATION
  // ==========================================================================
  const SHEET_ID = '1QS6zqq4Q-sQp0t3LiB7ObdyVYt7IPdlOj9Q606eiCvY';
  const FEED_SHEET_NAME = 'Public Feed';
  // Optional: set a Google Sheets "File -> Share -> Publish to web -> CSV" URL
  // for `Public Feed` to load CSV directly before trying GViz.
  const PUBLISHED_CSV_URL = '';
  const SNAPSHOT_URL = './tracker-data.json';
  const AUTO_REFRESH_MS = 60_000;

  // Strict allowlist for Roblox CDN avatar headshot thumbnails
  const ALLOWED_AVATAR_URL_RE = /^https:\/\/t[r0-9a-z-]*\.rbxcdn\.com\//i;

  const CORE_STATUSES = [
    'Pending Review',
    'Accepted',
    'Waitlisted',
    'Rejected',
  ];

  const STATUS_CLASS_MAP = {
    'Pending Review': 'status-pill--pending',
    Accepted: 'status-pill--accepted',
    Waitlisted: 'status-pill--waitlisted',
    Rejected: 'status-pill--rejected',
    Disqualified: 'status-pill--rejected',
  };

  const collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: 'base',
  });

  // ==========================================================================
  // DOM REFERENCES
  // ==========================================================================
  const headerWrap = document.querySelector('.site-header-wrap');
  const headerSentinel = document.querySelector('.site-header-sentinel');

  const lastSyncedEl = document.getElementById('last-synced');
  const refreshBtn = document.getElementById('refresh-btn');

  const kpiTotalEl = document.getElementById('kpi-total');
  const kpiPendingEl = document.getElementById('kpi-pending');
  const kpiAcceptedEl = document.getElementById('kpi-accepted');
  const kpiWaitlistedEl = document.getElementById('kpi-waitlisted');

  const filterBarEl = document.querySelector('.filter-bar');
  const countAllEl = document.getElementById('count-all');
  const countPendingEl = document.getElementById('count-pending');
  const countAcceptedEl = document.getElementById('count-accepted');
  const countWaitlistedEl = document.getElementById('count-waitlisted');
  const countRejectedEl = document.getElementById('count-rejected');

  const searchInput = document.getElementById('tracker-search');
  const searchClearBtn = document.getElementById('search-clear');
  const resultsStatusEl = document.getElementById('results-status');

  const tableEl = document.getElementById('tracker-table');
  const tbodyEl = document.getElementById('tracker-tbody');
  const emptyStateEl = document.getElementById('tracker-empty');
  const emptyMessageEl = document.getElementById('empty-message');
  const resetFiltersBtn = document.getElementById('reset-filters-btn');

  // ==========================================================================
  // APPLICATION STATE
  // ==========================================================================
  const state = {
    records: [],
    rowMap: new Map(), // appId -> { tr, record }
    query: '',
    statusFilter: 'All',
    sortKey: 'appId',
    sortType: 'text',
    sortDir: 'ascending',
    sortLabel: 'App ID',
    isComposing: false,
    isFetching: false,
    announceTimer: null,
  };

  // ==========================================================================
  // SANITIZATION & PARSING HELPERS
  // ==========================================================================

  /**
   * Normalize default Pending values and allow custom staff statuses through safely.
   */
  function sanitizeStatus(raw) {
    const value = String(raw ?? '').trim().slice(0, 40);
    if (!value || value.toLowerCase() === 'pending') return 'Pending Review';
    if (value.toLowerCase() === 'not selected') return 'Rejected';
    return value;
  }

  /**
   * Strict Roblox CDN allowlist check before assigning img.src.
   */
  function sanitizeAvatarUrl(raw) {
    const url = String(raw ?? '').trim();
    return ALLOWED_AVATAR_URL_RE.test(url) ? url : '';
  }

  const PROFILE_URL_RE = /roblox\.com\/(?:[a-z]{2}(?:-[a-z]{2})?\/)?users\/(\d+)/i;
  const NUMERIC_USER_ID_RE = /^(?:(?:roblox\s*)?(?:user\s*id|userid|uid|id)\s*[:=#-]?\s*|#)?(\d+)(?:[\s(/,;|-]|$)/i;

  function extractRobloxId(rawUsername) {
    const trimmed = String(rawUsername ?? '').trim();
    if (!trimmed) return '';
    const urlMatch = PROFILE_URL_RE.exec(trimmed);
    if (urlMatch) return urlMatch[1];
    const cleaned = trimmed.replace(/^@+\s*/, '').trim();
    const idMatch = NUMERIC_USER_ID_RE.exec(cleaned);
    return idMatch ? idMatch[1] : '';
  }

  /**
   * Extract clean Roblox handle (or canonical resolved username / User ID) for display.
   */
  function extractDisplayHandle(rawUsername, resolvedUsername) {
    const resolvedClean = String(resolvedUsername ?? '').trim();
    if (resolvedClean) return resolvedClean;

    const extractedId = extractRobloxId(rawUsername);
    if (extractedId) return `ID: ${extractedId}`;

    const trimmed = String(rawUsername ?? '').trim().replace(/^@+\s*/, '');
    if (!trimmed) return '—';
    const match = /^[A-Za-z0-9_]+/.exec(trimmed);
    return match ? match[0] : trimmed;
  }

  /**
   * Derive crisp 2-letter monospace fallback monogram (e.g. Yui_lima -> YL, pqdraes -> PQ).
   */
  function getMonogram(handle) {
    const clean = String(handle ?? '').trim();
    if (!clean || clean === '—') return '??';
    const parts = clean.split(/[_\s-]+/).filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    const alnum = clean.replace(/[^A-Za-z0-9]/g, '');
    return (alnum.slice(0, 2) || clean.slice(0, 2)).toUpperCase();
  }

  /**
   * Normalize GViz Date(YYYY,M,D,...) (0-indexed month) or ISO/date string to yyyy-mm-dd.
   */
  function normalizeDateString(rawValue, formattedValue) {
    const candidates = [rawValue, formattedValue];
    for (const candidate of candidates) {
      if (candidate == null) continue;
      const text = String(candidate).trim();
      if (!text) continue;

      // Google Visualization Date(YYYY, M_zero_based, D, ...)
      const gvizMatch = /^Date\(\s*(\d{4})\s*,\s*(\d{1,2})\s*,\s*(\d{1,2})(?:\s*,.*)?\)$/.exec(text);
      if (gvizMatch) {
        const year = Number(gvizMatch[1]);
        const month = Number(gvizMatch[2]) + 1;
        const day = Number(gvizMatch[3]);
        return formatIsoDate(year, month, day);
      }

      // ISO yyyy-mm-dd (optionally with time)
      const isoMatch = /^(\d{4})-(\d{1,2})-(\d{1,2})/.exec(text);
      if (isoMatch) {
        return formatIsoDate(Number(isoMatch[1]), Number(isoMatch[2]), Number(isoMatch[3]));
      }

      // Slash dates M/D/YYYY
      const slashMatch = /^(\d{1,2})\/(\d{1,2})\/(\d{4})/.exec(text);
      if (slashMatch) {
        return formatIsoDate(Number(slashMatch[3]), Number(slashMatch[1]), Number(slashMatch[2]));
      }
    }
    return '';
  }

  function formatIsoDate(year, month, day) {
    if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) return '';
    return `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  function dateToSortNumber(isoDate) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
    if (!match) return 0;
    return Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  }

  function normalizeRecord(
    rawAppId,
    rawUsername,
    rawDate,
    rawStatus,
    rawAvatarUrl,
    formattedDate,
    resolvedUsername = ''
  ) {
    const appId = String(rawAppId ?? '').trim();
    if (!appId || appId.toLowerCase() === 'app_id' || appId.toLowerCase() === 'app id') {
      return null;
    }
    const robloxUsername = String(rawUsername ?? '').trim() || '—';
    const resolvedClean = String(resolvedUsername ?? '').trim();
    const extractedId = extractRobloxId(robloxUsername);
    const displayHandle = extractDisplayHandle(robloxUsername, resolvedClean);
    const submittedAt = normalizeDateString(rawDate, formattedDate) || '—';
    const submittedSort = dateToSortNumber(submittedAt);
    const status = sanitizeStatus(rawStatus);
    const avatarUrl = sanitizeAvatarUrl(rawAvatarUrl);

    return {
      appId,
      robloxUsername,
      displayHandle,
      submittedAt,
      submittedSort,
      status,
      avatarUrl,
      searchHaystack: `${appId} ${displayHandle} ${resolvedClean} ${robloxUsername} ${extractedId}`.toLowerCase(),
    };
  }

  /**
   * RFC-4180 compliant CSV parser for optional Published CSV feed.
   */
  function parseCsv(text) {
    const rows = [];
    let row = [];
    let field = '';
    let inQuotes = false;

    for (let i = 0; i < text.length; i += 1) {
      const ch = text[i];

      if (inQuotes) {
        if (ch === '"') {
          if (text[i + 1] === '"') {
            field += '"';
            i += 1;
          } else {
            inQuotes = false;
          }
        } else {
          field += ch;
        }
      } else if (ch === '"') {
        inQuotes = true;
      } else if (ch === ',') {
        row.push(field);
        field = '';
      } else if (ch === '\r') {
        if (text[i + 1] === '\n') i += 1;
        row.push(field);
        rows.push(row);
        row = [];
        field = '';
      } else if (ch === '\n') {
        row.push(field);
        rows.push(row);
        row = [];
        field = '';
      } else {
        field += ch;
      }
    }

    if (field.length > 0 || row.length > 0) {
      row.push(field);
      rows.push(row);
    }

    return rows;
  }

  function recordsFromCsv(csvText) {
    const parsed = parseCsv(csvText);
    if (!parsed.length) return [];

    const firstRow = parsed[0].map((cell) => cell.trim().toLowerCase());
    const hasHeader = firstRow.includes('app_id') || firstRow.includes('roblox_username');
    const idIdx = hasHeader && firstRow.indexOf('app_id') !== -1 ? firstRow.indexOf('app_id') : 0;
    const userIdx = hasHeader && firstRow.indexOf('roblox_username') !== -1 ? firstRow.indexOf('roblox_username') : 1;
    const dateIdx = hasHeader && firstRow.indexOf('submitted_at') !== -1 ? firstRow.indexOf('submitted_at') : 2;
    const statusIdx = hasHeader && firstRow.indexOf('status') !== -1 ? firstRow.indexOf('status') : 3;
    const avatarIdx = hasHeader && firstRow.indexOf('avatar_url') !== -1 ? firstRow.indexOf('avatar_url') : 4;
    const resolvedIdx =
      hasHeader && firstRow.indexOf('resolved_username') !== -1 ? firstRow.indexOf('resolved_username') : 5;

    const startRow = hasHeader ? 1 : 0;
    const out = [];
    for (let i = startRow; i < parsed.length; i += 1) {
      const cols = parsed[i];
      const rec = normalizeRecord(
        cols[idIdx],
        cols[userIdx],
        cols[dateIdx],
        cols[statusIdx],
        cols[avatarIdx],
        '',
        cols[resolvedIdx]
      );
      if (rec) out.push(rec);
    }
    return out;
  }

  /**
   * Parse Google Sheets GViz JSONP response safely (columns A..F).
   */
  function recordsFromGvizText(responseText) {
    const match = /google\.visualization\.Query\.setResponse\(([\s\S]*)\);?\s*$/.exec(responseText);
    if (!match) {
      throw new Error('Unexpected GViz payload (sheet may not be publicly shared)');
    }
    const payload = JSON.parse(match[1]);
    if (payload.status !== 'ok' || !payload.table || !Array.isArray(payload.table.rows)) {
      throw new Error('GViz query returned non-ok status');
    }

    const out = [];
    for (const row of payload.table.rows) {
      const cells = Array.isArray(row.c) ? row.c : [];
      const c0 = cells[0];
      const c1 = cells[1];
      const c2 = cells[2];
      const c3 = cells[3];
      const c4 = cells[4];
      const c5 = cells[5];

      const rec = normalizeRecord(
        c0 ? (c0.f ?? c0.v) : '',
        c1 ? (c1.f ?? c1.v) : '',
        c2 ? c2.v : '',
        c3 ? (c3.f ?? c3.v) : '',
        c4 ? (c4.v ?? c4.f) : '',
        c2 ? c2.f : '',
        c5 ? (c5.f ?? c5.v) : ''
      );
      if (rec) out.push(rec);
    }
    return out;
  }

  function recordsFromSnapshot(json) {
    const rows = Array.isArray(json?.rows) ? json.rows : [];
    const out = [];
    for (const item of rows) {
      const rec = normalizeRecord(
        item.appId,
        item.robloxUsername,
        item.submittedAt,
        item.status,
        item.avatarUrl,
        '',
        item.resolvedUsername
      );
      if (rec) out.push(rec);
    }
    return {
      records: out,
      updatedAt: typeof json?.updatedAt === 'string' ? json.updatedAt : '',
    };
  }

  // ==========================================================================
  // DATA FETCHING (CSV -> GVIZ -> SNAPSHOT FALLBACK)
  // ==========================================================================

  async function fetchLiveCsv(signal) {
    if (!PUBLISHED_CSV_URL) throw new Error('No published CSV URL configured');
    const res = await fetch(PUBLISHED_CSV_URL, { signal, cache: 'no-store' });
    if (!res.ok) throw new Error(`CSV HTTP ${res.status}`);
    const contentType = res.headers.get('content-type') || '';
    const text = await res.text();
    if (contentType.includes('text/html') || /^\s*<!doctype|^\s*<html/i.test(text)) {
      throw new Error('CSV endpoint returned HTML instead of CSV');
    }
    return recordsFromCsv(text);
  }

  async function fetchLiveGviz(signal) {
    if (!SHEET_ID) throw new Error('No SHEET_ID configured');
    const url =
      `https://docs.google.com/spreadsheets/d/${encodeURIComponent(SHEET_ID)}` +
      `/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(FEED_SHEET_NAME)}`;
    const res = await fetch(url, { signal, cache: 'no-store', credentials: 'omit' });
    if (!res.ok) throw new Error(`GViz HTTP ${res.status}`);
    const text = await res.text();
    return recordsFromGvizText(text);
  }

  async function fetchSnapshot(signal) {
    const res = await fetch(SNAPSHOT_URL, { signal, cache: 'no-store' });
    if (!res.ok) throw new Error(`Snapshot HTTP ${res.status}`);
    const data = await res.json();
    return recordsFromSnapshot(data);
  }

  function setSyncBadge(source, timestampIso) {
    if (!lastSyncedEl) return;
    if (source === 'error') {
      lastSyncedEl.removeAttribute('datetime');
      lastSyncedEl.textContent = 'Unavailable';
      return;
    }

    const dt = timestampIso ? new Date(timestampIso) : new Date();
    if (!Number.isNaN(dt.getTime())) {
      lastSyncedEl.dateTime = dt.toISOString();
      lastSyncedEl.textContent = dt.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    }
  }

  async function loadData(isManual = false) {
    if (state.isFetching) return;
    state.isFetching = true;
    refreshBtn.setAttribute('aria-busy', 'true');

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 8000);

    try {
      let records = null;
      let source = 'live';
      let updatedAt = new Date().toISOString();

      if (PUBLISHED_CSV_URL) {
        try {
          records = await fetchLiveCsv(controller.signal);
        } catch {
          records = null;
        }
      }

      if (!records) {
        try {
          records = await fetchLiveGviz(controller.signal);
          source = 'live';
        } catch {
          const snapshot = await fetchSnapshot(controller.signal);
          records = snapshot.records;
          source = 'snapshot';
          updatedAt = snapshot.updatedAt || updatedAt;
        }
      }

      state.records = records;
      syncTableDom(records);
      updateCounters(records);
      applySortAndFilter({ animate: false, announce: isManual });
      setSyncBadge(source, updatedAt);
    } catch {
      setSyncBadge('error', '');
      resultsStatusEl.textContent = 'Unable to load application registry. Please try refreshing.';
      emptyMessageEl.textContent = 'Registry data could not be loaded right now.';
      emptyStateEl.hidden = false;
    } finally {
      window.clearTimeout(timeoutId);
      state.isFetching = false;
      refreshBtn.removeAttribute('aria-busy');
    }
  }

  // ==========================================================================
  // SAFE DOM CREATION & ROW IDENTITY PRESERVATION (ZERO innerHTML)
  // ==========================================================================

  function createMonogramNode(handle) {
    const span = document.createElement('span');
    span.className = 'avatar-monogram';
    span.setAttribute('aria-hidden', 'true');
    span.textContent = getMonogram(handle);
    return span;
  }

  function createApplicantCellContent(record) {
    const wrap = document.createElement('div');
    wrap.className = 'applicant-cell';

    const avatarWrap = document.createElement('span');
    avatarWrap.className = 'avatar-wrap';

    if (record.avatarUrl) {
      const img = document.createElement('img');
      img.className = 'avatar-img';
      img.src = record.avatarUrl;
      img.alt = '';
      img.width = 36;
      img.height = 36;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.referrerPolicy = 'no-referrer';
      img.addEventListener(
        'error',
        () => {
          avatarWrap.replaceChildren(createMonogramNode(record.displayHandle));
        },
        { once: true }
      );
      avatarWrap.appendChild(img);
    } else {
      avatarWrap.appendChild(createMonogramNode(record.displayHandle));
    }

    const nameEl = document.createElement('span');
    nameEl.className = 'applicant-name';
    nameEl.textContent = record.displayHandle;

    wrap.append(avatarWrap, nameEl);
    return wrap;
  }

  function createStatusBadge(status) {
    const pill = document.createElement('span');
    const variantClass = STATUS_CLASS_MAP[status] || 'status-pill--custom';
    pill.className = `status-pill ${variantClass}`;

    const dot = document.createElement('span');
    dot.className = 'status-dot';
    dot.setAttribute('aria-hidden', 'true');

    const label = document.createElement('span');
    label.textContent = status;

    pill.append(dot, label);
    return pill;
  }

  function createRowElement(record) {
    const tr = document.createElement('tr');
    tr.dataset.appId = record.appId;

    // Col 1: Semantic row header (<th scope="row">)
    const thId = document.createElement('th');
    thId.scope = 'row';
    thId.className = 'cell-id';
    thId.dataset.value = record.appId;
    thId.textContent = record.appId;

    // Col 2: Roblox Username + Circular Avatar
    const tdUser = document.createElement('td');
    tdUser.className = 'cell-username';
    tdUser.dataset.label = 'Roblox Username';
    tdUser.dataset.value = record.displayHandle;
    tdUser.dataset.avatarUrl = record.avatarUrl;
    tdUser.appendChild(createApplicantCellContent(record));

    // Col 3: Submitted Date (<time datetime="..."> with numeric data-value)
    const tdDate = document.createElement('td');
    tdDate.className = 'cell-date';
    tdDate.dataset.label = 'Submitted';
    tdDate.dataset.value = String(record.submittedSort);

    const timeEl = document.createElement('time');
    if (record.submittedAt !== '—') {
      timeEl.dateTime = record.submittedAt;
    }
    timeEl.textContent = record.submittedAt;
    tdDate.appendChild(timeEl);

    // Col 4: Status badge
    const tdStatus = document.createElement('td');
    tdStatus.className = 'cell-status';
    tdStatus.dataset.label = 'Status';
    tdStatus.dataset.value = record.status;
    tdStatus.appendChild(createStatusBadge(record.status));

    tr.append(thId, tdUser, tdDate, tdStatus);
    return tr;
  }

  function updateRowElement(tr, record) {
    const [thId, tdUser, tdDate, tdStatus] = tr.cells;

    if (thId.textContent !== record.appId) {
      thId.dataset.value = record.appId;
      thId.textContent = record.appId;
    }

    if (
      tdUser.dataset.value !== record.displayHandle ||
      (tdUser.dataset.avatarUrl || '') !== record.avatarUrl
    ) {
      tdUser.dataset.value = record.displayHandle;
      tdUser.dataset.avatarUrl = record.avatarUrl;
      tdUser.replaceChildren(createApplicantCellContent(record));
    }

    const timeEl = tdDate.firstElementChild;
    if (!timeEl || timeEl.textContent !== record.submittedAt) {
      tdDate.dataset.value = String(record.submittedSort);
      if (timeEl) {
        if (record.submittedAt !== '—') {
          timeEl.dateTime = record.submittedAt;
        } else {
          timeEl.removeAttribute('datetime');
        }
        timeEl.textContent = record.submittedAt;
      }
    }

    if (tdStatus.dataset.value !== record.status) {
      tdStatus.dataset.value = record.status;
      tdStatus.replaceChildren(createStatusBadge(record.status));
    }
  }

  /**
   * Reconcile <tbody> rows by App ID without discarding existing <tr> nodes.
   */
  function syncTableDom(records) {
    const nextIds = new Set();

    for (const record of records) {
      nextIds.add(record.appId);
      const existing = state.rowMap.get(record.appId);
      if (existing) {
        updateRowElement(existing.tr, record);
        existing.record = record;
      } else {
        const tr = createRowElement(record);
        state.rowMap.set(record.appId, { tr, record });
        tbodyEl.appendChild(tr);
      }
    }

    for (const [appId, entry] of state.rowMap.entries()) {
      if (!nextIds.has(appId)) {
        entry.tr.remove();
        state.rowMap.delete(appId);
      }
    }
  }

  // ==========================================================================
  // COUNTERS, FILTERING & IN-PLACE SORTING (moveBefore / appendChild)
  // ==========================================================================

  function createDynamicFilterPill(status, count, isPressed) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'filter-pill filter-pill--custom';
    btn.dataset.filter = status;
    btn.dataset.dynamic = 'true';
    btn.setAttribute('aria-pressed', String(isPressed));

    const labelSpan = document.createElement('span');
    labelSpan.textContent = status;

    const countSpan = document.createElement('span');
    countSpan.className = 'filter-count';
    countSpan.textContent = String(count);

    btn.append(labelSpan, countSpan);
    return btn;
  }

  function updateCounters(records) {
    const coreSet = new Set(CORE_STATUSES);
    const countsByStatus = new Map();

    for (const rec of records) {
      countsByStatus.set(rec.status, (countsByStatus.get(rec.status) || 0) + 1);
    }

    const totalCount = records.length;
    const pendingCount = countsByStatus.get('Pending Review') || 0;
    const acceptedCount = countsByStatus.get('Accepted') || 0;
    const waitlistedCount = countsByStatus.get('Waitlisted') || 0;
    const rejectedCount = countsByStatus.get('Rejected') || 0;

    kpiTotalEl.textContent = String(totalCount);
    kpiPendingEl.textContent = String(pendingCount);
    kpiAcceptedEl.textContent = String(acceptedCount);
    kpiWaitlistedEl.textContent = String(waitlistedCount);

    countAllEl.textContent = String(totalCount);
    countPendingEl.textContent = String(pendingCount);
    countAcceptedEl.textContent = String(acceptedCount);
    countWaitlistedEl.textContent = String(waitlistedCount);
    countRejectedEl.textContent = String(rejectedCount);

    if (
      state.statusFilter !== 'All' &&
      !coreSet.has(state.statusFilter) &&
      !countsByStatus.has(state.statusFilter)
    ) {
      state.statusFilter = 'All';
    }

    for (const oldDynamic of filterBarEl.querySelectorAll('[data-dynamic="true"]')) {
      oldDynamic.remove();
    }

    const customStatuses = [...countsByStatus.keys()]
      .filter((s) => !coreSet.has(s))
      .sort((a, b) => collator.compare(a, b));

    for (const status of customStatuses) {
      const btn = createDynamicFilterPill(
        status,
        countsByStatus.get(status) || 0,
        state.statusFilter === status
      );
      filterBarEl.appendChild(btn);
    }

    for (const pill of filterBarEl.querySelectorAll('.filter-pill')) {
      const filterVal = pill.dataset.filter || 'All';
      pill.setAttribute('aria-pressed', String(state.statusFilter === filterVal));
    }
  }

  function getSortCellIndex(sortKey) {
    const headers = tableEl.tHead.rows[0].cells;
    for (let i = 0; i < headers.length; i += 1) {
      if (headers[i].dataset.key === sortKey) return i;
    }
    return 0;
  }

  function reorderRowsInPlace(orderedRows) {
    const useMoveBefore = typeof tbodyEl.moveBefore === 'function';
    for (const row of orderedRows) {
      if (useMoveBefore) {
        tbodyEl.moveBefore(row, null);
      } else {
        tbodyEl.appendChild(row);
      }
    }
  }

  function sortExistingRows(rows, cellIndex, type, direction) {
    const factor = direction === 'ascending' ? 1 : -1;
    const readVal = (row) => {
      const cell = row.cells[cellIndex];
      return cell.dataset.value ?? cell.textContent.trim();
    };

    return rows.sort((a, b) => {
      const valA = readVal(a);
      const valB = readVal(b);
      if (type === 'number') {
        return factor * (Number(valA) - Number(valB));
      }
      return factor * collator.compare(valA, valB);
    });
  }

  function scheduleStatusAnnouncement(message, immediate = false) {
    window.clearTimeout(state.announceTimer);
    if (immediate) {
      resultsStatusEl.textContent = message;
      return;
    }
    state.announceTimer = window.setTimeout(() => {
      resultsStatusEl.textContent = message;
    }, 180);
  }

  function applySortAndFilter({ animate = false, announce = true, immediateAnnounce = true } = {}) {
    const normalizedQuery = state.query.trim().toLowerCase();
    const activeStatus = state.statusFilter;
    const cellIndex = getSortCellIndex(state.sortKey);

    const existingRows = [...tbodyEl.rows];
    const orderedRows = sortExistingRows(existingRows, cellIndex, state.sortType, state.sortDir);

    const applyDomChanges = () => {
      reorderRowsInPlace(orderedRows);

      let visibleCount = 0;
      for (const tr of orderedRows) {
        const entry = state.rowMap.get(tr.dataset.appId);
        if (!entry) continue;
        const { record } = entry;
        const matchesStatus = activeStatus === 'All' || record.status === activeStatus;
        const matchesQuery = !normalizedQuery || record.searchHaystack.includes(normalizedQuery);
        const isVisible = matchesStatus && matchesQuery;
        tr.hidden = !isVisible;
        if (isVisible) visibleCount += 1;
      }

      const total = state.records.length;
      const isEmpty = visibleCount === 0;
      emptyStateEl.hidden = !isEmpty;

      if (isEmpty && total > 0) {
        if (normalizedQuery && activeStatus !== 'All') {
          emptyMessageEl.textContent = `No "${activeStatus}" applications match "${state.query.trim()}".`;
        } else if (normalizedQuery) {
          emptyMessageEl.textContent = `No applications match "${state.query.trim()}".`;
        } else {
          emptyMessageEl.textContent = `There are currently no applications with status "${activeStatus}".`;
        }
      } else if (isEmpty) {
        emptyMessageEl.textContent = 'No playtester applications have been recorded yet.';
      }

      if (announce) {
        const noun = total === 1 ? 'application' : 'applications';
        const message =
          `Showing ${visibleCount} of ${total} ${noun} · ` +
          `Sorted by ${state.sortLabel} (${state.sortDir})`;
        scheduleStatusAnnouncement(message, immediateAnnounce);
      }
    };

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (animate && !reducedMotion && orderedRows.length <= 150 && typeof tableEl.startViewTransition === 'function') {
      tableEl.startViewTransition(applyDomChanges);
    } else {
      applyDomChanges();
    }
  }

  // ==========================================================================
  // SORT INTERACTION (INVOKER COMMANDS + CLICK FALLBACK)
  // ==========================================================================

  function handleSortTrigger(buttonEl) {
    const th = buttonEl.closest('th');
    if (!th) return;

    const key = th.dataset.key || 'appId';
    const type = th.dataset.type || 'text';
    const nextDir = th.getAttribute('aria-sort') === 'ascending' ? 'descending' : 'ascending';

    for (const header of tableEl.tHead.rows[0].cells) {
      header.removeAttribute('aria-sort');
    }
    th.setAttribute('aria-sort', nextDir);

    state.sortKey = key;
    state.sortType = type;
    state.sortDir = nextDir;
    state.sortLabel = buttonEl.textContent.trim();

    applySortAndFilter({ animate: true, announce: true, immediateAnnounce: true });
  }

  const supportsInvokerCommands = 'command' in HTMLButtonElement.prototype;
  if (supportsInvokerCommands) {
    tableEl.addEventListener('command', (event) => {
      if (event.command !== '--sort' || !event.source) return;
      handleSortTrigger(event.source);
    });
  } else {
    tableEl.tHead.addEventListener('click', (event) => {
      const btn = event.target.closest('button.sort-btn');
      if (!btn) return;
      handleSortTrigger(btn);
    });
  }

  // ==========================================================================
  // SEARCH, FILTERS & KEYBOARD SHORTCUTS (WITH IME GUARD)
  // ==========================================================================

  function syncClearButton() {
    searchClearBtn.hidden = searchInput.value.length === 0;
  }

  searchInput.addEventListener('compositionstart', () => {
    state.isComposing = true;
  });

  searchInput.addEventListener('compositionend', () => {
    state.isComposing = false;
    state.query = searchInput.value;
    syncClearButton();
    applySortAndFilter({ animate: false, announce: true, immediateAnnounce: false });
  });

  searchInput.addEventListener('input', (event) => {
    syncClearButton();
    if (state.isComposing || event.isComposing) return;
    state.query = searchInput.value;
    applySortAndFilter({ animate: false, announce: true, immediateAnnounce: false });
  });

  searchInput.addEventListener('keydown', (event) => {
    if (event.isComposing || state.isComposing) return;
    if (event.key === 'Escape' && searchInput.value.length > 0) {
      event.preventDefault();
      searchInput.value = '';
      state.query = '';
      syncClearButton();
      applySortAndFilter({ animate: false, announce: true, immediateAnnounce: true });
    }
  });

  searchClearBtn.addEventListener('click', () => {
    searchInput.value = '';
    state.query = '';
    syncClearButton();
    applySortAndFilter({ animate: false, announce: true, immediateAnnounce: true });
    searchInput.focus();
  });

  filterBarEl.addEventListener('click', (event) => {
    const btn = event.target.closest('button.filter-pill');
    if (!btn) return;
    const nextFilter = btn.dataset.filter || 'All';
    state.statusFilter = nextFilter;
    for (const pill of filterBarEl.querySelectorAll('.filter-pill')) {
      pill.setAttribute('aria-pressed', String(pill === btn));
    }
    applySortAndFilter({ animate: false, announce: true, immediateAnnounce: true });
  });

  resetFiltersBtn.addEventListener('click', () => {
    searchInput.value = '';
    state.query = '';
    state.statusFilter = 'All';
    syncClearButton();
    for (const pill of filterBarEl.querySelectorAll('.filter-pill')) {
      pill.setAttribute('aria-pressed', String(pill.dataset.filter === 'All'));
    }
    applySortAndFilter({ animate: false, announce: true, immediateAnnounce: true });
    searchInput.focus();
  });

  document.addEventListener('keydown', (event) => {
    if (event.isComposing || state.isComposing) return;
    if (event.key !== '/' || event.ctrlKey || event.metaKey || event.altKey) return;

    const active = document.activeElement;
    const isTypingTarget =
      active &&
      (active.tagName === 'INPUT' ||
        active.tagName === 'TEXTAREA' ||
        active.tagName === 'SELECT' ||
        active.isContentEditable);
    if (isTypingTarget) return;

    event.preventDefault();
    searchInput.focus();
    searchInput.select();
  });

  refreshBtn.addEventListener('click', () => {
    loadData(true);
  });

  // ==========================================================================
  // STICKY HEADER FALLBACK & AUTO-REFRESH
  // ==========================================================================

  if (headerWrap && headerSentinel && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          headerWrap.classList.toggle('is-stuck', !entry.isIntersecting);
        }
      },
      { threshold: 0 }
    );
    observer.observe(headerSentinel);
  }

  window.setInterval(() => {
    if (document.visibilityState === 'visible') {
      loadData(false);
    }
  }, AUTO_REFRESH_MS);

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      loadData(false);
    }
  });

  // Initial load
  loadData(false);
})();
