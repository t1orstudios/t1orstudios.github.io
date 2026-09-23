
const categoryMeta = {
  'ulkeler': { en: 'Countries', tr: 'Ülkeler', enSlug: 'countries', trSlug: 'ulkeler' },
  'cografya': { en: 'Geography', tr: 'Coğrafya', enSlug: 'geography', trSlug: 'cografya' },
  'uzay-programi': { en: 'Space program', tr: 'Uzay programı', enSlug: 'space-program', trSlug: 'uzay-programi' },
  'birlikler': { en: 'Units', tr: 'Birlikler', enSlug: 'units', trSlug: 'birlikler' },
  'tesisler': { en: 'Facilities', tr: 'Tesisler', enSlug: 'facilities', trSlug: 'tesisler' },
  'olaylar': { en: 'Events', tr: 'Olaylar', enSlug: 'events', trSlug: 'olaylar' },
  'kurumlar': { en: 'Organizations', tr: 'Kurumlar', enSlug: 'organizations', trSlug: 'kurumlar' },
  'belgeler': { en: 'Documents', tr: 'Belgeler', enSlug: 'documents', trSlug: 'belgeler' },
  'araclar': { en: 'Vehicles', tr: 'Araçlar', enSlug: 'vehicles', trSlug: 'araclar' }
};

function getCategoryKey(catVal) {
  if (!catVal) return null;
  const s = String(catVal).toLowerCase().trim();
  for (const [key, m] of Object.entries(categoryMeta)) {
    if (key === s || m.enSlug === s || m.trSlug === s || m.en.toLowerCase() === s || m.tr.toLowerCase() === s) {
      return key;
    }
  }
  return null;
}

const articleSlugOverrides = {
  'hancer': '132nd-dagger-squadron'
};

const articleAliases = {
  'anataria': 'anatarya',
  'elonia': 'elonya',
  'velaria': 'veloria',
  'velarya': 'veloria',
  'dalmeria': 'dalmerya',
  'rovenia': 'rovenya',
  'kaan': 'k21-kaan',
  'k-21': 'k21-kaan',
  'bayraktar': 'bayrak-t2',
  'tb2': 'bayrak-t2',
  'akinci': 'akin-3',
  'kizilelma': 'al-elma',
  'sarp-rad': 'sarpburun-radar',
  '132nd-dagger-squadron': 'hancer',
  'dagger-squadron': 'hancer',
  'dagger': 'hancer',
  '132-hancer-taktik-filosu': 'hancer',
  '132nd-hancer-tactical-squadron': 'hancer',
  'hancer': 'hancer'
};

function getArticleSlug(id) {
  return articleSlugOverrides[id] || id;
}

function getCategorySlug(catKey, currentLang) {
  const m = categoryMeta[catKey];
  if (!m) return catKey;
  return currentLang === 'en' ? m.enSlug : m.trSlug;
}

function getArticleUrl(id, currentLang, pagesRef) {
  const p = (pagesRef || pages)?.[id];
  const catKey = p ? getCategoryKey(p.category) : null;
  const catSlug = catKey ? getCategorySlug(catKey, currentLang) : (currentLang === 'en' ? 'articles' : 'maddeler');
  const slug = getArticleSlug(id);
  return '/' + catSlug + '/' + slug;
}

function getCategoryPageUrl(catKey, currentLang) {
  if (catKey === 'ana-sayfa' || catKey === 'home') return currentLang === 'en' ? '/home' : '/ana-sayfa';
  if (catKey === 'tum-maddeler' || catKey === 'all-articles') return currentLang === 'en' ? '/all-articles' : '/tum-maddeler';
  const slug = getCategorySlug(catKey, currentLang);
  return '/' + slug;
}

'use strict';
function createRenderer(pages){
const visuals={"facility": {"src": "/gokkale.jpg", "alt": "GÖKKALE-4 tesisi görünümü", "caption": "GÖKKALE-4"}, "coast": {"src": "/kalyon.jpg", "alt": "Kalyon kıyılarının görünümü", "caption": "Kalyon kıyıları"}, "satellite": {"src": "/kartal.jpg", "alt": "KARTAL-7 keşif uydusu", "caption": "KARTAL-7"}, "flag-anatarya": {"src": "/anatarya.svg", "alt": "Anatarya bayrağı", "caption": "Anatarya bayrağı", "kind": "flag", "download": true}, "flag-elonya": {"src": "/elonya.svg", "alt": "Elonya bayrağı", "caption": "Elonya bayrağı", "kind": "flag", "download": true}, "flag-veloria": {"src": "/veloria.svg", "alt": "Veloria bayrağı", "caption": "Veloria bayrağı", "kind": "flag", "download": true}, "flag-dalmerya": {"src": "/dalmerya.svg", "alt": "Dalmerya bayrağı", "caption": "Dalmerya bayrağı", "kind": "flag", "download": true}, "flag-vardena": {"src": "/vardena.svg", "alt": "Vardena bayrağı", "caption": "Vardena bayrağı", "kind": "flag", "download": true}, "flag-rovenya": {"src": "/rovenya.svg", "alt": "Rovenya bayrağı", "caption": "Rovenya bayrağı", "kind": "flag", "download": true}, "flag-kipraya": {"src": "/kipraya.svg", "alt": "Kipraya bayrağı", "caption": "Kipraya bayrağı", "kind": "flag", "download": true}, "flag-kuzey-kusagi": {"src": "/kuzey-kusagi.svg", "alt": "KKSP bayrağı", "caption": "KKSP bayrağı", "kind": "flag", "download": true}, "flag-avren-birligi": {"src": "/avren-birligi.svg", "alt": "Avren Birliği bayrağı", "caption": "Avren Birliği bayrağı", "kind": "flag", "download": true}, "patch-hancer": {"src": "/hancer.png", "alt": "132. Hançer / Dagger birlik arması", "caption": "132. Hançer / Dagger arması", "kind": "patch", "download": true}, "patch-ucaksavar": {"src": "/ucaksavar.png", "alt": "21. Uçaksavar birlik arması", "caption": "21. Uçaksavar arması", "kind": "patch", "download": true}, "patch-sarp-muhafiz": {"src": "/sarp-muhafiz.png", "alt": "4. Sarp Muhafız birlik arması", "caption": "4. Sarp Muhafız arması", "kind": "patch", "download": true}, "patch-aigaion": {"src": "/aigaion.png", "alt": "AIGAION birlik arması", "caption": "AIGAION arması", "kind": "patch", "download": true}, "patch-mizrak": {"src": "/mizrak.png", "alt": "41. Mızrak birlik arması", "caption": "41. Mızrak arması", "kind": "patch", "download": true}, "patch-nereus-komando": {"src": "/nereus-komando.png", "alt": "8. Nereus Deniz Komando birlik arması", "caption": "8. Nereus Deniz Komando arması", "kind": "patch", "download": true}, "air-k4": {"src": "/k4-boran.jpg", "alt": "K-4 Boran", "caption": "K-4 Boran", "kind": "aircraft"}, "air-k16": {"src": "/k16-alaz.jpg", "alt": "K-16 Alaz", "caption": "K-16 Alaz", "kind": "aircraft"}, "air-m12": {"src": "/m12-aster.jpg", "alt": "M-12 Aster", "caption": "M-12 Aster", "kind": "aircraft"}, "air-p8": {"src": "/p8-pelagos.jpg", "alt": "P-8 Pelagos", "caption": "P-8 Pelagos", "kind": "aircraft"}, "air-ut7": {"src": "/ut7-ilgaz.jpg", "alt": "UT-7 Ilgaz", "caption": "UT-7 Ilgaz", "kind": "aircraft"}, "flag-kuzey-kipraya": {"src": "/kuzey-kipraya.svg", "alt": "Kuzey Kipraya bayrağı", "caption": "Kuzey Kipraya bayrağı", "kind": "flag", "download": true}, "veh-kaya": {"src": "/kaya-zma.jpg", "alt": "Kaya ZMA", "caption": "Kaya ZMA", "kind": "vehicle"}, "veh-kalkan": {"src": "/kalkan-hss.jpg", "alt": "Kalkan HSS", "caption": "Kalkan HSS", "kind": "vehicle"}, "veh-triton": {"src": "/triton-botu.jpg", "alt": "Triton Hızlı Botu", "caption": "Triton Hızlı Botu", "kind": "vehicle"}, "veh-aigaion": {"src": "/aigaion-firkateyni.jpg", "alt": "AIGAION Sınıfı Fırkateyn", "caption": "AIGAION Sınıfı Fırkateyn", "kind": "vehicle"}, "veh-nereus": {"src": "/nereus-cikarma.jpg", "alt": "NEREUS Çıkarma Gemisi", "caption": "NEREUS Çıkarma Gemisi", "kind": "vehicle"}, "veh-kallisto": {"src": "/kallisto-ikmal.jpg", "alt": "KALLISTO İkmal Gemisi", "caption": "KALLISTO İkmal Gemisi", "kind": "vehicle"}, "patch-kuzey-isaret": {"src": "/kuzey-isaret.png", "alt": "6. Kuzey İşaret Taburu birlik arması", "caption": "6. Kuzey İşaret Taburu arması", "kind": "patch", "download": true}, "patch-doruk-ikmal": {"src": "/doruk-ikmal.png", "alt": "18. Doruk İkmal Alayı birlik arması", "caption": "18. Doruk İkmal Alayı arması", "kind": "patch", "download": true}, "patch-pelagos-devriye": {"src": "/pelagos-devriye.png", "alt": "3. Pelagos Deniz Devriye Filosu birlik arması", "caption": "3. Pelagos Deniz Devriye Filosu arması", "kind": "patch", "download": true}, "patch-demir-iz": {"src": "/demir-iz.png", "alt": "27. Demir İz Mekanize Piyade Alayı birlik arması", "caption": "27. Demir İz Mekanize Piyade Alayı arması", "kind": "patch", "download": true}, "patch-iris-indirme": {"src": "/iris-indirme.png", "alt": "9. İris Hava İndirme Tugayı birlik arması", "caption": "9. İris Hava İndirme Tugayı arması", "kind": "patch", "download": true}};

const legacyVisuals={'anatarya':'facility','elonya':'coast','gokkale-4':'facility','sarpburun':'facility','kalyon-denizi':'coast','kalyon-adalari':'coast','kartal-7':'satellite','simsek-iii':'facility','kriz':'facility'};
const pageVisuals=Object.fromEntries(Object.entries(pages).map(([id,p])=>[id,p.imageKey===undefined?legacyVisuals[id]:p.imageKey]));
for(const [id,p] of Object.entries(pages))if(/^upload:[a-f0-9]{32}$/.test(p.imageKey||''))visuals[p.imageKey]={src:'/uploads/'+p.imageKey.slice(7),alt:p.title,caption:p.title,kind:'uploaded'};
for(const [id,p] of Object.entries(pages))if(/^file:[a-z0-9][a-z0-9.-]{0,90}\.(?:png|jpe?g|webp)$/.test(p.imageKey||''))visuals[p.imageKey]={src:'/'+p.imageKey.slice(5),alt:p.title,caption:p.title,kind:'uploaded'};


function figure(key){const v=visuals[key];if(!v)return '';return `<figure class="article-image ${v.kind||''}"><a href="${v.src}" target="_blank" rel="noopener" aria-label="Görseli tam boy aç"><img src="${v.src}" alt="${escapeHTML(v.alt)}" width="${v.kind==='patch'?720:600}" height="${v.kind==='patch'?720:400}" decoding="async"></a><figcaption>${escapeHTML(v.caption)}${v.download?`<a class="asset-download" href="${v.src}" download>${v.kind==='patch'?'PNG indir':'Bayrağı indir'} ↓</a>`:''}</figcaption></figure>`}
const cats={'ulkeler':'Ülkeler','cografya':'Coğrafya','uzay-programi':'Uzay programı','birlikler':'Birlikler','tesisler':'Tesisler','olaylar':'Olaylar','kurumlar':'Kurumlar','belgeler':'Belgeler','araclar':'Araçlar'};
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function prose(s){return escapeHTML(s).replace(/\[\[([a-z0-9-]+)\]\]/g,(_,id)=>pages[id]?`<a href="${getArticleUrl(id,'tr',pages)}" title="${escapeHTML(pages[id].desc)}">${escapeHTML(pages[id].title)}</a>`:id)}
function card(id){const p=pages[id];if(!p)return '';const visual=visuals[pageVisuals[id]];return `<a class="card" href="${getArticleUrl(id,'tr',pages)}">${visual?`<img class="card-image" src="${visual.src}" alt="${escapeHTML(visual.alt)}" width="768" height="512" loading="lazy" decoding="async">`:""}<span class="eyebrow">${escapeHTML(p.category)}</span><h3>${escapeHTML(p.title)}</h3><p>${escapeHTML(p.desc)}</p><span class="card-foot">Maddeyi oku ↗</span></a>`}
function articleHeader(title,category,desc,count){
  const catKey=getCategoryKey(category);
  const catUrl=catKey?getCategoryPageUrl(catKey,'tr'):'/tum-maddeler';
  return `<div class="breadcrumb"><a href="/ana-sayfa">Ana sayfa</a><span>/</span>${category?`<a href="${catUrl}">${escapeHTML(category)}</a>`:`<span>Arşiv</span>`}</div><div class="article-top"><span class="eyebrow">${escapeHTML(category||'Arşiv')}</span><span class="badge">${count||'Arşiv kaydı'}</span></div><h1>${escapeHTML(title)}</h1><p class="subtitle">${escapeHTML(desc)}</p><div class="tabbar"><span>Madde</span><a href="/tum-maddeler">Madde dizini</a><small>BÖLGE ARŞİVİ / TR</small></div>`;
}
function home(){return articleHeader('GÖKKALE Arşivi','Ansiklopedi','Ülkeler, yörüngedeki sistemler ve bir kıyıda kesişen çıkarlar.',`${Object.keys(pages).length} madde`)+`<p class="lead">${prose('[[anatarya]] ile [[elonya]] arasındaki gerilimin merkezinde bir uydu tesisi var: [[gokkale-4]]. Bu arşiv, çatışmanın taraflarını, coğrafyasını ve uzaya uzanan nedenlerini bir araya getirir.')}</p><section class="feature" id="merkez">${figure('facility')}<span class="eyebrow">ODAK MADDESİ / TESİSLER</span><h2><a href="${getArticleUrl('gokkale-4','tr',pages)}">GÖKKALE-4</a></h2><p>${prose('[[gozcu-3]] yörüngede görevini sürdürürken, [[kartal-7]] fırlatılmayı bekliyor. [[sarpburun]] yönüne ilerleyen [[aigaion]], bu hazırlığı iki ülke arasında bir krize dönüştürüyor.')}</p><a href="${getArticleUrl('gokkale-4','tr',pages)}">Tesis dosyasını aç ↗</a></section><p class="map-callout"><a href="/harita.html">Siyasi haritayı keşfet ↗</a> · Ülkeler, bölünmüş Kipraya ve Sarpburun Yarımadası</p><h2 id="taraflar">Çatışmanın iki tarafı</h2><div class="cards">${card('anatarya')}${card('elonya')}</div><h2 id="yörünge">Yörünge ve kıyı</h2><div class="cards">${card('kartal-7')}${card('sarpburun')}</div><h2 id="akis">Olayların akışı</h2><div class="timeline"><section><small>01 / MEVCUT DURUM</small><h3>Yörüngedeki göz</h3><p>${prose('[[gozcu-3]], mevcut gözetleme ve veri aktarım görevini sürdürüyor.')}</p></section><section><small>02 / HAZIRLIK</small><h3>Yeni keşif kapasitesi</h3><p>${prose('[[kartal-7]], [[gokkale-4]] tesisinden [[simsek-iii]] ile fırlatılmayı bekliyor.')}</p></section><section><small>03 / TIRMANIŞ</small><h3>Belgelerden savaşa</h3><p>${prose('[[elonya]], sahte [[sarpburun-dosyasi]] üzerinden savaş ilan ediyor. [[kuzey-kusagi]] müdahale kararı alamazken [[aigaion]] bölgeye sevk ediliyor.')}</p></section></div>
<div class="card" style="margin-top:24px;"><div style="font-size:11px;font-weight:700;letter-spacing:1px;color:var(--text-muted);text-transform:uppercase;margin-bottom:12px;">Bölgesel Kronoloji &amp; Kriz Zaman Çizelgesi</div><div style="display:flex;flex-direction:column;gap:12px;font-size:13px;border-left:2px solid var(--border);padding-left:14px;margin-left:4px;"><div><strong style="color:var(--accent);">1978 —</strong> <strong>Elonya - Anatarya Sınır Antlaşması:</strong> İstara Boğazı ve Kalyon Denizi balıkçılık sahaları ilk kez kayıt altına alındı.</div><div><strong style="color:var(--accent);">1994 —</strong> <strong>Kara Kasım &amp; DAGGER 06:</strong> 132. Hançer Filosu uçağı Sarpburun açıklarında kayboldu; <a href="#/madde/dosya-94-117" style="color:var(--accent);">Dosya 94-117</a> gizli soruşturması açıldı.</div><div><strong style="color:var(--accent);">2014 —</strong> <strong>Sarpburun Radar Modernizasyonu:</strong> Kuzey İşaret taburu faz dizili erken ihbar radarlarını devreye aldı.</div><div><strong style="color:var(--accent);">2022 —</strong> <strong>Lerya Deniz Üssü Genişletmesi:</strong> Elonya, AIGAION muharebe grubunu modernize edilmiş rıhtımlara konuşlandırdı.</div><div><strong style="color:var(--accent);">2035 —</strong> <strong>GÖKKALE-4 Programı:</strong> Anatarya, Sarpburun tesislerinden fırlatılacak askeri-sivil karma uydu projesini duyurdu.</div><div><strong style="color:var(--accent);">2036 (Günümüz) —</strong> <strong>GÖKKALE-4 Krizi:</strong> Karşılıklı nota ve ablukalar başladı; DAGGER 06 acil durum frekansından saptanan mikro sinyal üzerine dosya yeniden açıldı.</div></div></div>`}
function memberships(){const rows=[['anatarya','Üye','Ortak; tam üye değil'],['elonya','Üye','Üye'],['veloria','Üye','Üye'],['dalmerya','Üye','Üye'],['vardena','Üye','Üye'],['rovenya','Üye','Üye'],['kipraya','Üye değil','Üye'],['kuzey-kipraya','Üye değil','Ayrı üyeliği yok']];return `<section class="membership"><h2>Üyelikler</h2><div class="table-scroll"><table><thead><tr><th>Ülke</th><th>KKSP</th><th>Avren Birliği</th></tr></thead><tbody>${rows.filter(([id])=>pages[id]).map(([id,kksp,ab])=>`<tr><td><img src="/${id}.svg" alt="" width="30" height="20"> <a href="${getArticleUrl(id,'tr',pages)}">${escapeHTML(pages[id].title)}</a></td><td>${kksp}</td><td>${ab}</td></tr>`).join('')}</tbody></table></div></section>`}
function article(id){const p=pages[id];return articleHeader(p.title,p.category,p.desc,p.draft?'Taslak madde':null)+`<div class="article-body"><aside class="facts" aria-label="Bilgi kutusu"><div class="facts-title">${escapeHTML(p.title)}</div>${pageVisuals[id]?figure(pageVisuals[id]):''}<dl>${p.facts.map(([k,v])=>`<div><dt>${escapeHTML(k)}</dt><dd>${prose(v)}</dd></div>`).join('')}</dl></aside><p class="lead">${prose(p.lead).replace(/\n\n/g,'</p><p>')}</p><details class="article-toc" open><summary>İçindekiler</summary><ol>${p.sections.map(([h],i)=>`<li><a href="#bolum-${i}">${escapeHTML(h)}</a></li>`).join('')}</ol></details>${p.draft?'<div class="notice">Bu birlik için ad belirlenmiştir; görev ve bağlılık bilgileri henüz kesinleşmemiştir.</div>':''}${p.sections.map(([h,t],i)=>`<section><h2 id="bolum-${i}">${escapeHTML(h)}</h2><p>${prose(t).replace(/\n\n/g,'</p><p>').replace(/\n/g,'<br>')}</p></section>`).join('')}</div>${['kuzey-kusagi','avren-birligi'].includes(id)?memberships():''}${id==='hancer'?'<h2>Uçak envanteri</h2><div class="cards">'+card('k4-boran')+card('k16-alaz')+'</div>':''}<h2 id="ilgili">İlgili maddeler</h2><div class="related">${p.related.filter(i=>pages[i]).map(i=>`<a href="${getArticleUrl(i,'tr',pages)}">${escapeHTML(pages[i].title)}</a>`).join('')}</div>`}
function index(category){let entries=Object.entries(pages).filter(([,p])=>!category||p.category===category);const isVehicles=category===cats.araclar;return articleHeader(category||'Tüm maddeler','Madde dizini',category?'Bu kategorideki arşiv kayıtları.':'Arşivin bütün kayıtları, tek bir dizinde.',`${entries.length} madde`)+(isVehicles?'<div class="cards vehicle-index">'+entries.map(([id])=>card(id)).join('')+'</div>':entries.map(([id,p])=>`<div class="index-row"><a href="${getArticleUrl(id,'tr',pages)}">${escapeHTML(p.title)}</a><span>${escapeHTML(p.category)}${p.draft?' · Taslak':''}</span></div>`).join(''))}
const navItems=[['ana-sayfa','Ana sayfa','/ana-sayfa'],['harita','Siyasi harita','/harita.html'],['tum-maddeler','Tüm maddeler','/tum-maddeler'],['ulkeler','Ülkeler','/ulkeler'],['cografya','Coğrafya','/cografya'],['uzay-programi','Uzay programı','/uzay-programi'],['birlikler','Birlikler','/birlikler'],['tesisler','Tesisler','/tesisler'],['olaylar','Olaylar','/olaylar'],['kurumlar','Kurumlar','/kurumlar'],['belgeler','Belgeler','/belgeler'],['araclar','Araçlar','/araclar']];
return {home,article,index,cats,navItems,escapeHTML,visuals};
}

function createRendererEN(pages){
const visuals={"facility": {"src": "/gokkale.jpg", "alt": "View of the GÖKKALE-4 facility", "caption": "GÖKKALE-4"}, "coast": {"src": "/kalyon.jpg", "alt": "View of the Kalyon coast", "caption": "Kalyon coast"}, "satellite": {"src": "/kartal.jpg", "alt": "KARTAL-7 reconnaissance satellite", "caption": "KARTAL-7"}, "flag-anatarya": {"src": "/anatarya.svg", "alt": "Anatarya flag", "caption": "Anatarya flag", "kind": "flag", "download": true}, "flag-elonya": {"src": "/elonya.svg", "alt": "Elonya flag", "caption": "Elonya flag", "kind": "flag", "download": true}, "flag-veloria": {"src": "/veloria.svg", "alt": "Veloria flag", "caption": "Veloria flag", "kind": "flag", "download": true}, "flag-dalmerya": {"src": "/dalmerya.svg", "alt": "Dalmerya flag", "caption": "Dalmerya flag", "kind": "flag", "download": true}, "flag-vardena": {"src": "/vardena.svg", "alt": "Vardena flag", "caption": "Vardena flag", "kind": "flag", "download": true}, "flag-rovenya": {"src": "/rovenya.svg", "alt": "Rovenya flag", "caption": "Rovenya flag", "kind": "flag", "download": true}, "flag-kipraya": {"src": "/kipraya.svg", "alt": "Kipraya flag", "caption": "Kipraya flag", "kind": "flag", "download": true}, "flag-kuzey-kusagi": {"src": "/kuzey-kusagi.svg", "alt": "KKSP flag", "caption": "KKSP flag", "kind": "flag", "download": true}, "flag-avren-birligi": {"src": "/avren-birligi.svg", "alt": "Avren Union flag", "caption": "Avren Union flag", "kind": "flag", "download": true}, "patch-hancer": {"src": "/hancer.png", "alt": "132nd Hançer / Dagger unit insignia", "caption": "132nd Hançer / Dagger insignia", "kind": "patch", "download": true}, "patch-ucaksavar": {"src": "/ucaksavar.png", "alt": "21st Air Defense Battalion insignia", "caption": "21st Air Defense Battalion insignia", "kind": "patch", "download": true}, "patch-sarp-muhafiz": {"src": "/sarp-muhafiz.png", "alt": "4th Sarp Guard Company insignia", "caption": "4th Sarp Guard Company insignia", "kind": "patch", "download": true}, "patch-aigaion": {"src": "/aigaion.png", "alt": "AIGAION unit insignia", "caption": "AIGAION insignia", "kind": "patch", "download": true}, "patch-mizrak": {"src": "/mizrak.png", "alt": "41st Mızrak Tactical Squadron insignia", "caption": "41st Mızrak Tactical Squadron insignia", "kind": "patch", "download": true}, "patch-nereus-komando": {"src": "/nereus-komando.png", "alt": "8th Nereus Naval Commando Group insignia", "caption": "8th Nereus Naval Commando Group insignia", "kind": "patch", "download": true}, "air-k4": {"src": "/k4-boran.jpg", "alt": "K-4 Boran", "caption": "K-4 Boran", "kind": "aircraft"}, "air-k16": {"src": "/k16-alaz.jpg", "alt": "K-16 Alaz", "caption": "K-16 Alaz", "kind": "aircraft"}, "air-m12": {"src": "/m12-aster.jpg", "alt": "M-12 Aster", "caption": "M-12 Aster", "kind": "aircraft"}, "air-p8": {"src": "/p8-pelagos.jpg", "alt": "P-8 Pelagos", "caption": "P-8 Pelagos", "kind": "aircraft"}, "air-ut7": {"src": "/ut7-ilgaz.jpg", "alt": "UT-7 Ilgaz", "caption": "UT-7 Ilgaz", "kind": "aircraft"}, "flag-kuzey-kipraya": {"src": "/kuzey-kipraya.svg", "alt": "North Kipraya flag", "caption": "North Kipraya flag", "kind": "flag", "download": true}, "veh-kaya": {"src": "/kaya-zma.jpg", "alt": "Kaya armored personnel carrier", "caption": "Kaya armored personnel carrier", "kind": "vehicle"}, "veh-kalkan": {"src": "/kalkan-hss.jpg", "alt": "Kalkan air defense system", "caption": "Kalkan air defense system", "kind": "vehicle"}, "veh-triton": {"src": "/triton-botu.jpg", "alt": "Triton fast transport boat", "caption": "Triton fast transport boat", "kind": "vehicle"}, "veh-aigaion": {"src": "/aigaion-firkateyni.jpg", "alt": "AIGAION-class frigate", "caption": "AIGAION-class frigate", "kind": "vehicle"}, "veh-nereus": {"src": "/nereus-cikarma.jpg", "alt": "NEREUS amphibious transport ship", "caption": "NEREUS amphibious transport ship", "kind": "vehicle"}, "veh-kallisto": {"src": "/kallisto-ikmal.jpg", "alt": "KALLISTO replenishment ship", "caption": "KALLISTO replenishment ship", "kind": "vehicle"}, "patch-kuzey-isaret": {"src": "/kuzey-isaret.png", "alt": "6th Northern Signals Battalion insignia", "caption": "6th Northern Signals Battalion insignia", "kind": "patch", "download": true}, "patch-doruk-ikmal": {"src": "/doruk-ikmal.png", "alt": "18th Doruk Logistics Regiment insignia", "caption": "18th Doruk Logistics Regiment insignia", "kind": "patch", "download": true}, "patch-pelagos-devriye": {"src": "/pelagos-devriye.png", "alt": "3rd Pelagos Maritime Patrol Squadron insignia", "caption": "3rd Pelagos Maritime Patrol Squadron insignia", "kind": "patch", "download": true}, "patch-demir-iz": {"src": "/demir-iz.png", "alt": "27th Demir İz Mechanized Infantry Regiment insignia", "caption": "27th Demir İz Mechanized Infantry Regiment insignia", "kind": "patch", "download": true}, "patch-iris-indirme": {"src": "/iris-indirme.png", "alt": "9th Iris Airborne Brigade insignia", "caption": "9th Iris Airborne Brigade insignia", "kind": "patch", "download": true}};

const legacyVisuals={'anatarya':'facility','elonya':'coast','gokkale-4':'facility','sarpburun':'facility','kalyon-denizi':'coast','kalyon-adalari':'coast','kartal-7':'satellite','simsek-iii':'facility','kriz':'facility'};
const pageVisuals=Object.fromEntries(Object.entries(pages).map(([id,p])=>[id,p.imageKey===undefined?legacyVisuals[id]:p.imageKey]));
for(const [id,p] of Object.entries(pages))if(/^upload:[a-f0-9]{32}$/.test(p.imageKey||''))visuals[p.imageKey]={src:'/uploads/'+p.imageKey.slice(7),alt:p.title,caption:p.title,kind:'uploaded'};
for(const [id,p] of Object.entries(pages))if(/^file:[a-z0-9][a-z0-9.-]{0,90}\.(?:png|jpe?g|webp)$/.test(p.imageKey||''))visuals[p.imageKey]={src:'/'+p.imageKey.slice(5),alt:p.title,caption:p.title,kind:'uploaded'};


function figure(key){const v=visuals[key];if(!v)return '';return `<figure class="article-image ${v.kind||''}"><a href="${v.src}" target="_blank" rel="noopener" aria-label="Open full-size image"><img src="${v.src}" alt="${escapeHTML(v.alt)}" width="${v.kind==='patch'?720:600}" height="${v.kind==='patch'?720:400}" decoding="async"></a><figcaption>${escapeHTML(v.caption)}${v.download?`<a class="asset-download" href="${v.src}" download>${v.kind==='patch'?'Download PNG':'Download flag'} ↓</a>`:''}</figcaption></figure>`}
const cats={'ulkeler':'Countries','cografya':'Geography','uzay-programi':'Space program','birlikler':'Units','tesisler':'Facilities','olaylar':'Events','kurumlar':'Organizations','belgeler':'Documents','araclar':'Vehicles'};
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function prose(s){return escapeHTML(s).replace(/\[\[([a-z0-9-]+)\]\]/g,(_,id)=>pages[id]?`<a href="${getArticleUrl(id,'en',pages)}" title="${escapeHTML(pages[id].desc)}">${escapeHTML(pages[id].title)}</a>`:id)}
function card(id){const p=pages[id];if(!p)return '';const visual=visuals[pageVisuals[id]];return `<a class="card" href="${getArticleUrl(id,'en',pages)}">${visual?`<img class="card-image" src="${visual.src}" alt="${escapeHTML(visual.alt)}" width="768" height="512" loading="lazy" decoding="async">`:""}<span class="eyebrow">${escapeHTML(p.category)}</span><h3>${escapeHTML(p.title)}</h3><p>${escapeHTML(p.desc)}</p><span class="card-foot">Read entry ↗</span></a>`}
function articleHeader(title,category,desc,count){
  const catKey=getCategoryKey(category);
  const catUrl=catKey?getCategoryPageUrl(catKey,'en'):'/all-articles';
  return `<div class="breadcrumb"><a href="/home">Home</a><span>/</span>${category?`<a href="${catUrl}">${escapeHTML(category)}</a>`:`<span>Archive</span>`}</div><div class="article-top"><span class="eyebrow">${escapeHTML(category||'Archive')}</span><span class="badge">${count||'Archive record'}</span></div><h1>${escapeHTML(title)}</h1><p class="subtitle">${escapeHTML(desc)}</p><div class="tabbar"><span>Article</span><a href="/all-articles">Article index</a><small>REGIONAL ARCHIVE / EN</small></div>`;
}
function home(){return articleHeader('GÖKKALE Archive','Encyclopedia','Countries, orbital systems, and competing interests along a shared sea.',`${Object.keys(pages).length} articles`)+`<p class="lead">${prose('A satellite facility lies at the center of the tensions between [[anatarya]] and [[elonya]]: [[gokkale-4]]. This archive brings together the parties to the conflict, its geography, and its origins in space.')}</p><section class="feature" id="merkez">${figure('facility')}<span class="eyebrow">FEATURED ENTRY / FACILITIES</span><h2><a href="${getArticleUrl('gokkale-4','en',pages)}">GÖKKALE-4</a></h2><p>${prose('While [[gozcu-3]] remains in orbit, [[kartal-7]] awaits launch. The advance of [[aigaion]] toward [[sarpburun]] turns these preparations into a crisis between the two countries.')}</p><a href="${getArticleUrl('gokkale-4','en',pages)}">Open the facility dossier ↗</a></section><p class="map-callout"><a href="/harita-en.html">Explore the political map ↗</a> · Countries, divided Kipraya, and the Sarpburun Peninsula</p><h2 id="taraflar">The two sides of the conflict</h2><div class="cards">${card('anatarya')}${card('elonya')}</div><h2 id="yörünge">Orbit and coast</h2><div class="cards">${card('kartal-7')}${card('sarpburun')}</div><h2 id="akis">Sequence of events</h2><div class="timeline"><section><small>01 / CURRENT SITUATION</small><h3>The eye in orbit</h3><p>${prose('[[gozcu-3]] continues its surveillance and data-relay mission.')}</p></section><section><small>02 / PREPARATION</small><h3>New reconnaissance capability</h3><p>${prose('[[kartal-7]] awaits launch from [[gokkale-4]] aboard [[simsek-iii]].')}</p></section><section><small>03 / ESCALATION</small><h3>From documents to war</h3><p>${prose('[[elonya]] declares war on the basis of the forged [[sarpburun-dosyasi]]. As [[kuzey-kusagi]] fails to agree on intervention, [[aigaion]] is sent to the region.')}</p></section></div>`}
function memberships(){const rows=[['anatarya','Member','Partner; not a full member'],['elonya','Member','Member'],['veloria','Member','Member'],['dalmerya','Member','Member'],['vardena','Member','Member'],['rovenya','Member','Member'],['kipraya','Not a member','Member'],['kuzey-kipraya','Not a member','No separate membership']];return `<section class="membership"><h2>Memberships</h2><div class="table-scroll"><table><thead><tr><th>Country</th><th>KKSP</th><th>Avren Union</th></tr></thead><tbody>${rows.filter(([id])=>pages[id]).map(([id,kksp,ab])=>`<tr><td><img src="/${id}.svg" alt="" width="30" height="20"> <a href="${getArticleUrl(id,'en',pages)}">${escapeHTML(pages[id].title)}</a></td><td>${kksp}</td><td>${ab}</td></tr>`).join('')}</tbody></table></div></section>`}
function article(id){const p=pages[id];return articleHeader(p.title,p.category,p.desc,p.draft?'Draft entry':null)+`<div class="article-body"><aside class="facts" aria-label="Infobox"><div class="facts-title">${escapeHTML(p.title)}</div>${pageVisuals[id]?figure(pageVisuals[id]):''}<dl>${p.facts.map(([k,v])=>`<div><dt>${escapeHTML(k)}</dt><dd>${prose(v)}</dd></div>`).join('')}</dl></aside><p class="lead">${prose(p.lead).replace(/\n\n/g,'</p><p>')}</p><details class="article-toc" open><summary>Contents</summary><ol>${p.sections.map(([h],i)=>`<li><a href="#bolum-${i}">${escapeHTML(h)}</a></li>`).join('')}</ol></details>${p.draft?'<div class="notice">The unit name is recorded; its duties and affiliation remain unconfirmed.</div>':''}${p.sections.map(([h,t],i)=>`<section><h2 id="bolum-${i}">${escapeHTML(h)}</h2><p>${prose(t).replace(/\n\n/g,'</p><p>').replace(/\n/g,'<br>')}</p></section>`).join('')}</div>${['kuzey-kusagi','avren-birligi'].includes(id)?memberships():''}${id==='hancer'?'<h2>Aircraft inventory</h2><div class="cards">'+card('k4-boran')+card('k16-alaz')+'</div>':''}<h2 id="ilgili">Related entries</h2><div class="related">${p.related.filter(i=>pages[i]).map(i=>`<a href="${getArticleUrl(i,'en',pages)}">${escapeHTML(pages[i].title)}</a>`).join('')}</div>`}
function index(category){let entries=Object.entries(pages).filter(([,p])=>!category||p.category===category);const isVehicles=category===cats.araclar;return articleHeader(category||'All articles','Article index',category?'Archive entries in this category.':'Every archive entry in one index.',`${entries.length} articles`)+(isVehicles?'<div class="cards vehicle-index">'+entries.map(([id])=>card(id)).join('')+'</div>':entries.map(([id,p])=>`<div class="index-row"><a href="${getArticleUrl(id,'en',pages)}">${escapeHTML(p.title)}</a><span>${escapeHTML(p.category)}${p.draft?' · Draft':''}</span></div>`).join(''))}
const navItems=[['ana-sayfa','Home','/home'],['harita','Political map','/harita-en.html'],['tum-maddeler','All articles','/all-articles'],['ulkeler','Countries','/countries'],['cografya','Geography','/geography'],['uzay-programi','Space program','/space-program'],['birlikler','Units','/units'],['tesisler','Facilities','/facilities'],['olaylar','Events','/events'],['kurumlar','Organizations','/organizations'],['belgeler','Documents','/documents'],['araclar','Vehicles','/vehicles']];
return {home,article,index,cats,navItems,escapeHTML,visuals};
}

const dataTR={
    "anatarya":  {
                     "title":  "Anatarya Cumhuriyeti",
                     "category":  "Ülkeler",
                     "desc":  "Kalyon Denizi’nin doğusunda yer alan üniter cumhuriyet.",
                     "lead":  "Anatarya Cumhuriyeti, [[kalyon-denizi]] doğusundaki geniş bir yarımada ile iç platolar üzerinde yer alan, başkenti Arkent olan üniter bir cumhuriyettir. Batısında Elonya ile kara sınırı bulunurken güney kıyıları Kalyon Denizi\u0027ne, kuzey sınırları ise Avren ana karasının iç bölgelerine uzanır.",
                     "facts":  [
                                   [
                                       "Resmî ad",
                                       "Anatarya Cumhuriyeti"
                                   ],
                                   [
                                       "Başkent",
                                       "Arkent"
                                   ],
                                   [
                                       "Resmî dil",
                                       "Anataryaca"
                                   ],
                                   [
                                       "Yönetim",
                                       "Üniter, parlamenter cumhuriyet"
                                   ],
                                   [
                                       "Yasama organı",
                                       "Cumhuriyet Meclisi"
                                   ],
                                   [
                                       "Coğrafi konum",
                                       "[[kalyon-denizi]] doğusu"
                                   ],
                                   [
                                       "İttifak",
                                       "[[kuzey-kusagi]]"
                                   ],
                                   [
                                       "Uzay merkezi",
                                       "[[gokkale-4]]"
                                   ],
                                   [
                                       "Avren Birliği",
                                       "Tam üye değil; ortaklık ilişkisi"
                                   ]
                               ],
                     "sections":  [
                                      [
                                          "Coğrafya ve iklim",
                                          "Anatarya’nın batı kıyıları koylar, dağlık burunlar ve liman kentleriyle parçalanmış bir yapı gösterir. Kıyıdaki ılıman iklim, iç kesimlerde daha kurak ve mevsim farklarının belirgin olduğu plato iklimine dönüşür. Dağ sıraları, kıyı yerleşimleri ile iç bölge arasındaki ulaşımı belirli geçitlerde toplar.\n\n[[sarpburun]], kıyıdaki yerleşim yoğunluğundan görece uzakta kalan bir burundur. Açık denize erişimi ve geniş güvenlik alanı oluşturulabilmesi, bölgenin [[gokkale-4]] için seçilmesinde etkili olmuştur. [[kalyon-adalari]] çevresindeki deniz alanlarının statüsü ise komşu [[elonya]] ile ilişkilerde ayrı bir uyuşmazlık konusudur.\n\nÜlkenin [[istara-bogazi]] batısındaki toprakları [[avrupa]] ana karasına bağlıdır. Burada [[elonya]] ile kara sınırı bulunur. [[istara]] iki yakalı bir geçiş şehridir; başkent Arkent ise iç bölgede kalır."
                                      ],
                                      [
                                          "Tarih",
                                          "Cumhuriyet, eski hanedan yönetiminin çözülmesini izleyen anayasal dönüşüm döneminde kurulmuştur. İlk dönem yönetimleri, bölgesel idareleri ortak bir hukuk ve vergi düzeninde birleştirmeye öncelik vermiştir. Arkent’in başkent seçilmesi, siyasi merkezin liman ticaretine bağımlı kıyı şehirlerinden iç bölgeye taşınmasını simgelemiştir.\n\nSonraki sanayileşme döneminde demiryolları, makine üretimi ve teknik eğitim kurumları genişlemiştir. Savunma üretimi başlangıçta dış tedarike dayanırken, art arda yaşanan ambargolar yerli elektronik ve havacılık programlarını hızlandırmıştır. [[kuzey-kusagi]] üyeliği bu süreçte dış güvenlik güvencesi sağlamış, ancak ülkenin bağımsız savunma altyapısı kurma politikasını sona erdirmemiştir."
                                      ],
                                      [
                                          "Devlet yapısı ve siyaset",
                                          "Anatarya, çok partili parlamenter sistemle yönetilir. Yasama yetkisi Cumhuriyet Meclisine, yürütme yetkisi meclisin güvenine dayanan hükûmete aittir. Cumhurbaşkanlığı devletin sürekliliğini temsil eden anayasal makamdır. İller, merkezî yönetimin atadığı görevliler ile seçilmiş yerel organlar üzerinden idare edilir.\n\nİç siyasetin başlıca tartışmaları, iç bölgelerle kıyı şehirleri arasındaki ekonomik farklar, savunma harcamalarının bütçedeki payı ve güvenlik kurumlarının sivil denetimidir. Uzay programı geniş destek görse de [[gokkale-4]] tesisinin askerî görevleri ve kamuya kapalı bütçesi muhalefetin eleştirilerine konu olur."
                                      ],
                                      [
                                          "Ekonomi ve altyapı",
                                          "Ekonomi; sanayi, tarım, lojistik ve hizmet sektörlerine dayanır. İç havzalarda tahıl üretimi ve ağır sanayi, kıyı kentlerinde gemi bakımı, ihracat ve turizm öne çıkar. Elektronik, optik sistemler ve havacılık alt bileşenleri stratejik yatırımlar arasındadır.\n\nÜlkenin geniş kara ağı, uzun süreli üretim ve ikmal kapasitesi sağlar. Buna karşılık kıyı ticaretinin [[kalyon-denizi]] güzergâhlarına bağımlılığı, deniz taşımacılığındaki kesintileri ekonomik bir risk hâline getirir. Savaş sırasında ticari sigorta giderleri yükselmiş, kıyı yatırımları ve sivil taşımacılık yavaşlamıştır."
                                      ],
                                      [
                                          "Toplum ve kültür",
                                          "Anataryaca, eğitim ve kamu yönetiminin ortak dilidir. Kıyı, plato ve dağ bölgeleri arasında mimari, mutfak ve yerel ağız bakımından belirgin farklılıklar bulunur. Büyük sanayi kentleri, iç göçün oluşturduğu karma nüfus yapısıyla tanımlanır.\n\nCumhuriyetin modernleşme anlatısında mühendislik ve kamu eğitimi önemli yer tutar. Uzay programının sivil yüzü; hava tahmini, haberleşme, afet gözlemi ve üniversite araştırmalarıdır. Bu nedenle [[gokkale-4]], askerî öneminin yanında teknik ilerlemenin kamusal simgelerinden biri olarak görülür."
                                      ],
                                      [
                                          "Savunma ve uzay programı",
                                          "Anatarya’nın savunma yaklaşımı, geniş ülke derinliğini, yerli üretimi ve hava savunma ağını bir arada kullanmaya dayanır. Bölgesel teknoloji üstünlüğü, her kıyı noktasında sürekli kuvvet üstünlüğü anlamına gelmez. [[elonya]] tarafından dar bir sahaya yığılan deniz unsurları, özellikle [[sarpburun]] çevresinde yerel baskı oluşturabilir.\n\n[[gozcu-3]], mevcut gözetleme ve veri aktarım sistemidir. Yeni [[kartal-7]] ise askerî keşif kapasitesini artırmak üzere [[simsek-iii]] ile fırlatılacaktır. İki sistem de uzay programıyla ilişkilidir; KARTAL-7, belgelerde ileri sürüldüğü gibi bir yörünge bombardıman silahı değildir."
                                      ],
                                      [
                                          "Dış ilişkiler",
                                          "Anatarya’nın [[kuzey-kusagi]] üyeliği, ortak savunma ve istihbarat paylaşımına erişim sağlar. [[elonya]] ile aynı ittifakta yer alması, iki ülke arasındaki deniz anlaşmazlıklarını ortadan kaldırmamıştır. Taraflar, ada çevresindeki faaliyetleri sırasıyla egemenlik hakkı ve güvenlik tehdidi olarak yorumlamaktadır.\n\nAnatarya, [[sarpburun-dosyasi]] yayımlandığında belgelerin sahte olduğunu açıklamış ve ortak inceleme istemiştir. İttifakın askerî müdahale yerine soruşturma ve ateşkes çağrısını tercih etmesi, ülkede güvenlik taahhütlerine yönelik güveni zayıflatmıştır."
                                      ],
                                      [
                                          "GÖKKALE-4 Krizi",
                                          "[[elonya-istihbarati]] tarafından hazırlanan [[sarpburun-dosyasi]], Anatarya’nın [[kalyon-adalari]] çevresinde ilk saldırıya hazırlandığı izlenimini yaratmıştır. Elonya yönetimi, dosyayı yaklaşan bir tehdidin kanıtı olarak sunarak savaş kararı almış ve [[aigaion]] grubunu bölgeye sevk etmiştir.\n\nAnatarya’nın ortak savunma talebi, [[kuzey-kusagi]] içinde gerekli siyasi uzlaşmayı sağlayamamıştır. İttifak askerî harekât başlatmazken, ülke [[gokkale-4]] savunmasını kendi kuvvetleriyle yürütmeye başlamıştır."
                                      ],
                                      [
                                          "Başlıca birlikler",
                                          "[[hancer]], [[kuzey-isaret]] ve [[sarp-muhafiz]] GÖKKALE-4 çevresindeki savunmanın farklı unsurlarını oluşturur. Ana platformlar arasında [[k16-alaz]], [[kalkan-hss]], [[kaya-zma]] ve [[ut7-ilgaz]] yer alır."
                                      ],
                                      [
                                          "Kipraya politikası",
                                          "[[anatarya]], [[kuzey-kipraya]] bağımsızlığını tanıyan tek devlettir. Kuzeyle güvenlik ve ekonomik iş birliği yürütür. [[kipraya-tampon-hatti]] çevresindeki gelişmeler, [[elonya]] ile ilişkilerdeki başlıca anlaşmazlık alanlarından biridir."
                                      ]
                                  ],
                     "related":  [
                                     "elonya",
                                     "kuzey-kusagi",
                                     "sarpburun-dosyasi",
                                     "gokkale-4",
                                     "kriz",
                                     "avren-birligi",
                                     "kipraya",
                                     "kuzey-isaret",
                                     "doruk-ikmal",
                                     "demir-iz"
                                 ],
                     "imageKey":  "flag-anatarya"
                 },
    "elonya":  {
                   "title":  "Elonya Cumhuriyeti",
                   "category":  "Ülkeler",
                   "desc":  "Kalyon Denizi’nin batısında yer alan denizci cumhuriyet.",
                   "lead":  "Elonya Cumhuriyeti, [[kalyon-denizi]] batısında ve Avren ana karasının güneybatı kesiminde yer alan, başkenti Lerya olan üniter bir kıyı devletidir.",
                   "facts":  [
                                 [
                                     "Resmî ad",
                                     "Elonya Cumhuriyeti"
                                 ],
                                 [
                                     "Başkent",
                                     "Lerya"
                                 ],
                                 [
                                     "Resmî dil",
                                     "Elonca"
                                 ],
                                 [
                                     "Yönetim",
                                     "Üniter, parlamenter cumhuriyet"
                                 ],
                                 [
                                     "Yasama organı",
                                     "Ulusal Meclis"
                                 ],
                                 [
                                     "Coğrafi konum",
                                     "[[kalyon-denizi]] batısı"
                                 ],
                                 [
                                     "İttifak",
                                     "[[kuzey-kusagi]]"
                                 ],
                                 [
                                     "İstihbarat kurumu",
                                     "[[elonya-istihbarati]]"
                                 ],
                                 [
                                     "Avren Birliği",
                                     "Tam üye"
                                 ]
                             ],
                   "sections":  [
                                    [
                                        "Coğrafya ve iklim",
                                        "Elonya’nın yerleşim düzenini dar kıyı ovaları, dağlık iç kesimler ve adalar belirler. Büyük kentlerin çoğu doğal limanların çevresinde gelişmiştir. Yazları kurak kıyı iklimi, yüksek kesimlerde daha serin ve yağışlı koşullara dönüşür. Tarıma elverişli arazinin parçalı yapısı, deniz ticaretinin ekonomik önemini artırmıştır.\n\n[[kalyon-adalari]] çevresindeki ada zincirleri, ülkenin deniz yollarıyla güvenlik kaygılarını iç içe geçirir. Takımadanın batı kesimlerindeki Elonya yönetimi, orta kuşaktaki egemenlik anlaşmazlıklarıyla komşudur.\n\nElonya yarımadası kuzeyde [[avrupa]] ana karasına bağlanır. Kuzeydoğuda Anatarya’nın Avren yakasıyla kara sınırı paylaşır; bu sınır [[istara]] ve [[istara-bogazi]] batısındadır."
                                    ],
                                    [
                                        "Tarih",
                                        "Elonya Cumhuriyeti, kıyı kentleri ile ada yönetimlerinin ortak meclis etrafında birleşmesinden doğmuştur. Erken cumhuriyet döneminin temel sorunu, adaların ticari özerkliği ile merkezî yönetimin vergi ve savunma ihtiyaçlarını uzlaştırmak olmuştur. Lerya’daki denizcilik çevreleri, yeni devletin mali ve diplomatik yapısında etkili olmuştur.\n\nTicaret filosunun büyümesi, ülkeyi dış pazarlara bağlamış; deniz subaylığı ve liman idaresi güçlü meslek gelenekleri hâline gelmiştir. [[kuzey-kusagi]] üyeliği sonrasında hava ve deniz kuvvetleri ortak standartlara uyarlanmıştır. Buna rağmen [[anatarya]] ile ada çevresindeki askerî faaliyetler üzerine yaşanan krizler kalıcı biçimde çözülememiştir."
                                    ],
                                    [
                                        "Devlet yapısı ve siyaset",
                                        "Elonya, tek meclisli parlamenter bir sistemle yönetilir. Hükûmet Ulusal Meclise karşı sorumludur; cumhurbaşkanlığı ayrı bir anayasal makamdır. Ada belediyeleri ulaşım, turizm ve yerel altyapı alanlarında geniş görevler üstlenirken, dış politika ve savunma merkezî yönetimin yetkisinde kalır.\n\nSiyasette ticaretin sürekliliğini savunan çevrelerle deniz güvenliğini önceleyen gruplar arasında gerilim vardır. [[kartal-7]] tartışması, güvenlik yanlısı politikaların ağırlığını artırmıştır. [[sarpburun-dosyasi]] yalnızca dış kamuoyuna değil, savaş kararını desteklemesi beklenen meclis ve halka da sunulmuştur."
                                    ],
                                    [
                                        "Ekonomi",
                                        "Deniz taşımacılığı, liman işletmeciliği, turizm, gemi onarımı ve finansal hizmetler ekonominin başlıca alanlarıdır. Tarımda kıyı ürünleri, bağcılık ve ada üretimi öne çıkar. Sanayi tabanı [[anatarya]] kadar geniş değildir; bazı savunma sistemleri ve enerji girdileri dış tedarike bağlıdır.\n\nBu yapı, kısa süreli bir deniz harekâtını siyasi açıdan cazip gösterebilse de uzayan savaşı maliyetli kılar. Ticaret rotalarının bozulması, turizm gelirlerinin düşmesi ve sigorta maliyetlerinin yükselmesi, savaşın sivil ekonomi üzerindeki baskısını artırır."
                                    ],
                                    [
                                        "Toplum ve kültür",
                                        "Elonca resmî dil olmakla birlikte ada yerleşimleri arasında farklı ağızlar ve yerel gelenekler yaşar. Denizcilik, göç ve liman ticareti; edebiyatta, kamusal törenlerde ve aile mesleklerinde güçlü bir yer tutar. Lerya, ada nüfusunun eğitim ve istihdam amacıyla yöneldiği başlıca merkezdir.\n\nDevletin deniz güvenliği söylemi toplumun tamamının tek görüşte olduğu anlamına gelmez. Savaş öncesinde üniversiteler, ticaret kuruluşları ve muhalefet çevreleri, [[sarpburun-dosyasi]] için bağımsız inceleme talep etmiştir. Resmî yayınlarda ise dosya, yaklaşan saldırının kanıtı olarak işlenmiştir."
                                    ],
                                    [
                                        "Savunma ve istihbarat",
                                        "Elonya savunma planlaması, deniz yollarını açık tutmaya ve ada çevresinde kısa sürede kuvvet toplamaya odaklanır. [[aigaion]], bu yaklaşımın [[sarpburun]] sahasındaki başlıca unsurudur. Yerel deniz üstünlüğü, ülkenin bütün cephelerde üstün olduğu veya uzun bir kara savaşını sürdürebileceği anlamına gelmez.\n\n[[elonya-istihbarati]], dış istihbarat ve stratejik değerlendirme faaliyetlerinden sorumludur. Kurumun [[cam-perde]] kapsamında hazırladığı sahte belgeler, [[kartal-7]] programını keşif faaliyeti yerine yaklaşan bir saldırının hazırlığı gibi göstermiştir."
                                    ],
                                    [
                                        "Dış ilişkiler ve savaş gerekçesi",
                                        "Elonya, [[kuzey-kusagi]] içinde kendisini ittifakın deniz yollarını koruyan bir üye olarak konumlandırır. [[anatarya]] uzay programına yönelik itirazını da ulusal rekabetten çok ortak güvenlik meselesi olarak sunmuştur.\n\n[[sarpburun-dosyasi]], Anatarya’nın adalara yönelik ilk saldırısının yakın olduğunu ileri sürer. Elonya hükûmeti, bu iddiaya dayanarak savaş açmış; GÖKKALE-4’e yönelik harekâtı “önleyici savunma” olarak adlandırmıştır. Bu ifade Elonya’nın resmî gerekçesidir; ittifakın harekâta onay verdiği anlamına gelmez."
                                    ],
                                    [
                                        "GÖKKALE-4 Krizi",
                                        "Savaşın görünürdeki nedeni dosyada yer alan saldırı iddiasıdır. Askerî hedef ise [[kartal-7]] faaliyete geçmeden önce [[gokkale-4]] kapasitesini durdurmaktır. Yeni uydu, Elonya’nın deniz hareketleri ve ada konuşlanmalarının gizliliğini azaltacaktır.\n\nSahte belgelerin yol açtığı belirsizlik, [[kuzey-kusagi]] içinde ortak savunma kararını kilitlemiş; ittifak savaşa askerî olarak katılmamıştır. Belgelerin gerçek kökeni kriz başlarken kamuoyunca doğrulanmış değildir. Bu nedenle savaş, askerî çatışmanın yanında istihbarat iddialarının güvenilirliği üzerine yürüyen bir diplomatik mücadeleye dönüşmüştür."
                                    ],
                                    [
                                        "Başlıca birlikler",
                                        "[[aigaion]], [[mizrak]] ve [[nereus-komando]] deniz, hava ve özel görev unsurlarını temsil eder. [[m12-aster]], [[p8-pelagos]], [[triton-botu]] ile grubun fırkateyn ve destek gemileri farklı görevler üstlenir."
                                    ],
                                    [
                                        "Kipraya politikası",
                                        "[[elonya]], [[kipraya]] hükûmetini adanın tamamının meşru temsilcisi kabul eder. Kuzeyin ayrı bağımsızlığını tanımaz; adanın statüsünün müzakerelerle çözülmesini savunur. Anatarya’nın kuzeydeki güvenlik rolü iki ülke arasında gerilim yaratır."
                                    ]
                                ],
                   "related":  [
                                   "anatarya",
                                   "elonya-istihbarati",
                                   "sarpburun-dosyasi",
                                   "kuzey-kusagi",
                                   "aigaion",
                                   "kriz",
                                   "avren-birligi",
                                   "kipraya",
                                   "ucaksavar",
                                   "pelagos-devriye",
                                   "iris-indirme",
                                   "lerya-deniz-ussu"
                               ],
                   "imageKey":  "flag-elonya"
               },
    "gokkale-4":  {
                      "title":  "GÖKKALE-4",
                      "category":  "Tesisler",
                      "desc":  "Uydu kontrolü, fırlatma hazırlığı ve çatışmanın merkezi.",
                      "lead":  "GÖKKALE-4, [[anatarya]] tarafından işletilen uydu kontrol ve fırlatma kompleksidir. [[kartal-7]] askerî keşif uydusunun [[simsek-iii]] ile buradan fırlatılacak olması, tesisi [[elonya]] saldırısının merkezine yerleştirir.",
                      "facts":  [
                                    [
                                        "Tesis türü",
                                        "Uydu kontrol ve fırlatma kompleksi"
                                    ],
                                    [
                                        "Bağlı ülke",
                                        "[[anatarya]]"
                                    ],
                                    [
                                        "İlgili bölge",
                                        "[[sarpburun]]"
                                    ],
                                    [
                                        "Mevcut uydu",
                                        "[[gozcu-3]]"
                                    ],
                                    [
                                        "Fırlatma yükü",
                                        "[[kartal-7]]"
                                    ],
                                    [
                                        "Fırlatma aracı",
                                        "[[simsek-iii]]"
                                    ]
                                ],
                      "sections":  [
                                       [
                                           "Görevi",
                                           "Kompleksin iki temel işlevi uydu operasyonlarını yürütmek ve yeni fırlatmayı hazırlamaktır. [[gozcu-3]] hâlihazırda yörüngedeki gözetleme ve veri aktarım uydusuyken, [[kartal-7]] henüz fırlatılmayı bekleyen yeni sistemdir."
                                       ],
                                       [
                                           "Neden hedef alınıyor?",
                                           "Tesis, [[elonya]] açısından yalnızca bir bina topluluğu değildir: yeni keşif kapasitesinin devreye gireceği noktadır. Saldırı, [[kartal-7]] üzerinden oluşacak askerî görünürlüğü önlemeyi amaçlar. [[sarpburun-dosyasi]] tesisi yaklaşan bir ilk saldırının merkezi gibi göstermiş, [[elonya]] hükûmeti bu iddiayı savaşa gerekçe olarak sunmuştur. Dosyanın gerçek kaynağı [[elonya-istihbarati]] olup tesise atfedilen saldırı planı sahtedir."
                                       ],
                                       [
                                           "Sivil yaşam ve çalışanlar",
                                           "Komplekste mühendisler, uydu operatörleri, bilim insanları, bakım ekipleri ve lojistik çalışanları görev yapar. Sivil personel haberleşme sistemlerini işletir, arızaları giderir, malzeme akışını sürdürür ve fırlatma hazırlıklarını yürütür. Kriz döneminde bu çalışmalar tahliye ve acil durum ekipleriyle eşgüdüm içinde devam eder."
                                       ],
                                       [
                                           "Tesis düzeni",
                                           "Kompleks; uydu kontrol merkezi, fırlatma sahası, teknik bakım alanları ve lojistik bölümlerinden oluşur. Sivil çalışma alanları ile askerî güvenlik bölgeleri ayrı erişim düzenlerine tabidir."
                                       ]
                                   ],
                      "related":  [
                                      "anatarya",
                                      "sarpburun",
                                      "gozcu-3",
                                      "kartal-7",
                                      "simsek-iii",
                                      "kriz",
                                      "sarpburun-dosyasi",
                                      "kuzey-kusagi",
                                      "sarpburun-radar-istasyonu"
                                  ]
                  },
    "sarpburun":  {
                      "title":  "Sarpburun Yarımadası",
                      "category":  "Coğrafya",
                      "desc":  "Anatarya ana karasına doğudan bağlı stratejik kıyı yarımadası.",
                      "lead":  "Sarpburun Yarımadası, [[anatarya]] ana karasından batıya, [[kalyon-denizi]] içine uzanan bir kıyı çıkıntısıdır. Doğudaki kara boynu üzerinden ana yarımadaya kesintisiz biçimde bağlıdır; ada değildir. [[gokkale-4]] uydu kontrol ve fırlatma kompleksi yarımadanın üzerinde yer alır.",
                      "facts":  [
                                    [
                                        "Tür",
                                        "Yarımada"
                                    ],
                                    [
                                        "Ülke",
                                        "[[anatarya]]"
                                    ],
                                    [
                                        "Kara bağlantısı",
                                        "Doğuda geniş kara boynu"
                                    ],
                                    [
                                        "Stratejik tesis",
                                        "[[gokkale-4]]"
                                    ],
                                    [
                                        "Deniz",
                                        "[[kalyon-denizi]]"
                                    ]
                                ],
                      "sections":  [
                                       [
                                           "Coğrafya",
                                           "Yarımada, kıyıdan açık denize uzanan engebeli bir araziye sahiptir. Tesis ile ülkenin iç kesimleri arasındaki kara yolu doğudaki geniş boyun üzerinden geçer. Korunaklı koylar, kayalık burunlar ve kıyı sırtları yarımadanın batı kesimini biçimlendirir."
                                       ],
                                       [
                                           "Krizdeki rolü",
                                           "[[gokkale-4]] ve [[kartal-7]] programı nedeniyle [[kriz]] merkezindedir. [[aigaion]] denizden baskı kurarken, [[sarp-muhafiz]] kara erişimini ve tesis çevresini korur."
                                       ]
                                   ],
                      "related":  [
                                      "anatarya",
                                      "gokkale-4",
                                      "sarp-muhafiz",
                                      "aigaion",
                                      "kriz",
                                      "demir-iz"
                                  ]
                  },
    "kalyon-denizi":  {
                          "title":  "Kalyon Denizi",
                          "category":  "Coğrafya",
                          "desc":  "İki ülkenin deniz merkezli geriliminin arka planı.",
                          "lead":  "Kalyon Denizi, batıda [[elonya]] ile doğuda [[anatarya]] arasında uzanan denizdir. [[kalyon-adalari]] denizin güney kesiminde yer alır. Bölge, deniz ticareti ile iki ülke arasındaki egemenlik anlaşmazlıklarının merkezindedir.",
                          "facts":  [
                                        [
                                            "Tür",
                                            "Deniz"
                                        ],
                                        [
                                            "İlgili coğrafya",
                                            "[[kalyon-adalari]]"
                                        ],
                                        [
                                            "İlgili ülkeler",
                                            "[[anatarya]] · [[elonya]]"
                                        ]
                                    ],
                          "sections":  [
                                           [
                                               "Stratejik bağlam",
                                               "Deniz hareketleri ve ada üslerinin görünürlüğü, [[kartal-7]] programına yönelen itirazın merkezindedir. [[aigaion]] sevkiyatı, bu gerilimin askerî boyutunu temsil eder."
                                           ],
                                           [
                                               "Sınırlar",
                                               "Batıda [[elonya]], doğuda [[anatarya]] kıyılarıyla çevrilidir. Kuzeyde İç Deniz’e açılan geçit, güneyde ise [[kipraya]] çevresindeki deniz yolları bölgenin ulaşım bağlantılarını oluşturur. [[kalyon-adalari]] etrafındaki egemenlik anlaşmazlıkları deniz yetki alanlarını da etkiler."
                                           ]
                                       ],
                          "related":  [
                                          "kalyon-adalari",
                                          "sarpburun",
                                          "aigaion"
                                      ]
                      },
    "kalyon-adalari":  {
                           "title":  "Kalyon Adaları",
                           "category":  "Coğrafya",
                           "desc":  "Kalyon Denizi ile ilişkili ada coğrafyası.",
                           "lead":  "Kalyon Adaları, [[kalyon-denizi]] ile bağlantılı ada topluluğudur. Ada üsleri ve askerî konuşlanmaların izlenmesi, [[anatarya]] ile [[elonya]] arasındaki krizin başlıca konularındandır.",
                           "facts":  [
                                         [
                                             "Tür",
                                             "Ada topluluğu"
                                         ],
                                         [
                                             "İlgili deniz",
                                             "[[kalyon-denizi]]"
                                         ],
                                         [
                                             "Tekil ada adları",
                                             "Henüz belirlenmedi"
                                         ]
                                     ],
                           "sections":  [
                                            [
                                                "Krizle ilişkisi",
                                                "[[kartal-7]] uydusunun keşif kabiliyeti, deniz hareketlerinin yanında adalardaki askerî faaliyetleri de kapsar. Takımadanın bazı kesimleri [[anatarya]], bazıları [[elonya]] tarafından yönetilir; orta kuşaktaki adaların egemenliği iki devlet arasında tartışmalıdır."
                                            ]
                                        ],
                           "related":  [
                                           "kalyon-denizi",
                                           "kartal-7",
                                           "elonya"
                                       ]
                       },
    "gozcu-3":  {
                    "title":  "GÖZCÜ-3",
                    "category":  "Uzay programı",
                    "desc":  "Yörüngede görev yapan gözetleme ve veri aktarım uydusu.",
                    "lead":  "GÖZCÜ-3, [[anatarya]] uzay programında hâlihazırda yörüngede bulunan gözetleme ve veri aktarım uydusudur. [[gokkale-4]] kompleksinin mevcut uydu faaliyetleriyle ilişkilidir.",
                    "facts":  [
                                  [
                                      "Tür",
                                      "Gözetleme ve veri aktarım uydusu"
                                  ],
                                  [
                                      "Durum",
                                      "Yörüngede"
                                  ],
                                  [
                                      "Bağlı ülke",
                                      "[[anatarya]]"
                                  ],
                                  [
                                      "İlgili tesis",
                                      "[[gokkale-4]]"
                                  ]
                              ],
                    "sections":  [
                                     [
                                         "Görevi",
                                         "GÖZCÜ-3 mevcut gözetleme ve veri aktarım kapasitesini temsil eder. Henüz fırlatılmamış olan [[kartal-7]] ile aynı sistem değildir."
                                     ],
                                     [
                                         "Uzay programındaki yeri",
                                         "[[gokkale-4]] çevresindeki kriz sırasında mevcut uydu faaliyetleri devam ederken, yeni fırlatmanın hazırlıkları da sürer."
                                     ]
                                 ],
                    "related":  [
                                    "kartal-7",
                                    "gokkale-4",
                                    "anatarya"
                                ]
                },
    "kartal-7":  {
                     "title":  "KARTAL-7",
                     "category":  "Uzay programı",
                     "desc":  "Fırlatılması beklenen yeni askerî keşif uydusu.",
                     "lead":  "KARTAL-7, [[anatarya]] tarafından [[gokkale-4]] kompleksinden [[simsek-iii]] ile fırlatılması planlanan yeni askerî keşif uydusudur. Fırlatma hazırlığı, [[elonya]] ile yaşanan çatışmanın temel nedenidir.",
                     "facts":  [
                                   [
                                       "Tür",
                                       "Askerî keşif uydusu"
                                   ],
                                   [
                                       "Durum",
                                       "Fırlatma öncesi"
                                   ],
                                   [
                                       "Fırlatma sahası",
                                       "[[gokkale-4]]"
                                   ],
                                   [
                                       "Taşıyıcı",
                                       "[[simsek-iii]]"
                                   ]
                               ],
                     "sections":  [
                                      [
                                          "Stratejik önemi",
                                          "Uydu, Elonya’nın deniz hareketlerini, ada üslerini ve askerî konuşlanmalarını görünür kılabilecek yeni bir keşif kapasitesi olarak tanımlanır. Bu kapasitenin devreye girmesi, iki ülke arasındaki dengeyi etkiler."
                                      ],
                                      [
                                          "Fırlatma ve kriz",
                                          "[[elonya]], bu kapasite ortaya çıkmadan fırlatmayı engellemeye çalışır. [[aigaion]] grubunun [[sarpburun]] yönüne sevki, [[gokkale-4]] çevresindeki çatışmayı başlatan askerî baskının parçasıdır."
                                      ],
                                      [
                                          "GÖZCÜ-3 ile ilişkisi",
                                          "[[gozcu-3]] zaten yörüngededir; KARTAL-7 ise yeni fırlatma yüküdür."
                                      ]
                                  ],
                     "related":  [
                                     "gozcu-3",
                                     "simsek-iii",
                                     "gokkale-4",
                                     "kriz"
                                 ]
                 },
    "simsek-iii":  {
                       "title":  "ŞİMŞEK-III",
                       "category":  "Uzay programı",
                       "desc":  "KARTAL-7’yi taşıması planlanan fırlatma aracı.",
                       "lead":  "ŞİMŞEK-III, [[kartal-7]] askerî keşif uydusunu [[gokkale-4]] kompleksinden uzaya taşıması planlanan fırlatma aracıdır.",
                       "facts":  [
                                     [
                                         "Tür",
                                         "Fırlatma aracı"
                                     ],
                                     [
                                         "Yük",
                                         "[[kartal-7]]"
                                     ],
                                     [
                                         "Fırlatma sahası",
                                         "[[gokkale-4]]"
                                     ]
                                 ],
                       "sections":  [
                                        [
                                            "Programdaki rolü",
                                            "[[anatarya]] uzay programının yeni keşif uydusunun yörüngeye ulaştırılmasında görev alır."
                                        ]
                                    ],
                       "related":  [
                                       "kartal-7",
                                       "gokkale-4",
                                       "anatarya"
                                   ]
                   },
    "aigaion":  {
                    "title":  "AIGAION Muharebe Grubu",
                    "category":  "Birlikler",
                    "desc":  "Elonya’nın Sarpburun’a sevk ettiği birleşik deniz kuvveti.",
                    "lead":  "AIGAION Muharebe Grubu, [[elonya]] tarafından [[sarpburun]] yönüne sevk edilen deniz grubudur. AIGAION ve THALASSA fırkateynleri, [[nereus-cikarma]] ve [[kallisto-ikmal]] grubun temel bileşenleridir. [[kriz]] sırasında deniz gözetleme, refakat, kuvvet taşıma ve lojistik görevlerini birlikte yürütür.",
                    "facts":  [
                                  [
                                      "Bağlı ülke",
                                      "[[elonya]]"
                                  ],
                                  [
                                      "Tür",
                                      "Deniz muharebe grubu"
                                  ],
                                  [
                                      "Fırkateynler",
                                      "AIGAION · THALASSA"
                                  ],
                                  [
                                      "Amfibi gemi",
                                      "[[nereus-cikarma]]"
                                  ],
                                  [
                                      "İkmal gemisi",
                                      "[[kallisto-ikmal]]"
                                  ],
                                  [
                                      "Deniz özel birliği",
                                      "[[nereus-komando]]"
                                  ]
                              ],
                    "sections":  [
                                     [
                                         "Gemiler",
                                         "AIGAION ve THALASSA, [[aigaion-firkateyni]] platformlarıdır. [[nereus-cikarma]] personel ve araç taşır; [[kallisto-ikmal]] denizde lojistik destek sağlar. Gemi adı NEREUS ile [[nereus-komando]] birlik adı birbirine karıştırılmamalıdır."
                                     ],
                                     [
                                         "Hava ve kıyı desteği",
                                         "[[p8-pelagos]] deniz devriye uçakları bilgi desteği sağlar. [[mizrak]] ve onun [[m12-aster]] uçakları ayrı bir hava birliğidir; gerektiğinde ortak görev planlamasına katılır. [[triton-botu]] ise deniz komando grubunun kısa mesafeli ulaşım araçlarındandır."
                                     ],
                                     [
                                         "Krizdeki rolü",
                                         "Grup, [[kartal-7]] fırlatması öncesinde [[gokkale-4]] üzerinde baskı kurmak üzere bölgeye gönderilmiştir. Denizden üstünlük, Sarpburun’un ada olduğu anlamına gelmez; tesisin doğuda ana karaya kesintisiz erişimi vardır."
                                     ],
                                     [
                                         "Arma",
                                         "Üç dişli mızrak ve dalga çizgileri deniz görevlerini simgeler. Lacivert ve açık mavi renkli amblem şeffaf PNG olarak sunulur; tekstil dokusu içermez."
                                     ]
                                 ],
                    "related":  [
                                    "elonya",
                                    "sarpburun",
                                    "gokkale-4",
                                    "aigaion-firkateyni",
                                    "nereus-cikarma",
                                    "kallisto-ikmal",
                                    "nereus-komando",
                                    "mizrak",
                                    "lerya-deniz-ussu"
                                ],
                    "imageKey":  "patch-aigaion",
                    "draft":  false
                },
    "hancer":  {
                   "title":  "132. Hançer Taktik Filosu",
                   "category":  "Birlikler",
                   "desc":  "1978’de kurulan Anatarya hava filosu; DAGGER 06 ve Kara Kasım’ın mirası.",
                   "lead":  "132. Hançer Taktik Filosu, 1978’de Sarpburun bölgesinin hava savunması için kurulan [[anatarya]] hava birliğidir. “Dagger” çağrı adını kullanır. Anatarya hava üstünlüğünün simgelerinden sayılan filo, [[gokkale-4]] savunmasındaki rolünün yanında, 17 Kasım 1994’te kaybolan DAGGER 06 ve karargâhındaki anma plakasıyla tanınır.",
                   "facts":  [
                                 [
                                     "Bağlı ülke",
                                     "[[anatarya]]"
                                 ],
                                 [
                                     "Kuruluş",
                                     "1978"
                                 ],
                                 [
                                     "Birlik türü",
                                     "Taktik hava filosu"
                                 ],
                                 [
                                     "Çağrı adı",
                                     "Hançer / Dagger"
                                 ],
                                 [
                                     "Tarihsel uçak",
                                     "[[k4-boran]]"
                                 ],
                                 [
                                     "Modernizasyon",
                                     "2019’dan itibaren [[k16-alaz]]"
                                 ],
                                 [
                                     "Kayıp uçak",
                                     "DAGGER 06 — 17 Kasım 1994"
                                 ],
                                 [
                                     "Anma sözü",
                                     "Dönmeyenlerin nöbeti bitmez."
                                 ],
                                 [
                                     "Tarihî kayıp",
                                     "DAGGER 06 ([[kara-kasim]])"
                                 ]
                             ],
                   "sections":  [
                                    [
                                        "Kuruluş ve ilk dönem (1978)",
                                        "Filo, 1978’de [[sarpburun]] çevresinin hava savunmasını sağlamak üzere kuruldu. İlk döneminde [[k4-boran]] uçaklarıyla görev yaptı. Kıyı bölgesinin korunması, birliğin tarihsel görev kimliğinin temelini oluşturdu."
                                    ],
                                    [
                                        "Kara Kasım Olayı (17 Kasım 1994)",
                                        "17 Kasım 1994’te DAGGER 06 çağrı kodunu kullanan Anatarya’ya ait [[k4-boran]] uçağı kayboldu. Uçak, son telsiz mesajından 11 saniye sonra radardan silindi. Enkazına ulaşılamadı; pilot ile silah sistem subayının akıbeti açıklanmadı.\n\nBirliğin geçmişinde “Kara Kasım” olarak anılan olay, Sınıflandırılmış Dosya 94-117 içinde yer alır. Kaybın nedeni kesinleştirilmiş değildir."
                                    ],
                                    [
                                        "Karargâhtaki anma plakası",
                                        "Eski filo karargâhının duvarındaki plaka, DAGGER 06’yı ve geri dönmeyen mürettebatını anar. Plakanın metni şöyledir:\n\n132. TAKTİK FİLO KOMUTANLIĞI\nDAGGER 06\n17 KASIM 1994\nDönmeyenlerin nöbeti bitmez."
                                    ],
                                    [
                                        "Modernizasyon ve uçaklar (2019)",
                                        "2019’da [[k16-alaz]] modernizasyonu başladı. K-4 uçaklarının bir bölümü eğitim ve sınırlı görevler için kullanımda kaldı. Filonun tarihsel envanteri [[k4-boran]], modernizasyon dönemi ise [[k16-alaz]] ile tanımlanır."
                                    ],
                                    [
                                        "2036 sinyali ve Dosya 94-117",
                                        "2036’da tespit edilen bir sinyal, DAGGER 06’nın 1994’teki son yayınıyla aynı frekans özelliklerini taşıyordu. Dosya 94-117 kapsamında iki kaydın karşılaştırılması talep edildi.\n\nBu benzerlik, kayıp uçağın bulunduğu veya mürettebatın hayatta olduğu anlamına gelmez. Sinyalin kaynağı ve Kara Kasım ile bağlantısı, soruşturmanın çözümlenmemiş başlıklarıdır."
                                    ],
                                    [
                                        "GÖKKALE-4 savunması ve SON ŞAFAK",
                                        "Hançer, [[gokkale-4]] savunmasında görev alır ve SON ŞAFAK için yetkili birlik olarak anılır. [[kriz]] sırasında Anatarya’nın hava savunmasındaki başlıca birliklerdendir.\n\nBirliğin komutası ulusal askerî makamlardadır; [[kuzey-kusagi]] üyeliği filoyu otomatik olarak pakt komutasına geçirmez."
                                    ],
                                    [
                                        "Birlik arması",
                                        "Gümüş hançer ve açılmış kanatlar, Hançer adını ve hava görevini simgeler. Amblemde filonun 132 numarası yer alır."
                                    ]
                                ],
                   "related":  [
                                   "anatarya",
                                   "sarpburun",
                                   "gokkale-4",
                                   "kriz",
                                   "k4-boran",
                                   "k16-alaz",
                                   "kara-kasim",
                                   "dosya-94-117",
                                   "sarpburun-radar-istasyonu"
                               ],
                   "imageKey":  "patch-hancer",
                   "draft":  false
               },
    "ucaksavar":  {
                      "title":  "21. Uçaksavar Taburu",
                      "category":  "Birlikler",
                      "desc":  "Elonya kuvvetlerine bağlı kıyı ve ada hava savunma taburu.",
                      "lead":  "21. Uçaksavar Taburu, [[elonya]] Hava Kuvvetlerinin Lerya Körfezi ve batı [[kalyon-adalari]] üzerindeki hava gözetleme ağına bağlıdır. [[kriz]] sırasında [[aigaion]] görev grubunun kıyıya dönüş hattını korumuş, [[gokkale-4]] üzerine yapılacak bir uçuşa doğrudan katılmamıştır.",
                      "facts":  [
                                    [
                                        "Bağlı ülke",
                                        "[[elonya]]"
                                    ],
                                    [
                                        "Birlik türü",
                                        "Kıyı hava savunma taburu"
                                    ],
                                    [
                                        "Konuşlanma",
                                        "Lerya Körfezi"
                                    ],
                                    [
                                        "Çağrı adı",
                                        "Kalkan"
                                    ],
                                    [
                                        "Görev alanı",
                                        "[[kalyon-adalari]]"
                                    ]
                                ],
                      "sections":  [
                                       [
                                           "Kuruluş ve görev",
                                           "Lerya Körfezi çevresindeki liman savunma birliklerinin tek komuta altında birleştirilmesiyle kuruldu. Radar mevzileri, hareketli bataryalar ve ada gözlem noktaları taburun ayrı unsurlarıdır. Tabur, [[elonya]] ulusal komutasında kalır; [[kuzey-kusagi]] üyeliği tek başına müşterek harekât yetkisi vermez."
                                       ],
                                       [
                                           "Kalyon Denizi krizi",
                                           "[[elonya-istihbarati]] tarafından üretilen [[sarpburun-dosyasi]] savaş ilanına dayanak olduğunda, tabur limanlar ile [[aigaion]] grubunun dönüş koridoru için hazır duruma geçirildi. [[mizrak]] filosuyla radar izlerini paylaştı. Doğu adalarında görülen tanımlanamayan izler, hem sivil trafik hem de askerî temas olasılığı araştırılmadan düşman hedefi sayılmadı."
                                       ],
                                       [
                                           "İkmal ve sınırlamalar",
                                           "Dağlık ada mevzilerine mühimmat ve yakıt sevkiyatını dar liman yolları sınırlar. Deniz ikmalinde [[kallisto-ikmal]] gemisiyle eşgüdüm sağlanır. Taburun sabit mevzileri [[sarpburun]] kıyılarına menzil sağlamaz; [[gokkale-4]] çevresindeki Anatarya birlikleriyle organik bağı yoktur."
                                       ],
                                       [
                                           "Birlik arması",
                                           "Radar yayları ve yukarı dönük iki ok, hava gözetleme görevini; 21 sayısı taburu temsil eder."
                                       ]
                                   ],
                      "related":  [
                                      "elonya",
                                      "kalyon-adalari",
                                      "mizrak",
                                      "aigaion",
                                      "kriz",
                                      "elonya-istihbarati",
                                      "lerya-deniz-ussu"
                                  ],
                      "imageKey":  "patch-ucaksavar",
                      "draft":  false
                  },
    "kriz":  {
                 "title":  "GÖKKALE-4 Krizi",
                 "category":  "Olaylar",
                 "desc":  "KARTAL-7 fırlatması çevresinde gelişen çatışma.",
                 "lead":  "GÖKKALE-4 Krizi, [[elonya]] yönetiminin [[anatarya]] karşısında savaş kararı almasıyla askerî çatışmaya dönüşen siyasi ve güvenlik krizidir. Savaşın resmî gerekçesi olarak [[sarpburun-dosyasi]] sunulmuş; harekâtın başlıca hedefi [[kartal-7]] keşif uydusunun [[gokkale-4]] kompleksinden fırlatılmasını engellemek olmuştur. [[kuzey-kusagi]], sahte belgeler çevresinde oluşan görüş ayrılığı nedeniyle savaşa askerî olarak katılmamıştır.",
                 "facts":  [
                               [
                                   "Savunan taraf",
                                   "[[anatarya]]"
                               ],
                               [
                                   "Saldıran taraf",
                                   "[[elonya]]"
                               ],
                               [
                                   "Odak noktası",
                                   "[[gokkale-4]]"
                               ],
                               [
                                   "Sonuç",
                                   "Henüz belirlenmedi"
                               ]
                           ],
                 "sections":  [
                                  [
                                      "Arka plan",
                                      "[[anatarya]] tarafından geliştirilen [[kartal-7]], [[elonya]] deniz hareketleri ve ada konuşlanmalarına ilişkin keşif kapasitesini artıracaktır. [[gozcu-3]] yörüngede görevini sürdürürken yeni uydu için [[gokkale-4]] tesisinde hazırlık yapılmaktadır."
                                  ],
                                  [
                                      "Sahte belgeler ve savaş gerekçesi",
                                      "[[elonya-istihbarati]], [[cam-perde]] kapsamında [[sarpburun-dosyasi]] adlı belge bütününü hazırlamıştır. Dosya, Anatarya’nın ilk saldırıyı planladığını ileri sürer. Elonya hükûmeti bu iddiayı savaşın gerekçesi olarak sunmuş; Anatarya belgelerin sahte olduğunu açıklamıştır."
                                  ],
                                  [
                                      "İttifakın tutumu",
                                      "İki ülkenin de üyesi olduğu [[kuzey-kusagi]], dosyanın güvenilirliği ve ortak savunma hükmünün uygulanması konusunda uzlaşamamıştır. Ortak askerî müdahale kararı alınmamış, diplomatik temaslar ve inceleme süreciyle yetinilmiştir. Bu karar Elonya harekâtına verilmiş bir onay değildir."
                                  ],
                                  [
                                      "Askerî tırmanış",
                                      "[[aigaion]] grubu [[sarpburun]] yönüne sevk edilmiştir. Anatarya, tesisi ve fırlatma programını kendi kuvvetleriyle korurken Elonya yeni keşif kapasitesi ortaya çıkmadan tesisi devre dışı bırakmayı amaçlamaktadır."
                                  ],
                                  [
                                      "Mevcut durum",
                                      "[[gokkale-4]] çevresindeki askerî çatışma sürerken [[kartal-7]] için fırlatma hazırlıkları devam etmektedir. [[sarpburun-dosyasi]] belgelerinin kökeni üzerindeki soruşturma, diplomatik görüşmelerin başlıca gündemidir. [[kuzey-kusagi]] içinde ortak müdahale konusunda uzlaşma sağlanamamıştır."
                                  ]
                              ],
                 "related":  [
                                 "anatarya",
                                 "elonya",
                                 "sarpburun-dosyasi",
                                 "kuzey-kusagi",
                                 "cam-perde",
                                 "gokkale-4"
                             ]
             },
    "kuzey-kusagi":  {
                         "title":  "Kuzey Kuşağı Savunma Paktı",
                         "category":  "Kurumlar",
                         "desc":  "Üye devletlerin ortak savunma ve güvenlik ittifakı.",
                         "lead":  "Kuzey Kuşağı Savunma Paktı (KKSP), [[anatarya]], [[elonya]], [[veloria]], [[dalmerya]], [[vardena]] ve [[rovenya]] arasında ortak savunma ve askerî eşgüdüm sağlayan ittifaktır. Paktın askerî görev alanı, [[avren-birligi]] kurumlarından ayrıdır. [[kipraya]] ve [[kuzey-kipraya]] pakt üyesi değildir. [[kriz]] sırasında iki üye devletin savaşması, ortak savunma karar sürecini kilitlemiştir.",
                         "facts":  [
                                       [
                                           "Kısaltma",
                                           "KKSP"
                                       ],
                                       [
                                           "Tür",
                                           "Kolektif savunma ittifakı"
                                       ],
                                       [
                                           "Üyeler",
                                           "[[anatarya]] · [[elonya]] · [[veloria]] · [[dalmerya]] · [[vardena]] · [[rovenya]]"
                                       ],
                                       [
                                           "Karar organı",
                                           "Pakt Konseyi"
                                       ],
                                       [
                                           "Karar yöntemi",
                                           "Oydaşma"
                                       ],
                                       [
                                           "Kipraya",
                                           "Üye değil"
                                       ],
                                       [
                                           "Krizdeki tutum",
                                           "Ortak askerî müdahale yok"
                                       ]
                                   ],
                         "sections":  [
                                          [
                                              "Kuruluş ve amaç",
                                              "Pakt, kuzey ticaret kuşağındaki devletlerin tek başlarına karşılayamadıkları güvenlik ihtiyaçları etrafında kurulmuştur. Ortak tatbikatlar, haberleşme standartları ve müşterek planlama mekanizmaları geliştirmiştir. Üyelik, ulusal orduların ortadan kalkması veya her çatışmanın otomatik biçimde ortak savaşa dönüşmesi anlamına gelmez."
                                          ],
                                          [
                                              "Karar yapısı",
                                              "Pakt Konseyi, üye devletlerin temsilcilerinden oluşur. İttifak adına askerî harekât kararı oydaşma gerektirir. Ortak savunma hükmü, saldırıya uğrayan bir üyenin yardım talebini görüşmeye açar; olayın niteliği ve verilecek karşılık ayrıca karara bağlanır.\n\nİki üye arasındaki savaş için öncelik, acil istişare ve uyuşmazlığın incelenmesidir. Bu kural, bir üyenin diğerine saldırmasını meşru kılmaz; ittifakın hangi tarafta ve hangi yetkiyle hareket edebileceğine ilişkin karar sürecini belirler."
                                          ],
                                          [
                                              "Sarpburun Dosyası ve karar kilitlenmesi",
                                              "[[elonya]], [[sarpburun-dosyasi]] ile Anatarya’nın ilk saldırıya hazırlandığını ileri sürmüştür. [[anatarya]] ise dosyayı reddederek saldırıya uğrayan taraf olduğunu ve ortak savunma hükmünün uygulanması gerektiğini savunmuştur.\n\nBelgelerin bağımsız incelemesi tamamlanmadan bazı üyeler askerî karar vermeyi reddetmiş, diğerleri Anatarya’nın talebini desteklemiştir. Elonya da kendisine karşı bir ortak harekâta onay vermemiştir. Sahte belgeler böylece yalnızca kamuoyunu etkilememiş, ittifakın karar sürecini de kilitlemiştir."
                                          ],
                                          [
                                              "Müdahale etmeme kararı",
                                              "Konsey, ortak askerî kuvvet görevlendirmemiş; ateşkes çağrısı, belge incelemesi ve diplomatik temaslarla sınırlı kalmıştır. Bu tutum Elonya’nın savaş gerekçesinin doğrulandığı veya paktın tarafsızlık antlaşması imzaladığı anlamına gelmez.\n\nAnatarya açısından sonuç, beklenen kolektif savunma yardımının gelmemesi olmuştur. İttifakın kurumsal olarak savaşa girmemesi ile tek tek üyelerin siyasi tutumları ayrı konulardır.."
                                          ],
                                          [
                                              "Üye devletlerin tutumu",
                                              "[[veloria]] kaynak incelemesi tamamlanmadan harekâta karşı çıkmış, [[dalmerya]] sivil deniz trafiği için arabuluculuğa odaklanmıştır. [[vardena]] çatışmanın kara sınırlarına yayılmasını önlemeyi, [[rovenya]] ise Anatarya’nın savunma talebinin peşinen reddedilmemesini savunmuştur. [[elonya]] kendi harekâtına karşı ortak kuvvet kullanılmasını kabul etmemiştir. Bu ayrışmalar, [[sarpburun-dosyasi]] etrafındaki belirsizlikle birlikte oydaşmayı engellemiştir."
                                          ],
                                          [
                                              "Bayrak ve simge",
                                              "Lacivert zemin üzerindeki altı kollu beyaz yıldız, ortak savunma yükümlülüğünü paylaşan altı üyeyi simgeler. Merkezdeki açık altıgen, üyelerin eşit temsil edildiği konseyi temsil eder."
                                          ]
                                      ],
                         "related":  [
                                         "anatarya",
                                         "elonya",
                                         "sarpburun-dosyasi",
                                         "kriz",
                                         "veloria",
                                         "dalmerya",
                                         "vardena",
                                         "rovenya",
                                         "kipraya",
                                         "avren-birligi"
                                     ],
                         "imageKey":  "flag-kuzey-kusagi"
                     },
    "elonya-istihbarati":  {
                               "title":  "Elonya Ulusal İstihbarat Dairesi",
                               "category":  "Kurumlar",
                               "desc":  "Elonya’nın dış istihbarat ve stratejik değerlendirme kurumu.",
                               "lead":  "Elonya Ulusal İstihbarat Dairesi (EUİD), [[elonya]] hükûmetine dış güvenlik değerlendirmeleri sunan istihbarat kurumudur. [[cam-perde]] kapsamında hazırladığı [[sarpburun-dosyasi]], [[anatarya]] ile savaşın siyasi gerekçesinin oluşturulmasında belirleyici olmuştur.",
                               "facts":  [
                                             [
                                                 "Kısaltma",
                                                 "EUİD"
                                             ],
                                             [
                                                 "Bağlı ülke",
                                                 "[[elonya]]"
                                             ],
                                             [
                                                 "Temel görev",
                                                 "Dış istihbarat ve stratejik değerlendirme"
                                             ],
                                             [
                                                 "İlgili faaliyet",
                                                 "[[cam-perde]]"
                                             ],
                                             [
                                                 "İlgili dosya",
                                                 "[[sarpburun-dosyasi]]"
                                             ]
                                         ],
                               "sections":  [
                                                [
                                                    "Görev ve konumu",
                                                    "Daire, yabancı devletlerin askerî ve siyasi gelişmelerini değerlendirir; hükûmete ve yetkili güvenlik kurullarına rapor sunar. Deniz yolları, ada konuşlanmaları ve [[anatarya]] savunma programları kurumun öncelikli çalışma alanlarıdır. Kurumun değerlendirmeleri ile hükûmetin savaş kararı birbirinden ayrı sorumluluk alanlarıdır."
                                                ],
                                                [
                                                    "Cam Perde faaliyeti",
                                                    "[[kartal-7]] programının Elonya’nın askerî hareketlerini görünür kılacağı değerlendirmesinin ardından, kurum içinde [[cam-perde]] adlı örtülü siyasi etki faaliyeti yürütülmüştür. Hazırlanan dosya, mevcut bölgesel anlaşmazlıkları gerçek dışı bir ilk saldırı planıyla birleştirmiştir.\n\nFaaliyetin amacı, savaşa kamuoyu desteği sağlamak ve [[kuzey-kusagi]] üyelerinin Anatarya lehine hızla ortak karar almasını önlemektir. Kurumun bütün çalışanlarının faaliyetten haberdar olduğu kabul edilmez."
                                                ],
                                                [
                                                    "Kriz sırasındaki konumu",
                                                    "Daire, dosyayı kamuya sunulan bir ulusal güvenlik değerlendirmesinin temeli olarak hükûmete iletmiştir. [[anatarya]] belgeleri reddederken Elonya makamları kaynak gizliliğini gerekçe göstermiştir. Dosyanın bağımsız biçimde incelenememesi, ittifak içindeki siyasi ayrışmayı derinleştirmiştir."
                                                ]
                                            ],
                               "related":  [
                                               "elonya",
                                               "cam-perde",
                                               "sarpburun-dosyasi",
                                               "kuzey-kusagi"
                                           ]
                           },
    "sarpburun-dosyasi":  {
                              "title":  "Sarpburun Dosyası",
                              "category":  "Belgeler",
                              "desc":  "Elonya’nın savaş gerekçesi olarak sunduğu sahte belge bütünü.",
                              "lead":  "Sarpburun Dosyası, [[elonya-istihbarati]] tarafından [[cam-perde]] kapsamında hazırlanan ve [[anatarya]] yönetimine aitmiş gibi sunulan sahte belgelerin ortak adıdır. Dosya, Anatarya’nın [[kalyon-adalari]] çevresine yönelik bir ilk saldırı planladığını ileri sürmüş; [[elonya]] yönetimi tarafından savaş açmanın gerekçesi olarak kullanılmıştır.",
                              "facts":  [
                                            [
                                                "Tür",
                                                "Sahte istihbarat dosyası"
                                            ],
                                            [
                                                "Hazırlayan",
                                                "[[elonya-istihbarati]]"
                                            ],
                                            [
                                                "Faaliyet",
                                                "[[cam-perde]]"
                                            ],
                                            [
                                                "Hedef alınan devlet",
                                                "[[anatarya]]"
                                            ],
                                            [
                                                "Siyasi sonuç",
                                                "Savaş gerekçesi ve ittifak kararlarının kilitlenmesi"
                                            ]
                                        ],
                              "sections":  [
                                               [
                                                   "İddialar",
                                                   "Dosyada, [[gokkale-4]] merkezli bir saldırı hazırlığı yapıldığı, [[kartal-7]] fırlatmasının bu hazırlığın son aşaması olduğu ve ada bölgelerine yönelik askerî harekâtın yakın bulunduğu iddia edilir. Gerçek bir keşif programının varlığı, gerçek dışı saldırı iddiasına inandırıcılık kazandırmak için kullanılmıştır.\n\nKARTAL-7’nin asıl görevi askerî keşiftir. Dosyada uyduya ve tesise atfedilen saldırı planı, programın gerçek işlevinden ayrı tutulmalıdır."
                                               ],
                                               [
                                                   "Yayımlanması ve savaş kararı",
                                                   "Elonya hükûmeti dosyanın seçilmiş bölümlerini kamuoyuna sunmuş, daha geniş içeriği [[kuzey-kusagi]] temsilcileriyle paylaşmıştır. Açıklamayı savaş kararı ve [[aigaion]] grubunun [[sarpburun]] yönüne sevki izlemiştir. Anatarya, açıklanan metinlerin kendi emir zincirine ait olmadığını bildirmiştir."
                                               ],
                                               [
                                                   "Gerçek kökeni ve kamusal belirsizlik",
                                                   "Dosya, [[elonya-istihbarati]] bünyesindeki [[cam-perde]] faaliyeti sırasında üretilmiştir. Ancak belgelerin kökeni kriz sırasında uluslararası kamuoyu önünde doğrulanmış değildir. Soruşturma kayıtlarına erişebilenler ile yalnızca resmî açıklamaları izleyenler farklı bilgilere sahiptir.\n\n[[kuzey-kusagi]] üyelerinin bir bölümü inceleme sonuçlanmadan harekete geçmek istememiştir. İttifakın beklemesi, dosyanın doğruluğunu kabul ettiği anlamına gelmez."
                                               ],
                                               [
                                                   "Siyasi etkileri",
                                                   "Dosya, Elonya’nın saldırısını yaklaşan bir tehdide cevap olarak çerçevelemiş ve Anatarya’nın yardım talebini tartışmalı hâle getirmiştir. [[kriz]] bu nedenle hem bir tesis savunması hem de savaşın gerekçesi üzerine yürüyen bir meşruiyet mücadelesidir. Belgelerin ne zaman ve nasıl kamuoyu önünde çürütüleceği, mevcut zaman çizelgesinin sonrasına bırakılmıştır."
                                               ]
                                           ],
                              "related":  [
                                              "cam-perde",
                                              "elonya-istihbarati",
                                              "kuzey-kusagi",
                                              "kriz",
                                              "kartal-7"
                                          ]
                          },
    "cam-perde":  {
                      "title":  "Cam Perde",
                      "category":  "Olaylar",
                      "desc":  "Sarpburun Dosyası’nın hazırlanmasına dayanan örtülü siyasi etki faaliyeti.",
                      "lead":  "Cam Perde, [[elonya-istihbarati]] tarafından [[anatarya]] karşıtı savaş gerekçesini oluşturmak amacıyla yürütülen örtülü faaliyetin kod adıdır. Başlıca ürünü [[sarpburun-dosyasi]] olan faaliyet, [[kuzey-kusagi]] içinde ortak askerî müdahaleyi önleyecek bir siyasi belirsizlik yaratmayı hedeflemiştir.",
                      "facts":  [
                                    [
                                        "Yürüten",
                                        "[[elonya-istihbarati]]"
                                    ],
                                    [
                                        "Bağlı ülke",
                                        "[[elonya]]"
                                    ],
                                    [
                                        "Başlıca ürün",
                                        "[[sarpburun-dosyasi]]"
                                    ],
                                    [
                                        "Hedef",
                                        "Savaşı gerekçelendirme ve ittifak kararını geciktirme"
                                    ]
                                ],
                      "sections":  [
                                       [
                                           "Arka plan",
                                           "[[kartal-7]] programı, Elonya’nın deniz hareketlerinin ve ada üslerinin gizliliğini azaltacak bir gelişme olarak görülmüştür. [[gokkale-4]] tesisine doğrudan saldırının ittifak içinde tepki yaratması beklendiğinden, askerî harekât öncesinde siyasi bir gerekçe hazırlanmıştır."
                                       ],
                                       [
                                           "Amaç ve sonuç",
                                           "Faaliyet, Anatarya’nın saldırıyı başlatacağı iddiasını öne çıkararak Elonya’nın harekâtını önleyici bir cevap gibi göstermiştir. [[sarpburun-dosyasi]] üzerinden oluşan tartışma, ortak savunma kararının alınmasını engellemiş ve Elonya’ya harekâtın başlangıcında diplomatik zaman kazandırmıştır.\n\nCam Perde askerî zaferi garanti eden bir plan değildir. Faaliyetin başarısı, yalnızca savaşın başlangıcındaki siyasi ortamla ilgilidir; [[gokkale-4]] savunmasının ve uydu fırlatmasının sonucu ayrıca belirlenir."
                                       ]
                                   ],
                      "related":  [
                                      "elonya-istihbarati",
                                      "sarpburun-dosyasi",
                                      "kriz",
                                      "kuzey-kusagi"
                                  ]
                  },
    "avrupa":  {
                   "title":  "Avren ana karası",
                   "category":  "Coğrafya",
                   "desc":  "Elonya ve Anatarya’nın Avren yakasının bağlandığı kuzeybatı ana karası.",
                   "lead":  "Avren, [[veloria]], [[dalmerya]], [[vardena]], [[rovenya]] ve [[elonya]] ile Anatarya’nın boğazın batısındaki topraklarını kapsayan kuzeybatı ana karasıdır. [[anatarya]] ve [[elonya]], [[istara]] batısında kara sınırı paylaşır.",
                   "facts":  [
                                 [
                                     "Tür",
                                     "Kıta / ana kara"
                                 ],
                                 [
                                     "İlgili ülkeler",
                                     "[[elonya]] · [[anatarya]]"
                                 ],
                                 [
                                     "Kritik geçit",
                                     "[[istara-bogazi]]"
                                 ]
                             ],
                   "sections":  [
                                    [
                                        "Devletler ve sınırlar",
                                        "[[veloria]] kuzeybatı kıyılarını, [[dalmerya]] batı yarımadasını, [[vardena]] orta geçiş kuşağını ve [[rovenya]] kuzeydoğu kıyılarını kapsar. [[elonya]] güneye uzanan yarımada devletidir. Anatarya’nın Avren toprağı, Elonya ile Rovenya arasında yer alır."
                                    ],
                                    [
                                        "Siyasi örgütler",
                                        "Bölgedeki devletlerin çoğu hem [[kuzey-kusagi]] hem [[avren-birligi]] üyesidir. İki örgütün üyelikleri bire bir aynı değildir. [[kipraya]] coğrafi olarak açık denizde bir ada devleti olsa da Avren Birliği’ne üyedir."
                                    ]
                                ],
                   "related":  [
                                   "veloria",
                                   "dalmerya",
                                   "vardena",
                                   "rovenya",
                                   "elonya",
                                   "anatarya",
                                   "avren-birligi"
                               ],
                   "imageKey":  "",
                   "draft":  false
               },
    "istara":  {
                   "title":  "İstara",
                   "category":  "Coğrafya",
                   "desc":  "Anatarya’nın iki yakasını birleştiren boğaz şehri.",
                   "lead":  "İstara, [[anatarya]] sınırları içinde, [[istara-bogazi]] çevresinde gelişmiş bir liman ve geçiş şehridir. Yerleşim Avren yakası ile ana yarımada arasında uzanır. İki kıta yakasını bağlayan şehir, bölgenin en önemli ticaret geçitlerinden biridir. Anatarya’nın başkenti Arkent’tir.",
                   "facts":  [
                                 [
                                     "Ülke",
                                     "[[anatarya]]"
                                 ],
                                 [
                                     "Konum",
                                     "[[istara-bogazi]]"
                                 ],
                                 [
                                     "Avren bağlantısı",
                                     "[[avrupa]]"
                                 ],
                                 [
                                     "İşlev",
                                     "Liman, ticaret ve kıtalar arası geçiş"
                                 ]
                             ],
                   "sections":  [
                                    [
                                        "Coğrafya",
                                        "Şehrin batı yakası Avren üzerindedir. Doğu yakası Anatarya’nın büyük ana yarımadasına bağlanır. [[elonya]] ile kara sınırı, şehirden daha batıda bulunur; boğazın kendisi iki ülkenin sınırı değildir."
                                    ],
                                    [
                                        "Stratejik önem",
                                        "Boğaz geçişi ve liman faaliyetleri, kenti kuzey ile güney deniz güzergâhları arasında önemli bir bağlantı noktası yapar. [[gokkale-4]] ve [[sarpburun]] ise ayrı bir kıyı bölgesinde, daha güneyde yer alır."
                                    ]
                                ],
                   "related":  [
                                   "anatarya",
                                   "avrupa",
                                   "istara-bogazi",
                                   "sarpburun"
                               ],
                   "imageKey":  "",
                   "draft":  false
               },
    "istara-bogazi":  {
                          "title":  "İstara Boğazı",
                          "category":  "Coğrafya",
                          "desc":  "Kuzey Denizi ile İç Deniz’i birleştiren dar su geçidi.",
                          "lead":  "İstara Boğazı, [[kalyon-denizi]] çıkışını Avren ana karasının güney deniz ticaret yollarına bağlayan dar su yoludur.",
                          "facts":  [
                                        [
                                            "Tür",
                                            "Boğaz"
                                        ],
                                        [
                                            "Kıyı devleti",
                                            "[[anatarya]]"
                                        ],
                                        [
                                            "Başlıca şehir",
                                            "[[istara]]"
                                        ],
                                        [
                                            "Bağladığı sular",
                                            "Kuzey Denizi · İç Deniz"
                                        ]
                                    ],
                          "sections":  [
                                           [
                                               "Deniz bağlantıları",
                                               "Kuzey Denizi’nden gelen gemiler bu boğazdan İç Deniz’e ulaşır. İç Deniz’in güneybatı çıkışındaki ikinci geçit, [[kalyon-denizi]] ile bağlantı sağlar."
                                           ],
                                           [
                                               "Kara sınırından farkı",
                                               "Anatarya ve [[elonya]], Avren yakasında kara sınırı paylaşır. Bu sınır İstara Boğazı’nın batısındadır; boğaz çevresindeki iki kıyı Anatarya’ya aittir."
                                           ]
                                       ],
                          "related":  [
                                          "istara",
                                          "avrupa",
                                          "anatarya",
                                          "elonya",
                                          "kalyon-denizi"
                                      ],
                          "imageKey":  "",
                          "draft":  false
                      },
    "veloria":  {
                    "title":  "Velarya Federasyonu",
                    "category":  "Ülkeler",
                    "desc":  "Kuzeybatı Avren üzerinde yer alan bölgesel devlet.",
                    "lead":  "Velarya Federasyonu, kuzeybatı Avren üzerinde yer alan, başkenti Veler olan bir devlettir. Geniş kuzeybatı kıyıları ve iç sanayi havzaları üzerinde gelişmiş bir federasyondur. Liman kentleri, finans merkezleri ve ileri imalat bölgeleri ülkenin ekonomik omurgasını oluşturur. [[kuzey-kusagi]] ve [[avren-birligi]] üyesidir.",
                    "facts":  [
                                  [
                                      "Başkent",
                                      "Veler"
                                  ],
                                  [
                                      "Yönetim",
                                      "Federal parlamenter cumhuriyet"
                                  ],
                                  [
                                      "Kıta",
                                      "[[avrupa]]"
                                  ],
                                  [
                                      "Savunma ittifakı",
                                      "[[kuzey-kusagi]]"
                                  ],
                                  [
                                      "Siyasi-ekonomik birlik",
                                      "[[avren-birligi]]"
                                  ]
                              ],
                    "sections":  [
                                     [
                                         "Coğrafya",
                                         "Geniş kuzeybatı kıyıları ve iç sanayi havzaları üzerinde gelişmiş bir federasyondur. Liman kentleri, finans merkezleri ve ileri imalat bölgeleri ülkenin ekonomik omurgasını oluşturur."
                                     ],
                                     [
                                         "Tarih ve yönetim",
                                         "Velarya, bölgesel krallıkların ortak bir federal meclis altında birleşmesiyle kurulmuştur. İki büyük kıtasal ticaret krizinin ardından eyaletler arası altyapı ve ortak dış politika yetkileri genişletilmiştir."
                                     ],
                                     [
                                         "Ekonomi ve toplum",
                                         "Yüksek katma değerli üretim, finans, optik ve havacılık sanayisi öne çıkar. Güçlü eyalet yönetimleri, merkezi hükûmetin dış politika kararlarını parlamento denetimine bağlar."
                                     ],
                                     [
                                         "GÖKKALE-4 Krizi",
                                         "Velarya, dosyanın kaynağı bağımsız olarak doğrulanmadan ortak askerî harekâta onay verilmemesini savunmuştur. Bu tutum Elonya’nın iddialarını doğruladığı anlamına gelmez; hükûmet aynı zamanda saldırının durdurulmasını istemiştir. [[sarpburun-dosyasi]] ve [[kriz]], ülkenin dış politikasındaki başlıca gündem maddeleridir."
                                     ],
                                     [
                                         "Bayrak",
                                         "Lacivert zemin, altın dikey şerit ve beyaz baklava. Bayrak, federasyonun veya cumhuriyetin ortak devlet simgesidir."
                                     ]
                                 ],
                    "related":  [
                                    "avren-birligi",
                                    "kuzey-kusagi",
                                    "anatarya",
                                    "elonya",
                                    "kriz"
                                ],
                    "imageKey":  "flag-veloria",
                    "draft":  false
                },
    "dalmerya":  {
                     "title":  "Dalmerya Cumhuriyeti",
                     "category":  "Ülkeler",
                     "desc":  "Batı Avren kıyısı üzerinde yer alan bölgesel devlet.",
                     "lead":  "Dalmerya Cumhuriyeti, batı Avren kıyısı üzerinde yer alan, başkenti Dalmera olan bir devlettir. Batı Avren’dan güneye uzanan uzun bir yarımada devletidir. Kıyı şehirleri ile dağlık iç kesimler arasında belirgin ekonomik ve kültürel farklılıklar vardır. [[kuzey-kusagi]] ve [[avren-birligi]] üyesidir.",
                     "facts":  [
                                   [
                                       "Başkent",
                                       "Dalmera"
                                   ],
                                   [
                                       "Yönetim",
                                       "Parlamenter cumhuriyet"
                                   ],
                                   [
                                       "Kıta",
                                       "[[avrupa]]"
                                   ],
                                   [
                                       "Savunma ittifakı",
                                       "[[kuzey-kusagi]]"
                                   ],
                                   [
                                       "Siyasi-ekonomik birlik",
                                       "[[avren-birligi]]"
                                   ]
                               ],
                     "sections":  [
                                      [
                                          "Coğrafya",
                                          "Batı Avren’dan güneye uzanan uzun bir yarımada devletidir. Kıyı şehirleri ile dağlık iç kesimler arasında belirgin ekonomik ve kültürel farklılıklar vardır."
                                      ],
                                      [
                                          "Tarih ve yönetim",
                                          "Bir dönem bağımsız olan liman cumhuriyetlerinin birleşmesi, Dalmerya’nın siyasi temelini oluşturmuştur. Birleşme sonrasında ticaret hukuku ve bölgesel belediye özerkliği birlikte korunmuştur."
                                      ],
                                      [
                                          "Ekonomi ve toplum",
                                          "Gemi inşası, deniz sigortacılığı, liman işletmeciliği ve makine üretimi ekonomide önemli yer tutar. Dalmerya, Kalyon’daki ticari hatların açık kalmasını ulusal çıkarı olarak görür."
                                      ],
                                      [
                                          "GÖKKALE-4 Krizi",
                                          "Dalmerya, deniz trafiği ve sivil tahliyeler için diplomatik temas yürütmüş; ittifak dışında tek taraflı savaşa katılmamıştır. Her iki taraftan da ticari gemilere yönelik kısıtlamaları azaltmalarını istemiştir. [[sarpburun-dosyasi]] ve [[kriz]], ülkenin dış politikasındaki başlıca gündem maddeleridir."
                                      ],
                                      [
                                          "Bayrak",
                                          "Koyu yeşil zemin üzerinde beyaz çapraz kuşak. Bayrak, federasyonun veya cumhuriyetin ortak devlet simgesidir."
                                      ]
                                  ],
                     "related":  [
                                     "avren-birligi",
                                     "kuzey-kusagi",
                                     "anatarya",
                                     "elonya",
                                     "kriz"
                                 ],
                     "imageKey":  "flag-dalmerya",
                     "draft":  false
                 },
    "vardena":  {
                    "title":  "Vardena Cumhuriyeti",
                    "category":  "Ülkeler",
                    "desc":  "Orta Avren geçiş kuşağı üzerinde yer alan bölgesel devlet.",
                    "lead":  "Vardena Cumhuriyeti, orta Avren geçiş kuşağı üzerinde yer alan, başkenti Vardis olan bir devlettir. Elonya’nın kuzeyinde, dağ geçitleri ve nehir havzaları çevresinde yer alan bir devlettir. Batı ile doğu Avren arasındaki kara yolları ülkenin stratejik değerini belirler. [[kuzey-kusagi]] ve [[avren-birligi]] üyesidir.",
                    "facts":  [
                                  [
                                      "Başkent",
                                      "Vardis"
                                  ],
                                  [
                                      "Yönetim",
                                      "Parlamenter cumhuriyet"
                                  ],
                                  [
                                      "Kıta",
                                      "[[avrupa]]"
                                  ],
                                  [
                                      "Savunma ittifakı",
                                      "[[kuzey-kusagi]]"
                                  ],
                                  [
                                      "Siyasi-ekonomik birlik",
                                      "[[avren-birligi]]"
                                  ]
                              ],
                    "sections":  [
                                     [
                                         "Coğrafya",
                                         "Elonya’nın kuzeyinde, dağ geçitleri ve nehir havzaları çevresinde yer alan bir devlettir. Batı ile doğu Avren arasındaki kara yolları ülkenin stratejik değerini belirler."
                                     ],
                                     [
                                         "Tarih ve yönetim",
                                         "Vardena, eski sınır eyaletlerinin anayasal birleşmesiyle kurulmuştur. Tarih boyunca geçiş güzergâhlarının denetimi ile komşu devletler arasında denge kurma siyaseti öne çıkmıştır."
                                     ],
                                     [
                                         "Ekonomi ve toplum",
                                         "Demiryolu taşımacılığı, tarım makineleri, enerji iletimi ve transit ticaret temel ekonomik alanlardır. Savunma siyaseti, sınır güvenliği ve ittifak içindeki uzlaşma mekanizmalarına dayanır."
                                     ],
                                     [
                                         "GÖKKALE-4 Krizi",
                                         "Vardena, savaşın Avren kara sınırına yayılmasından kaygı duyar. İnceleme komisyonu ile geçici ateşkes önerisini desteklemiş, Elonya’nın iddialarını bağımsız bir hüküm gibi kabul etmemiştir. [[sarpburun-dosyasi]] ve [[kriz]], ülkenin dış politikasındaki başlıca gündem maddeleridir."
                                     ],
                                     [
                                         "Bayrak",
                                         "Mor zemin üzerinde beyaz ve altın yatay şeritler. Bayrak, federasyonun veya cumhuriyetin ortak devlet simgesidir."
                                     ]
                                 ],
                    "related":  [
                                    "avren-birligi",
                                    "kuzey-kusagi",
                                    "anatarya",
                                    "elonya",
                                    "kriz"
                                ],
                    "imageKey":  "flag-vardena",
                    "draft":  false
                },
    "rovenya":  {
                    "title":  "Rovenya Federasyonu",
                    "category":  "Ülkeler",
                    "desc":  "Kuzeydoğu Avren üzerinde yer alan bölgesel devlet.",
                    "lead":  "Rovenya Federasyonu, kuzeydoğu Avren üzerinde yer alan, başkenti Roven olan bir devlettir. Kuzey Denizi’nin batı ve kuzey kıyılarına açılan geniş bir federasyondur. Ormanlık platolar, nehir kentleri ve kuzey limanları farklı ekonomik bölgeler oluşturur. [[kuzey-kusagi]] ve [[avren-birligi]] üyesidir.",
                    "facts":  [
                                  [
                                      "Başkent",
                                      "Roven"
                                  ],
                                  [
                                      "Yönetim",
                                      "Federal cumhuriyet"
                                  ],
                                  [
                                      "Kıta",
                                      "[[avrupa]]"
                                  ],
                                  [
                                      "Savunma ittifakı",
                                      "[[kuzey-kusagi]]"
                                  ],
                                  [
                                      "Siyasi-ekonomik birlik",
                                      "[[avren-birligi]]"
                                  ]
                              ],
                    "sections":  [
                                     [
                                         "Coğrafya",
                                         "Kuzey Denizi’nin batı ve kuzey kıyılarına açılan geniş bir federasyondur. Ormanlık platolar, nehir kentleri ve kuzey limanları farklı ekonomik bölgeler oluşturur."
                                     ],
                                     [
                                         "Tarih ve yönetim",
                                         "Rovenya’nın federal yapısı, iç bölgeler ile kıyı yönetimleri arasında uzun müzakereler sonucunda oluşmuştur. Ortak savunma ve dış ticaret federal düzeyde, eğitim ve yerel idare bölgesel düzeyde yürütülür."
                                     ],
                                     [
                                         "Ekonomi ve toplum",
                                         "Enerji, ağır makine, demiryolları ve liman ticareti önemli gelir kaynaklarıdır. Kuzey Denizi’nden İstara Boğazı’na uzanan ticari bağlantının açık tutulması dış politikasının önceliklerindendir."
                                     ],
                                     [
                                         "GÖKKALE-4 Krizi",
                                         "Rovenya, Sarpburun Dosyası’ndaki iddiaların Anatarya’nın ortak savunma talebini otomatik olarak geçersiz kılamayacağını savunmuştur. Bununla birlikte pakt içinde gerekli oydaşma oluşmadığından ortak harekât başlamamıştır. [[sarpburun-dosyasi]] ve [[kriz]], ülkenin dış politikasındaki başlıca gündem maddeleridir."
                                     ],
                                     [
                                         "Bayrak",
                                         "Zeytin yeşili zemin, lacivert alt kuşak ve altın disk. Bayrak, federasyonun veya cumhuriyetin ortak devlet simgesidir."
                                     ]
                                 ],
                    "related":  [
                                    "avren-birligi",
                                    "kuzey-kusagi",
                                    "anatarya",
                                    "elonya",
                                    "kriz"
                                ],
                    "imageKey":  "flag-rovenya",
                    "draft":  false
                },
    "kipraya":  {
                    "title":  "Kipraya Cumhuriyeti",
                    "category":  "Ülkeler",
                    "desc":  "Kipraya adasının güneyini yöneten, Avren Birliği üyesi cumhuriyet.",
                    "lead":  "Kipraya Cumhuriyeti, [[anatarya]] kıyılarının güneyindeki [[kipraya-adasi]] üzerinde yer alan devlettir. Ada genelinde tanınan hükûmet, fiilen güney kesimini yönetir; kuzeyde [[kuzey-kipraya]] ayrı bir yönetim kurmuştur. Başkent Kipra, iki kesimi ayıran [[kipraya-tampon-hatti]] tarafından bölünür. Cumhuriyet [[avren-birligi]] üyesidir, [[kuzey-kusagi]] üyesi değildir.",
                    "facts":  [
                                  [
                                      "Başkent",
                                      "Güney Kipra"
                                  ],
                                  [
                                      "Yönetim",
                                      "Parlamenter cumhuriyet"
                                  ],
                                  [
                                      "Fiilî yönetim alanı",
                                      "Adanın güneyi"
                                  ],
                                  [
                                      "Uluslararası statü",
                                      "Ada genelinde tanınan hükûmet"
                                  ],
                                  [
                                      "Birlik üyeliği",
                                      "[[avren-birligi]]"
                                  ],
                                  [
                                      "KKSP üyeliği",
                                      "Üye değil"
                                  ]
                              ],
                    "sections":  [
                                     [
                                         "Coğrafya",
                                         "Güney kıyı ovaları, iç dağlık alanlar ve adanın başlıca ticaret limanları cumhuriyetin fiilî yönetimindedir. Kuzey kesimle temas, denetimli geçiş noktalarından sağlanır."
                                     ],
                                     [
                                         "Bölünmenin tarihi",
                                         "Ortak cumhuriyetin kurumları, iki toplum arasındaki temsil ve güvenlik anlaşmazlıklarıyla zayıfladı. Birleşme yanlısı darbe girişimini izleyen Anatarya müdahalesi ve çatışmalar sonrasında ateşkes hattı oluştu. Nüfus hareketleri, mülkiyet ihtilafları ve karşılıklı güvenlik kaygıları bölünmeyi kalıcılaştırdı."
                                     ],
                                     [
                                         "Dış ilişkiler",
                                         "[[avren-birligi]] ve [[elonya]] cumhuriyeti adanın meşru hükûmeti olarak tanır. Birlik üyeliğinin hukuki kapsamı ada geneline uzansa da ortak mevzuat kuzeyde fiilen uygulanmaz. [[kuzey-kipraya]] ile görüşmeler [[kipraya-tampon-hatti]] çevresindeki tarafsız alanlarda yürütülür."
                                     ],
                                     [
                                         "Ekonomi",
                                         "Liman hizmetleri, turizm, deniz araştırmaları ve tarımsal ihracat başlıca gelir kaynaklarıdır. Bölünme nedeniyle adalar arası ticaret ile kuzey-güney geçişlerinde farklı denetim düzenleri bulunur."
                                     ],
                                     [
                                         "Bayrak",
                                         "Koyu altın zemin üzerindeki beyaz kuşak deniz yollarını, lacivert halka ortak ada yurttaşlığı idealini simgeler."
                                     ]
                                 ],
                    "related":  [
                                    "kipraya-adasi",
                                    "kuzey-kipraya",
                                    "kipraya-tampon-hatti",
                                    "avren-birligi",
                                    "anatarya",
                                    "elonya"
                                ],
                    "imageKey":  "flag-kipraya",
                    "draft":  false
                },
    "avren-birligi":  {
                          "title":  "Avren Birliği",
                          "category":  "Kurumlar",
                          "desc":  "Avren ülkeleri ile Kipraya’yı bir araya getiren siyasi ve ekonomik birlik.",
                          "lead":  "Avren Birliği (AB), ortak pazar, dolaşım, ticaret standartları ve bölgesel kalkınma alanlarında çalışan devletler arası bir birliktir. [[veloria]], [[dalmerya]], [[vardena]], [[rovenya]], [[elonya]] ve [[kipraya]] üyedir. Birliğin siyasi ve ekonomik kurumları [[kuzey-kusagi]] askerî yapısından ayrıdır.",
                          "facts":  [
                                        [
                                            "Kısaltma",
                                            "AB"
                                        ],
                                        [
                                            "Tür",
                                            "Siyasi ve ekonomik birlik"
                                        ],
                                        [
                                            "Üyeler",
                                            "[[veloria]] · [[dalmerya]] · [[vardena]] · [[rovenya]] · [[elonya]] · [[kipraya]]"
                                        ],
                                        [
                                            "Anatarya’nın statüsü",
                                            "Ortaklık ve gümrük anlaşmaları; tam üye değil"
                                        ],
                                        [
                                            "Temel organlar",
                                            "Avren Konseyi · Ortak Meclis · Birlik Komisyonu"
                                        ]
                                    ],
                          "sections":  [
                                           [
                                               "Kuruluş ve yetkiler",
                                               "Birlik, kıtasal ticaretin önündeki gümrük engellerini azaltmak üzere kurulmuş, zamanla ortak ürün standartları ve bölgesel fonlarla genişlemiştir. Üye devletler ordularını ve temel dış politika yetkilerini korur."
                                           ],
                                           [
                                               "KKSP’den farkı",
                                               "[[kuzey-kusagi]] bir askerî savunma paktıdır. Avren Birliği ise siyasi ve ekonomik bütünleşme kurumudur. Kipraya’nın AB üyesi olup KKSP dışında olması ve Anatarya’nın KKSP üyesi olup AB’ye tam üye olmaması bu farkı gösterir."
                                           ],
                                           [
                                               "GÖKKALE-4 Krizi",
                                               "[[elonya]] birliğin üyesi olmasına rağmen savaş kararı otomatik olarak birlik politikası sayılmamıştır. Birlik, [[sarpburun-dosyasi]] için bağımsız inceleme ve ateşkes talep etmiş; yaptırım seçenekleri üzerinde ortak görüş geliştirmekte zorlanmıştır. Bu tartışmalar, KKSP’nin askerî müdahale kararından ayrı yürür."
                                           ],
                                           [
                                               "Bayrak",
                                               "Koyu petrol mavisi zemin üzerinde altın renkli altı eşkenar dörtgen bir halka oluşturur. Altı parça mevcut üye devletleri, açık merkez ortak siyasi alanı simgeler."
                                           ],
                                           [
                                               "Kipraya’nın statüsü",
                                               "[[kipraya]] üyeliği hukuken ada genelini kapsar. Cumhuriyetin fiilen yönetmediği [[kuzey-kipraya]] topraklarında ortak mevzuatın uygulanması askıdadır. Kuzey yönetiminin ayrı bir üyeliği ve Birlik kurumlarında ayrı temsili bulunmaz."
                                           ]
                                       ],
                          "related":  [
                                          "kuzey-kusagi",
                                          "veloria",
                                          "dalmerya",
                                          "vardena",
                                          "rovenya",
                                          "elonya",
                                          "kipraya"
                                      ],
                          "imageKey":  "flag-avren-birligi",
                          "draft":  false
                      },
    "k16-alaz":  {
                     "title":  "K-16 Alaz",
                     "category":  "Araçlar",
                     "desc":  "Anatarya’nın tek motorlu çok rollü savaş uçağı.",
                     "lead":  "K-16 Alaz, [[anatarya]] hava kuvvetleri tarafından kullanılan tek pilotlu, tek motorlu çok rollü savaş uçağıdır. [[hancer]] filosunda 2019’da başlayan modernizasyonun ana platformudur. [[gokkale-4]] çevresindeki hava sahasının korunmasında görev yapar.",
                     "facts":  [
                                   [
                                       "Ülke",
                                       "[[anatarya]]"
                                   ],
                                   [
                                       "Sınıf",
                                       "Çok rollü savaş uçağı"
                                   ],
                                   [
                                       "Mürettebat",
                                       "1 pilot"
                                   ],
                                   [
                                       "Motor düzeni",
                                       "Tek jet motoru"
                                   ],
                                   [
                                       "Kullanıcı",
                                       "[[hancer]]"
                                   ],
                                   [
                                       "Filo modernizasyonu",
                                       "2019"
                                   ]
                               ],
                     "sections":  [
                                      [
                                          "Gelişim ve hizmet",
                                          "Alaz’ın hizmete alınmasıyla [[hancer]] bünyesindeki [[k4-boran]] ağırlıklı yapı dönüşmeye başladı. Yeni uçak, tek pilotun uçuş ve görev sistemlerini birlikte yönetebildiği bir kokpit düzenine sahiptir."
                                      ],
                                      [
                                          "Görevler",
                                          "Hava sahasının korunması, önleme ve taktik hava görevlerinde kullanılır. [[gokkale-4]] krizinde tesis bölgesinin hava savunmasına katkı verir."
                                      ],
                                      [
                                          "Filo içindeki yeri",
                                          "Alaz ön hat görevlerinin ağırlığını taşırken [[k4-boran]] eğitim ve sınırlı görevlerde kullanılmaya devam eder. İki platform, filonun farklı dönemlerini temsil eder."
                                      ]
                                  ],
                     "related":  [
                                     "hancer",
                                     "k4-boran",
                                     "gokkale-4"
                                 ],
                     "imageKey":  "air-k16",
                     "draft":  false
                 },
    "ut7-ilgaz":  {
                      "title":  "UT-7 Ilgaz",
                      "category":  "Araçlar",
                      "desc":  "Genel maksat helikopteri.",
                      "lead":  "UT-7 Ilgaz, [[anatarya]] tarafından kullanılan genel maksat helikopteri platformudur. Personel taşıma, arama-kurtarma ve tıbbi tahliye görevlerine uygun genel maksat helikopteridir. Sarp Muhafız birliğine ihtiyaç durumunda ulaştırma desteği sağlar.",
                      "facts":  [
                                    [
                                        "Ülke",
                                        "[[anatarya]]"
                                    ],
                                    [
                                        "Sınıf",
                                        "Genel maksat helikopteri"
                                    ],
                                    [
                                        "Mürettebat",
                                        "2 pilot + görev ekibi"
                                    ],
                                    [
                                        "İlgili birlik",
                                        "[[sarp-muhafiz]]"
                                    ]
                                ],
                      "sections":  [
                                       [
                                           "Görev",
                                           "Personel taşıma, arama-kurtarma ve tıbbi tahliye görevlerine uygun genel maksat helikopteridir. Sarp Muhafız birliğine ihtiyaç durumunda ulaştırma desteği sağlar."
                                       ],
                                       [
                                           "Hizmet ve destek",
                                           "Çift motorlu Ilgaz, kıyı üsleri ile iç bölgelerdeki tesisler arasında personel ve malzeme taşır. [[sarp-muhafiz]] için ulaştırma desteği sağlar; tıbbi tahliye görevlerinde kabin düzeni sedye taşımaya uygun biçimde değiştirilir."
                                       ]
                                   ],
                      "related":  [
                                      "anatarya",
                                      "sarp-muhafiz"
                                  ],
                      "imageKey":  "air-ut7",
                      "draft":  false
                  },
    "kaya-zma":  {
                     "title":  "Kaya ZMA",
                     "category":  "Araçlar",
                     "desc":  "Zırhlı personel taşıma aracı.",
                     "lead":  "Kaya ZMA, [[anatarya]] tarafından kullanılan zırhlı personel taşıma aracı platformudur. Kara yolu erişimi, personel nakli ve korumalı devriye için kullanılan tekerlekli zırhlı araç ailesidir. Tesis çevresinde kara hareketliliği sağlar.",
                     "facts":  [
                                   [
                                       "Ülke",
                                       "[[anatarya]]"
                                   ],
                                   [
                                       "Sınıf",
                                       "Zırhlı personel taşıma aracı"
                                   ],
                                   [
                                       "Mürettebat",
                                       "3 mürettebat + personel bölmesi"
                                   ],
                                   [
                                       "İlgili birlik",
                                       "[[sarp-muhafiz]]"
                                   ]
                               ],
                     "sections":  [
                                      [
                                          "Görev",
                                          "Kara yolu erişimi, personel nakli ve korumalı devriye için kullanılan tekerlekli zırhlı araç ailesidir. Tesis çevresinde kara hareketliliği sağlar."
                                      ]
                                  ],
                     "related":  [
                                     "anatarya",
                                     "sarp-muhafiz",
                                     "demir-iz"
                                 ],
                     "imageKey":  "veh-kaya",
                     "draft":  false
                 },
    "kalkan-hss":  {
                       "title":  "Kalkan HSS",
                       "category":  "Araçlar",
                       "desc":  "Mobil hava savunma sistemi.",
                       "lead":  "Kalkan HSS, [[anatarya]] tarafından kullanılan mobil hava savunma sistemi platformudur. Radar, komuta aracı ve hava savunma araçlarından oluşan sistem ailesidir.",
                       "facts":  [
                                     [
                                         "Ülke",
                                         "[[anatarya]]"
                                     ],
                                     [
                                         "Sınıf",
                                         "Mobil hava savunma sistemi"
                                     ],
                                     [
                                         "Mürettebat",
                                         "Araç ve görev ekibine göre değişir"
                                     ],
                                     [
                                         "İlgili birlik",
                                         "[[sarp-muhafiz]]"
                                     ]
                                 ],
                       "sections":  [
                                        [
                                            "Görev",
                                            "Radar, komuta aracı ve hava savunma araçlarından oluşan sistem ailesidir."
                                        ]
                                    ],
                       "related":  [
                                       "anatarya",
                                       "sarp-muhafiz"
                                   ],
                       "imageKey":  "veh-kalkan",
                       "draft":  false
                   },
    "m12-aster":  {
                      "title":  "M-12 Aster",
                      "category":  "Araçlar",
                      "desc":  "Çok rollü savaş uçağı.",
                      "lead":  "M-12 Aster, [[elonya]] tarafından kullanılan çok rollü savaş uçağı platformudur. Elonya’nın hava savunması ve deniz kuvvetlerine hava desteği görevlerinde kullandığı çok rollü uçaktır. 41. Mızrak filosunun ana platformudur.",
                      "facts":  [
                                    [
                                        "Ülke",
                                        "[[elonya]]"
                                    ],
                                    [
                                        "Sınıf",
                                        "Çok rollü savaş uçağı"
                                    ],
                                    [
                                        "Mürettebat",
                                        "1 pilot"
                                    ],
                                    [
                                        "İlgili birlik",
                                        "[[mizrak]]"
                                    ]
                                ],
                      "sections":  [
                                       [
                                           "Görev",
                                           "Elonya’nın hava savunması ve deniz kuvvetlerine hava desteği görevlerinde kullandığı çok rollü uçaktır. 41. Mızrak filosunun ana platformudur."
                                       ],
                                       [
                                           "Tasarım ve hizmet",
                                           "Tek pilotlu delta kanat düzeni ve tek jet motoru, Aster’in temel yapısını oluşturur. [[mizrak]] filosu tarafından işletilen uçaklar, kıyı hava sahası ile ada geçişlerinin korunmasında görev yapar."
                                       ]
                                   ],
                      "related":  [
                                      "elonya",
                                      "aigaion"
                                  ],
                      "imageKey":  "air-m12",
                      "draft":  false
                  },
    "p8-pelagos":  {
                       "title":  "P-8 Pelagos",
                       "category":  "Araçlar",
                       "desc":  "Deniz devriye uçağı.",
                       "lead":  "P-8 Pelagos, [[elonya]] tarafından kullanılan deniz devriye uçağı platformudur. Deniz sahası gözlemi, arama-kurtarma koordinasyonu ve uzun süreli devriye görevlerine ayrılmış turboprop uçaktır. AIGAION grubuna bilgi desteği verir; bir savaş uçağı filosunun organik envanteri değildir.",
                       "facts":  [
                                     [
                                         "Ülke",
                                         "[[elonya]]"
                                     ],
                                     [
                                         "Sınıf",
                                         "Deniz devriye uçağı"
                                     ],
                                     [
                                         "Mürettebat",
                                         "2 pilot + görev ekibi"
                                     ],
                                     [
                                         "İlgili birlik",
                                         "[[aigaion]] destek unsurları"
                                     ]
                                 ],
                       "sections":  [
                                        [
                                            "Görev",
                                            "Deniz sahası gözlemi, arama-kurtarma koordinasyonu ve uzun süreli devriye görevlerine ayrılmış turboprop uçaktır. AIGAION grubuna bilgi desteği verir; bir savaş uçağı filosunun organik envanteri değildir."
                                        ],
                                        [
                                            "Görev düzeni",
                                            "Çift turboprop motorlu, yüksek kanatlı Pelagos’un kabininde uçuş ekibi ile deniz gözetleme operatörleri birlikte çalışır. Gözlem bilgileri kıyı merkezlerine ve [[aigaion]] grubuna aktarılır. Arama-kurtarma çalışmalarında deniz üzerindeki temasların belirlenmesine yardımcı olur."
                                        ]
                                    ],
                       "related":  [
                                       "elonya",
                                       "aigaion"
                                   ],
                       "imageKey":  "air-p8",
                       "draft":  false
                   },
    "triton-botu":  {
                        "title":  "Triton Hızlı Botu",
                        "category":  "Araçlar",
                        "desc":  "Hızlı personel taşıma botu.",
                        "lead":  "Triton Hızlı Botu, [[elonya]] tarafından kullanılan hızlı personel taşıma botu platformudur. Kısa mesafeli deniz ulaşımı, kıyı devriyesi ve personel aktarımı için kullanılan hızlı bottur. Nereus Deniz Komando Grubu tarafından kullanılır.",
                        "facts":  [
                                      [
                                          "Ülke",
                                          "[[elonya]]"
                                      ],
                                      [
                                          "Sınıf",
                                          "Hızlı personel taşıma botu"
                                      ],
                                      [
                                          "Mürettebat",
                                          "2 mürettebat + görev ekibi"
                                      ],
                                      [
                                          "İlgili birlik",
                                          "[[nereus-komando]]"
                                      ]
                                  ],
                        "sections":  [
                                         [
                                             "Görev",
                                             "Kısa mesafeli deniz ulaşımı, kıyı devriyesi ve personel aktarımı için kullanılan hızlı bottur. Nereus Deniz Komando Grubu tarafından kullanılır."
                                         ]
                                     ],
                        "related":  [
                                        "elonya",
                                        "aigaion"
                                    ],
                        "imageKey":  "veh-triton",
                        "draft":  false
                    },
    "aigaion-firkateyni":  {
                               "title":  "AIGAION Sınıfı Fırkateyn",
                               "category":  "Araçlar",
                               "desc":  "Çok maksatlı fırkateyn.",
                               "lead":  "AIGAION Sınıfı Fırkateyn, [[elonya]] tarafından kullanılan çok maksatlı fırkateyn platformudur. AIGAION ve THALASSA adlı gemilerin ait olduğu fırkateyn sınıfıdır. Muharebe grubunun refakat, deniz gözetleme ve komuta bağlantısı görevlerini üstlenir.",
                               "facts":  [
                                             [
                                                 "Ülke",
                                                 "[[elonya]]"
                                             ],
                                             [
                                                 "Sınıf",
                                                 "Çok maksatlı fırkateyn"
                                             ],
                                             [
                                                 "Mürettebat",
                                                 "Gemi görev teşkilatı"
                                             ],
                                             [
                                                 "İlgili birlik",
                                                 "[[aigaion]]"
                                             ]
                                         ],
                               "sections":  [
                                                [
                                                    "Görev",
                                                    "AIGAION ve THALASSA adlı gemilerin ait olduğu fırkateyn sınıfıdır. Muharebe grubunun refakat, deniz gözetleme ve komuta bağlantısı görevlerini üstlenir."
                                                ]
                                            ],
                               "related":  [
                                               "elonya",
                                               "aigaion"
                                           ],
                               "imageKey":  "veh-aigaion",
                               "draft":  false
                           },
    "nereus-cikarma":  {
                           "title":  "NEREUS Çıkarma Gemisi",
                           "category":  "Araçlar",
                           "desc":  "Amfibi nakliye ve destek gemisi.",
                           "lead":  "NEREUS Çıkarma Gemisi, [[elonya]] tarafından kullanılan amfibi nakliye ve destek gemisi platformudur. Personel, araç ve destek malzemesi taşıyan amfibi gemidir. 8. Nereus Deniz Komando Grubu ile aynı adı taşır ancak gemi ve birlik farklı yapılardır.",
                           "facts":  [
                                         [
                                             "Ülke",
                                             "[[elonya]]"
                                         ],
                                         [
                                             "Sınıf",
                                             "Amfibi nakliye ve destek gemisi"
                                         ],
                                         [
                                             "Mürettebat",
                                             "Gemi mürettebatı + taşınan birlik"
                                         ],
                                         [
                                             "İlgili birlik",
                                             "[[aigaion]] · [[nereus-komando]]"
                                         ]
                                     ],
                           "sections":  [
                                            [
                                                "Görev",
                                                "Personel, araç ve destek malzemesi taşıyan amfibi gemidir. 8. Nereus Deniz Komando Grubu ile aynı adı taşır ancak gemi ve birlik farklı yapılardır."
                                            ]
                                        ],
                           "related":  [
                                           "elonya",
                                           "aigaion"
                                       ],
                           "imageKey":  "veh-nereus",
                           "draft":  false
                       },
    "kallisto-ikmal":  {
                           "title":  "KALLISTO İkmal Gemisi",
                           "category":  "Araçlar",
                           "desc":  "Deniz lojistik gemisi.",
                           "lead":  "KALLISTO İkmal Gemisi, [[elonya]] tarafından kullanılan deniz lojistik gemisi platformudur. Muharebe grubunun yakıt, erzak ve bakım malzemesi ihtiyaçlarını destekleyen lojistik gemidir. Grubun uzun süreli deniz varlığını sürdürmesine yardımcı olur.",
                           "facts":  [
                                         [
                                             "Ülke",
                                             "[[elonya]]"
                                         ],
                                         [
                                             "Sınıf",
                                             "Deniz lojistik gemisi"
                                         ],
                                         [
                                             "Mürettebat",
                                             "Gemi görev teşkilatı"
                                         ],
                                         [
                                             "İlgili birlik",
                                             "[[aigaion]]"
                                         ]
                                     ],
                           "sections":  [
                                            [
                                                "Görev",
                                                "Muharebe grubunun yakıt, erzak ve bakım malzemesi ihtiyaçlarını destekleyen lojistik gemidir. Grubun uzun süreli deniz varlığını sürdürmesine yardımcı olur."
                                            ]
                                        ],
                           "related":  [
                                           "elonya",
                                           "aigaion"
                                       ],
                           "imageKey":  "veh-kallisto",
                           "draft":  false
                       },
    "sarp-muhafiz":  {
                         "title":  "4. Sarp Muhafız Bölüğü",
                         "category":  "Birlikler",
                         "desc":  "Anatarya kuvvetlerine bağlı tesis koruma ve müdahale birliği.",
                         "lead":  "[[sarpburun]] üzerindeki kritik altyapıyı koruyan, askerî güvenlik ve müdahale görevli bölüktür. Ana kara bağlantısı, personel güvenliği ve kriz sırasında sivil tahliye düzeninin korunmasına odaklanır.",
                         "facts":  [
                                       [
                                           "Bağlı ülke",
                                           "[[anatarya]]"
                                       ],
                                       [
                                           "Birlik türü",
                                           "Tesis koruma ve müdahale birliği"
                                       ],
                                       [
                                           "Çağrı adı",
                                           "Sarp"
                                       ],
                                       [
                                           "Zırhlı araç",
                                           "[[kaya-zma]]"
                                       ],
                                       [
                                           "Ulaştırma desteği",
                                           "[[ut7-ilgaz]]"
                                       ]
                                   ],
                         "sections":  [
                                          [
                                              "Kuruluş ve görev",
                                              "[[sarpburun]] üzerindeki kritik altyapıyı koruyan, askerî güvenlik ve müdahale görevli bölüktür. Ana kara bağlantısı, personel güvenliği ve kriz sırasında sivil tahliye düzeninin korunmasına odaklanır. Birliğin komutası ulusal askerî makamlarındadır; [[kuzey-kusagi]] üyeliği birliği otomatik olarak pakt komutasına geçirmez."
                                          ],
                                          [
                                              "Uçak ve araçlar",
                                              "Zırhlı araç: [[kaya-zma]].\n\nUlaştırma desteği: [[ut7-ilgaz]].\n\nDestek için tahsis edilen araçlar ile birliğin ana envanteri ayrı değerlendirilir."
                                          ],
                                          [
                                              "GÖKKALE-4 Krizi",
                                              "Birlik, [[kriz]] sırasında [[anatarya]] savunma faaliyetleri içinde görev alır."
                                          ],
                                          [
                                              "Birlik arması",
                                              "Kayalık yarımada ve gözetleme kulesi, birliğin koruduğu coğrafyayı temsil eder. Amblemde 4 numarası yer alır."
                                          ]
                                      ],
                         "related":  [
                                         "anatarya",
                                         "gokkale-4",
                                         "kriz",
                                         "kaya-zma",
                                         "ut7-ilgaz"
                                     ],
                         "imageKey":  "patch-sarp-muhafiz",
                         "draft":  false
                     },
    "mizrak":  {
                   "title":  "41. Mızrak Taktik Filosu",
                   "category":  "Birlikler",
                   "desc":  "Elonya kuvvetlerine bağlı taktik hava filosu.",
                   "lead":  "Elonya hava kuvvetlerine bağlı çok rollü uçuş birliğidir. [[aigaion]] grubunun faaliyet gösterdiği sahada hava görevleri yürütür. Deniz devriye uçaklarıyla aynı teşkilat değildir.",
                   "facts":  [
                                 [
                                     "Bağlı ülke",
                                     "[[elonya]]"
                                 ],
                                 [
                                     "Birlik türü",
                                     "Taktik hava filosu"
                                 ],
                                 [
                                     "Çağrı adı",
                                     "Mızrak"
                                 ],
                                 [
                                     "Ana uçak",
                                     "[[m12-aster]]"
                                 ]
                             ],
                   "sections":  [
                                    [
                                        "Kuruluş ve görev",
                                        "Elonya hava kuvvetlerine bağlı çok rollü uçuş birliğidir. [[aigaion]] grubunun faaliyet gösterdiği sahada hava görevleri yürütür. Deniz devriye uçaklarıyla aynı teşkilat değildir. Birliğin komutası ulusal askerî makamlarındadır; [[kuzey-kusagi]] üyeliği birliği otomatik olarak pakt komutasına geçirmez."
                                    ],
                                    [
                                        "Uçak ve araçlar",
                                        "Ana uçak: [[m12-aster]].\n\nDestek için tahsis edilen araçlar ile birliğin ana envanteri ayrı değerlendirilir."
                                    ],
                                    [
                                        "GÖKKALE-4 Krizi",
                                        "Birlik, [[kriz]] sırasında [[elonya]] kuvvetlerinin bölgesel harekâtı içinde görev alır."
                                    ],
                                    [
                                        "Birlik arması",
                                        "Gümüş mızrak ve geriye süpürülmüş kanatlar, filonun adını ve uçuş görevini simgeler. 41 numarası kullanılır."
                                    ]
                                ],
                   "related":  [
                                   "elonya",
                                   "gokkale-4",
                                   "kriz",
                                   "m12-aster"
                               ],
                   "imageKey":  "patch-mizrak",
                   "draft":  false
               },
    "nereus-komando":  {
                           "title":  "8. Nereus Deniz Komando Grubu",
                           "category":  "Birlikler",
                           "desc":  "Elonya kuvvetlerine bağlı deniz özel görev birliği.",
                           "lead":  "Elonya’nın deniz ortamında görev yapan özel birliklerinden biridir. [[aigaion]] grubuna bağlı görevlerde personel koruma, denizden intikal ve arama-kurtarma desteği gibi faaliyetler yürütür.",
                           "facts":  [
                                         [
                                             "Bağlı ülke",
                                             "[[elonya]]"
                                         ],
                                         [
                                             "Birlik türü",
                                             "Deniz özel görev birliği"
                                         ],
                                         [
                                             "Çağrı adı",
                                             "Nereus"
                                         ],
                                         [
                                             "Hızlı bot",
                                             "[[triton-botu]]"
                                         ],
                                         [
                                             "Denizden taşıma",
                                             "[[nereus-cikarma]]"
                                         ]
                                     ],
                           "sections":  [
                                            [
                                                "Kuruluş ve görev",
                                                "Elonya’nın deniz ortamında görev yapan özel birliklerinden biridir. [[aigaion]] grubuna bağlı görevlerde personel koruma, denizden intikal ve arama-kurtarma desteği gibi faaliyetler yürütür. Birliğin komutası ulusal askerî makamlarındadır; [[kuzey-kusagi]] üyeliği birliği otomatik olarak pakt komutasına geçirmez."
                                            ],
                                            [
                                                "Uçak ve araçlar",
                                                "Hızlı bot: [[triton-botu]].\n\nDenizden taşıma: [[nereus-cikarma]].\n\nDestek için tahsis edilen araçlar ile birliğin ana envanteri ayrı değerlendirilir."
                                            ],
                                            [
                                                "GÖKKALE-4 Krizi",
                                                "Birlik, [[kriz]] sırasında [[elonya]] kuvvetlerinin bölgesel harekâtı içinde görev alır."
                                            ],
                                            [
                                                "Birlik arması",
                                                "Dalış maskesi ile üç dişli mızrak, deniz ortamını simgeler. 8 numarası birliği tanımlar; NEREUS gemisinden ayrı bir teşkilattır."
                                            ]
                                        ],
                           "related":  [
                                           "elonya",
                                           "gokkale-4",
                                           "kriz",
                                           "triton-botu",
                                           "nereus-cikarma"
                                       ],
                           "imageKey":  "patch-nereus-komando",
                           "draft":  false
                       },
    "k4-boran":  {
                     "title":  "K-4 Boran",
                     "category":  "Araçlar",
                     "desc":  "Hançer filosunun tarihsel çift motorlu önleme uçağı.",
                     "lead":  "K-4 Boran, [[anatarya]] hava kuvvetlerinin iki mürettebatlı, çift motorlu önleme ve taktik görev uçağıdır. 1978’de kurulan [[hancer]] filosunun ilk ana platformudur. 17 Kasım 1994’te kaybolan DAGGER 06, bu uçak ailesine aittir.",
                     "facts":  [
                                   [
                                       "Ülke",
                                       "[[anatarya]]"
                                   ],
                                   [
                                       "Görev",
                                       "Önleme ve taktik hava görevleri"
                                   ],
                                   [
                                       "Mürettebat",
                                       "Pilot ve silah sistem subayı"
                                   ],
                                   [
                                       "Motor düzeni",
                                       "Çift jet motoru"
                                   ],
                                   [
                                       "Kullanıcı",
                                       "[[hancer]]"
                                   ],
                                   [
                                       "Hizmet durumu",
                                       "Eğitim ve sınırlı görevler"
                                   ]
                               ],
                     "sections":  [
                                      [
                                          "Hizmete giriş",
                                          "Boran, Hançer filosunun kuruluş döneminde [[sarpburun]] çevresindeki hava savunmasının başlıca uçağıydı. İki kişilik kokpit düzeninde pilot uçuşu, silah sistem subayı ise görev sistemlerini yönetir."
                                      ],
                                      [
                                          "DAGGER 06",
                                          "17 Kasım 1994’te DAGGER 06 çağrı kodunu kullanan K-4, son telsiz mesajından 11 saniye sonra radardan kayboldu. Enkazına ulaşılamadı. Olay, [[hancer]] arşivindeki Dosya 94-117’de kayıtlıdır."
                                      ],
                                      [
                                          "K-16 dönemine geçiş",
                                          "2019’da başlayan [[k16-alaz]] modernizasyonuyla ön hat görevlerinin ağırlığı yeni platforma geçti. K-4’lerin bir bölümü mürettebat eğitimi ve sınırlı görevlerde tutuldu."
                                      ]
                                  ],
                     "related":  [
                                     "hancer",
                                     "k16-alaz",
                                     "sarpburun"
                                 ],
                     "imageKey":  "air-k4",
                     "draft":  false
                 },
    "kuzey-kipraya":  {
                          "title":  "Kuzey Kipraya Cumhuriyeti",
                          "category":  "Ülkeler",
                          "desc":  "Kipraya adasının kuzeyindeki, yalnızca Anatarya tarafından tanınan yönetim.",
                          "lead":  "Kuzey Kipraya Cumhuriyeti, [[kipraya-adasi]] kuzeyinde ayrı kurumlarıyla yönetilen devlettir. Bağımsızlığı yalnızca [[anatarya]] tarafından tanınır. [[kipraya]] hükûmeti ve [[avren-birligi]], kuzeyi Kipraya Cumhuriyeti’nin parçası olarak değerlendirir. Yönetim merkezi Kuzey Kipra’dır.",
                          "facts":  [
                                        [
                                            "Yönetim merkezi",
                                            "Kuzey Kipra"
                                        ],
                                        [
                                            "Yönetim",
                                            "Parlamenter cumhuriyet"
                                        ],
                                        [
                                            "Tanınma",
                                            "Yalnızca [[anatarya]]"
                                        ],
                                        [
                                            "Avren Birliği",
                                            "Ayrı üyeliği yok"
                                        ],
                                        [
                                            "KKSP",
                                            "Üye değil"
                                        ],
                                        [
                                            "Güvenlik ortağı",
                                            "[[anatarya]]"
                                        ]
                                    ],
                          "sections":  [
                                           [
                                               "Kuruluş ve yönetim",
                                               "Ateşkesin ardından kuzeyde ayrı idari kurumlar oluşturuldu; izleyen dönemde bağımsızlık ilan edildi. Meclis, belediyeler ve kamu kurumları kuzey kesimde faaliyet gösterir. Güney hükûmeti bağımsızlık ilanını tanımaz."
                                           ],
                                           [
                                               "Anatarya ile ilişkiler",
                                               "Anatarya, kuzeyin diplomatik tanınmasını, ulaşım bağlantılarını ve güvenliğini destekler. Bu ilişki kuzeye KKSP üyeliği sağlamaz; kuzey adına pakt içinde ayrı bir temsil bulunmaz."
                                           ],
                                           [
                                               "Toplum ve ekonomi",
                                               "Kuzey kıyısındaki limanlar, üniversiteler, turizm ve tarım ekonomik hayatın başlıca alanlarıdır. Tanınma sorunu doğrudan ticaret ve ulaşım seçeneklerini daraltır; Anatarya üzerinden kurulan bağlantılar önem taşır."
                                           ],
                                           [
                                               "Kipra ve geçişler",
                                               "Başkentteki iki idare [[kipraya-tampon-hatti]] ile ayrılır. Geçişler belirlenmiş kapılarda kimlik denetimiyle yapılır. Mülkiyet, yerinden edilmiş toplulukların hakları ve güvenlik düzenlemeleri görüşmelerdeki başlıca sorunlardır."
                                           ],
                                           [
                                               "Bayrak",
                                               "Açık gümüş zemin üzerindeki iki bordo kuşak kıyı ile iç bölgeyi, ortadaki bordo eşkenar dörtgen kuzey yönetiminin ortak kurumlarını simgeler."
                                           ]
                                       ],
                          "related":  [
                                          "kipraya",
                                          "kipraya-adasi",
                                          "kipraya-tampon-hatti",
                                          "anatarya"
                                      ],
                          "imageKey":  "flag-kuzey-kipraya",
                          "draft":  false
                      },
    "kipraya-adasi":  {
                          "title":  "Kipraya Adası",
                          "category":  "Coğrafya",
                          "desc":  "Güney Denizi’nde iki yönetim ve bir tampon hatla bölünmüş ada.",
                          "lead":  "Kipraya, [[anatarya]] kıyılarının güneyinde ve [[kalyon-denizi]] güneydoğu çıkışında yer alan adadır. Güney kesimini [[kipraya]], kuzey kesimini [[kuzey-kipraya]] yönetir. İki yönetim arasındaki [[kipraya-tampon-hatti]], başkent Kipra’dan da geçer.",
                          "facts":  [
                                        [
                                            "Konum",
                                            "Güney Denizi"
                                        ],
                                        [
                                            "Güney yönetimi",
                                            "[[kipraya]]"
                                        ],
                                        [
                                            "Kuzey yönetimi",
                                            "[[kuzey-kipraya]]"
                                        ],
                                        [
                                            "Bölünmüş şehir",
                                            "Kipra"
                                        ],
                                        [
                                            "Ayırıcı hat",
                                            "[[kipraya-tampon-hatti]]"
                                        ]
                                    ],
                          "sections":  [
                                           [
                                               "Fiziki coğrafya",
                                               "Uzun doğu burnu, kuzey kıyı sırtları ve güneydeki geniş ovalar adanın ana coğrafi unsurlarıdır. İç yükseltiler arasında kalan havzalar tarım ve yerleşim alanlarını oluşturur."
                                           ],
                                           [
                                               "Siyasi coğrafya",
                                               "Ateşkes hattı uluslararası tanınan iki devlet arasındaki olağan bir sınır değildir. Güney hükûmeti ada genelinde tanınırken kuzey yönetimi yalnızca Anatarya tarafından tanınır. Haritadaki renkler fiilî yönetim alanlarını gösterir."
                                           ],
                                           [
                                               "Bölgesel önemi",
                                               "Ada, Kalyon’dan güneye açılan deniz yollarını izleyen bir konumdadır. Anatarya ile Elonya arasındaki gerilim adanın güvenlik siyasetini, ticaretini ve birleşme görüşmelerini doğrudan etkiler."
                                           ]
                                       ],
                          "related":  [
                                          "kipraya",
                                          "kuzey-kipraya",
                                          "kipraya-tampon-hatti",
                                          "kalyon-denizi"
                                      ],
                          "imageKey":  "",
                          "draft":  false
                      },
    "kipraya-tampon-hatti":  {
                                 "title":  "Kipraya Tampon Hattı",
                                 "category":  "Coğrafya",
                                 "desc":  "Kuzey ve güney yönetimlerini ayıran gözetim bölgesi.",
                                 "lead":  "Kipraya Tampon Hattı, [[kipraya-adasi]] üzerindeki ateşkes düzenini korumak amacıyla oluşturulmuş gözetim bölgesidir. [[kipraya]] ile [[kuzey-kipraya]] arasında uzanır ve Kipra şehrini ikiye ayırır. Hat, tarafsız Ateşkes Gözlem Heyeti tarafından izlenir.",
                                 "facts":  [
                                               [
                                                   "Konum",
                                                   "[[kipraya-adasi]]"
                                               ],
                                               [
                                                   "Statü",
                                                   "Ateşkes ve gözetim bölgesi"
                                               ],
                                               [
                                                   "Gözetim",
                                                   "Ateşkes Gözlem Heyeti"
                                               ],
                                               [
                                                   "Geçiş",
                                                   "Belirlenmiş kontrol noktaları"
                                               ]
                                           ],
                                 "sections":  [
                                                  [
                                                      "Ateşkes düzeni",
                                                      "Hat boyunca tarafların askerî hareketleri sınırlandırılır. Gözlem heyeti ihlalleri kayda geçirir ve iki yönetim arasında doğrudan temasın kesildiği durumlarda iletişimi sağlar."
                                                  ],
                                                  [
                                                      "Günlük hayat",
                                                      "Kipra’da bazı sokaklar ve eski yerleşim alanları hattın içinde kalır. İnsanların geçişi belirlenmiş kapılardan sağlanırken mülk kullanımı, bakım çalışmaları ve tarımsal faaliyetler özel düzenlemelere tabidir."
                                                  ],
                                                  [
                                                      "Diplomatik statü",
                                                      "Tampon bölge, kuzey yönetiminin bağımsızlığının tanındığı anlamına gelmez. Nihai siyasi çözüm görüşmeleri sürerken ateşkesin korunmasını sağlar."
                                                  ]
                                              ],
                                 "related":  [
                                                 "kipraya-adasi",
                                                 "kipraya",
                                                 "kuzey-kipraya"
                                             ],
                                 "imageKey":  "",
                                 "draft":  false
                             },
    "kuzey-isaret":  {
                         "title":  "6. Kuzey İşaret Taburu",
                         "category":  "Birlikler",
                         "desc":  "Anatarya’nın Sarpburun haberleşme ve erken uyarı birliği.",
                         "lead":  "6. Kuzey İşaret Taburu, [[anatarya]] kara ve hava unsurlarının [[sarpburun]] yarımadasındaki radar verisini, telsiz trafiğini ve sivil uyarıları birleştiren haberleşme birliğidir. [[gokkale-4]] tesisini koruyan kuvvetlere ortak durum resmi sağlar.",
                         "facts":  [
                                       [
                                           "Bağlı ülke",
                                           "[[anatarya]]"
                                       ],
                                       [
                                           "Birlik türü",
                                           "Haberleşme ve erken uyarı"
                                       ],
                                       [
                                           "Görev yeri",
                                           "[[sarpburun]]"
                                       ],
                                       [
                                           "Eşgüdüm",
                                           "[[hancer]] · [[sarp-muhafiz]]"
                                       ]
                                   ],
                         "sections":  [
                                          [
                                              "Kuruluş",
                                              "Kıyıdaki eski gözetleme istasyonları ile iç kesimdeki hareketli haberleşme takımları tek tabur çatısında toplandı. Fırlatma alanının sivil haberleşme hatları askerî şebekeden ayrı tutulur."
                                          ],
                                          [
                                              "Krizdeki rolü",
                                              "[[kriz]] sırasında [[hancer]] filosuna hava resmi iletti, [[sarp-muhafiz]] ile tahliye güzergâhlarını eşgüdümledi. Sahte [[sarpburun-dosyasi]] içindeki saat ve frekans bilgileri taburun kayıtlarıyla karşılaştırıldığında tutarsızlıklar bulundu."
                                          ],
                                          [
                                              "Doktrin",
                                              "Tabur emir verme yetkisi yerine doğrulanmış veriyi birimlere dağıtır. Kıyı hatları kesildiğinde taşınabilir röleler ve [[gozcu-3]] veri akışı ayrı kanallardan değerlendirilir."
                                          ]
                                      ],
                         "related":  [
                                         "anatarya",
                                         "hancer",
                                         "sarp-muhafiz",
                                         "gokkale-4",
                                         "gozcu-3",
                                         "kriz",
                                         "sarpburun-radar-istasyonu",
                                         "dosya-94-117"
                                     ],
                         "imageKey":  "patch-kuzey-isaret",
                         "draft":  false
                     },
    "doruk-ikmal":  {
                        "title":  "18. Doruk İkmal Alayı",
                        "category":  "Birlikler",
                        "desc":  "Anatarya’nın yarımadaya giden kara ikmalinin koruyucusu.",
                        "lead":  "18. Doruk İkmal Alayı, [[anatarya]] iç platosundan [[sarpburun]] geçitlerine uzanan yakıt, tıbbi malzeme ve bakım sevkiyatını düzenler. [[gokkale-4]] tesisinin kesintisiz çalışması için kritik bir lojistik ağ yürütür.",
                        "facts":  [
                                      [
                                          "Bağlı ülke",
                                          "[[anatarya]]"
                                      ],
                                      [
                                          "Birlik türü",
                                          "Lojistik alayı"
                                      ],
                                      [
                                          "Görev alanı",
                                          "Arkent–Sarpburun hattı"
                                      ],
                                      [
                                          "Araç desteği",
                                          "[[kaya-zma]]"
                                      ]
                                  ],
                        "sections":  [
                                         [
                                             "Kuruluş",
                                             "Dağ geçitlerindeki mevsimsel kapanmalar, birbirinden kopuk depoların ortak bir sevk merkezinden yönetilmesini gerektirdi. Alay, askerî kargoyla sivil acil yardımın aynı yolda birbirini engellememesi için ayrı zaman pencereleri kullanır."
                                         ],
                                         [
                                             "Krizdeki rolü",
                                             "[[kriz]] başlayınca ana yol üzerindeki köprüler kontrol altına alındı. [[sarp-muhafiz]] birliğinin personel nakli desteklendi; [[kaya-zma]] araçları konvoy güvenliğine göre tahsis edildi. Fırlatma hazırlığındaki malzeme diğer ikmal kalemlerinden ayrı kayıt altında tutuldu."
                                         ],
                                         [
                                             "Sınırlar",
                                             "Alay muharip birlik değildir; konvoy koruması için görevlendirilen unsurlar kendi komuta zincirlerini korur."
                                         ]
                                     ],
                        "related":  [
                                        "anatarya",
                                        "sarpburun",
                                        "gokkale-4",
                                        "sarp-muhafiz",
                                        "kaya-zma"
                                    ],
                        "imageKey":  "patch-doruk-ikmal",
                        "draft":  false
                    },
    "pelagos-devriye":  {
                            "title":  "3. Pelagos Deniz Devriye Filosu",
                            "category":  "Birlikler",
                            "desc":  "Elonya’nın Kalyon Denizi deniz gözetleme filosu.",
                            "lead":  "3. Pelagos Deniz Devriye Filosu, [[elonya]] kıyıları ile [[kalyon-adalari]] arasındaki deniz trafiğini [[p8-pelagos]] uçaklarıyla izler. [[mizrak]] savaş filosundan ayrı komuta ve görev düzenine sahiptir.",
                            "facts":  [
                                          [
                                              "Bağlı ülke",
                                              "[[elonya]]"
                                          ],
                                          [
                                              "Birlik türü",
                                              "Deniz devriye filosu"
                                          ],
                                          [
                                              "Ana uçak",
                                              "[[p8-pelagos]]"
                                          ],
                                          [
                                              "Eşgüdüm",
                                              "[[aigaion]]"
                                          ]
                                      ],
                            "sections":  [
                                             [
                                                 "Kuruluş",
                                                 "Balıkçılık denetimi ve arama kurtarma için kullanılan kıyı uçuşlarının askerî gözetleme ihtiyacıyla birleşmesi üzerine kuruldu. Barış zamanında sivil kurtarma merkezlerine konum bilgisi sağlar."
                                             ],
                                             [
                                                 "Krizdeki rolü",
                                                 "[[kriz]] sırasında [[aigaion]] grubunun doğusundaki deniz trafiğini izledi. [[ucaksavar]] taburuna aktardığı hava ve deniz izleri, sivil uçuşların yanlış sınıflandırılmasını önlemeye yardımcı oldu. Devriye uçakları savaş ilanına gerekçe olan [[sarpburun-dosyasi]] belgesinin doğrulanmasında görev almadı."
                                             ],
                                             [
                                                 "Uçak ve usuller",
                                                 "[[p8-pelagos]] uzun süreli deniz gözlemi için kullanılır; filo, [[mizrak]] gibi önleme görevleri üstlenmez."
                                             ]
                                         ],
                            "related":  [
                                            "elonya",
                                            "p8-pelagos",
                                            "mizrak",
                                            "aigaion",
                                            "ucaksavar",
                                            "kriz"
                                        ],
                            "imageKey":  "patch-pelagos-devriye",
                            "draft":  false
                        },
    "demir-iz":  {
                     "title":  "27. Demir İz Mekanize Piyade Alayı",
                     "category":  "Birlikler",
                     "desc":  "Anatarya’nın Sarpburun kara yaklaşımını savunan mekanize alayı.",
                     "lead":  "27. Demir İz Mekanize Piyade Alayı, [[anatarya]] Kara Kuvvetlerinin [[sarpburun]] yarımadasına açılan kara geçitlerinde görev yapan manevra birliğidir. [[kaya-zma]] araçlarını kullanır; [[gokkale-4]] tesisinin iç güvenliğini yürüten [[sarp-muhafiz]] bölüğünden ayrı bir komuta altında bulunur.",
                     "facts":  [
                                   [
                                       "Bağlı ülke",
                                       "[[anatarya]]"
                                   ],
                                   [
                                       "Birlik türü",
                                       "Mekanize piyade alayı"
                                   ],
                                   [
                                       "Kuruluş",
                                       "1986"
                                   ],
                                   [
                                       "Konuşlanma",
                                       "Sarpburun kara geçitleri"
                                   ],
                                   [
                                       "Ana araç",
                                       "[[kaya-zma]]"
                                   ],
                                   [
                                       "İkmal",
                                       "[[doruk-ikmal]]"
                                   ]
                               ],
                     "sections":  [
                                      [
                                          "Tarih ve teşkilat",
                                          "1986 yılında yarımadanın iç bölgeyle bağlantısını korumak için kuruldu. Başlangıçtaki piyade taburları, yolların genişlemesi ve [[kaya-zma]] araçlarının hizmete alınmasıyla mekanize bir yapıya geçti. Alayın keşif, piyade ve bakım unsurları ayrı taburlar hâlinde çalışır."
                                      ],
                                      [
                                          "Savunma görevi",
                                          "Alay kıyıdaki fırlatma sahasının içine konuşlanmaz; ana görevi dağ geçitleri ile köprüler üzerinden gelen kara tehdidini karşılamak ve sivil çıkış yollarının açık kalmasını sağlamaktır. [[doruk-ikmal]] konvoylarına koruma sağlar, ancak lojistik alayın sevk emrini vermez. [[kuzey-isaret]] taburundan doğrulanmış durum bilgisi alır."
                                      ],
                                      [
                                          "GÖKKALE-4 Krizi",
                                          "[[kriz]] sırasında yarımadaya çıkan iki kara yolunda denetim kurdu. [[elonya]] hava hareketliliğinin olası hedefleri tartışılırken alay, sivil trafiği durdurmadan köprü yaklaşımındaki araçları kademeli olarak dağıttı. [[iris-indirme]] ile belgelenmiş bir çatışması yoktur."
                                      ],
                                      [
                                          "Birlik arması",
                                          "Dağ geçidini simgeleyen iki zirvenin altında mekanize aracın paleti yer alır. 27 sayısı alayı tanımlar."
                                      ]
                                  ],
                     "related":  [
                                     "anatarya",
                                     "sarpburun",
                                     "kaya-zma",
                                     "doruk-ikmal",
                                     "kuzey-isaret",
                                     "sarp-muhafiz",
                                     "kriz",
                                     "iris-indirme"
                                 ],
                     "imageKey":  "patch-demir-iz",
                     "draft":  false
                 },
    "iris-indirme":  {
                         "title":  "9. İris Hava İndirme Tugayı",
                         "category":  "Birlikler",
                         "desc":  "Elonya’nın ada hattı için oluşturduğu hava indirme tugayı.",
                         "lead":  "9. İris Hava İndirme Tugayı, [[elonya]] Kara Kuvvetlerinin hızlı sevk edilen hava indirme birliğidir. Görev alanı batı [[kalyon-adalari]] ile Elonya ana karasındaki hava meydanlarını kapsar. Tugay, [[aigaion]] grubundaki [[nereus-komando]] deniz birlikleriyle aynı teşkilatın parçası değildir.",
                         "facts":  [
                                       [
                                           "Bağlı ülke",
                                           "[[elonya]]"
                                       ],
                                       [
                                           "Birlik türü",
                                           "Hava indirme tugayı"
                                       ],
                                       [
                                           "Kuruluş",
                                           "1991"
                                       ],
                                       [
                                           "Görev alanı",
                                           "Batı [[kalyon-adalari]]"
                                       ],
                                       [
                                           "Hava desteği",
                                           "[[mizrak]]"
                                       ],
                                       [
                                           "Deniz eşgüdümü",
                                           "[[aigaion]]"
                                       ]
                                   ],
                         "sections":  [
                                          [
                                              "Kuruluş ve eğitim",
                                              "1991 yılında ada garnizonlarına kısa sürede takviye göndermek amacıyla kuruldu. Paraşütçü taburları, hafif keşif unsurları ve sağlık bölüğü tugayı oluşturur. Ağır zırhlı araçları bulunmadığı için uzun süreli bir kara harekâtında dış ikmale bağımlıdır."
                                          ],
                                          [
                                              "Ada harekâtı doktrini",
                                              "Hava indirme, güvenliği belirlenmiş bir meydana iniş veya paraşütle intikal biçiminde planlanır. Uçuş koridoru [[ucaksavar]] radar ağı ve [[mizrak]] filosuyla eşgüdümlenir. [[pelagos-devriye]] deniz trafiğine ilişkin bilgi sağlar; devriye filosu tugaya bağlı değildir."
                                          ],
                                          [
                                              "GÖKKALE-4 Krizi",
                                              "[[sarpburun-dosyasi]] yayımlandıktan sonra tugay batı ada hattında alarma geçti. Bir tabur ana kara hava meydanlarında yedek tutulurken öteki unsurlar adalardaki pistleri korudu. [[sarpburun]] üzerine gerçekleşmiş bir hava indirme operasyonu kaydedilmemiştir; hazırlık emri savaş planının icrası anlamına gelmez."
                                          ],
                                          [
                                              "Birlik arması",
                                              "Açık paraşüt kubbesi ve iki yana uzanan kanatlar, hava indirme görevini; 9 sayısı tugayı temsil eder."
                                          ]
                                      ],
                         "related":  [
                                         "elonya",
                                         "kalyon-adalari",
                                         "ucaksavar",
                                         "mizrak",
                                         "pelagos-devriye",
                                         "aigaion",
                                         "nereus-komando",
                                         "kriz",
                                         "demir-iz"
                                     ],
                         "imageKey":  "patch-iris-indirme",
                         "draft":  false
                     },
    "sarpburun-radar-istasyonu":  {
                                      "title":  "Sarpburun Radar İstasyonu",
                                      "category":  "Tesisler",
                                      "desc":  "Anatarya’nın Sarpburun ve Kalyon Denizi hava sahasını izleyen erken ihbar tesisi.",
                                      "lead":  "Sarpburun Radar İstasyonu, [[anatarya]] Silahlı Kuvvetleri tarafından [[sarpburun]] yarımadasının hâkim sırtlarında işletilen erken ihbar ve kıyı gözetleme tesisidir. [[gokkale-4]] fırlatma kompleksinin doğusundaki kayalıklarda kurulu olan istasyon, [[kuzey-isaret]] muhabere taburuna bağlıdır. Kalyon Denizi ve hava yaklaşma koridorlarının anlık radar izlerini [[hancer]] filosu ve hava savunma birliklerine aktarır.",
                                      "facts":  [
                                                    [
                                                        "Tesis türü",
                                                        "Erken ihbar ve kıyı radarı"
                                                    ],
                                                    [
                                                        "Bağlı ülke",
                                                        "[[anatarya]]"
                                                    ],
                                                    [
                                                        "İşleten birlik",
                                                        "[[kuzey-isaret]]"
                                                    ],
                                                    [
                                                        "Konum",
                                                        "[[sarpburun]] dağ sırtları"
                                                    ],
                                                    [
                                                        "Veri paylaşımı",
                                                        "[[hancer]] · [[kalkan-hss]] · [[gokkale-4]]"
                                                    ]
                                                ],
                                      "sections":  [
                                                       [
                                                           "İnşa ve donanım",
                                                           "Eski kıyı gözetleme karakollarının yerini almak üzere kurulan istasyon, faz dizili sayısal radarlar ve mikrodalga bağlantı kuleleriyle donatılmıştır. Tesis; zorlu kış şartlarına dayanıklı radomlar, bağımsız güç jeneratörleri ve yer altı haberleşme sığınaklarından oluşur. Tesisin çevre güvenliğini [[sarp-muhafiz]] birlikleri sağlar."
                                                       ],
                                                       [
                                                           "Operasyonel görevler",
                                                           "İstasyon, hava ve deniz hedeflerinin hareketlerini birleştirilmiş bir taktik resme dönüştürür. [[kriz]] sırasında bölgeye yaklaşan [[elonya]] hava ve deniz unsurlarının ilk tespitleri buradan yapılmıştır. İstasyonun radar kayıtları, sahte [[sarpburun-dosyasi]] belgesinde iddia edilen uçuş rotalarının çürütülmesinde temel kanıt olarak kullanılmıştır."
                                                       ],
                                                       [
                                                           "Kara Kasım Olayı bağlantısı",
                                                           "17 Kasım 1994\u0027te yaşanan [[kara-kasim]] sırasında DAGGER 06\u0027nın son irtifa kaybı ve sinyal kesintisi bu istasyonun eski analog radarları tarafından kaydedilmişti. 2036 yılında saptanan acil durum sinyali de yine buradaki modern alıcılar tarafından yakalanarak [[dosya-94-117]] soruşturmasına eklenmiştir."
                                                       ]
                                                   ],
                                      "related":  [
                                                      "gokkale-4",
                                                      "sarpburun",
                                                      "kuzey-isaret",
                                                      "hancer",
                                                      "kalkan-hss",
                                                      "kara-kasim",
                                                      "dosya-94-117",
                                                      "kriz"
                                                  ],
                                      "imageKey":  "",
                                      "draft":  false
                                  },
    "kara-kasim":  {
                       "title":  "Kara Kasım Olayı",
                       "category":  "Olaylar",
                       "desc":  "17 Kasım 1994\u0027te DAGGER 06 uçağının Sarpburun açıklarında esrarengiz kaybı.",
                       "lead":  "Kara Kasım Olayı, 17 Kasım 1994 tarihinde [[anatarya]] Hava Kuvvetleri bünyesindeki [[hancer]] filosuna ait DAGGER 06 çağrı kodlu [[k4-boran]] uçağının [[sarpburun]] açıklarında radardan kaybolmasıyla sonuçlanan askerî havacılık olayıdır. Son telsiz konuşmasından 11 saniye sonra sinyali kesilen uçaktan ve iki kişilik mürettebatından bir daha haber alınamamıştır. Olay, filoda derin bir anma geleneği başlatmış ve [[dosya-94-117]] soruşturmasının temelini oluşturmuştur.",
                       "facts":  [
                                     [
                                         "Tarih",
                                         "17 Kasım 1994"
                                     ],
                                     [
                                         "İlgili birlik",
                                         "[[hancer]]"
                                     ],
                                     [
                                         "Kayıp uçak",
                                         "DAGGER 06 ([[k4-boran]])"
                                     ],
                                     [
                                         "Konum",
                                         "[[sarpburun]] açıkları, [[kalyon-denizi]]"
                                     ],
                                     [
                                         "Mürettebat",
                                         "Pilot Yüzbaşı ve Silah Sistem Subayı"
                                     ],
                                     [
                                         "Soruşturma",
                                         "[[dosya-94-117]]"
                                     ],
                                     [
                                         "Gelenek",
                                         "Dönmeyenlerin nöbeti bitmez"
                                     ]
                                 ],
                       "sections":  [
                                        [
                                            "Uçuş ve kayboluş",
                                            "17 Kasım 1994 günü saat 16.42\u0027de rutin kıyı devriyesi için üssünden havalanan DAGGER 06, Sarpburun Yarımadası\u0027nın 18 deniz mili batısında alçak irtifada uçuş icra ediyordu. Saat 17.03\u0027te pilot kontrol kulesine seyrüsefer bildiriminde bulundu. Bu temastan tam 11 saniye sonra uçağın radar ekosu aniden kayboldu; herhangi bir acil durum çağrısı veya fırlatma koltuğu sinyali kaydedilmedi."
                                        ],
                                        [
                                            "Arama kurtarma ve enkaz sorunu",
                                            "Olayın ardından donanma ve sahil güvenlik unsurları haftalarca arama kurtarma faaliyeti yürüttü. Ancak denizde hiçbir yakıt lekesi, kanopi parçası ya da acil durum salına rastlanmadı. Uçağın gövdesine ve personeline ait hiçbir ize ulaşılamaması, olayın teknik arıza mı yoksa açıklanamayan bir anomali mi olduğu sorusunu yanıtsız bıraktı."
                                        ],
                                        [
                                            "Filodaki miras ve 2036 Sinyali",
                                            "Kaybın ardından eski karargâh binasına bronz bir anma plakası asıldı: \u0027132. TAKTİK FİLO KOMUTANLIĞI / DAGGER 06 / 17 KASIM 1994 / Dönmeyenlerin nöbeti bitmez.\u0027 2036 yılında, [[kriz]] tırmanırken aynı koordinatlardan DAGGER 06\u0027nın acil durum verici frekansıyla örtüşen kısa süreli bir mikrodalga sinyali kaydedildi. Bu gelişme, olayı [[dosya-94-117]] üzerinden yeniden gündeme taşıdı."
                                        ]
                                    ],
                       "related":  [
                                       "hancer",
                                       "k4-boran",
                                       "sarpburun",
                                       "sarpburun-radar-istasyonu",
                                       "dosya-94-117",
                                       "kriz"
                                   ],
                       "imageKey":  "patch-hancer",
                       "draft":  false
                   },
    "dosya-94-117":  {
                         "title":  "Dosya 94-117",
                         "category":  "Belgeler",
                         "desc":  "DAGGER 06\u0027nın kaybı ve 2036 sinyal kaydına ilişkin çok gizli soruşturma dosyası.",
                         "lead":  "Dosya 94-117, [[anatarya]] Hava Kuvvetleri Komutanlığı ve İstihbarat Başkanlığı tarafından 17 Kasım 1994\u0027te kaybolan DAGGER 06 uçağı ve 2036\u0027da aynı frekanstan alınan sıra dışı yayınlar hakkında yürütülen gizli soruşturma dosyasıdır. Dosya; uçağın son telemetri dökümlerini, radar şeritlerini, sinyal analizlerini ve [[elonya-istihbarati]] unsurlarının olası elektronik müdahalelerine dair değerlendirmeleri içerir.",
                         "facts":  [
                                       [
                                           "Belge kodu",
                                           "GÖK-HVK-94-117/TS"
                                       ],
                                       [
                                           "Gizlilik derecesi",
                                           "Çok Gizli (Kişiye Özel)"
                                       ],
                                       [
                                           "Hazırlayan",
                                           "Hava Kuvvetleri İstihbarat Başkanlığı"
                                       ],
                                       [
                                           "İlişkili olay",
                                           "[[kara-kasim]]"
                                       ],
                                       [
                                           "İlgili birimler",
                                           "[[hancer]] · [[kuzey-isaret]]"
                                       ],
                                       [
                                           "Tarih aralığı",
                                           "1994 / 2036"
                                       ]
                                   ],
                         "sections":  [
                                          [
                                              "Soruşturmanın açılışı (1994)",
                                              "Dosya, [[kara-kasim]] sonrasında arama kurtarma raporlarının sonuçsuz kalması üzerine açıldı. Dosyadaki ilk analizler, uçağın telsiz irtibatının kesildiği 11 saniyelik aralıkta bölgede yabancı bir radar karıştırması veya radar kör noktası olup olmadığını araştırdı. Ancak hiçbir sonuca ulaşılamadı."
                                          ],
                                          [
                                              "2036 Sinyali ve dosyanın yeniden açılması",
                                              "2036 yılı başlarında [[sarpburun-radar-istasyonu]] ve [[kuzey-isaret]] alıcıları, 243.0 MHz askerî acil durum kanalında saniyenin onda biri süren bir taşıyıcı dalga tespit etti. Sinyalin kriptografik modülasyonu, 1994 yılında DAGGER 06\u0027ya yüklenmiş analog tanımlama anahtarlarıyla tam uyum gösteriyordu."
                                          ],
                                          [
                                              "Değerlendirmeler ve krizdeki yeri",
                                              "İstihbarat raporlarında iki temel hipotez üzerinde durulmaktadır: İlki, [[elonya-istihbarati]] tarafından [[cam-perde]] projesinin bir parçası olarak eski analog telemetri verilerinin yanıltma amacıyla yayınlanması; ikincisi ise kaynağı bilinmeyen bir denizaltı veya gizli vericinin varlığıdır. Dosya günümüzde de açık kalmaya devam etmektedir."
                                          ]
                                      ],
                         "related":  [
                                         "kara-kasim",
                                         "hancer",
                                         "k4-boran",
                                         "elonya-istihbarati",
                                         "sarpburun-radar-istasyonu",
                                         "cam-perde",
                                         "kriz"
                                     ],
                         "imageKey":  "",
                         "draft":  false
                     },
    "ostenya":  {
                    "title":  "Ostenya Birleşik Devletleri",
                    "category":  "Ülkeler",
                    "desc":  "Okyanus ötesi küresel askerî ve ekonomik süper güç; ARGUS uydu ağının işleticisi.",
                    "lead":  "Ostenya Birleşik Devletleri (OBD), Avren kıtasının batısındaki devasa okyanus ötesi anakarada kurulu, dünyanın önde gelen askerî, teknolojik ve finansal süper gücüdür. Küresel serbest piyasa düzeninin ve ileri havacılık standartlarının öncüsü olan Ostenya, geniş nükleer süper uçak gemisi filoları ve ARGUS küresel uydu konumlandırma ağı ile dünya denizlerinde ve yörüngesinde mutlak hakimiyet kurmuştur. [[elonya]] ile yakın stratejik ittifaka sahip olan ülke, [[kriz]] sırasında Kalyon Denizi\u0027nde \u0027seyrüsefer serbestisi devriyesi\u0027 ilan ederek bölgeye nükleer denizaltı ve füze kruvazörleri sevk etmiştir.",
                    "facts":  [
                                  [
                                      "Devlet yapısı",
                                      "Federal başkanlık cumhuriyeti"
                                  ],
                                  [
                                      "Başkent",
                                      "Port Sterling"
                                  ],
                                  [
                                      "Küresel rol",
                                      "Askerî ve ekonomik süper güç"
                                  ],
                                  [
                                      "Bölgesel ortak",
                                      "[[elonya]] · [[kuzey-kusagi]]"
                                  ],
                                  [
                                      "Önemli sistemler",
                                      "ARGUS Küresel Konumlandırma Ağı · 7. Okyanus Filosu"
                                  ]
                              ],
                    "sections":  [
                                     [
                                         "Küresel doktrin ve donanma gücü",
                                         "Ostenya güvenlik stratejisi, dünya deniz ticaret yollarının ve stratejik boğazların açık tutulmasına dayanır. Ülkenin \u0027Demir Kubbe Havacılık\u0027 ve \u0027General Dynamics-Osten\u0027 gibi dev savunma kartelleri, dünya çapında standart kabul edilen beşinci nesil hayalet uçakları ve hassas vuruş mühimmatlarını ihraç eder."
                                     ],
                                     [
                                         "GÖKKALE-4 Krizindeki tutumu",
                                         "Anatarya\u0027nın [[sarpburun]] tesislerinde bağımsız bir uydu ağı kurma girişimi, Ostenya tarafından \u0027bölgesel hava sahası dengesini ve müttefiki Elonya\u0027nın güvenliğini tehdit eden kontrolsüz bir hamle\u0027 olarak nitelendirilmiştir. Ostenya Dışişleri Bakanlığı savaş ilanına doğrudan katılmasa da, Elonya donanmasına uydu istihbaratı ve elektronik harp desteği aktarmıştır."
                                     ]
                                 ],
                    "related":  [
                                    "elonya",
                                    "aigaion",
                                    "ursya",
                                    "huaxia",
                                    "gokkale-4",
                                    "kriz"
                                ],
                    "imageKey":  "",
                    "draft":  false
                },
    "ursya":  {
                  "title":  "Ursya Federasyonu",
                  "category":  "Ülkeler",
                  "desc":  "Kuzey kıtasının devasa yüzölçümlü, ağır sanayi ve nükleer süper gücü.",
                  "lead":  "Ursya Federasyonu, Avren\u0027in kuzeydoğusundaki sonsuz tundralar ve sıradağlar boyunca uzanan, dünyanın en büyük yüzölçümüne ve devasa enerji rezervlerine sahip kıtasal süper gücüdür. Ağır makine, roket itki sistemleri ve nükleer cephaneliğiyle bilinen federasyon; [[anatarya]] ile tarihsel olarak dengeli askerî ve teknik iş birlikleri yürütmüştür. Anatarya\u0027nın emektar [[k4-boran]] uçaklarının ve fırlatma roketlerinin ilk itki teknolojileri Ursya lisanslarına dayanır.",
                  "facts":  [
                                [
                                    "Devlet yapısı",
                                    "Federal yarı-başkanlık cumhuriyeti"
                                ],
                                [
                                    "Başkent",
                                    "Severograd"
                                ],
                                [
                                    "Küresel rol",
                                    "Kıtasal süper güç ve enerji devi"
                                ],
                                [
                                    "Askerî tedarik",
                                    "K-4 Boran motor lisansı · Ağır roket itkisi"
                                ],
                                [
                                    "Doktrin",
                                    "Stratejik derinlik ve çok kutuplu denge"
                                ]
                            ],
                  "sections":  [
                                   [
                                       "Sanayi ve havacılık altyapısı",
                                       "Ursya havacılık ekolü, zorlu kış şartlarında bile çalışan yüksek dayanımlı motorlar ve ağır hava savunma füzeleri üzerine inşa edilmiştir. \u0027Sever-Aviatsiya\u0027 ve \u0027Ural-Mash\u0027 devlet tröstleri, küresel çaptaki en güçlü roket motorlarını üretir."
                                   ],
                                   [
                                       "GÖKKALE-4 krizindeki jeopolitik rolü",
                                       "Ursya, Ostenya ve Elonya\u0027nın Kalyon Denizi\u0027ndeki ortak tatbikatlarını kendi güney sınırlarına yönelik bir kuşatma olarak değerlendirir. Bu nedenle Anatarya\u0027nın Sarpburun\u0027daki yerli uzay ve savunma hamlelerine örtülü elektronik yedekleme ve radar komponentleri sağlayarak Ostenya blokuna karşı denge unsuru oluşturmuştur."
                                   ]
                               ],
                  "related":  [
                                  "anatarya",
                                  "k4-boran",
                                  "hancer",
                                  "ostenya",
                                  "gokkale-4",
                                  "kriz"
                              ],
                  "imageKey":  "",
                  "draft":  false
              },
    "huaxia":  {
                   "title":  "Huaxia Halk Cumhuriyeti",
                   "category":  "Ülkeler",
                   "desc":  "Doğu kıtasının üretim, ileri mikroelektronik ve uzay sanayii devi.",
                   "lead":  "Huaxia Halk Cumhuriyeti, doğunun devasa nüfuslu, dünyanın fabrikası konumundaki üretim ve ileri teknoloji süper gücüdür. Dünyanın en gelişmiş mikroçip dökümhaneleri, nadir toprak elementleri işleme tesisleri ve kuantum haberleşme laboratuvarlarına ev sahipliği yapar. [[gokkale-4]] uydusunda kullanılan yüksek yoğunluklu fotovoltaik güneş panelleri ve hassas optik prizmaların önemli bir bölümü Huaxia üreticilerinden tedarik edilmiştir.",
                   "facts":  [
                                 [
                                     "Devlet yapısı",
                                     "Üniter tek partili halk cumhuriyeti"
                                 ],
                                 [
                                     "Başkent",
                                     "Tiandu"
                                 ],
                                 [
                                     "Küresel rol",
                                     "Küresel üretim ve mikroelektronik devi"
                                 ],
                                 [
                                     "Teknoloji payı",
                                     "GÖKKALE-4 güneş panelleri ve sensörleri"
                                 ],
                                 [
                                     "Dış politika",
                                     "Ticari tarafsızlık ve Kuşak İpek Yolu"
                                 ]
                             ],
                   "sections":  [
                                    [
                                        "Mikroçip ve uzay tekel gücü",
                                        "Huaxia, dünya mikroelektronik tedarik zincirinin merkezinde oturur. Hem Anatarya hem de Elonya sanayisi, radar çiplerinden uydu yönlendiricilerine kadar Huaxia\u0027nın yarı iletken ürünlerine yapısal olarak bağımlıdır."
                                    ],
                                    [
                                        "Krizde pragmatik denge",
                                        "Kalyon Denizi\u0027ndeki çatışma riski karşısında Huaxia, taraflara \u0027itidal ve ticari deniz yollarının açık kalması\u0027 çağrısında bulunmuş, resmî tarafsızlığını korurken her iki ülkeye de çift kullanımlı (dual-use) sivil-askerî telekomünikasyon yedek parçaları satmayı sürdürmüştür."
                                    ]
                                ],
                   "related":  [
                                   "anatarya",
                                   "elonya",
                                   "gokkale-4",
                                   "ostenya",
                                   "ursya",
                                   "kriz"
                               ],
                   "imageKey":  "",
                   "draft":  false
               },
    "anasas":  {
                   "title":  "ANASAŞ",
                   "category":  "Kurumlar",
                   "desc":  "Anatarya Askerî Savunma ve Havacılık Sanayii Anonim Şirketi; milli havacılık devi.",
                   "lead":  "ANASAŞ (Anatarya Askerî Savunma ve Havacılık Sanayii A.Ş.), [[anatarya]] devletinin gökyüzündeki bağımsızlık stratejisinin omurgasını oluşturan en büyük havacılık ve uzay şirketidir. 1970\u0027li yıllardaki yabancı ambargoların ardından kurulan kurum; [[k21-kaan]] 5. nesil milli muharip uçağının ana tasarımcısı ve üreticisidir. Ayrıca [[simsek-iii]] fırlatma roketinin gövde entegrasyonu ve [[gokkale-4]] uydu platformunun ana yükleniciliğini yürütmektedir.",
                   "facts":  [
                                 [
                                     "Kuruluş yılı",
                                     "1975"
                                 ],
                                 [
                                     "Genel Merkez",
                                     "Arkent Havacılık Vadisi"
                                 ],
                                 [
                                     "Bağlı ülke",
                                     "[[anatarya]]"
                                 ],
                                 [
                                     "Ana projeler",
                                     "[[k21-kaan]] · [[simsek-iii]] · [[gokkale-4]]"
                                 ],
                                 [
                                     "Stratejik ortaklar",
                                     "[[sarpsan]] · [[korsan]] · [[baykut]]"
                                 ]
                             ],
                   "sections":  [
                                    [
                                        "Tarihçe ve yerlileşme",
                                        "Yabancı ülkelerin yedek parça ambargolarıyla başlayan krizler, Anatarya\u0027yı kendi uçak gövdesini ve yapısal parçalarını üretmeye mecbur bıraktı. ANASAŞ, lisanslı montaj faaliyetlerinden zamanla özgün tasarım ve kompozit gövde üretimine geçti."
                                    ],
                                    [
                                        "Milli Muharip Uçak ve Uzay hamlesi",
                                        "2020\u0027li yıllarda başlatılan K-21 programı ile kurum, dünyada beşinci nesil hayalet uçak üretebilen seçkin havacılık devleri arasına girdi. Sarpburun\u0027daki fırlatma rampalarının yapısal tasarımı da kurumun Uzay Sistemleri Direktörlüğü tarafından tamamlandı."
                                    ]
                                ],
                   "related":  [
                                   "anatarya",
                                   "k21-kaan",
                                   "gokkale-4",
                                   "simsek-iii",
                                   "sarpsan",
                                   "korsan"
                               ],
                   "imageKey":  "",
                   "draft":  false
               },
    "baykut":  {
                   "title":  "BAYKUT Savunma",
                   "category":  "Kurumlar",
                   "desc":  "Anatarya’nın otonom İHA, SİHA ve yapay zekâlı hava sistemleri öncüsü.",
                   "lead":  "BAYKUT Savunma ve İleri Teknoloji A.Ş., [[anatarya]] merkezli, dünyaca ünlü silahlı insansız hava araçları (SİHA) ve otonom harp doktrinleri geliştiren özel savunma sanayii devidir. Tamamen öz sermayeyle kurulan şirket, geliştirdiği [[bayrak-t2]] taktik SİHA, çift motorlu [[akin-3]] taarruzi İHA ve insansız hayalet jet savaş uçağı [[al-elma]] ile küresel insansız hava aracı pazarında devrim yaratmıştır.",
                   "facts":  [
                                 [
                                     "Kuruluş yılı",
                                     "1988"
                                 ],
                                 [
                                     "Genel Merkez",
                                     "Arkent Otonom Sistemler Kampüsü"
                                 ],
                                 [
                                     "Bağlı ülke",
                                     "[[anatarya]]"
                                 ],
                                 [
                                     "İmza platformlar",
                                     "[[bayrak-t2]] · [[akin-3]] · [[al-elma]]"
                                 ],
                                 [
                                     "Uzmanlık",
                                     "Otonom uçuş · Yapay zekâ · Sürü harekâtı"
                                 ]
                             ],
                   "sections":  [
                                    [
                                        "Sıra dışı büyüme ve doktrin devrimi",
                                        "BAYKUT, büyük devlet bürokrasilerinden bağımsız, çevik mühendislik anlayışıyla küçük keşif dronelarından başlayarak stratejik taarruz jetlerine uzanan bir ürün yelpazesi geliştirdi. Uçuş algoritmaları ve görev bilgisayarlarını kendi bünyesinde yazarak yabancı yazılım bağımlılığını sıfırladı."
                                    ],
                                    [
                                        "GÖKKALE-4 Krizinde sahadaki güç",
                                        "Kalyon Denizi ablukası sırasında Elonya donanmasının anlık hareketleri, günlerce havada kalan BAYRAK-T2 filoları tarafından tespit edilerek [[kuzey-isaret]] ve hava savunma birliklerine anlık hedef olarak aktarılmıştır."
                                    ]
                                ],
                   "related":  [
                                   "anatarya",
                                   "bayrak-t2",
                                   "akin-3",
                                   "al-elma",
                                   "k21-kaan",
                                   "kriz"
                               ],
                   "imageKey":  "",
                   "draft":  false
               },
    "sarpsan":  {
                    "title":  "SARPSAN",
                    "category":  "Kurumlar",
                    "desc":  "Askerî radar, elektronik harp ve elektro-optik hedefleme sistemleri mimarı.",
                    "lead":  "SARPSAN (Sarpburun Savunma Elektroniği Sanayii), [[anatarya]] Silahlı Kuvvetlerinin haberleşme, radar, elektronik harp ve sensör beyni olan yüksek teknoloji kuruluşudur. [[sarpburun-radar-istasyonu]] bünyesindeki dijital faz dizili erken ihbar radarlarını, [[k21-kaan]] uçağının AESA burun radarını ve İHA\u0027ların lazer hedefleme podlarını milli olarak geliştiren merkezdir.",
                    "facts":  [
                                  [
                                      "Kuruluş yılı",
                                      "1976"
                                  ],
                                  [
                                      "Genel Merkez",
                                      "Arkent Elektronik ve Radar Tesisleri"
                                  ],
                                  [
                                      "Bağlı ülke",
                                      "[[anatarya]]"
                                  ],
                                  [
                                      "Ana alanlar",
                                      "AESA Radar · Elektronik Harp · Elektro-optik · Kripto"
                                  ],
                                  [
                                      "Donattığı sistemler",
                                      "[[sarpburun-radar-istasyonu]] · [[kalkan-hss]] · [[k21-kaan]]"
                                  ]
                              ],
                    "sections":  [
                                     [
                                         "Radar ve Karıştırma Teknolojileri",
                                         "Kurum, Elonya donanmasının AIGAION firkateynindeki radar karıştırma girişimlerini savuşturabilen yerli frekans atlamalı yazılımlar üretmiştir."
                                     ],
                                     [
                                         "Dosya 94-117 ve Sinyal Analizi",
                                         "2036 yılında DAGGER 06\u0027nın 243.0 MHz frekansından alınan gizemli sinyalin spektral ayrıştırması, SARPSAN laboratuvarlarındaki sayısal sinyal işlemcileri tarafından gerçekleştirilmiştir."
                                     ]
                                 ],
                    "related":  [
                                    "anatarya",
                                    "sarpburun-radar-istasyonu",
                                    "kalkan-hss",
                                    "k21-kaan",
                                    "dosya-94-117"
                                ],
                    "imageKey":  "",
                    "draft":  false
                },
    "korsan":  {
                   "title":  "KOR-SAN",
                   "category":  "Kurumlar",
                   "desc":  "Roket motorları, hassas güdümlü füzeler ve hava savunma mühimmatları üreticisi.",
                   "lead":  "KOR-SAN (Kor Mühimmat ve Roket Sistemleri Sanayii), [[anatarya]] ordusunun roket itki ve füze mühimmatı tedarikçisidir. [[kalkan-hss]] bataryalarının füzelerini, [[simsek-iii]] fırlatıcılarının katı yakıtlı kademe motorlarını ve [[bayrak-t2]] ile [[akin-3]] İHA\u0027larının lazer güdümlü mühimmatlarını tasarlayıp seri üretime almıştır.",
                   "facts":  [
                                 [
                                     "Kuruluş yılı",
                                     "1984"
                                 ],
                                 [
                                     "Genel Merkez",
                                     "Arkent Mühimmat ve Roket Kompleksi"
                                 ],
                                 [
                                     "Bağlı ülke",
                                     "[[anatarya]]"
                                 ],
                                 [
                                     "Ürün aileleri",
                                     "Kalkan HSS füzeleri · MAM akıllı mühimmatlar · Roket kademeleri"
                                 ],
                                 [
                                     "Krizdeki rolü",
                                     "Kıyı füze bataryalarının anlık mühimmat ikmali"
                                 ]
                             ],
                   "sections":  [
                                    [
                                        "Katı yakıtlı itki atılımı",
                                        "Roket motorlarında dışa bağımlılığı kıran KOR-SAN, geliştirdiği kompozit katı yakıt formülleriyle Sarpburun\u0027daki uzay fırlatma programına doğrudan itki gücü sağlamıştır."
                                    ]
                                ],
                   "related":  [
                                   "anatarya",
                                   "kalkan-hss",
                                   "simsek-iii",
                                   "gokkale-4",
                                   "bayrak-t2"
                               ],
                   "imageKey":  "",
                   "draft":  false
               },
    "k21-kaan":  {
                     "title":  "K-21 KAAN",
                     "category":  "Araçlar",
                     "desc":  "Anatarya’nın çift motorlu, düşük radar kesitli 5. nesil milli muharip hayalet avcı uçağı.",
                     "lead":  "K-21 KAAN, [[anatarya]] Hava Kuvvetleri için [[anasas]] ana yükleniciliğinde milli olarak geliştirilen, çift motorlu, süper-seyir yeteneğine sahip, düşük radar kesitli (stealth) 5. nesil hava üstünlüğü ve derin taarruz savaş uçağıdır. Dahili silah istasyonları, [[sarpsan]] üretimi gelişmiş AESA radarı ve kaska monteli entegre hedefleme sistemiyle donatılan KAAN; emektar [[k4-boran]] uçaklarının yerini almaktadır. 2036 [[kriz]] sürecinde ilk operasyonel prototipleri Arkent Meydanı\u0027nda teyakkuza geçirilmiş, Sarpburun ve Kalyon Denizi hava sahasında caydırıcı devriye uçuşları icra etmiştir.",
                     "facts":  [
                                   [
                                       "Uçak türü",
                                       "5. nesil çok rollü hayalet savaş uçağı"
                                   ],
                                   [
                                       "Üretici",
                                       "[[anasas]] (motor ve aviyonik: [[sarpsan]] · [[korsan]])"
                                   ],
                                   [
                                       "Kullanıcı",
                                       "[[anatarya]] Hava Kuvvetleri ([[hancer]])"
                                   ],
                                   [
                                       "Azami hız",
                                       "Mach 1.8+ (Süper-seyir kabiliyetli)"
                                   ],
                                   [
                                       "Menzil",
                                       "1.100 deniz mili"
                                   ],
                                   [
                                       "Sensör paketi",
                                       "SARPSAN Burun AESA Radarı · Elektro-optik Hedefleme (EOTS)"
                                   ],
                                   [
                                       "Silah yuvaları",
                                       "Dahili gövde altı ve yan istasyonlar (Stealth konfigürasyon)"
                                   ]
                               ],
                     "sections":  [
                                      [
                                          "Geliştirme ve stealth doktrini",
                                          "KAAN projesi, bölgedeki radar ağları ve Ostenya destekli Elonya hava savunması karşısında tespit edilemeden derin harekât icra edebilmek için tasarlandı. Radar soğurucu kompozit gövde yapısı, motor hava girişlerindeki özel açılar ve dahili silah yuvaları uçağın radar kesit alanını asgariye indirir."
                                      ],
                                      [
                                          "2036 Krizinde ilk muharebe konuşlanması",
                                          "Elonya\u0027nın Kalyon Denizi\u0027ne AIGAION firkateynini sevk etmesi üzerine, iki adet K-21 prototipi [[hancer]] filosu bünyesinde Arkent üssünden kalkarak Sarpburun üzerinde gövde gösterisi yapmıştır. Elonya erken ihbar radarlarının uçağı kilit altına alamaması krizin askeri dengesini doğrudan Anatarya lehine çevirmiştir."
                                      ]
                                  ],
                     "related":  [
                                     "anatarya",
                                     "hancer",
                                     "anasas",
                                     "sarpsan",
                                     "k4-boran",
                                     "kriz"
                                 ],
                     "imageKey":  "air-k16",
                     "draft":  false
                 },
    "bayrak-t2":  {
                      "title":  "BAYRAK-T2",
                      "category":  "Araçlar",
                      "desc":  "Anatarya’nın 27 saat havada kalabilen lazer güdümlü taktik SİHA sistemi.",
                      "lead":  "BAYRAK-T2, [[baykut]] Savunma tarafından üretilen, orta irtifa uzun havada kalış (MALE) sınıfı silahlı insansız hava aracıdır (SİHA). Ters V kuyruk yapısı, dahili aviyonik yedekliliği ve üçlü yedekli otonom uçuş kontrol sistemiyle donatılmıştır. [[korsan]] üretimi dört adet akıllı mikro mühimmat taşıyabilen T2; 2036 [[kriz]] günlerinde Kalyon Denizi ve İstara Boğazı üzerinde gece-gündüz kesintisiz keşif ve lazer işaretleme nöbeti icra etmiştir.",
                      "facts":  [
                                    [
                                        "Araç türü",
                                        "Taktik Silahlı İnsansız Hava Aracı (SİHA)"
                                    ],
                                    [
                                        "Üretici",
                                        "[[baykut]] Savunma"
                                    ],
                                    [
                                        "Kullanıcı",
                                        "[[anatarya]] Kara, Deniz ve Hava Kuvvetleri"
                                    ],
                                    [
                                        "Havada kalış süresi",
                                        "27 saat"
                                    ],
                                    [
                                        "Operasyonel irtifa",
                                        "18.000 – 25.000 ft"
                                    ],
                                    [
                                        "Mühimmat",
                                        "4 x KOR-SAN Lazer Güdümlü Akıllı Mikro Mühimmat"
                                    ]
                                ],
                      "sections":  [
                                       [
                                           "Menzil ve keşif üstünlüğü",
                                           "Düşük akustik ve termal ize sahip olan platform, pilot riski olmaksızın düşman hava sahasının sınırında günlerce görev yapabilmektedir. SARPSAN elektro-optik kamerası ile deniz hedeflerinin kimliğini 40 kilometre mesafeden tespit eder."
                                       ],
                                       [
                                           "Kalyon Denizi ablukasındaki rolü",
                                           "AIGAION muharebe grubunun rotası, Sarpburun açıklarında devriye gezen BAYRAK-T2\u0027ler tarafından koordinat koordinat kaydedilmiş; Elonya\u0027nın kıyı sızma denemeleri anında boşa çıkarılmıştır."
                                       ]
                                   ],
                      "related":  [
                                      "anatarya",
                                      "baykut",
                                      "korsan",
                                      "akin-3",
                                      "al-elma",
                                      "kriz"
                                  ],
                      "imageKey":  "",
                      "draft":  false
                  },
    "akin-3":  {
                   "title":  "AKIN-3",
                   "category":  "Araçlar",
                   "desc":  "Çift turboprop motorlu, seyir füzesi atabilen stratejik ağır taarruzi İHA.",
                   "lead":  "AKIN-3, [[baykut]] Savunma tarafından geliştirilen, yüksek irtifa uzun havada kalış (HALE) sınıfı çift turboprop motorlu ağır taarruzi insansız hava aracıdır (TİHA). Geleneksel insansız uçakların ötesinde bir savaş uçağı yük kapasitesine (1.500 kg faydalı yük) sahip olan AKIN-3; AESA burun radarı, uydu haberleşme podu ve hava-hava füzeleri ile donatılabilen stratejik bir hava platformudur.",
                   "facts":  [
                                 [
                                     "Araç türü",
                                     "Ağır Taarruzi İnsansız Hava Aracı (TİHA)"
                                 ],
                                 [
                                     "Üretici",
                                     "[[baykut]] Savunma"
                                 ],
                                 [
                                     "Motor",
                                     "2 x Turboprop motor"
                                 ],
                                 [
                                     "Faydalı yük",
                                     "1.500 kg"
                                 ],
                                 [
                                     "Servis tavanı",
                                     "40.000 ft"
                                 ],
                                 [
                                     "Haberleşme",
                                     "GÖKKALE Uydu Ağı üzerinden BLOS (Görüş Hattı Ötesi)"
                                 ]
                             ],
                   "sections":  [
                                    [
                                        "Stratejik taarruz kabiliyeti",
                                        "AKIN-3, KOR-SAN üretimi uzun menzilli seyir füzelerini kanat altında taşıyarak düşman hava savunma menziline girmeden kritik tesisleri imha edebilmektedir."
                                    ],
                                    [
                                        "GÖKKALE-4 ile doğrudan bağlantı",
                                        "Platform, uydu haberleşme anteni sayesinde [[gokkale-4]] uzay kompleksiyle doğrudan kriptolu telemetri hattı kurar ve yörüngedeki uydularla eş zamanlı veri alışverişi yapar."
                                    ]
                                ],
                   "related":  [
                                   "anatarya",
                                   "baykut",
                                   "bayrak-t2",
                                   "al-elma",
                                   "gokkale-4",
                                   "kriz"
                               ],
                   "imageKey":  "",
                   "draft":  false
               },
    "al-elma":  {
                    "title":  "AL-ELMA K-01",
                    "category":  "Araçlar",
                    "desc":  "Yapay zekâlı, süpersonik, düşük radar kesitli insansız hayalet jet savaş uçağı.",
                    "lead":  "AL-ELMA K-01, [[baykut]] Savunma tarafından geliştirilen tek motorlu, süpersonik hızlara ulaşabilen, radar soğurucu gövdeye ve agresif manevra yeteneğine sahip yeni nesil insansız savaş uçağıdır (MİUS). İnsanlı savaş uçaklarıyla (özellikle [[k21-kaan]]) otonom kol uçuşu yapabilen (\u0027loyal wingman\u0027 konsepti) platform; hava-hava it dalaşı, hava savunma bastırma (SEAD) ve amfibi pistlerden kalkış yeteneklerine sahiptir.",
                    "facts":  [
                                  [
                                      "Araç türü",
                                      "İnsansız Hayalet Savaş Jeti (MİUS)"
                                  ],
                                  [
                                      "Üretici",
                                      "[[baykut]] Savunma"
                                  ],
                                  [
                                      "İtki",
                                      "Artyakıcılı turbofan jet motoru"
                                  ],
                                  [
                                      "Hız",
                                      "Süpersonik (Mach 1.2)"
                                  ],
                                  [
                                      "Özel yetenek",
                                      "K-21 KAAN ile sürü ve ortak otonom harekât"
                                  ],
                                  [
                                      "Pist esnekliği",
                                      "Kısa pistli çıkarma gemilerinden iniş-kalkış"
                                  ]
                              ],
                    "sections":  [
                                     [
                                         "Havacılıkta yeni çağ: İnsansız it dalaşı",
                                         "AL-ELMA, insan fizyolojisinin dayanamayacağı yüksek G manevralarını yapay zekâ algoritmalarıyla saniyeler içinde kararlaştırarak düşman pilotlarının reaksiyon sürelerini etkisiz kılar."
                                     ],
                                     [
                                         "2036 Krizinde ilk gizli deneme",
                                         "Sarpburun açıklarında tansiyonun yükseldiği günlerde, Arkent\u0027ten kalkan bir K-21 KAAN ile bir AL-ELMA prototipinin kol uçuşu hâlinde radar testi yaptığı sivil telsiz kayıtlarına yansımıştır."
                                     ]
                                 ],
                    "related":  [
                                    "anatarya",
                                    "baykut",
                                    "k21-kaan",
                                    "anasas",
                                    "sarpsan",
                                    "kriz"
                                ],
                    "imageKey":  "",
                    "draft":  false
                },
    "pelagos-karakolu":  {
                             "sections":  [
                                              [
                                                  "Konum",
                                                  "Pelagos Karakolu, tartışmalı Kalyon adacıklarının en batısındaki kayalık bir adacık üzerine kurulmuştur. Doğal bir mendirekle korunan küçük iskelesi, fırtınalı havalarda devriye botlarına sığınak sağlar."
                                              ],
                                              [
                                                  "Görevler",
                                                  "Karakol; balıkçı teknelerinin hareketlerini kontrol etmek, Anatarya hücumbotlarının adalar bölgesine girişini telsizle Lerya KarargÃ¢hına bildirmek ve kaçakçılıkla mücadele etmekle görevlidir."
                                              ],
                                              [
                                                  "Gerilim hattı",
                                                  "Karakol personeli, Sarpburun\u0027daki Türk/Anatarya unsurlarıyla optik menzilde karşı karşıyadır. Ã‡oğu zaman iki tarafın devriye botları arasında birkaç yüz metre mesafede uyarı anonsları yapılmaktadır."
                                              ]
                                          ],
                             "title":  "Pelagos İleri Sahil Güvenlik Karakolu",
                             "tags":  [
                                          "karakol",
                                          "sahil-guvenlik",
                                          "elonya",
                                          "kalyon-denizi",
                                          "tesisler"
                                      ],
                             "category":  "tesisler",
                             "imageKey":  "triton-botu",
                             "related":  [
                                             "kalyon-adalari",
                                             "kalyon-denizi",
                                             "elonya",
                                             "triton-botu"
                                         ],
                             "lead":  "Elonya Sahil Güvenliği\u0027nin Kalyon Adaları batı yaklaşımındaki gözetleme kulesi, hızlı müdahale botları barınağı ve radar istasyonu.",
                             "infobox":  [
                                             [
                                                 "Tür",
                                                 "İleri Deniz Gözetleme ve Devriye Karakolu"
                                             ],
                                             [
                                                 "İşletmeci",
                                                 "Elonya Kıyı Güvenlik İdaresi"
                                             ],
                                             [
                                                 "Bot Sayısı",
                                                 "4 x Hızlı Ã–nleme Botu"
                                             ],
                                             [
                                                 "Gözetleme",
                                                 "Optik Kule ve Termal Kameralar"
                                             ],
                                             [
                                                 "Konum",
                                                 "Kalyon Batı Adacıkları"
                                             ],
                                             [
                                                 "Statü",
                                                 "Faal"
                                             ]
                                         ]
                         },
    "kara-kasim-feneri":  {
                              "sections":  [
                                               [
                                                   "Tarihçe",
                                                   "Kasım 2026\u0027da Kalyon Denizi\u0027ndeki ada uyuşmazlığı sırasında meydana gelen \u0027Kara Kasım\u0027 deniz muharebesinde iki taraftan da can kayıpları yaşanmıştır. Ã‡atışmadan iki yıl sonra, tarafsız denizcilik örgütlerinin girişimiyle sığlığın üzerine hem bir şehitlik anıtı hem de navigasyon feneri dikilmiştir."
                                               ],
                                               [
                                                   "Mimari ve simgeler",
                                                   "Fenerin kaidesinde, o gece hayatını kaybeden denizcilerin isimlerinin yazılı olduğu bronz bir plaket yer alır. Fenerin tepesindeki ışık, gece boyunca Kalyon Denizi\u0027nin tehlikeli resiflerini aydınlatırken aynı zamanda çatışmanın acı hatırasını canlı tutar."
                                               ],
                                               [
                                                   "Günümüzdeki önemi",
                                                   "Her yıl 15 Kasım\u0027da fenerin çevresine hem Elonya hem de Anatarya sivil balıkçıları tarafından çelenk bırakılmaktadır. Fener, askeri gerilimin ortasında barış ve anma simgesi olarak varlığını sürdürmektedir."
                                               ]
                                           ],
                              "title":  "Kara Kasım Deniz Feneri ve Şehitlik Anıtı",
                              "tags":  [
                                           "fener",
                                           "anit",
                                           "kalyon-denizi",
                                           "olaylar",
                                           "tesisler"
                                       ],
                              "category":  "tesisler",
                              "imageKey":  "doruk-ikmal",
                              "related":  [
                                              "kalyon-denizi",
                                              "kalyon-adalari",
                                              "anatarya",
                                              "elonya"
                                          ],
                              "lead":  "Kasım 2026\u0027da Kalyon Denizi\u0027nde yaşanan çatışmada batan gemiler anısına inşa edilen, denizcilere seyir yardımı sağlayan anıt deniz feneri.",
                              "infobox":  [
                                              [
                                                  "Tür",
                                                  "Tarihi Anıt Deniz Feneri"
                                              ],
                                              [
                                                  "Işık Karakteri",
                                                  "Fl(3) W 15s (Beyaz, 15 mil menzilli)"
                                              ],
                                              [
                                                  "Yükseklik",
                                                  "34 metre (Granit ve Bronz Kaide)"
                                              ],
                                              [
                                                  "Açılış Tarihi",
                                                  "12 Kasım 2028"
                                              ],
                                              [
                                                  "Konum",
                                                  "Kalyon Denizi Açıkları (Orta Sığlık)"
                                              ],
                                              [
                                                  "Statü",
                                                  "Faal (Uluslararası Koruma Altında)"
                                              ]
                                          ]
                          },
    "kor-kalkan-bataryasi":  {
                                 "sections":  [
                                                  [
                                                      "Mevzi ve kabiliyetler",
                                                      "KOR-KALKAN mevzisi, güçlendirilmiş beton silolar, dikey fırlatma rampaları ve SARPSAN üretimi hedef aydınlatma radarlarından meydana gelir. Batarya, aynı anda 16 farklı hava hedefine kilitlenebilir ve seyir füzelerini imha edebilir."
                                                  ],
                                                  [
                                                      "GÃ–KKALE-4 savunması",
                                                      "Tesisin birincil görevi, GÃ–KKALE-4 fırlatma rampalarını ve uydu kontrol merkezini düşman hava taarruzlarından korumaktır. Kriz boyunca batarya personeli 24 saat tam angajman modunda beklemiştir."
                                                  ],
                                                  [
                                                      "Caydırıcılık faktörü",
                                                      "KOR-KALKAN bataryasının Kalyon Denizi\u0027ne uzanan angajman kubbesi, Elonya Hava Kuvvetleri\u0027nin Sarpburun\u0027a 100 kilometreden fazla yaklaşmasını engelleyen başlıca taktik engeldir."
                                                  ]
                                              ],
                                 "title":  "Kalyon Hava Savunma Bataryası (KOR-KALKAN)",
                                 "tags":  [
                                              "hava-savunma",
                                              "sarpburun",
                                              "kalkan-hss",
                                              "korsan",
                                              "fuze",
                                              "tesisler"
                                          ],
                                 "category":  "tesisler",
                                 "imageKey":  "kalkan-hss",
                                 "related":  [
                                                 "kalkan-hss",
                                                 "korsan",
                                                 "sarpsan",
                                                 "gokkale-4",
                                                 "sarpburun"
                                             ],
                                 "lead":  "GÃ–KKALE-4 ve Sarpburun hava sahasını korumak üzere konuşlandırılmış Kalkan HSS ve KOR-SAN uzun menzilli hava ve füze savunma bataryası mevzisi.",
                                 "infobox":  [
                                                 [
                                                     "Tür",
                                                     "Uzun Menzilli Hava ve Füze Savunma Bataryası"
                                                 ],
                                                 [
                                                     "İşletmeci",
                                                     "Anatarya 22. Hava Savunma Taburu"
                                                 ],
                                                 [
                                                     "Sistemler",
                                                     "[[kalkan-hss]], [[korsan]] Hisar-K Ã–nleme Füzeleri"
                                                 ],
                                                 [
                                                     "Etkili İrtifa",
                                                     "30.000 metre (Stratosfer)"
                                                 ],
                                                 [
                                                     "Etkili Menzil",
                                                     "150 km aerodinamik"
                                                 ],
                                                 [
                                                     "Konum",
                                                     "Sarpburun Platosu Güneybatısı"
                                                 ],
                                                 [
                                                     "Statü",
                                                     "Tam Angajman Hazırlığı"
                                                 ]
                                             ]
                             },
    "lerya-jet-ussu":  {
                           "sections":  [
                                            [
                                                "Genel bakış",
                                                "Lerya 5. Taktik Jet Üssü, Elonya\u0027nın başkent Lerya\u0027yı ve Kalyon Denizi\u0027ndeki ada garnizonlarını havadan korumakla görevli başlıca askerÃ® meydandır. Denize yakın konumu, uçakların hızlıca açık deniz üzerinde irtifa almasını sağlar."
                                            ],
                                            [
                                                "Taktik görevler",
                                                "Üste konuşlu hafif avcı ve kıyı taarruz jetleri, düzenli olarak Kalyon Adaları hava sahasında devriye uçuşları yapar. Anatarya jetleriyle yaşanan it dalaşları ve hava sahası sürtüşmeleri genellikle Lerya üssünden havalanan unsurlarla gerçekleşir."
                                            ],
                                            [
                                                "Savunma önlemleri",
                                                "Üs çevresi Avren Birliği standartlarında kıyı hava savunma bataryalarıyla donatılmıştır. Sarpburun\u0027daki [[sarpburun-radar]] tesisinin kapsama alanında olması sebebiyle Elonya pilotları kalkış anından itibaren Anatarya radarları tarafından izlenmektedir."
                                            ]
                                        ],
                           "title":  "Lerya 5. Taktik Jet Üssü (Pelikan)",
                           "tags":  [
                                        "hava-ussu",
                                        "elonya",
                                        "lerya",
                                        "kalyon-denizi",
                                        "tesisler"
                                    ],
                           "category":  "tesisler",
                           "imageKey":  "pelagos-devriye",
                           "related":  [
                                           "elonya",
                                           "m12-aster",
                                           "kalyon-denizi",
                                           "kalyon-adalari"
                                       ],
                           "lead":  "Elonya Cumhuriyeti\u0027nin Kalyon Denizi kıyısındaki ana taktik hava üssü; Kalyon Adaları devriyelerini ve kıyı hava savunmasını icra eder.",
                           "infobox":  [
                                           [
                                               "Tür",
                                               "Taktik Avcı \u0026 Kıyı Savunma Üssü"
                                           ],
                                           [
                                               "İşletmeci",
                                               "Elonya Hava Savunma Kuvvetleri"
                                           ],
                                           [
                                               "Ana Unsurlar",
                                               "32. Taktik Filo (M12-Aster), Pelikan Keşif Birliği"
                                           ],
                                           [
                                               "Pist Sayısı",
                                               "1 (2.800 m Asfalt/Beton)"
                                           ],
                                           [
                                               "Konum",
                                               "Lerya Kuzeybatısı"
                                           ],
                                           [
                                               "Statü",
                                               "Faal"
                                           ]
                                       ]
                       },
    "sarp-gecidi":  {
                        "sections":  [
                                         [
                                             "Tasarım ve inşaat",
                                             "Sarp Geçidi, yarımadayı anakaradan ayıran sarp deniz boğazı üzerine 2028\u0027de inşa edilmiştir. Şiddetli rüzgarlara ve depremlere dayanıklı özel çelik halat yapısıyla tasarlanmıştır. Ã‡ift hatlı demiryolu, [[gokkale-4]] roket gövdelerinin ve ağır yakıt tanklarının nakliyesini sağlar."
                                         ],
                                         [
                                             "Askeri koruma",
                                             "Köprünün iki ayağında da uçaksavar mevzileri ve elektronik karıştırma kuleleri mevcuttur. Olası bir sabotaj veya füze saldırısına karşı sis perdesi oluşturma ve acil köprübaşı savunma planı devrededir."
                                         ],
                                         [
                                             "Lojistik rolü",
                                             "Savaş krizinde GÃ–KKALE-4 tesisinin kesintisiz enerji ve mühimmat takviyesi yalnızca bu köprü üzerinden sağlanmaktadır. Köprünün hasar alması durumunda yarımada anakaradan fiilen kopma riskiyle karşılaşır."
                                         ]
                                     ],
                        "title":  "Sarpburun Asma Köprüsü ve Kara Geçidi",
                        "tags":  [
                                     "kopru",
                                     "sarpburun",
                                     "ulasim",
                                     "gokkale-4",
                                     "tesisler"
                                 ],
                        "category":  "tesisler",
                        "imageKey":  "doruk-ikmal",
                        "related":  [
                                        "sarpburun",
                                        "gokkale-4",
                                        "doruk-ikmal",
                                        "anatarya"
                                    ],
                        "lead":  "Sarpburun Yarımadası\u0027nı Anatarya anakarasına bağlayan stratejik asma köprü ve tahkimatlı kara geçidi; GÃ–KKALE-4 ikmalinin ana atardamarıdır.",
                        "infobox":  [
                                        [
                                            "Tür",
                                            "Stratejik Asma Köprü ve Askeri Geçit"
                                        ],
                                        [
                                            "Uzunluk",
                                            "1.850 m (Ana açıklık: 1.100 m)"
                                        ],
                                        [
                                            "Şerit Sayısı",
                                            "4 Karayolu + Ã‡ift Hat Ağır Demiryolu"
                                        ],
                                        [
                                            "Gözetleme",
                                            "Geçit Muhafız Taburu"
                                        ],
                                        [
                                            "Konum",
                                            "Sarpburun Kıstağı"
                                        ],
                                        [
                                            "Statü",
                                            "Faal (Askeri Geçiş Ã–ncelikli)"
                                        ]
                                    ]
                    },
    "istara-garnizonu":  {
                             "sections":  [
                                              [
                                                  "Stratejik konum",
                                                  "İstara Boğazı, kıtalararası ticaret ve donanma intikalleri için kritik tek su geçididir. İstara Muhafız İstasyonu, boğazın iki yakasında yer alan kale kalıntıları üzerine modern radar ve sensör ağları entegre edilerek kurulmuştur."
                                              ],
                                              [
                                                  "Seyir güvenliği ve denetim",
                                                  "Boğazdan geçen tüm askeri ve ticari gemiler istasyonun VTS (Gemi Trafik Hizmetleri) merkezine bildirim yapmak zorundadır. Savaş durumunda boğazın kapatılması ve geçiş güvenliğinin sağlanması garnizonun yetkisindedir."
                                              ],
                                              [
                                                  "Savunma sistemleri",
                                                  "İstasyonda konuşlu KOR-SAN kıyı savunma füze bataryaları, boğaza zorla girmeye çalışacak savaş gemilerini 180 km mesafeden etkisiz hale getirebilecek vuruş gücüne sahiptir."
                                              ]
                                          ],
                             "title":  "İstara Boğaz Muhafız İstasyonu ve Sahil Bataryası",
                             "tags":  [
                                          "garnizon",
                                          "istara",
                                          "bogaz",
                                          "sahil-guvenlik",
                                          "korsan",
                                          "tesisler"
                                      ],
                             "category":  "tesisler",
                             "imageKey":  "sarp-muhafiz",
                             "related":  [
                                             "istara",
                                             "istara-bogazi",
                                             "anatarya",
                                             "korsan"
                                         ],
                             "lead":  "Kuzey Denizi ile İç Deniz arasındaki İstara Boğazı\u0027nın iki yakasındaki deniz geçişlerini kontrol eden, radar ve kıyı savunma füzeleriyle donatılmış Anatarya garnizonu.",
                             "infobox":  [
                                             [
                                                 "Tür",
                                                 "Boğaz Tahkimatı ve Kıyı Füze İstasyonu"
                                             ],
                                             [
                                                 "İşletmeci",
                                                 "Anatarya Kıyı Muhafaza Komutanlığı"
                                             ],
                                             [
                                                 "Silah Sistemleri",
                                                 "[[korsan]] Atmaca-K kıyı savunma füzeleri, 76 mm sahil topları"
                                             ],
                                             [
                                                 "Gözetleme",
                                                 "İstara Boğaz Trafik Radar Kulesi"
                                             ],
                                             [
                                                 "Konum",
                                                 "[[istara-bogazi]] Girişi"
                                             ],
                                             [
                                                 "Statü",
                                                 "Faal"
                                             ]
                                         ]
                         },
    "lerya-deniz-ussu":  {
                             "sections":  [
                                              [
                                                  "Tesis yapısı",
                                                  "Pelagos Deniz Üssü, doğal bir koy olan Lerya Körfezi içinde yer alır. Dış dalgakıranları koruganlı sahil bataryalarıyla tahkim edilmiştir. Üs içerisinde savaş gemisi onarım tersanesi, torpido depoları ve komuta karargÃ¢hı bulunmaktadır."
                                              ],
                                              [
                                                  "Aigaion Grubu bağlantısı",
                                                  "Elonya\u0027nın sancak gemisi olan [[aigaion]] güdümlü mermi firkateyni ve refakatindeki hücumbotlar bu üste konuşludur. GÃ–KKALE-4 krizinde taarruz grubuna yakıt ve mühimmat yüklemesi bu limanda tamamlanmıştır."
                                              ],
                                              [
                                                  "Bölgesel etkisi",
                                                  "Üs, Kalyon Denizi\u0027ndeki dar deniz boğazlarının kontrolünü elinde tutarak Anatarya\u0027nın ticari deniz yollarını baskı altında tutma kabiliyetine sahiptir."
                                              ]
                                          ],
                             "title":  "Lerya Donanma Komutanlığı ve Pelagos Deniz Üssü",
                             "tags":  [
                                          "deniz-ussu",
                                          "liman",
                                          "elonya",
                                          "aigaion",
                                          "donanma",
                                          "tesisler"
                                      ],
                             "category":  "tesisler",
                             "imageKey":  "aigaion",
                             "related":  [
                                             "elonya",
                                             "aigaion",
                                             "kalyon-denizi",
                                             "pelagos-karakolu"
                                         ],
                             "lead":  "Elonya Deniz Kuvvetleri\u0027nin Kalyon Denizi\u0027ndeki ana harekÃ¢t merkezi, tersanesi ve firkateyn filotillası konuşlanma limanı.",
                             "infobox":  [
                                             [
                                                 "Tür",
                                                 "Ana Deniz Üssü ve Askeri Tersane"
                                             ],
                                             [
                                                 "İşletmeci",
                                                 "Elonya Deniz Kuvvetleri"
                                             ],
                                             [
                                                 "Bağlı Birlikler",
                                                 "1. Firkateyn Filotillası, Kalyon Hücumbot Taburu"
                                             ],
                                             [
                                                 "Rıhtım Kapasitesi",
                                                 "12 muharip gemi, 2 kuru havuz"
                                             ],
                                             [
                                                 "Konum",
                                                 "Lerya Koyu / Kalyon Kıyısı"
                                             ],
                                             [
                                                 "Statü",
                                                 "Faal (Savaş Seferberliği)"
                                             ]
                                         ]
                         },
    "arkent-jet-ussu":  {
                            "sections":  [
                                             [
                                                 "Konum ve altyapı",
                                                 "Arkent\u0027in 35 km batısındaki dağ eteği ovasına inşa edilen 1. Ana Jet Üssü, yeraltı takviyeli hangarları, taktik mühimmat sığınakları ve bağımsız yakıt ikmal tünelleriyle Anatarya\u0027nın en korunaklı hava üssüdür. Üs pistleri, harp zamanında otoyol acil iniş şeritleriyle entegre çalışacak şekilde dizayn edilmiştir."
                                             ],
                                             [
                                                 "Konuşlu filolar",
                                                 "Üs, ülkenin en seçkin hava birliklerini barındırır. Yeni nesil [[k21-kaan]] uçaklarını ilk teslim alan 101. Karakartal Filosu ile Sarpburun ve Kalyon üzerinde hava devriyesi yapan [[k16-alaz]] filoları buradan sevk ve idare edilir. Ayrıca [[baykut]] üretimi [[al-elma]] insansız savaş jetleri de bu üste test ve harekÃ¢t faaliyetleri yürütmektedir."
                                             ],
                                             [
                                                 "HarekÃ¢t rolü",
                                                 "Kriz döneminde üs, GÃ–KKALE-4 üzerindeki hava sahasına 6 dakikada reaksiyon gösteren önleme nöbeti sürdürmektedir. Elonya\u0027nın [[lerya-jet-ussu]] konuşlu hava unsurlarıyla karşı karşıya gelen Anatarya jetleri, operasyonlarını Arkent Hava HarekÃ¢t Merkezi üzerinden icra eder."
                                             ]
                                         ],
                            "title":  "Arkent 1. Ana Jet Üs Komutanlığı (Karakartal)",
                            "tags":  [
                                         "hava-ussu",
                                         "arkent",
                                         "jet",
                                         "k21-kaan",
                                         "hava-kuvvetleri",
                                         "tesisler"
                                     ],
                            "category":  "tesisler",
                            "imageKey":  "kartal",
                            "related":  [
                                            "anatarya",
                                            "k21-kaan",
                                            "k16-alaz",
                                            "al-elma",
                                            "anasas"
                                        ],
                            "lead":  "Anatarya Hava Kuvvetleri\u0027nin başkent savunması ve batı harekÃ¢t sahasını koruyan ana avcı üssü. K-21 KAAN, K16-Alaz ve insansız savaş filolarına ev sahipliği yapar.",
                            "infobox":  [
                                            [
                                                "Tür",
                                                "Ana Muharip Jet Üssü"
                                            ],
                                            [
                                                "İşletmeci",
                                                "Anatarya Hava Kuvvetleri"
                                            ],
                                            [
                                                "Ana Filolar",
                                                "101. Kartal Filo ([[k21-kaan]]), 132. Hançer Filosu ([[k16-alaz]]), 14. İnsansız Avcı Filosu ([[al-elma]])"
                                            ],
                                            [
                                                "Pist Sayısı",
                                                "2 (Betonarme, 3.400 m)"
                                            ],
                                            [
                                                "Konum",
                                                "Arkent Batısı"
                                            ],
                                            [
                                                "Statü",
                                                "Faal (1. Derece Sefer Alarmı)"
                                            ]
                                        ]
                        },
    "sarpburun-radar":  {
                            "sections":  [
                                             [
                                                 "Genel bakış",
                                                 "SARP-RAD, Sarpburun Yarımadası\u0027nın en yüksek noktasında yer alır. Tesis, Anatarya\u0027nın batı sınırlarını ve [[gokkale-4]] uzay üssünü yaklaşan hava, deniz ve balistik füze tehditlerine karşı korumak için 2031 yılında hizmete girmiştir. Üç boyutlu AESA anteni ve gelişmiş sinyal işleme algoritmaları, Kalyon Denizi üzerindeki alçak irtifa hedeflerini ufuk ötesinden tespit edebilir."
                                             ],
                                             [
                                                 "Elektronik harp yetenekleri",
                                                 "Kompleks yalnızca pasif ve aktif radar taraması yapmakla kalmaz; aynı zamanda geniş bant elektronik destek (ED) ve karıştırma (ET) kabiliyetine sahiptir. [[elonya]] keşif uçakları ve İHA\u0027larının sınır ihlallerini engellemek için yerel radar köreltme ve GPS yanıltma protokolleri uygular."
                                             ],
                                             [
                                                 "Taktik önem",
                                                 "GÃ–KKALE-4 krizinde SARP-RAD, [[aigaion]] firkateyn grubunun yaklaştığını tespit eden ilk yer gözlem istasyonu olmuştur. Tesis, elde ettiği anlık hedef izlerini doğrudan [[arkent-jet-ussu]]\u0027ndeki [[k21-kaan]] filolarına ve [[kor-kalkan-bataryasi]]\u0027na aktarmaktadır."
                                             ]
                                         ],
                            "title":  "Sarpburun Erken Uyarı Radar Kompleksi (SARP-RAD)",
                            "tags":  [
                                         "radar",
                                         "sarpburun",
                                         "savunma",
                                         "elektronik-harp",
                                         "sarpsan",
                                         "tesisler"
                                     ],
                            "category":  "tesisler",
                            "imageKey":  "sarp-muhafiz",
                            "related":  [
                                            "sarpburun",
                                            "gokkale-4",
                                            "sarpsan",
                                            "kor-kalkan-bataryasi",
                                            "kalkan-hss"
                                        ],
                            "lead":  "Sarpburun Yarımadası\u0027nın kuzey sırtlarında kurulu, Kalyon Denizi ve Avren hava sahasını 600 km yarıçapta gözetleyen SARPSAN üretimi aktif faz dizili erken uyarı ve elektronik harp kompleksi.",
                            "infobox":  [
                                            [
                                                "Tür",
                                                "Erken uyarı ve hava gözetleme radarı"
                                            ],
                                            [
                                                "İşletmeci",
                                                "Anatarya Hava Savunma Komutanlığı"
                                            ],
                                            [
                                                "Üretici",
                                                "[[sarpsan]]"
                                            ],
                                            [
                                                "Menzil",
                                                "600 km aerodinamik, 1.000 km balistik"
                                            ],
                                            [
                                                "Konum",
                                                "[[sarpburun]] Kuzey Sırtı"
                                            ],
                                            [
                                                "Koruma",
                                                "[[kor-kalkan-bataryasi]]"
                                            ],
                                            [
                                                "Statü",
                                                "Faal (Yüksek Alarm)"
                                            ]
                                        ]
                        }
};

const dataEN={
    "anatarya":  {
                     "title":  "Republic of Anataria",
                     "category":  "Countries",
                     "desc":  "A unitary republic east of the Kalyon Sea.",
                     "lead":  "The Republic of Anataria is a unitary republic occupying a large peninsula and interior plateaus east of the [[kalyon-denizi]], with its capital at Arkent. Its western border adjoins Elonia, its southern coast borders the Kalyon Sea, and its northern frontier extends into the Avren mainland.",
                     "facts":  [
                                   [
                                       "Official name",
                                       "Republic of Anataria"
                                   ],
                                   [
                                       "Capital",
                                       "Arkent"
                                   ],
                                   [
                                       "Official language",
                                       "Anatarian"
                                   ],
                                   [
                                       "Government",
                                       "Unitary parliamentary republic"
                                   ],
                                   [
                                       "Legislature",
                                       "Assembly of the Republic"
                                   ],
                                   [
                                       "Geographic location",
                                       "East of [[kalyon-denizi]]"
                                   ],
                                   [
                                       "Alliance",
                                       "[[kuzey-kusagi]]"
                                   ],
                                   [
                                       "Space center",
                                       "[[gokkale-4]]"
                                   ],
                                   [
                                       "Avren Union",
                                       "Not a full member; partnership relations"
                                   ]
                               ],
                     "sections":  [
                                      [
                                          "Geography and climate",
                                          "Anatarya’s western coastline is broken up by bays, mountainous headlands and port cities. The temperate coastal climate gives way inland to a drier plateau climate with pronounced seasonal differences. Mountain ranges channel transport between coastal settlements and the interior through specific passes.\n\n[[sarpburun]] is a headland relatively distant from densely settled coastal areas. Access to the open sea and the possibility of establishing a broad security zone helped determine its selection for [[gokkale-4]]. The status of the waters surrounding [[kalyon-adalari]] is a separate source of dispute with neighboring [[elonya]].\n\nThe country’s territory west of [[istara-bogazi]] is attached to the mainland of [[avrupa]]. It shares a land border with [[elonya]] there. [[istara]] is a city spanning both shores of the crossing, while the capital, Arkent, lies inland."
                                      ],
                                      [
                                          "History",
                                          "The republic was established during a period of constitutional transformation following the collapse of the former dynasty’s rule. Early governments prioritized bringing regional administrations together under a common legal and taxation system. The choice of Arkent as capital symbolized the transfer of the political center from coastal cities dependent on port trade to the interior.\n\nThe subsequent period of industrialization saw the expansion of railways, machinery manufacturing and technical education institutions. Defense production initially relied on foreign procurement, but successive embargoes accelerated domestic electronics and aviation programs. Membership in [[kuzey-kusagi]] provided external security assurances during this process without ending the country’s policy of building an independent defense infrastructure."
                                      ],
                                      [
                                          "State structure and politics",
                                          "Anatarya is governed through a multiparty parliamentary system. Legislative power belongs to the Assembly of the Republic, and executive power to a government dependent on parliamentary confidence. The presidency is a constitutional office representing the continuity of the state. Provinces are administered through officials appointed by the central government and elected local bodies.\n\nThe principal domestic political debates concern economic disparities between the interior and coastal cities, the share of the budget devoted to defense spending, and civilian oversight of security institutions. Although the space program enjoys broad support, the military missions and undisclosed budget of [[gokkale-4]] draw criticism from the opposition."
                                      ],
                                      [
                                          "Economy and infrastructure",
                                          "The economy rests on industry, agriculture, logistics and services. Grain production and heavy industry predominate in the inland basins, while ship maintenance, exports and tourism are prominent in coastal cities. Electronics, optical systems and aviation components are among the areas of strategic investment.\n\nThe country’s extensive land network provides sustained production and supply capacity. However, coastal trade’s dependence on routes through [[kalyon-denizi]] makes disruptions to maritime transport an economic risk. During the war, commercial insurance costs rose, while coastal investment and civilian transport slowed."
                                      ],
                                      [
                                          "Society and culture",
                                          "Anatarian is the common language of education and public administration. Coastal, plateau and mountain regions differ markedly in architecture, cuisine and local dialects. Large industrial cities are characterized by mixed populations shaped by internal migration.\n\nEngineering and public education occupy an important place in the republic’s account of modernization. The civilian face of the space program consists of weather forecasting, communications, disaster observation and university research. For this reason, [[gokkale-4]] is regarded as a public symbol of technical progress as well as a site of military importance."
                                      ],
                                      [
                                          "Defense and the space program",
                                          "Anatarya’s approach to defense combines its extensive territorial depth, domestic production and air defense network. Regional technological superiority does not mean permanent superiority in forces at every point along the coast. Naval forces concentrated by [[elonya]] in a narrow area can exert local pressure, particularly around [[sarpburun]].\n\n[[gozcu-3]] is the existing surveillance and data relay system. The new [[kartal-7]] will be launched on [[simsek-iii]] to increase military reconnaissance capacity. Both systems are associated with the space program; KARTAL-7 is not an orbital bombardment weapon as alleged in the documents."
                                      ],
                                      [
                                          "Foreign relations",
                                          "Anatarya’s membership in [[kuzey-kusagi]] provides access to collective defense and intelligence sharing. Membership in the same alliance as [[elonya]] has not eliminated the maritime disputes between the two countries. The parties interpret activities around the islands respectively as an exercise of sovereign rights and a security threat.\n\nWhen [[sarpburun-dosyasi]] was published, Anataria declared the documents to be forgeries and called for a joint investigation. The alliance’s preference for an investigation and a call for a ceasefire rather than military intervention weakened confidence in its security commitments within the country."
                                      ],
                                      [
                                          "GÖKKALE-4 Crisis",
                                          "The [[sarpburun-dosyasi]], prepared by [[elonya-istihbarati]], created the impression that Anataria was preparing a first strike around [[kalyon-adalari]]. Elonia’s government presented the dossier as evidence of an imminent threat, decided to go to war and dispatched the [[aigaion]] group to the region.\n\nAnatarya’s request for collective defense failed to secure the necessary political consensus within [[kuzey-kusagi]]. While the alliance refrained from launching a military operation, the country began defending [[gokkale-4]] with its own forces."
                                      ],
                                      [
                                          "Principal units",
                                          "[[hancer]], [[kuzey-isaret]] and [[sarp-muhafiz]] form different elements of the defense around GÖKKALE-4. Principal platforms include [[k16-alaz]], [[kalkan-hss]], [[kaya-zma]] and [[ut7-ilgaz]]."
                                      ],
                                      [
                                          "Kipraya policy",
                                          "[[anatarya]] is the only state to recognize the independence of [[kuzey-kipraya]]. It pursues security and economic cooperation with the north. Developments around [[kipraya-tampon-hatti]] are among the principal areas of disagreement in relations with [[elonya]]."
                                      ]
                                  ],
                     "related":  [
                                     "elonya",
                                     "kuzey-kusagi",
                                     "sarpburun-dosyasi",
                                     "gokkale-4",
                                     "kriz",
                                     "avren-birligi",
                                     "kipraya",
                                     "kuzey-isaret",
                                     "doruk-ikmal",
                                     "demir-iz"
                                 ],
                     "imageKey":  "flag-anatarya"
                 },
    "elonya":  {
                   "title":  "Republic of Elonia",
                   "category":  "Countries",
                   "desc":  "A maritime republic west of the Kalyon Sea.",
                   "lead":  "The Republic of Elonia is a unitary maritime nation situated west of the [[kalyon-denizi]] along the southwestern fringe of the Avren mainland, with its capital at Lerya.",
                   "facts":  [
                                 [
                                     "Official name",
                                     "Republic of Elonia"
                                 ],
                                 [
                                     "Capital",
                                     "Lerya"
                                 ],
                                 [
                                     "Official language",
                                     "Elonian"
                                 ],
                                 [
                                     "Government",
                                     "Unitary parliamentary republic"
                                 ],
                                 [
                                     "Legislature",
                                     "National Assembly"
                                 ],
                                 [
                                     "Geographic location",
                                     "West of [[kalyon-denizi]]"
                                 ],
                                 [
                                     "Alliance",
                                     "[[kuzey-kusagi]]"
                                 ],
                                 [
                                     "Intelligence agency",
                                     "[[elonya-istihbarati]]"
                                 ],
                                 [
                                     "Avren Union",
                                     "Full member"
                                 ]
                             ],
                   "sections":  [
                                    [
                                        "Geography and climate",
                                        "Elonya’s settlement pattern is shaped by narrow coastal plains, mountainous inland areas and islands. Most major cities developed around natural harbors. The coastal climate, with its dry summers, gives way to cooler and wetter conditions at higher elevations. The fragmented distribution of arable land has increased the economic importance of maritime trade.\n\nThe island chains around [[kalyon-adalari]] intertwine the country’s sea routes with its security concerns. Elonia’s administration in the western parts of the archipelago borders the sovereignty disputes in the central belt.\n\nThe Elonia peninsula joins the mainland of [[avrupa]] to the north. In the northeast, it shares a land border with Anataria’s Avren side; this border lies west of [[istara]] and [[istara-bogazi]]."
                                    ],
                                    [
                                        "History",
                                        "The Republic of Elonia arose from the union of coastal cities and island administrations around a common assembly. The central challenge of the early republic was reconciling the islands’ commercial autonomy with the central government’s taxation and defense needs. Lerya’s maritime circles played an influential role in the new state’s financial and diplomatic structure.\n\nThe growth of the merchant fleet connected the country to foreign markets, while naval service and port administration became strong professional traditions. Following accession to [[kuzey-kusagi]], the air and naval forces were adapted to shared standards. Nevertheless, crises with [[anatarya]] over military activities around the islands could not be permanently resolved."
                                    ],
                                    [
                                        "State structure and politics",
                                        "Elonya is governed through a unicameral parliamentary system. The government is accountable to the National Assembly; the presidency is a separate constitutional office. Island municipalities undertake extensive responsibilities in transport, tourism and local infrastructure, while foreign policy and defense remain under the authority of the central government.\n\nPolitics is marked by tension between those advocating continuity in trade and groups prioritizing maritime security. The debate over [[kartal-7]] increased the influence of security-oriented policies. The [[sarpburun-dosyasi]] was presented not only to international audiences but also to the assembly and the public, whose support for the decision to go to war was expected."
                                    ],
                                    [
                                        "Economy",
                                        "Maritime transport, port operations, tourism, ship repair and financial services are the economy’s principal sectors. Coastal crops, viticulture and island production are prominent in agriculture. The industrial base is less extensive than that of [[anatarya]]; certain defense systems and energy inputs depend on foreign supply.\n\nAlthough this structure may make a short naval operation appear politically attractive, it makes a prolonged war costly. Disrupted trade routes, declining tourism revenue and rising insurance costs increase the war’s pressure on the civilian economy."
                                    ],
                                    [
                                        "Society and culture",
                                        "Although Elonian is the official language, different dialects and local traditions remain alive among the island settlements. Seafaring, migration and port trade have a strong presence in literature, public ceremonies and family occupations. Lerya is the principal destination for island residents seeking education and employment.\n\nThe state’s maritime security rhetoric does not mean that all of society shares a single view. Before the war, universities, commercial organizations and opposition groups called for an independent examination of [[sarpburun-dosyasi]]. Official publications, however, portrayed the dossier as evidence of an imminent attack."
                                    ],
                                    [
                                        "Defense and intelligence",
                                        "Elonya’s defense planning focuses on keeping sea lanes open and rapidly concentrating forces around the islands. [[aigaion]] is the principal expression of this approach in the [[sarpburun]] area. Local naval superiority does not mean that the country is superior on every front or capable of sustaining a long land war.\n\n[[elonya-istihbarati]] is responsible for foreign intelligence and strategic assessments. The forged documents it prepared under [[cam-perde]] portrayed the [[kartal-7]] program as preparation for an imminent attack rather than a reconnaissance activity."
                                    ],
                                    [
                                        "Foreign relations and justification for war",
                                        "Within [[kuzey-kusagi]], Elonia presents itself as a member protecting the alliance’s sea lanes. It also framed its objection to [[anatarya]]’s space program as a matter of collective security rather than national rivalry.\n\nThe [[sarpburun-dosyasi]] alleges that an Anatarian first strike against the islands is imminent. Based on this claim, Elonia’s government declared war, calling the operation against GÖKKALE-4 “preventive defense.” This expression is Elonia’s official justification; it does not mean that the alliance approved the operation."
                                    ],
                                    [
                                        "GÖKKALE-4 Crisis",
                                        "The apparent cause of the war is the allegation of an attack contained in the dossier. The military objective is to disable [[gokkale-4]]’s capacity before [[kartal-7]] enters service. The new satellite would reduce the secrecy of Elonia’s naval movements and island deployments.\n\nThe uncertainty caused by the forged documents deadlocked the collective defense decision within [[kuzey-kusagi]], and the alliance did not participate militarily in the war. The documents’ true origin was not publicly verified when the crisis began. The war therefore became a diplomatic struggle over the credibility of intelligence claims alongside the military conflict."
                                    ],
                                    [
                                        "Principal units",
                                        "[[aigaion]], [[mizrak]] and [[nereus-komando]] represent naval, air and special mission elements. [[m12-aster]], [[p8-pelagos]], [[triton-botu]], and the group’s frigates and support ships undertake different roles."
                                    ],
                                    [
                                        "Kipraya policy",
                                        "[[elonya]] regards the government of [[kipraya]] as the legitimate representative of the entire island. It does not recognize the north’s separate independence and advocates resolving the island’s status through negotiations. Anataria’s security role in the north creates tension between the two countries."
                                    ]
                                ],
                   "related":  [
                                   "anatarya",
                                   "elonya-istihbarati",
                                   "sarpburun-dosyasi",
                                   "kuzey-kusagi",
                                   "aigaion",
                                   "kriz",
                                   "avren-birligi",
                                   "kipraya",
                                   "ucaksavar",
                                   "pelagos-devriye",
                                   "iris-indirme",
                                   "lerya-deniz-ussu"
                               ],
                   "imageKey":  "flag-elonya"
               },
    "gokkale-4":  {
                      "title":  "GÖKKALE-4",
                      "category":  "Facilities",
                      "desc":  "Satellite control, launch preparation and the center of the conflict.",
                      "lead":  "GÖKKALE-4 is a satellite control and launch complex operated by [[anatarya]]. The planned launch of the [[kartal-7]] military reconnaissance satellite from the site aboard [[simsek-iii]] places the facility at the center of [[elonya]]’s attack.",
                      "facts":  [
                                    [
                                        "Facility type",
                                        "Satellite control and launch complex"
                                    ],
                                    [
                                        "Country",
                                        "[[anatarya]]"
                                    ],
                                    [
                                        "Associated region",
                                        "[[sarpburun]]"
                                    ],
                                    [
                                        "Existing satellite",
                                        "[[gozcu-3]]"
                                    ],
                                    [
                                        "Launch payload",
                                        "[[kartal-7]]"
                                    ],
                                    [
                                        "Launch vehicle",
                                        "[[simsek-iii]]"
                                    ]
                                ],
                      "sections":  [
                                       [
                                           "Role",
                                           "The complex’s two principal functions are conducting satellite operations and preparing the new launch. [[gozcu-3]] is the surveillance and data relay satellite already in orbit, while [[kartal-7]] is the new system still awaiting launch."
                                       ],
                                       [
                                           "Why is it being targeted?",
                                           "For [[elonya]], the facility is more than a collection of buildings: it is the point at which new reconnaissance capacity will become operational. The attack aims to prevent the military visibility that [[kartal-7]] would provide. The [[sarpburun-dosyasi]] portrayed the facility as the center of an imminent first strike, and the government of [[elonya]] presented this allegation as its justification for war. The dossier’s actual source is [[elonya-istihbarati]], and the attack plan attributed to the facility is fabricated."
                                       ],
                                       [
                                           "Civilian life and workers",
                                           "Engineers, satellite operators, scientists, maintenance teams and logistics workers serve at the complex. Civilian personnel operate communications systems, repair faults, maintain the flow of supplies and carry out launch preparations. During the crisis, this work continues in coordination with evacuation and emergency teams."
                                       ],
                                       [
                                           "Facility layout",
                                           "The complex consists of a satellite control center, launch site, technical maintenance areas and logistics sections. Civilian work areas and military security zones are subject to separate access arrangements."
                                       ]
                                   ],
                      "related":  [
                                      "anatarya",
                                      "sarpburun",
                                      "gozcu-3",
                                      "kartal-7",
                                      "simsek-iii",
                                      "kriz",
                                      "sarpburun-dosyasi",
                                      "kuzey-kusagi",
                                      "sarpburun-radar-istasyonu"
                                  ]
                  },
    "sarpburun":  {
                      "title":  "Sarpburun Peninsula",
                      "category":  "Geography",
                      "desc":  "A strategic coastal peninsula connected to mainland Anataria in the east.",
                      "lead":  "Sarpburun Peninsula is a coastal projection extending westward from the mainland of [[anatarya]] into [[kalyon-denizi]]. It is continuously connected to the main peninsula by the isthmus in the east; it is not an island. The [[gokkale-4]] satellite control and launch complex stands on the peninsula.",
                      "facts":  [
                                    [
                                        "Type",
                                        "Peninsula"
                                    ],
                                    [
                                        "Country",
                                        "[[anatarya]]"
                                    ],
                                    [
                                        "Land connection",
                                        "Broad isthmus in the east"
                                    ],
                                    [
                                        "Strategic facility",
                                        "[[gokkale-4]]"
                                    ],
                                    [
                                        "Sea",
                                        "[[kalyon-denizi]]"
                                    ]
                                ],
                      "sections":  [
                                       [
                                           "Geography",
                                           "The peninsula has rugged terrain extending from the coast toward the open sea. The road between the facility and the country’s interior crosses the broad eastern isthmus. Sheltered bays, rocky headlands and coastal ridges shape the peninsula’s western portion."
                                       ],
                                       [
                                           "Role in the crisis",
                                           "It is at the center of [[kriz]] because of [[gokkale-4]] and the [[kartal-7]] program. While [[aigaion]] exerts pressure from the sea, [[sarp-muhafiz]] protects land access and the facility’s perimeter."
                                       ]
                                   ],
                      "related":  [
                                      "anatarya",
                                      "gokkale-4",
                                      "sarp-muhafiz",
                                      "aigaion",
                                      "kriz",
                                      "demir-iz"
                                  ]
                  },
    "kalyon-denizi":  {
                          "title":  "Kalyon Sea",
                          "category":  "Geography",
                          "desc":  "The setting for the maritime tensions between the two countries.",
                          "lead":  "The Kalyon Sea stretches between [[elonya]] to the west and [[anatarya]] to the east. [[kalyon-adalari]] lie in the southern part of the sea. The region is a center of maritime trade and sovereignty disputes between the two countries.",
                          "facts":  [
                                        [
                                            "Type",
                                            "Sea"
                                        ],
                                        [
                                            "Associated geography",
                                            "[[kalyon-adalari]]"
                                        ],
                                        [
                                            "Associated countries",
                                            "[[anatarya]] · [[elonya]]"
                                        ]
                                    ],
                          "sections":  [
                                           [
                                               "Strategic context",
                                               "The visibility of naval movements and island bases is central to the objections to the [[kartal-7]] program. The deployment of [[aigaion]] represents the military dimension of these tensions."
                                           ],
                                           [
                                               "Boundaries",
                                               "It is bordered by the coasts of [[elonya]] to the west and [[anatarya]] to the east. The passage opening into the Inland Sea to the north and the sea routes around [[kipraya]] to the south form the region’s transport connections. Sovereignty disputes around [[kalyon-adalari]] also affect maritime jurisdictions."
                                           ]
                                       ],
                          "related":  [
                                          "kalyon-adalari",
                                          "sarpburun",
                                          "aigaion"
                                      ]
                      },
    "kalyon-adalari":  {
                           "title":  "Kalyon Islands",
                           "category":  "Geography",
                           "desc":  "The island group associated with the Kalyon Sea.",
                           "lead":  "The Kalyon Islands are an island group associated with [[kalyon-denizi]]. Monitoring island bases and military deployments is one of the principal issues in the crisis between [[anatarya]] and [[elonya]].",
                           "facts":  [
                                         [
                                             "Type",
                                             "Island group"
                                         ],
                                         [
                                             "Associated sea",
                                             "[[kalyon-denizi]]"
                                         ],
                                         [
                                             "Individual island names",
                                             "Not yet determined"
                                         ]
                                     ],
                           "sections":  [
                                            [
                                                "Connection to the crisis",
                                                "The reconnaissance capability of the [[kartal-7]] satellite covers military activities on the islands as well as naval movements. Some parts of the archipelago are administered by [[anatarya]] and others by [[elonya]]; sovereignty over the islands in the central belt is disputed between the two states."
                                            ]
                                        ],
                           "related":  [
                                           "kalyon-denizi",
                                           "kartal-7",
                                           "elonya"
                                       ]
                       },
    "gozcu-3":  {
                    "title":  "GÖZCÜ-3",
                    "category":  "Space program",
                    "desc":  "A surveillance and data relay satellite operating in orbit.",
                    "lead":  "GÖZCÜ-3 is the surveillance and data relay satellite in [[anatarya]]’s space program that is already in orbit. It is associated with the existing satellite operations of the [[gokkale-4]] complex.",
                    "facts":  [
                                  [
                                      "Type",
                                      "Surveillance and data relay satellite"
                                  ],
                                  [
                                      "Status",
                                      "In orbit"
                                  ],
                                  [
                                      "Country",
                                      "[[anatarya]]"
                                  ],
                                  [
                                      "Associated facility",
                                      "[[gokkale-4]]"
                                  ]
                              ],
                    "sections":  [
                                     [
                                         "Role",
                                         "GÖZCÜ-3 represents the existing surveillance and data relay capacity. It is not the same system as [[kartal-7]], which has yet to be launched."
                                     ],
                                     [
                                         "Place in the space program",
                                         "During the crisis around [[gokkale-4]], existing satellite operations continue alongside preparations for the new launch."
                                     ]
                                 ],
                    "related":  [
                                    "kartal-7",
                                    "gokkale-4",
                                    "anatarya"
                                ]
                },
    "kartal-7":  {
                     "title":  "KARTAL-7",
                     "category":  "Space program",
                     "desc":  "A new military reconnaissance satellite awaiting launch.",
                     "lead":  "KARTAL-7 is a new military reconnaissance satellite that [[anatarya]] plans to launch from the [[gokkale-4]] complex aboard [[simsek-iii]]. The launch preparations are the fundamental cause of the conflict with [[elonya]].",
                     "facts":  [
                                   [
                                       "Type",
                                       "Military reconnaissance satellite"
                                   ],
                                   [
                                       "Status",
                                       "Prelaunch"
                                   ],
                                   [
                                       "Launch site",
                                       "[[gokkale-4]]"
                                   ],
                                   [
                                       "Carrier",
                                       "[[simsek-iii]]"
                                   ]
                               ],
                     "sections":  [
                                      [
                                          "Strategic importance",
                                          "The satellite is described as a new reconnaissance capability that could reveal Elonia’s naval movements, island bases and military deployments. The introduction of this capability affects the balance between the two countries."
                                      ],
                                      [
                                          "Launch and crisis",
                                          "[[elonya]] is attempting to prevent the launch before this capability emerges. The dispatch of the [[aigaion]] group toward [[sarpburun]] is part of the military pressure that initiated the conflict around [[gokkale-4]]."
                                      ],
                                      [
                                          "Relationship with GÖZCÜ-3",
                                          "[[gozcu-3]] is already in orbit; KARTAL-7 is the new launch payload."
                                      ]
                                  ],
                     "related":  [
                                     "gozcu-3",
                                     "simsek-iii",
                                     "gokkale-4",
                                     "kriz"
                                 ]
                 },
    "simsek-iii":  {
                       "title":  "ŞİMŞEK-III",
                       "category":  "Space program",
                       "desc":  "The launch vehicle intended to carry KARTAL-7.",
                       "lead":  "ŞİMŞEK-III is the launch vehicle intended to carry the [[kartal-7]] military reconnaissance satellite into space from the [[gokkale-4]] complex.",
                       "facts":  [
                                     [
                                         "Type",
                                         "Launch vehicle"
                                     ],
                                     [
                                         "Payload",
                                         "[[kartal-7]]"
                                     ],
                                     [
                                         "Launch site",
                                         "[[gokkale-4]]"
                                     ]
                                 ],
                       "sections":  [
                                        [
                                            "Role in the program",
                                            "It is tasked with delivering the new reconnaissance satellite of [[anatarya]]’s space program into orbit."
                                        ]
                                    ],
                       "related":  [
                                       "kartal-7",
                                       "gokkale-4",
                                       "anatarya"
                                   ]
                   },
    "aigaion":  {
                    "title":  "AIGAION Battle Group",
                    "category":  "Units",
                    "desc":  "The combined naval force dispatched by Elonia to Sarpburun.",
                    "lead":  "The AIGAION Battle Group is the naval group dispatched by [[elonya]] toward [[sarpburun]]. The frigates AIGAION and THALASSA, [[nereus-cikarma]] and [[kallisto-ikmal]] are its principal components. During [[kriz]], they jointly perform maritime surveillance, escort, force transport and logistics duties.",
                    "facts":  [
                                  [
                                      "Country",
                                      "[[elonya]]"
                                  ],
                                  [
                                      "Type",
                                      "Naval battle group"
                                  ],
                                  [
                                      "Frigates",
                                      "AIGAION · THALASSA"
                                  ],
                                  [
                                      "Amphibious ship",
                                      "[[nereus-cikarma]]"
                                  ],
                                  [
                                      "Supply ship",
                                      "[[kallisto-ikmal]]"
                                  ],
                                  [
                                      "Naval special unit",
                                      "[[nereus-komando]]"
                                  ]
                              ],
                    "sections":  [
                                     [
                                         "Ships",
                                         "AIGAION and THALASSA are [[aigaion-firkateyni]] platforms. [[nereus-cikarma]] carries personnel and vehicles; [[kallisto-ikmal]] provides logistical support at sea. The ship name NEREUS should not be confused with the unit name [[nereus-komando]]."
                                     ],
                                     [
                                         "Air and coastal support",
                                         "[[p8-pelagos]] maritime patrol aircraft provide information support. [[mizrak]] and its [[m12-aster]] aircraft constitute a separate air unit, participating in joint mission planning when required. [[triton-botu]] is one of the naval commando group’s short-range transport craft."
                                     ],
                                     [
                                         "Role in the crisis",
                                         "The group was sent to the region to exert pressure on [[gokkale-4]] before the launch of [[kartal-7]]. Superiority at sea does not mean that Sarpburun is an island; the facility has uninterrupted access to the mainland in the east."
                                     ],
                                     [
                                         "Emblem",
                                         "A trident and wave lines symbolize maritime duties. The navy and light blue emblem is presented as a transparent PNG without a textile texture."
                                     ]
                                 ],
                    "related":  [
                                    "elonya",
                                    "sarpburun",
                                    "gokkale-4",
                                    "aigaion-firkateyni",
                                    "nereus-cikarma",
                                    "kallisto-ikmal",
                                    "nereus-komando",
                                    "mizrak",
                                    "lerya-deniz-ussu"
                                ],
                    "imageKey":  "patch-aigaion",
                    "draft":  false
                },
    "hancer":  {
                   "title":  "132nd Hançer Tactical Squadron",
                   "category":  "Units",
                   "desc":  "An Anatarian air squadron founded in 1978; the legacy of DAGGER 06 and Black November.",
                   "lead":  "The 132nd Hançer Tactical Squadron is an [[anatarya]] air unit established in 1978 to provide air defense for the Sarpburun region. It uses the call sign “Dagger.” Regarded as one of the symbols of Anatarian air superiority, the squadron is known both for its role in the defense of [[gokkale-4]] and for DAGGER 06, which disappeared on 17 November 1994, and the commemorative plaque at its headquarters.",
                   "facts":  [
                                 [
                                     "Country",
                                     "[[anatarya]]"
                                 ],
                                 [
                                     "Established",
                                     "1978"
                                 ],
                                 [
                                     "Unit type",
                                     "Tactical air squadron"
                                 ],
                                 [
                                     "Call sign",
                                     "Hançer / Dagger"
                                 ],
                                 [
                                     "Historic aircraft",
                                     "[[k4-boran]]"
                                 ],
                                 [
                                     "Modernization",
                                     "[[k16-alaz]] from 2019"
                                 ],
                                 [
                                     "Missing aircraft",
                                     "DAGGER 06 — 17 November 1994"
                                 ],
                                 [
                                     "Commemorative words",
                                     "The watch of those who never returned does not end."
                                 ],
                                 [
                                     "Historic loss",
                                     "DAGGER 06 ([[kara-kasim]])"
                                 ]
                             ],
                   "sections":  [
                                    [
                                        "Establishment and early years (1978)",
                                        "The squadron was established in 1978 to provide air defense around [[sarpburun]]. It initially operated [[k4-boran]] aircraft. Protecting the coastal region formed the basis of the unit’s historic mission identity."
                                    ],
                                    [
                                        "Black November Incident (17 November 1994)",
                                        "On 17 November 1994, an Anatarian [[k4-boran]] aircraft using the call sign DAGGER 06 disappeared. The aircraft vanished from radar 11 seconds after its last radio message. Its wreckage was never reached; the fate of its pilot and weapons systems officer was not disclosed.\n\nKnown in the unit’s history as “Black November,” the incident is recorded in Classified File 94-117. The cause of the loss has not been established."
                                    ],
                                    [
                                        "Commemorative plaque at headquarters",
                                        "A plaque on the wall of the old squadron headquarters commemorates DAGGER 06 and its crew, who never returned. The plaque reads:\n\n132ND TACTICAL SQUADRON COMMAND\nDAGGER 06\n17 NOVEMBER 1994\nThe watch of those who never returned does not end."
                                    ],
                                    [
                                        "Modernization and aircraft (2019)",
                                        "Modernization with [[k16-alaz]] began in 2019. Some K-4 aircraft remained in use for training and limited duties. [[k4-boran]] defines the squadron’s historic inventory, while [[k16-alaz]] defines its modernization era."
                                    ],
                                    [
                                        "The 2036 signal and File 94-117",
                                        "A signal detected in 2036 shared the same frequency characteristics as DAGGER 06’s final transmission in 1994. A comparison of the two recordings was requested under File 94-117.\n\nThis similarity does not mean that the missing aircraft has been found or that its crew is alive. The source of the signal and its connection to Black November remain unresolved issues in the investigation."
                                    ],
                                    [
                                        "Defense of GÖKKALE-4 and LAST DAWN",
                                        "Hançer serves in the defense of [[gokkale-4]] and is identified as the unit authorized for LAST DAWN. It is one of the principal units in Anataria’s air defense during [[kriz]].\n\nThe unit is commanded by the national military authorities; membership in [[kuzey-kusagi]] does not automatically place the squadron under pact command."
                                    ],
                                    [
                                        "Unit insignia",
                                        "A silver dagger and spread wings symbolize the Hançer name and its air mission. The emblem bears the squadron’s number, 132."
                                    ]
                                ],
                   "related":  [
                                   "anatarya",
                                   "sarpburun",
                                   "gokkale-4",
                                   "kriz",
                                   "k4-boran",
                                   "k16-alaz",
                                   "kara-kasim",
                                   "dosya-94-117",
                                   "sarpburun-radar-istasyonu"
                               ],
                   "imageKey":  "patch-hancer",
                   "draft":  false
               },
    "ucaksavar":  {
                      "title":  "21st Anti-Aircraft Battalion",
                      "category":  "Units",
                      "desc":  "An Elonian coastal and island air defense battalion.",
                      "lead":  "The 21st Anti-Aircraft Battalion belongs to the [[elonya]] Air Force surveillance network over Lerya Bay and the western [[kalyon-adalari]]. During [[kriz]] it protected the coastal return route of the [[aigaion]] task group; it did not directly take part in a flight over [[gokkale-4]].",
                      "facts":  [
                                    [
                                        "Country",
                                        "[[elonya]]"
                                    ],
                                    [
                                        "Unit type",
                                        "Coastal air defense battalion"
                                    ],
                                    [
                                        "Station",
                                        "Lerya Bay"
                                    ],
                                    [
                                        "Call sign",
                                        "Kalkan"
                                    ],
                                    [
                                        "Operational area",
                                        "[[kalyon-adalari]]"
                                    ]
                                ],
                      "sections":  [
                                       [
                                           "Formation and role",
                                           "The battalion was formed by bringing the harbor defense units around Lerya Bay under one command. Radar sites, mobile batteries and island observation posts form distinct elements. It remains under [[elonya]] national command; [[kuzey-kusagi]] membership alone does not confer authority for a joint operation."
                                       ],
                                       [
                                           "Kalyon Sea crisis",
                                           "When the [[sarpburun-dosyasi]] forged by [[elonya-istihbarati]] became the grounds for war, the battalion went on alert to defend the harbors and the return corridor of the [[aigaion]] group. It shared radar tracks with the [[mizrak]] squadron. Unidentified returns over the eastern islands were not treated as hostile until civilian traffic and military contact were investigated."
                                       ],
                                       [
                                           "Supply and limits",
                                           "Narrow harbor roads constrain ammunition and fuel delivery to the mountainous island sites. Maritime supply is coordinated with [[kallisto-ikmal]]. Its fixed sites do not cover the [[sarpburun]] coast; it has no organic relationship to Anatarian units around [[gokkale-4]]."
                                       ],
                                       [
                                           "Unit insignia",
                                           "Radar arcs and two upward arrows represent its surveillance mission; the number 21 identifies the battalion."
                                       ]
                                   ],
                      "related":  [
                                      "elonya",
                                      "kalyon-adalari",
                                      "mizrak",
                                      "aigaion",
                                      "kriz",
                                      "elonya-istihbarati",
                                      "lerya-deniz-ussu"
                                  ],
                      "imageKey":  "patch-ucaksavar",
                      "draft":  false
                  },
    "kriz":  {
                 "title":  "GÖKKALE-4 Crisis",
                 "category":  "Events",
                 "desc":  "The conflict surrounding the KARTAL-7 launch.",
                 "lead":  "The GÖKKALE-4 Crisis is a political and security crisis that became an armed conflict when the government of [[elonya]] decided to go to war against [[anatarya]]. The [[sarpburun-dosyasi]] was presented as the official justification for war; the operation’s principal objective was to prevent the launch of the [[kartal-7]] reconnaissance satellite from the [[gokkale-4]] complex. [[kuzey-kusagi]] did not participate militarily in the war because of disagreements surrounding the forged documents.",
                 "facts":  [
                               [
                                   "Defending side",
                                   "[[anatarya]]"
                               ],
                               [
                                   "Attacking side",
                                   "[[elonya]]"
                               ],
                               [
                                   "Focal point",
                                   "[[gokkale-4]]"
                               ],
                               [
                                   "Outcome",
                                   "Not yet determined"
                               ]
                           ],
                 "sections":  [
                                  [
                                      "Background",
                                      "Developed by [[anatarya]], [[kartal-7]] will increase reconnaissance capacity concerning [[elonya]]’s naval movements and island deployments. While [[gozcu-3]] continues operating in orbit, preparations for the new satellite are underway at [[gokkale-4]]."
                                  ],
                                  [
                                      "Forged documents and justification for war",
                                      "[[elonya-istihbarati]] prepared the collection of documents known as [[sarpburun-dosyasi]] under [[cam-perde]]. The dossier alleges that Anataria planned a first strike. Elonia’s government presented this allegation as its justification for war; Anataria declared the documents to be forgeries."
                                  ],
                                  [
                                      "The alliance’s position",
                                      "[[kuzey-kusagi]], of which both countries are members, could not reach consensus on the dossier’s credibility or application of the collective defense clause. No decision on joint military intervention was reached; the alliance limited itself to diplomatic contacts and an investigation. This decision does not constitute approval of Elonia’s operation."
                                  ],
                                  [
                                      "Military escalation",
                                      "The [[aigaion]] group was dispatched toward [[sarpburun]]. While Anataria protects the facility and launch program with its own forces, Elonia aims to disable the facility before the new reconnaissance capability emerges."
                                  ],
                                  [
                                      "Current situation",
                                      "As armed conflict continues around [[gokkale-4]], preparations for the launch of [[kartal-7]] remain underway. The investigation into the origins of the [[sarpburun-dosyasi]] documents is the principal subject of diplomatic talks. Consensus on joint intervention has not been achieved within [[kuzey-kusagi]]."
                                  ]
                              ],
                 "related":  [
                                 "anatarya",
                                 "elonya",
                                 "sarpburun-dosyasi",
                                 "kuzey-kusagi",
                                 "cam-perde",
                                 "gokkale-4"
                             ]
             },
    "kuzey-kusagi":  {
                         "title":  "Northern Belt Defense Pact",
                         "category":  "Organizations",
                         "desc":  "An alliance for the collective defense and security of its member states.",
                         "lead":  "The Northern Belt Defense Pact (KKSP) is an alliance providing collective defense and military coordination among [[anatarya]], [[elonya]], [[veloria]], [[dalmerya]], [[vardena]] and [[rovenya]]. The pact’s military remit is separate from the institutions of [[avren-birligi]]. [[kipraya]] and [[kuzey-kipraya]] are not pact members. War between two member states during [[kriz]] has deadlocked the collective defense decision-making process.",
                         "facts":  [
                                       [
                                           "Abbreviation",
                                           "KKSP"
                                       ],
                                       [
                                           "Type",
                                           "Collective defense alliance"
                                       ],
                                       [
                                           "Members",
                                           "[[anatarya]] · [[elonya]] · [[veloria]] · [[dalmerya]] · [[vardena]] · [[rovenya]]"
                                       ],
                                       [
                                           "Decision-making body",
                                           "Pact Council"
                                       ],
                                       [
                                           "Decision-making method",
                                           "Consensus"
                                       ],
                                       [
                                           "Kipraya",
                                           "Not a member"
                                       ],
                                       [
                                           "Position in the crisis",
                                           "No joint military intervention"
                                       ]
                                   ],
                         "sections":  [
                                          [
                                              "Foundation and purpose",
                                              "The pact was founded around the security needs that the states of the northern trade belt could not meet individually. It developed joint exercises, communications standards and joint planning mechanisms. Membership does not mean the abolition of national armies or the automatic transformation of every conflict into a collective war."
                                          ],
                                          [
                                              "Decision-making structure",
                                              "The Pact Council consists of representatives of the member states. A decision to undertake military operations in the alliance’s name requires consensus. The collective defense clause opens discussion of a request for assistance from a member under attack; the nature of the incident and the response are decided separately.\n\nIn a war between two members, priority is given to urgent consultations and examination of the dispute. This rule does not legitimize an attack by one member on another; it defines the process for deciding on which side and under what authority the alliance can act."
                                          ],
                                          [
                                              "The Sarpburun Dossier and the decision-making deadlock",
                                              "Through [[sarpburun-dosyasi]], [[elonya]] alleged that Anataria was preparing a first strike. [[anatarya]] rejected the dossier, arguing that it was the party under attack and that the collective defense clause should apply.\n\nSome members refused to make a military decision before an independent examination of the documents was completed, while others supported Anataria’s request. Elonia also withheld approval for a joint operation against itself. The forged documents thus influenced not only public opinion but also deadlocked the alliance’s decision-making process."
                                          ],
                                          [
                                              "The decision not to intervene",
                                              "The Council did not assign a joint military force, limiting itself to a call for a ceasefire, examination of the documents and diplomatic contacts. This position does not mean that Elonia’s justification for war was verified or that the pact signed a neutrality treaty.\n\nFor Anataria, the result was the failure of the expected collective defense assistance to arrive. The alliance’s institutional decision not to enter the war and the political positions of individual members are separate matters."
                                          ],
                                          [
                                              "Positions of the member states",
                                              "[[veloria]] opposed an operation before the source investigation was complete, while [[dalmerya]] focused on mediation for civilian shipping. [[vardena]] advocated preventing the conflict from spreading to land borders, while [[rovenya]] argued that Anataria’s defense request should not be rejected in advance. [[elonya]] would not accept the use of joint forces against its own operation. These divisions, together with the uncertainty surrounding [[sarpburun-dosyasi]], prevented consensus."
                                          ],
                                          [
                                              "Flag and symbol",
                                              "The six-pointed white star on a navy field symbolizes the six members sharing the collective defense obligation. The open hexagon at the center represents the council in which members have equal representation."
                                          ]
                                      ],
                         "related":  [
                                         "anatarya",
                                         "elonya",
                                         "sarpburun-dosyasi",
                                         "kriz",
                                         "veloria",
                                         "dalmerya",
                                         "vardena",
                                         "rovenya",
                                         "kipraya",
                                         "avren-birligi"
                                     ],
                         "imageKey":  "flag-kuzey-kusagi"
                     },
    "elonya-istihbarati":  {
                               "title":  "Elonia National Intelligence Directorate",
                               "category":  "Organizations",
                               "desc":  "Elonya’s foreign intelligence and strategic assessment agency.",
                               "lead":  "The Elonia National Intelligence Directorate (EUİD) is the intelligence agency that supplies foreign security assessments to the government of [[elonya]]. The [[sarpburun-dosyasi]] it prepared under [[cam-perde]] was decisive in constructing the political justification for war with [[anatarya]].",
                               "facts":  [
                                             [
                                                 "Abbreviation",
                                                 "EUİD"
                                             ],
                                             [
                                                 "Country",
                                                 "[[elonya]]"
                                             ],
                                             [
                                                 "Principal role",
                                                 "Foreign intelligence and strategic assessment"
                                             ],
                                             [
                                                 "Associated activity",
                                                 "[[cam-perde]]"
                                             ],
                                             [
                                                 "Associated dossier",
                                                 "[[sarpburun-dosyasi]]"
                                             ]
                                         ],
                               "sections":  [
                                                [
                                                    "Role and position",
                                                    "The directorate assesses military and political developments in foreign states and reports to the government and authorized security councils. Sea lanes, island deployments and [[anatarya]]’s defense programs are priority areas of its work. The agency’s assessments and the government’s decision to go to war are separate areas of responsibility."
                                                ],
                                                [
                                                    "Glass Curtain activity",
                                                    "Following the assessment that the [[kartal-7]] program would make Elonia’s military movements visible, a covert political influence activity known as [[cam-perde]] was conducted within the agency. The dossier it prepared combined existing regional disputes with a fictitious first-strike plan.\n\nThe activity aimed to secure public support for war and prevent [[kuzey-kusagi]] members from rapidly reaching a joint decision in Anataria’s favor. It is not assumed that all employees of the agency knew about the activity."
                                                ],
                                                [
                                                    "Position during the crisis",
                                                    "The directorate forwarded the dossier to the government as the basis for a national security assessment presented to the public. While [[anatarya]] rejected the documents, Elonia’s authorities invoked source confidentiality. The inability to examine the dossier independently deepened political divisions within the alliance."
                                                ]
                                            ],
                               "related":  [
                                               "elonya",
                                               "cam-perde",
                                               "sarpburun-dosyasi",
                                               "kuzey-kusagi"
                                           ]
                           },
    "sarpburun-dosyasi":  {
                              "title":  "Sarpburun Dossier",
                              "category":  "Documents",
                              "desc":  "The collection of forged documents presented by Elonia as its justification for war.",
                              "lead":  "The Sarpburun Dossier is the collective name for forged documents prepared by [[elonya-istihbarati]] under [[cam-perde]] and presented as if they belonged to the government of [[anatarya]]. The dossier alleged that Anataria was planning a first strike around [[kalyon-adalari]] and was used by the government of [[elonya]] as its justification for declaring war.",
                              "facts":  [
                                            [
                                                "Type",
                                                "Forged intelligence dossier"
                                            ],
                                            [
                                                "Prepared by",
                                                "[[elonya-istihbarati]]"
                                            ],
                                            [
                                                "Activity",
                                                "[[cam-perde]]"
                                            ],
                                            [
                                                "Targeted state",
                                                "[[anatarya]]"
                                            ],
                                            [
                                                "Political outcome",
                                                "Justification for war and deadlock in alliance decisions"
                                            ]
                                        ],
                              "sections":  [
                                               [
                                                   "Allegations",
                                                   "The dossier alleges that preparations for an attack centered on [[gokkale-4]] are underway, that the launch of [[kartal-7]] is the final stage of those preparations, and that a military operation against the island regions is imminent. The existence of an actual reconnaissance program was used to lend credibility to the fictitious allegation of an attack.\n\nKARTAL-7’s actual role is military reconnaissance. The attack plan attributed to the satellite and facility in the dossier should be distinguished from the program’s real function."
                                               ],
                                               [
                                                   "Publication and the decision for war",
                                                   "Elonya’s government presented selected portions of the dossier to the public and shared broader contents with representatives of [[kuzey-kusagi]]. The announcement was followed by the decision for war and the dispatch of the [[aigaion]] group toward [[sarpburun]]. Anataria stated that the published texts did not belong to its chain of command."
                                               ],
                                               [
                                                   "True origin and public uncertainty",
                                                   "The dossier was produced during [[cam-perde]], an activity within [[elonya-istihbarati]]. However, the origin of the documents has not been verified before the international public during the crisis. Those with access to investigation records and those following only official statements have different information.\n\nSome [[kuzey-kusagi]] members did not wish to act before the investigation was concluded. The alliance’s decision to wait does not mean that it accepted the dossier as true."
                                               ],
                                               [
                                                   "Political effects",
                                                   "The dossier framed Elonia’s attack as a response to an imminent threat and made Anataria’s request for assistance contentious. [[kriz]] is therefore both a defense of a facility and a struggle over the legitimacy of the war’s justification. When and how the documents will be publicly disproved remains beyond the current timeline."
                                               ]
                                           ],
                              "related":  [
                                              "cam-perde",
                                              "elonya-istihbarati",
                                              "kuzey-kusagi",
                                              "kriz",
                                              "kartal-7"
                                          ]
                          },
    "cam-perde":  {
                      "title":  "Glass Curtain",
                      "category":  "Events",
                      "desc":  "The covert political influence activity based on preparing the Sarpburun Dossier.",
                      "lead":  "Glass Curtain is the code name of the covert activity conducted by [[elonya-istihbarati]] to construct a justification for war against [[anatarya]]. Its principal product was [[sarpburun-dosyasi]], and it aimed to create political uncertainty that would prevent joint military intervention within [[kuzey-kusagi]].",
                      "facts":  [
                                    [
                                        "Conducted by",
                                        "[[elonya-istihbarati]]"
                                    ],
                                    [
                                        "Country",
                                        "[[elonya]]"
                                    ],
                                    [
                                        "Principal product",
                                        "[[sarpburun-dosyasi]]"
                                    ],
                                    [
                                        "Objective",
                                        "Justifying war and delaying an alliance decision"
                                    ]
                                ],
                      "sections":  [
                                       [
                                           "Background",
                                           "The [[kartal-7]] program was viewed as a development that would reduce the secrecy of Elonia’s naval movements and island bases. Since a direct attack on [[gokkale-4]] was expected to provoke a reaction within the alliance, a political justification was prepared before the military operation."
                                       ],
                                       [
                                           "Purpose and outcome",
                                           "By foregrounding the allegation that Anataria would initiate an attack, the activity portrayed Elonia’s operation as a preventive response. The debate arising from [[sarpburun-dosyasi]] prevented a collective defense decision and bought Elonia diplomatic time at the start of the operation.\n\nGlass Curtain is not a plan that guarantees military victory. Its success relates only to the political environment at the start of the war; the outcome of the defense of [[gokkale-4]] and the satellite launch is determined separately."
                                       ]
                                   ],
                      "related":  [
                                      "elonya-istihbarati",
                                      "sarpburun-dosyasi",
                                      "kriz",
                                      "kuzey-kusagi"
                                  ]
                  },
    "avrupa":  {
                   "title":  "Avren mainland",
                   "category":  "Geography",
                   "desc":  "The northwestern mainland connected to Elonia and Anataria’s Avren side.",
                   "lead":  "Avren is the northwestern mainland encompassing [[veloria]], [[dalmerya]], [[vardena]], [[rovenya]] and [[elonya]], as well as Anataria’s territory west of the strait. [[anatarya]] and [[elonya]] share a land border west of [[istara]].",
                   "facts":  [
                                 [
                                     "Type",
                                     "Continent / mainland"
                                 ],
                                 [
                                     "Associated countries",
                                     "[[elonya]] · [[anatarya]]"
                                 ],
                                 [
                                     "Critical passage",
                                     "[[istara-bogazi]]"
                                 ]
                             ],
                   "sections":  [
                                    [
                                        "States and borders",
                                        "[[veloria]] encompasses the northwestern coast, [[dalmerya]] the western peninsula, [[vardena]] the central transition belt and [[rovenya]] the northeastern coast. [[elonya]] is a peninsular state extending southward. Anataria’s Avren territory lies between Elonia and Rovenia."
                                    ],
                                    [
                                        "Political organizations",
                                        "Most states in the region are members of both [[kuzey-kusagi]] and [[avren-birligi]]. Membership of the two organizations is not identical. Although [[kipraya]] is geographically an offshore island state, it is a member of the Avren Union."
                                    ]
                                ],
                   "related":  [
                                   "veloria",
                                   "dalmerya",
                                   "vardena",
                                   "rovenya",
                                   "elonya",
                                   "anatarya",
                                   "avren-birligi"
                               ],
                   "imageKey":  "",
                   "draft":  false
               },
    "istara":  {
                   "title":  "İstara",
                   "category":  "Geography",
                   "desc":  "The strait city connecting Anataria’s two shores.",
                   "lead":  "İstara is a port and transit city within [[anatarya]] that developed around [[istara-bogazi]]. The settlement extends between the Avren side and the main peninsula. Linking the shores of two continents, the city is one of the region’s most important trade passages. Anataria’s capital is Arkent.",
                   "facts":  [
                                 [
                                     "Country",
                                     "[[anatarya]]"
                                 ],
                                 [
                                     "Location",
                                     "[[istara-bogazi]]"
                                 ],
                                 [
                                     "Avren connection",
                                     "[[avrupa]]"
                                 ],
                                 [
                                     "Function",
                                     "Port, trade and intercontinental transit"
                                 ]
                             ],
                   "sections":  [
                                    [
                                        "Geography",
                                        "The city’s western side is on Avren. Its eastern side connects to Anataria’s large main peninsula. The land border with [[elonya]] lies farther west of the city; the strait itself is not the border between the two countries."
                                    ],
                                    [
                                        "Strategic importance",
                                        "The strait crossing and port activities make the city an important link between northern and southern sea routes. [[gokkale-4]] and [[sarpburun]], meanwhile, lie farther south in a separate coastal region."
                                    ]
                                ],
                   "related":  [
                                   "anatarya",
                                   "avrupa",
                                   "istara-bogazi",
                                   "sarpburun"
                               ],
                   "imageKey":  "",
                   "draft":  false
               },
    "istara-bogazi":  {
                          "title":  "İstara Strait",
                          "category":  "Geography",
                          "desc":  "The narrow waterway connecting the Northern Sea and the Inland Sea.",
                          "lead":  "The Istara Strait is a narrow maritime chokepoint connecting the exit of the [[kalyon-denizi]] to southern shipping routes along the Avren mainland.",
                          "facts":  [
                                        [
                                            "Type",
                                            "Strait"
                                        ],
                                        [
                                            "Coastal state",
                                            "[[anatarya]]"
                                        ],
                                        [
                                            "Principal city",
                                            "[[istara]]"
                                        ],
                                        [
                                            "Waters connected",
                                            "Northern Sea · Inland Sea"
                                        ]
                                    ],
                          "sections":  [
                                           [
                                               "Maritime connections",
                                               "Ships coming from the Northern Sea reach the Inland Sea through this strait. A second passage at the southwestern outlet of the Inland Sea provides a connection to [[kalyon-denizi]]."
                                           ],
                                           [
                                               "Distinction from the land border",
                                               "Anatarya and [[elonya]] share a land border on the Avren side. This border lies west of İstara Strait; both shores around the strait belong to Anataria."
                                           ]
                                       ],
                          "related":  [
                                          "istara",
                                          "avrupa",
                                          "anatarya",
                                          "elonya",
                                          "kalyon-denizi"
                                      ],
                          "imageKey":  "",
                          "draft":  false
                      },
    "veloria":  {
                    "title":  "Federation of Velaria",
                    "category":  "Countries",
                    "desc":  "A regional state in northwestern Avren.",
                    "lead":  "The Federation of Velaria is a state in northwestern Avren with its capital at Veler. It is a federation that developed along extensive northwestern coasts and inland industrial basins. Port cities, financial centers and advanced manufacturing regions form the backbone of its economy. It is a member of [[kuzey-kusagi]] and [[avren-birligi]].",
                    "facts":  [
                                  [
                                      "Capital",
                                      "Veler"
                                  ],
                                  [
                                      "Government",
                                      "Federal parliamentary republic"
                                  ],
                                  [
                                      "Continent",
                                      "[[avrupa]]"
                                  ],
                                  [
                                      "Defense alliance",
                                      "[[kuzey-kusagi]]"
                                  ],
                                  [
                                      "Political and economic union",
                                      "[[avren-birligi]]"
                                  ]
                              ],
                    "sections":  [
                                     [
                                         "Geography",
                                         "It is a federation that developed along extensive northwestern coasts and inland industrial basins. Port cities, financial centers and advanced manufacturing regions form the backbone of its economy."
                                     ],
                                     [
                                         "History and government",
                                         "Veloria was founded through the union of regional kingdoms under a common federal assembly. Following two major continental trade crises, powers over interstate infrastructure and a common foreign policy were expanded."
                                     ],
                                     [
                                         "Economy and society",
                                         "High-value-added manufacturing, finance, optics and aerospace industries are prominent. Strong state governments subject the central government’s foreign policy decisions to parliamentary oversight."
                                     ],
                                     [
                                         "GÖKKALE-4 Crisis",
                                         "Veloria argued that joint military operations should not be approved before the source of the dossier was independently verified. This position does not mean it confirmed Elonia’s allegations; the government also demanded a halt to the attack. [[sarpburun-dosyasi]] and [[kriz]] are principal items on the country’s foreign policy agenda."
                                     ],
                                     [
                                         "Flag",
                                         "A navy field, a vertical gold stripe and a white diamond. The flag is the shared state symbol of the federation or republic."
                                     ]
                                 ],
                    "related":  [
                                    "avren-birligi",
                                    "kuzey-kusagi",
                                    "anatarya",
                                    "elonya",
                                    "kriz"
                                ],
                    "imageKey":  "flag-veloria",
                    "draft":  false
                },
    "dalmerya":  {
                     "title":  "Republic of Dalmeria",
                     "category":  "Countries",
                     "desc":  "A regional state on the western Avren coast.",
                     "lead":  "The Republic of Dalmeria is a state on the western Avren coast with its capital at Dalmera. It occupies a long peninsula extending southward from western Avren. There are pronounced economic and cultural differences between its coastal cities and mountainous interior. It is a member of [[kuzey-kusagi]] and [[avren-birligi]].",
                     "facts":  [
                                   [
                                       "Capital",
                                       "Dalmera"
                                   ],
                                   [
                                       "Government",
                                       "Parliamentary republic"
                                   ],
                                   [
                                       "Continent",
                                       "[[avrupa]]"
                                   ],
                                   [
                                       "Defense alliance",
                                       "[[kuzey-kusagi]]"
                                   ],
                                   [
                                       "Political and economic union",
                                       "[[avren-birligi]]"
                                   ]
                               ],
                     "sections":  [
                                      [
                                          "Geography",
                                          "It occupies a long peninsula extending southward from western Avren. There are pronounced economic and cultural differences between its coastal cities and mountainous interior."
                                      ],
                                      [
                                          "History and government",
                                          "The union of once-independent port republics formed Dalmeria’s political foundation. Following unification, both commercial law and regional municipal autonomy were preserved."
                                      ],
                                      [
                                          "Economy and society",
                                          "Shipbuilding, marine insurance, port operations and machinery manufacturing occupy an important place in the economy. Dalmeria considers keeping commercial routes in Kalyon open a national interest."
                                      ],
                                      [
                                          "GÖKKALE-4 Crisis",
                                          "Dalmerya pursued diplomatic contacts concerning maritime traffic and civilian evacuations; it did not unilaterally enter the war outside the alliance. It asked both sides to reduce restrictions on commercial vessels. [[sarpburun-dosyasi]] and [[kriz]] are principal items on the country’s foreign policy agenda."
                                      ],
                                      [
                                          "Flag",
                                          "A white diagonal band on a dark green field. The flag is the shared state symbol of the federation or republic."
                                      ]
                                  ],
                     "related":  [
                                     "avren-birligi",
                                     "kuzey-kusagi",
                                     "anatarya",
                                     "elonya",
                                     "kriz"
                                 ],
                     "imageKey":  "flag-dalmerya",
                     "draft":  false
                 },
    "vardena":  {
                    "title":  "Republic of Vardena",
                    "category":  "Countries",
                    "desc":  "A regional state in central Avren’s transition belt.",
                    "lead":  "The Republic of Vardena is a state in central Avren’s transition belt with its capital at Vardis. It lies north of Elonia around mountain passes and river basins. Land routes between western and eastern Avren determine the country’s strategic value. It is a member of [[kuzey-kusagi]] and [[avren-birligi]].",
                    "facts":  [
                                  [
                                      "Capital",
                                      "Vardis"
                                  ],
                                  [
                                      "Government",
                                      "Parliamentary republic"
                                  ],
                                  [
                                      "Continent",
                                      "[[avrupa]]"
                                  ],
                                  [
                                      "Defense alliance",
                                      "[[kuzey-kusagi]]"
                                  ],
                                  [
                                      "Political and economic union",
                                      "[[avren-birligi]]"
                                  ]
                              ],
                    "sections":  [
                                     [
                                         "Geography",
                                         "It lies north of Elonia around mountain passes and river basins. Land routes between western and eastern Avren determine the country’s strategic value."
                                     ],
                                     [
                                         "History and government",
                                         "Vardena was founded through the constitutional union of former border provinces. Throughout its history, control of transit routes and a policy of balancing neighboring states have been prominent."
                                     ],
                                     [
                                         "Economy and society",
                                         "Rail transport, agricultural machinery, energy transmission and transit trade are the principal economic sectors. Defense policy rests on border security and mechanisms for consensus within the alliance."
                                     ],
                                     [
                                         "GÖKKALE-4 Crisis",
                                         "Vardena is concerned that the war could spread to the Avren land border. It supported an investigative commission and a temporary ceasefire proposal, and did not accept Elonia’s allegations as an independent finding. [[sarpburun-dosyasi]] and [[kriz]] are principal items on the country’s foreign policy agenda."
                                     ],
                                     [
                                         "Flag",
                                         "White and gold horizontal stripes on a purple field. The flag is the shared state symbol of the federation or republic."
                                     ]
                                 ],
                    "related":  [
                                    "avren-birligi",
                                    "kuzey-kusagi",
                                    "anatarya",
                                    "elonya",
                                    "kriz"
                                ],
                    "imageKey":  "flag-vardena",
                    "draft":  false
                },
    "rovenya":  {
                    "title":  "Federation of Rovenia",
                    "category":  "Countries",
                    "desc":  "A regional state in northeastern Avren.",
                    "lead":  "The Federation of Rovenia is a state in northeastern Avren with its capital at Roven. It is a broad federation opening onto the western and northern shores of the Northern Sea. Forested plateaus, river cities and northern ports form distinct economic regions. It is a member of [[kuzey-kusagi]] and [[avren-birligi]].",
                    "facts":  [
                                  [
                                      "Capital",
                                      "Roven"
                                  ],
                                  [
                                      "Government",
                                      "Federal republic"
                                  ],
                                  [
                                      "Continent",
                                      "[[avrupa]]"
                                  ],
                                  [
                                      "Defense alliance",
                                      "[[kuzey-kusagi]]"
                                  ],
                                  [
                                      "Political and economic union",
                                      "[[avren-birligi]]"
                                  ]
                              ],
                    "sections":  [
                                     [
                                         "Geography",
                                         "It is a broad federation opening onto the western and northern shores of the Northern Sea. Forested plateaus, river cities and northern ports form distinct economic regions."
                                     ],
                                     [
                                         "History and government",
                                         "Rovenya’s federal structure emerged from lengthy negotiations between inland regions and coastal administrations. Collective defense and foreign trade are handled at the federal level, while education and local administration are managed regionally."
                                     ],
                                     [
                                         "Economy and society",
                                         "Energy, heavy machinery, railways and port trade are important sources of revenue. Keeping the commercial connection from the Northern Sea to İstara Strait open is a foreign policy priority."
                                     ],
                                     [
                                         "GÖKKALE-4 Crisis",
                                         "Rovenya argued that the allegations in the Sarpburun Dossier could not automatically invalidate Anataria’s request for collective defense. However, a joint operation did not begin because the necessary consensus within the pact was not reached. [[sarpburun-dosyasi]] and [[kriz]] are principal items on the country’s foreign policy agenda."
                                     ],
                                     [
                                         "Flag",
                                         "An olive green field, a navy lower band and a gold disk. The flag is the shared state symbol of the federation or republic."
                                     ]
                                 ],
                    "related":  [
                                    "avren-birligi",
                                    "kuzey-kusagi",
                                    "anatarya",
                                    "elonya",
                                    "kriz"
                                ],
                    "imageKey":  "flag-rovenya",
                    "draft":  false
                },
    "kipraya":  {
                    "title":  "Republic of Kipraya",
                    "category":  "Countries",
                    "desc":  "An Avren Union member republic governing the south of Kipraya island.",
                    "lead":  "The Republic of Kipraya is a state on [[kipraya-adasi]], south of the coast of [[anatarya]]. The government recognized across the island in practice administers its southern part; [[kuzey-kipraya]] has established a separate administration in the north. The capital, Kipra, is divided by [[kipraya-tampon-hatti]], which separates the two parts. The republic is a member of [[avren-birligi]], but not of [[kuzey-kusagi]].",
                    "facts":  [
                                  [
                                      "Capital",
                                      "South Kipra"
                                  ],
                                  [
                                      "Government",
                                      "Parliamentary republic"
                                  ],
                                  [
                                      "Area of de facto administration",
                                      "Southern part of the island"
                                  ],
                                  [
                                      "International status",
                                      "Government recognized across the island"
                                  ],
                                  [
                                      "Union membership",
                                      "[[avren-birligi]]"
                                  ],
                                  [
                                      "KKSP membership",
                                      "Not a member"
                                  ]
                              ],
                    "sections":  [
                                     [
                                         "Geography",
                                         "The southern coastal plains, inland mountainous areas and the island’s principal commercial ports are under the republic’s de facto administration. Contact with the northern part takes place through controlled crossing points."
                                     ],
                                     [
                                         "History of the division",
                                         "The institutions of the shared republic were weakened by disputes over representation and security between the two communities. Following a pro-unification coup attempt, Anatarian intervention and fighting led to the establishment of a ceasefire line. Population movements, property disputes and mutual security concerns entrenched the division."
                                     ],
                                     [
                                         "Foreign relations",
                                         "[[avren-birligi]] and [[elonya]] recognize the republic as the island’s legitimate government. Although the legal scope of union membership extends across the island, common legislation is not applied in practice in the north. Talks with [[kuzey-kipraya]] are held in neutral areas around [[kipraya-tampon-hatti]]."
                                     ],
                                     [
                                         "Economy",
                                         "Port services, tourism, marine research and agricultural exports are the principal sources of revenue. Because of the division, different inspection arrangements apply to inter-island trade and north–south crossings."
                                     ],
                                     [
                                         "Flag",
                                         "The white band on a dark gold field symbolizes sea routes, while the navy ring symbolizes the ideal of shared island citizenship."
                                     ]
                                 ],
                    "related":  [
                                    "kipraya-adasi",
                                    "kuzey-kipraya",
                                    "kipraya-tampon-hatti",
                                    "avren-birligi",
                                    "anatarya",
                                    "elonya"
                                ],
                    "imageKey":  "flag-kipraya",
                    "draft":  false
                },
    "avren-birligi":  {
                          "title":  "Avren Union",
                          "category":  "Organizations",
                          "desc":  "A political and economic union bringing together the Avren countries and Kipraya.",
                          "lead":  "The Avren Union (AB) is an interstate union working in the areas of a common market, movement, trade standards and regional development. Its members are [[veloria]], [[dalmerya]], [[vardena]], [[rovenya]], [[elonya]] and [[kipraya]]. The union’s political and economic institutions are separate from the military structure of [[kuzey-kusagi]].",
                          "facts":  [
                                        [
                                            "Abbreviation",
                                            "AB"
                                        ],
                                        [
                                            "Type",
                                            "Political and economic union"
                                        ],
                                        [
                                            "Members",
                                            "[[veloria]] · [[dalmerya]] · [[vardena]] · [[rovenya]] · [[elonya]] · [[kipraya]]"
                                        ],
                                        [
                                            "Anatarya’s status",
                                            "Partnership and customs agreements; not a full member"
                                        ],
                                        [
                                            "Principal bodies",
                                            "Avren Council · Common Assembly · Union Commission"
                                        ]
                                    ],
                          "sections":  [
                                           [
                                               "Foundation and powers",
                                               "The union was founded to reduce customs barriers to continental trade and expanded over time through common product standards and regional funds. Member states retain their armies and core foreign policy powers."
                                           ],
                                           [
                                               "Distinction from the KKSP",
                                               "[[kuzey-kusagi]] is a military defense pact. The Avren Union is an institution for political and economic integration. Kipraya’s membership in the AB while remaining outside the KKSP, and Anataria’s membership in the KKSP without full membership in the AB, illustrate this distinction."
                                           ],
                                           [
                                               "GÖKKALE-4 Crisis",
                                               "Although [[elonya]] is a union member, its decision for war was not automatically treated as union policy. The union called for an independent examination of [[sarpburun-dosyasi]] and a ceasefire, but struggled to develop a common position on possible sanctions. These debates proceed separately from the KKSP’s decision on military intervention."
                                           ],
                                           [
                                               "Flag",
                                               "Six gold diamonds form a ring on a dark petrol blue field. The six pieces symbolize the current member states, and the open center represents the shared political space."
                                           ],
                                           [
                                               "Kipraya’s status",
                                               "The membership of [[kipraya]] legally covers the entire island. Application of common legislation is suspended in the territory of [[kuzey-kipraya]], which the republic does not administer in practice. The northern administration has neither separate membership nor separate representation in the union’s institutions."
                                           ]
                                       ],
                          "related":  [
                                          "kuzey-kusagi",
                                          "veloria",
                                          "dalmerya",
                                          "vardena",
                                          "rovenya",
                                          "elonya",
                                          "kipraya"
                                      ],
                          "imageKey":  "flag-avren-birligi",
                          "draft":  false
                      },
    "k16-alaz":  {
                     "title":  "K-16 Alaz",
                     "category":  "Vehicles",
                     "desc":  "Anatarya’s single-engine multirole fighter aircraft.",
                     "lead":  "The K-16 Alaz is a single-pilot, single-engine multirole fighter aircraft used by [[anatarya]]’s air force. It is the principal platform of the modernization that began in [[hancer]] squadron in 2019. It serves in protecting the airspace around [[gokkale-4]].",
                     "facts":  [
                                   [
                                       "Country",
                                       "[[anatarya]]"
                                   ],
                                   [
                                       "Class",
                                       "Multirole fighter aircraft"
                                   ],
                                   [
                                       "Crew",
                                       "1 pilot"
                                   ],
                                   [
                                       "Engine configuration",
                                       "Single jet engine"
                                   ],
                                   [
                                       "Operator",
                                       "[[hancer]]"
                                   ],
                                   [
                                       "Squadron modernization",
                                       "2019"
                                   ]
                               ],
                     "sections":  [
                                      [
                                          "Development and service",
                                          "The introduction of Alaz began transforming the predominantly [[k4-boran]] force within [[hancer]]. The new aircraft has a cockpit configuration that allows a single pilot to manage both flight and mission systems."
                                      ],
                                      [
                                          "Missions",
                                          "It is used for airspace protection, interception and tactical air missions. During the [[gokkale-4]] crisis, it contributes to air defense of the facility area."
                                      ],
                                      [
                                          "Place within the squadron",
                                          "While Alaz carries the main burden of frontline missions, [[k4-boran]] continues to be used for training and limited duties. The two platforms represent different periods in the squadron’s history."
                                      ]
                                  ],
                     "related":  [
                                     "hancer",
                                     "k4-boran",
                                     "gokkale-4"
                                 ],
                     "imageKey":  "air-k16",
                     "draft":  false
                 },
    "ut7-ilgaz":  {
                      "title":  "UT-7 Ilgaz",
                      "category":  "Vehicles",
                      "desc":  "Utility helicopter.",
                      "lead":  "The UT-7 Ilgaz is a utility helicopter platform used by [[anatarya]]. It is suitable for personnel transport, search and rescue, and medical evacuation missions. It provides transport support to the Sarp Guard unit as required.",
                      "facts":  [
                                    [
                                        "Country",
                                        "[[anatarya]]"
                                    ],
                                    [
                                        "Class",
                                        "Utility helicopter"
                                    ],
                                    [
                                        "Crew",
                                        "2 pilots + mission crew"
                                    ],
                                    [
                                        "Associated unit",
                                        "[[sarp-muhafiz]]"
                                    ]
                                ],
                      "sections":  [
                                       [
                                           "Role",
                                           "A utility helicopter suitable for personnel transport, search and rescue, and medical evacuation missions. It provides transport support to the Sarp Guard unit as required."
                                       ],
                                       [
                                           "Service and support",
                                           "The twin-engine Ilgaz carries personnel and supplies between coastal bases and inland facilities. It provides transport support for [[sarp-muhafiz]]; for medical evacuation missions, its cabin configuration is modified to accommodate stretchers."
                                       ]
                                   ],
                      "related":  [
                                      "anatarya",
                                      "sarp-muhafiz"
                                  ],
                      "imageKey":  "air-ut7",
                      "draft":  false
                  },
    "kaya-zma":  {
                     "title":  "Kaya ZMA",
                     "category":  "Vehicles",
                     "desc":  "Armored personnel carrier.",
                     "lead":  "The Kaya ZMA is an armored personnel carrier platform used by [[anatarya]]. It is a family of wheeled armored vehicles used for road access, personnel transport and protected patrols. It provides ground mobility around the facility.",
                     "facts":  [
                                   [
                                       "Country",
                                       "[[anatarya]]"
                                   ],
                                   [
                                       "Class",
                                       "Armored personnel carrier"
                                   ],
                                   [
                                       "Crew",
                                       "3 crew + personnel compartment"
                                   ],
                                   [
                                       "Associated unit",
                                       "[[sarp-muhafiz]]"
                                   ]
                               ],
                     "sections":  [
                                      [
                                          "Role",
                                          "A family of wheeled armored vehicles used for road access, personnel transport and protected patrols. It provides ground mobility around the facility."
                                      ]
                                  ],
                     "related":  [
                                     "anatarya",
                                     "sarp-muhafiz",
                                     "demir-iz"
                                 ],
                     "imageKey":  "veh-kaya",
                     "draft":  false
                 },
    "kalkan-hss":  {
                       "title":  "Kalkan HSS",
                       "category":  "Vehicles",
                       "desc":  "Mobile air defense system.",
                       "lead":  "The Kalkan HSS is a mobile air defense system platform used by [[anatarya]]. It is a family of systems comprising radar, a command vehicle and air defense vehicles.",
                       "facts":  [
                                     [
                                         "Country",
                                         "[[anatarya]]"
                                     ],
                                     [
                                         "Class",
                                         "Mobile air defense system"
                                     ],
                                     [
                                         "Crew",
                                         "Varies by vehicle and mission crew"
                                     ],
                                     [
                                         "Associated unit",
                                         "[[sarp-muhafiz]]"
                                     ]
                                 ],
                       "sections":  [
                                        [
                                            "Role",
                                            "A family of systems comprising radar, a command vehicle and air defense vehicles."
                                        ]
                                    ],
                       "related":  [
                                       "anatarya",
                                       "sarp-muhafiz"
                                   ],
                       "imageKey":  "veh-kalkan",
                       "draft":  false
                   },
    "m12-aster":  {
                      "title":  "M-12 Aster",
                      "category":  "Vehicles",
                      "desc":  "Multirole fighter aircraft.",
                      "lead":  "The M-12 Aster is a multirole fighter aircraft platform used by [[elonya]]. Elonia uses it for air defense and air support to naval forces. It is the principal platform of the 41st Mızrak Squadron.",
                      "facts":  [
                                    [
                                        "Country",
                                        "[[elonya]]"
                                    ],
                                    [
                                        "Class",
                                        "Multirole fighter aircraft"
                                    ],
                                    [
                                        "Crew",
                                        "1 pilot"
                                    ],
                                    [
                                        "Associated unit",
                                        "[[mizrak]]"
                                    ]
                                ],
                      "sections":  [
                                       [
                                           "Role",
                                           "A multirole aircraft used by Elonia for air defense and air support to naval forces. It is the principal platform of the 41st Mızrak Squadron."
                                       ],
                                       [
                                           "Design and service",
                                           "A single-pilot delta-wing configuration and a single jet engine form Aster’s basic design. Aircraft operated by [[mizrak]] squadron protect coastal airspace and island passages."
                                       ]
                                   ],
                      "related":  [
                                      "elonya",
                                      "aigaion"
                                  ],
                      "imageKey":  "air-m12",
                      "draft":  false
                  },
    "p8-pelagos":  {
                       "title":  "P-8 Pelagos",
                       "category":  "Vehicles",
                       "desc":  "Maritime patrol aircraft.",
                       "lead":  "The P-8 Pelagos is a maritime patrol aircraft platform used by [[elonya]]. It is a turboprop aircraft assigned to maritime observation, search-and-rescue coordination and long-duration patrols. It provides information support to the AIGAION group; it is not part of a fighter squadron’s organic inventory.",
                       "facts":  [
                                     [
                                         "Country",
                                         "[[elonya]]"
                                     ],
                                     [
                                         "Class",
                                         "Maritime patrol aircraft"
                                     ],
                                     [
                                         "Crew",
                                         "2 pilots + mission crew"
                                     ],
                                     [
                                         "Associated unit",
                                         "[[aigaion]] support elements"
                                     ]
                                 ],
                       "sections":  [
                                        [
                                            "Role",
                                            "A turboprop aircraft assigned to maritime observation, search-and-rescue coordination and long-duration patrols. It provides information support to the AIGAION group; it is not part of a fighter squadron’s organic inventory."
                                        ],
                                        [
                                            "Mission configuration",
                                            "The flight crew and maritime surveillance operators work together in the cabin of the high-wing, twin-turboprop Pelagos. Observation data is relayed to coastal centers and the [[aigaion]] group. During search-and-rescue operations, it helps identify contacts at sea."
                                        ]
                                    ],
                       "related":  [
                                       "elonya",
                                       "aigaion"
                                   ],
                       "imageKey":  "air-p8",
                       "draft":  false
                   },
    "triton-botu":  {
                        "title":  "Triton Fast Boat",
                        "category":  "Vehicles",
                        "desc":  "Fast personnel transport boat.",
                        "lead":  "The Triton Fast Boat is a fast personnel transport boat platform used by [[elonya]]. It is used for short-distance sea transport, coastal patrols and personnel transfers. It is operated by the Nereus Naval Commando Group.",
                        "facts":  [
                                      [
                                          "Country",
                                          "[[elonya]]"
                                      ],
                                      [
                                          "Class",
                                          "Fast personnel transport boat"
                                      ],
                                      [
                                          "Crew",
                                          "2 crew + mission team"
                                      ],
                                      [
                                          "Associated unit",
                                          "[[nereus-komando]]"
                                      ]
                                  ],
                        "sections":  [
                                         [
                                             "Role",
                                             "A fast boat used for short-distance sea transport, coastal patrols and personnel transfers. It is operated by the Nereus Naval Commando Group."
                                         ]
                                     ],
                        "related":  [
                                        "elonya",
                                        "aigaion"
                                    ],
                        "imageKey":  "veh-triton",
                        "draft":  false
                    },
    "aigaion-firkateyni":  {
                               "title":  "AIGAION-class Frigate",
                               "category":  "Vehicles",
                               "desc":  "Multipurpose frigate.",
                               "lead":  "The AIGAION-class Frigate is a multipurpose frigate platform used by [[elonya]]. AIGAION and THALASSA belong to this frigate class. It undertakes the battle group’s escort, maritime surveillance and command liaison duties.",
                               "facts":  [
                                             [
                                                 "Country",
                                                 "[[elonya]]"
                                             ],
                                             [
                                                 "Class",
                                                 "Multipurpose frigate"
                                             ],
                                             [
                                                 "Crew",
                                                 "Ship’s operational complement"
                                             ],
                                             [
                                                 "Associated unit",
                                                 "[[aigaion]]"
                                             ]
                                         ],
                               "sections":  [
                                                [
                                                    "Role",
                                                    "The frigate class to which AIGAION and THALASSA belong. It undertakes the battle group’s escort, maritime surveillance and command liaison duties."
                                                ]
                                            ],
                               "related":  [
                                               "elonya",
                                               "aigaion"
                                           ],
                               "imageKey":  "veh-aigaion",
                               "draft":  false
                           },
    "nereus-cikarma":  {
                           "title":  "NEREUS Landing Ship",
                           "category":  "Vehicles",
                           "desc":  "Amphibious transport and support ship.",
                           "lead":  "The NEREUS Landing Ship is an amphibious transport and support ship platform used by [[elonya]]. It is an amphibious ship carrying personnel, vehicles and support supplies. It shares its name with the 8th Nereus Naval Commando Group, but the ship and unit are separate entities.",
                           "facts":  [
                                         [
                                             "Country",
                                             "[[elonya]]"
                                         ],
                                         [
                                             "Class",
                                             "Amphibious transport and support ship"
                                         ],
                                         [
                                             "Crew",
                                             "Ship’s crew + embarked unit"
                                         ],
                                         [
                                             "Associated unit",
                                             "[[aigaion]] · [[nereus-komando]]"
                                         ]
                                     ],
                           "sections":  [
                                            [
                                                "Role",
                                                "An amphibious ship carrying personnel, vehicles and support supplies. It shares its name with the 8th Nereus Naval Commando Group, but the ship and unit are separate entities."
                                            ]
                                        ],
                           "related":  [
                                           "elonya",
                                           "aigaion"
                                       ],
                           "imageKey":  "veh-nereus",
                           "draft":  false
                       },
    "kallisto-ikmal":  {
                           "title":  "KALLISTO Supply Ship",
                           "category":  "Vehicles",
                           "desc":  "Naval logistics ship.",
                           "lead":  "The KALLISTO Supply Ship is a naval logistics ship platform used by [[elonya]]. It supports the battle group’s requirements for fuel, provisions and maintenance supplies. It helps the group sustain a prolonged presence at sea.",
                           "facts":  [
                                         [
                                             "Country",
                                             "[[elonya]]"
                                         ],
                                         [
                                             "Class",
                                             "Naval logistics ship"
                                         ],
                                         [
                                             "Crew",
                                             "Ship’s operational complement"
                                         ],
                                         [
                                             "Associated unit",
                                             "[[aigaion]]"
                                         ]
                                     ],
                           "sections":  [
                                            [
                                                "Role",
                                                "A logistics ship supporting the battle group’s requirements for fuel, provisions and maintenance supplies. It helps the group sustain a prolonged presence at sea."
                                            ]
                                        ],
                           "related":  [
                                           "elonya",
                                           "aigaion"
                                       ],
                           "imageKey":  "veh-kallisto",
                           "draft":  false
                       },
    "sarp-muhafiz":  {
                         "title":  "4th Sarp Guard Company",
                         "category":  "Units",
                         "desc":  "A facility protection and response unit of the Anatarian forces.",
                         "lead":  "A company tasked with military security and response, protecting critical infrastructure on [[sarpburun]]. It focuses on the mainland connection, personnel safety and maintaining civilian evacuation arrangements during the crisis.",
                         "facts":  [
                                       [
                                           "Country",
                                           "[[anatarya]]"
                                       ],
                                       [
                                           "Unit type",
                                           "Facility protection and response unit"
                                       ],
                                       [
                                           "Call sign",
                                           "Sarp"
                                       ],
                                       [
                                           "Armored vehicle",
                                           "[[kaya-zma]]"
                                       ],
                                       [
                                           "Transport support",
                                           "[[ut7-ilgaz]]"
                                       ]
                                   ],
                         "sections":  [
                                          [
                                              "Organization and role",
                                              "A company tasked with military security and response, protecting critical infrastructure on [[sarpburun]]. It focuses on the mainland connection, personnel safety and maintaining civilian evacuation arrangements during the crisis. The unit is commanded by the national military authorities; membership in [[kuzey-kusagi]] does not automatically place it under pact command."
                                          ],
                                          [
                                              "Aircraft and vehicles",
                                              "Armored vehicle: [[kaya-zma]].\n\nTransport support: [[ut7-ilgaz]].\n\nVehicles allocated for support are considered separately from the unit’s core inventory."
                                          ],
                                          [
                                              "GÖKKALE-4 Crisis",
                                              "The unit participates in [[anatarya]]’s defense activities during [[kriz]]."
                                          ],
                                          [
                                              "Unit insignia",
                                              "The rocky peninsula and watchtower represent the geography the unit protects. The emblem bears the number 4."
                                          ]
                                      ],
                         "related":  [
                                         "anatarya",
                                         "gokkale-4",
                                         "kriz",
                                         "kaya-zma",
                                         "ut7-ilgaz"
                                     ],
                         "imageKey":  "patch-sarp-muhafiz",
                         "draft":  false
                     },
    "mizrak":  {
                   "title":  "41st Mızrak Tactical Squadron",
                   "category":  "Units",
                   "desc":  "A tactical air squadron of the Elonian forces.",
                   "lead":  "A multirole flying unit of Elonia’s air force. It conducts air missions in the area where the [[aigaion]] group operates. It is a separate organization from the maritime patrol aircraft.",
                   "facts":  [
                                 [
                                     "Country",
                                     "[[elonya]]"
                                 ],
                                 [
                                     "Unit type",
                                     "Tactical air squadron"
                                 ],
                                 [
                                     "Call sign",
                                     "Mızrak"
                                 ],
                                 [
                                     "Principal aircraft",
                                     "[[m12-aster]]"
                                 ]
                             ],
                   "sections":  [
                                    [
                                        "Organization and role",
                                        "A multirole flying unit of Elonia’s air force. It conducts air missions in the area where the [[aigaion]] group operates. It is a separate organization from the maritime patrol aircraft. The unit is commanded by the national military authorities; membership in [[kuzey-kusagi]] does not automatically place it under pact command."
                                    ],
                                    [
                                        "Aircraft and vehicles",
                                        "Principal aircraft: [[m12-aster]].\n\nVehicles allocated for support are considered separately from the unit’s core inventory."
                                    ],
                                    [
                                        "GÖKKALE-4 Crisis",
                                        "The unit participates in the regional operation of [[elonya]]’s forces during [[kriz]]."
                                    ],
                                    [
                                        "Unit insignia",
                                        "A silver spear and swept-back wings symbolize the squadron’s name and flying mission. The number 41 is used."
                                    ]
                                ],
                   "related":  [
                                   "elonya",
                                   "gokkale-4",
                                   "kriz",
                                   "m12-aster"
                               ],
                   "imageKey":  "patch-mizrak",
                   "draft":  false
               },
    "nereus-komando":  {
                           "title":  "8th Nereus Naval Commando Group",
                           "category":  "Units",
                           "desc":  "A naval special mission unit of the Elonian forces.",
                           "lead":  "One of Elonia’s special units operating in the maritime environment. It conducts activities such as personnel protection, movement by sea and search-and-rescue support on missions attached to the [[aigaion]] group.",
                           "facts":  [
                                         [
                                             "Country",
                                             "[[elonya]]"
                                         ],
                                         [
                                             "Unit type",
                                             "Naval special mission unit"
                                         ],
                                         [
                                             "Call sign",
                                             "Nereus"
                                         ],
                                         [
                                             "Fast boat",
                                             "[[triton-botu]]"
                                         ],
                                         [
                                             "Sea transport",
                                             "[[nereus-cikarma]]"
                                         ]
                                     ],
                           "sections":  [
                                            [
                                                "Organization and role",
                                                "One of Elonia’s special units operating in the maritime environment. It conducts activities such as personnel protection, movement by sea and search-and-rescue support on missions attached to the [[aigaion]] group. The unit is commanded by the national military authorities; membership in [[kuzey-kusagi]] does not automatically place it under pact command."
                                            ],
                                            [
                                                "Aircraft and vehicles",
                                                "Fast boat: [[triton-botu]].\n\nSea transport: [[nereus-cikarma]].\n\nVehicles allocated for support are considered separately from the unit’s core inventory."
                                            ],
                                            [
                                                "GÖKKALE-4 Crisis",
                                                "The unit participates in the regional operation of [[elonya]]’s forces during [[kriz]]."
                                            ],
                                            [
                                                "Unit insignia",
                                                "A diving mask and trident symbolize the maritime environment. The number 8 identifies the unit; it is a separate organization from the NEREUS ship."
                                            ]
                                        ],
                           "related":  [
                                           "elonya",
                                           "gokkale-4",
                                           "kriz",
                                           "triton-botu",
                                           "nereus-cikarma"
                                       ],
                           "imageKey":  "patch-nereus-komando",
                           "draft":  false
                       },
    "k4-boran":  {
                     "title":  "K-4 Boran",
                     "category":  "Vehicles",
                     "desc":  "Hançer squadron’s historic twin-engine interceptor.",
                     "lead":  "The K-4 Boran is a two-crew, twin-engine interceptor and tactical mission aircraft of [[anatarya]]’s air force. It was the first principal platform of [[hancer]] squadron, established in 1978. DAGGER 06, which disappeared on 17 November 1994, belongs to this aircraft family.",
                     "facts":  [
                                   [
                                       "Country",
                                       "[[anatarya]]"
                                   ],
                                   [
                                       "Role",
                                       "Interception and tactical air missions"
                                   ],
                                   [
                                       "Crew",
                                       "Pilot and weapons systems officer"
                                   ],
                                   [
                                       "Engine configuration",
                                       "Twin jet engines"
                                   ],
                                   [
                                       "Operator",
                                       "[[hancer]]"
                                   ],
                                   [
                                       "Service status",
                                       "Training and limited duties"
                                   ]
                               ],
                     "sections":  [
                                      [
                                          "Entry into service",
                                          "Boran was the principal aircraft for air defense around [[sarpburun]] during Hançer squadron’s founding period. In its two-seat cockpit, the pilot handles flight while the weapons systems officer manages the mission systems."
                                      ],
                                      [
                                          "DAGGER 06",
                                          "On 17 November 1994, a K-4 using the call sign DAGGER 06 disappeared from radar 11 seconds after its last radio message. Its wreckage was never reached. The incident is recorded in File 94-117 in the [[hancer]] archive."
                                      ],
                                      [
                                          "Transition to the K-16 era",
                                          "With the [[k16-alaz]] modernization that began in 2019, the main burden of frontline duties shifted to the new platform. Some K-4s were retained for crew training and limited missions."
                                      ]
                                  ],
                     "related":  [
                                     "hancer",
                                     "k16-alaz",
                                     "sarpburun"
                                 ],
                     "imageKey":  "air-k4",
                     "draft":  false
                 },
    "kuzey-kipraya":  {
                          "title":  "North Kipraya Republic",
                          "category":  "Countries",
                          "desc":  "The administration in northern Kipraya island, recognized only by Anataria.",
                          "lead":  "The North Kipraya Republic is a state governed through separate institutions in the north of [[kipraya-adasi]]. Its independence is recognized only by [[anatarya]]. The government of [[kipraya]] and [[avren-birligi]] regard the north as part of the Republic of Kipraya. Its administrative center is North Kipra.",
                          "facts":  [
                                        [
                                            "Administrative center",
                                            "North Kipra"
                                        ],
                                        [
                                            "Government",
                                            "Parliamentary republic"
                                        ],
                                        [
                                            "Recognition",
                                            "Only [[anatarya]]"
                                        ],
                                        [
                                            "Avren Union",
                                            "No separate membership"
                                        ],
                                        [
                                            "KKSP",
                                            "Not a member"
                                        ],
                                        [
                                            "Security partner",
                                            "[[anatarya]]"
                                        ]
                                    ],
                          "sections":  [
                                           [
                                               "Establishment and government",
                                               "Separate administrative institutions were created in the north after the ceasefire; independence was declared in the subsequent period. The assembly, municipalities and public institutions operate in the northern part. The southern government does not recognize the declaration of independence."
                                           ],
                                           [
                                               "Relations with Anataria",
                                               "Anatarya supports the north’s diplomatic recognition, transport links and security. This relationship does not grant the north KKSP membership; it has no separate representation within the pact."
                                           ],
                                           [
                                               "Society and economy",
                                               "Ports on the northern coast, universities, tourism and agriculture are the principal sectors of economic life. The recognition problem limits options for direct trade and transport; connections through Anataria are important."
                                           ],
                                           [
                                               "Kipra and crossings",
                                               "The two administrations in the capital are separated by [[kipraya-tampon-hatti]]. Crossings take place at designated gates with identity checks. Property, the rights of displaced communities and security arrangements are the principal issues in negotiations."
                                           ],
                                           [
                                               "Flag",
                                               "The two burgundy bands on a light silver field symbolize the coast and the interior, while the central burgundy diamond represents the northern administration’s shared institutions."
                                           ]
                                       ],
                          "related":  [
                                          "kipraya",
                                          "kipraya-adasi",
                                          "kipraya-tampon-hatti",
                                          "anatarya"
                                      ],
                          "imageKey":  "flag-kuzey-kipraya",
                          "draft":  false
                      },
    "kipraya-adasi":  {
                          "title":  "Kipraya Island",
                          "category":  "Geography",
                          "desc":  "An island in the Southern Sea divided between two administrations and a buffer line.",
                          "lead":  "Kipraya is an island south of the coast of [[anatarya]] and at the southeastern outlet of [[kalyon-denizi]]. [[kipraya]] administers its southern part and [[kuzey-kipraya]] its northern part. The [[kipraya-tampon-hatti]] between the two administrations also runs through the capital, Kipra.",
                          "facts":  [
                                        [
                                            "Location",
                                            "Southern Sea"
                                        ],
                                        [
                                            "Southern administration",
                                            "[[kipraya]]"
                                        ],
                                        [
                                            "Northern administration",
                                            "[[kuzey-kipraya]]"
                                        ],
                                        [
                                            "Divided city",
                                            "Kipra"
                                        ],
                                        [
                                            "Dividing line",
                                            "[[kipraya-tampon-hatti]]"
                                        ]
                                    ],
                          "sections":  [
                                           [
                                               "Physical geography",
                                               "The long eastern cape, northern coastal ridges and broad southern plains are the island’s principal geographic features. Basins between the inland uplands provide areas for agriculture and settlement."
                                           ],
                                           [
                                               "Political geography",
                                               "The ceasefire line is not an ordinary border between two internationally recognized states. While the southern government is recognized across the island, the northern administration is recognized only by Anataria. The colors on the map show areas of de facto administration."
                                           ],
                                           [
                                               "Regional importance",
                                               "The island occupies a position overlooking the sea routes opening southward from Kalyon. Tensions between Anataria and Elonia directly affect the island’s security politics, trade and reunification talks."
                                           ]
                                       ],
                          "related":  [
                                          "kipraya",
                                          "kuzey-kipraya",
                                          "kipraya-tampon-hatti",
                                          "kalyon-denizi"
                                      ],
                          "imageKey":  "",
                          "draft":  false
                      },
    "kipraya-tampon-hatti":  {
                                 "title":  "Kipraya Buffer Line",
                                 "category":  "Geography",
                                 "desc":  "The monitoring zone separating the northern and southern administrations.",
                                 "lead":  "The Kipraya Buffer Line is a monitoring zone established to preserve the ceasefire arrangements on [[kipraya-adasi]]. It extends between [[kipraya]] and [[kuzey-kipraya]] and divides the city of Kipra in two. The line is monitored by the neutral Ceasefire Observation Mission.",
                                 "facts":  [
                                               [
                                                   "Location",
                                                   "[[kipraya-adasi]]"
                                               ],
                                               [
                                                   "Status",
                                                   "Ceasefire and monitoring zone"
                                               ],
                                               [
                                                   "Monitoring",
                                                   "Ceasefire Observation Mission"
                                               ],
                                               [
                                                   "Crossings",
                                                   "Designated checkpoints"
                                               ]
                                           ],
                                 "sections":  [
                                                  [
                                                      "Ceasefire arrangements",
                                                      "The parties’ military movements are restricted along the line. The observation mission records violations and maintains communication when direct contact between the two administrations is interrupted."
                                                  ],
                                                  [
                                                      "Daily life",
                                                      "Some streets and older settlement areas in Kipra lie within the line. People cross through designated gates, while property use, maintenance work and agricultural activities are subject to special arrangements."
                                                  ],
                                                  [
                                                      "Diplomatic status",
                                                      "The buffer zone does not signify recognition of the northern administration’s independence. It preserves the ceasefire while negotiations over a final political settlement continue."
                                                  ]
                                              ],
                                 "related":  [
                                                 "kipraya-adasi",
                                                 "kipraya",
                                                 "kuzey-kipraya"
                                             ],
                                 "imageKey":  "",
                                 "draft":  false
                             },
    "kuzey-isaret":  {
                         "title":  "6th Northern Signals Battalion",
                         "category":  "Units",
                         "desc":  "Anatarya’s Sarpburun communications and early warning unit.",
                         "lead":  "The 6th Northern Signals Battalion combines radar data, radio traffic and civil warnings for [[anatarya]] forces on the [[sarpburun]] peninsula. It provides a common operational picture for forces protecting [[gokkale-4]].",
                         "facts":  [
                                       [
                                           "Country",
                                           "[[anatarya]]"
                                       ],
                                       [
                                           "Unit type",
                                           "Signals and early warning"
                                       ],
                                       [
                                           "Station",
                                           "[[sarpburun]]"
                                       ],
                                       [
                                           "Coordination",
                                           "[[hancer]] · [[sarp-muhafiz]]"
                                       ]
                                   ],
                         "sections":  [
                                          [
                                              "Formation",
                                              "Older coastal observation posts and mobile communications teams from the interior were brought under one battalion. Civilian lines at the launch complex remain separate from the military network."
                                          ],
                                          [
                                              "Role in the crisis",
                                              "During [[kriz]] it supplied air tracks to [[hancer]] and coordinated evacuation routes with [[sarp-muhafiz]]. Comparing the times and frequencies in the forged [[sarpburun-dosyasi]] against battalion logs revealed discrepancies."
                                          ],
                                          [
                                              "Doctrine",
                                              "The battalion distributes verified information rather than issuing orders. When coastal lines fail, portable relays and the [[gozcu-3]] data feed are assessed through separate channels."
                                          ]
                                      ],
                         "related":  [
                                         "anatarya",
                                         "hancer",
                                         "sarp-muhafiz",
                                         "gokkale-4",
                                         "gozcu-3",
                                         "kriz",
                                         "sarpburun-radar-istasyonu",
                                         "dosya-94-117"
                                     ],
                         "imageKey":  "patch-kuzey-isaret",
                         "draft":  false
                     },
    "doruk-ikmal":  {
                        "title":  "18th Doruk Logistics Regiment",
                        "category":  "Units",
                        "desc":  "Anatarya’s supply unit for the peninsula road corridor.",
                        "lead":  "The 18th Doruk Logistics Regiment manages fuel, medical supplies and maintenance shipments from the [[anatarya]] interior to the passes of [[sarpburun]]. Its network helps sustain [[gokkale-4]].",
                        "facts":  [
                                      [
                                          "Country",
                                          "[[anatarya]]"
                                      ],
                                      [
                                          "Unit type",
                                          "Logistics regiment"
                                      ],
                                      [
                                          "Operational area",
                                          "Arkent–Sarpburun corridor"
                                      ],
                                      [
                                          "Vehicle support",
                                          "[[kaya-zma]]"
                                      ]
                                  ],
                        "sections":  [
                                         [
                                             "Formation",
                                             "Seasonal closures of mountain passes made it necessary to coordinate scattered depots through one transport center. Military cargo and civilian emergency aid receive separate road windows."
                                         ],
                                         [
                                             "Role in the crisis",
                                             "As [[kriz]] began, bridges along the main route were secured. The regiment supported movement of [[sarp-muhafiz]] personnel; [[kaya-zma]] vehicles were assigned according to convoy security needs. Launch preparation cargo was recorded separately from other supplies."
                                         ],
                                         [
                                             "Limits",
                                             "The regiment is not a combat unit; escorts assigned to its convoys retain their own chain of command."
                                         ]
                                     ],
                        "related":  [
                                        "anatarya",
                                        "sarpburun",
                                        "gokkale-4",
                                        "sarp-muhafiz",
                                        "kaya-zma"
                                    ],
                        "imageKey":  "patch-doruk-ikmal",
                        "draft":  false
                    },
    "pelagos-devriye":  {
                            "title":  "3rd Pelagos Maritime Patrol Squadron",
                            "category":  "Units",
                            "desc":  "Elonya’s maritime surveillance squadron in the Kalyon Sea.",
                            "lead":  "The 3rd Pelagos Maritime Patrol Squadron monitors traffic between the [[elonya]] coast and the [[kalyon-adalari]] with [[p8-pelagos]] aircraft. It has a separate command and mission structure from the [[mizrak]] combat squadron.",
                            "facts":  [
                                          [
                                              "Country",
                                              "[[elonya]]"
                                          ],
                                          [
                                              "Unit type",
                                              "Maritime patrol squadron"
                                          ],
                                          [
                                              "Principal aircraft",
                                              "[[p8-pelagos]]"
                                          ],
                                          [
                                              "Coordination",
                                              "[[aigaion]]"
                                          ]
                                      ],
                            "sections":  [
                                             [
                                                 "Formation",
                                                 "The squadron developed from coastal flights serving fisheries enforcement and search and rescue, later adding military surveillance. In peacetime it passes location reports to civilian rescue centers."
                                             ],
                                             [
                                                 "Role in the crisis",
                                                 "During [[kriz]] it monitored maritime traffic east of the [[aigaion]] group. Its air and sea tracks helped the [[ucaksavar]] battalion avoid misclassifying civilian flights. Patrol aircraft were not tasked with verifying the [[sarpburun-dosyasi]] cited in the war declaration."
                                             ],
                                             [
                                                 "Aircraft and procedures",
                                                 "[[p8-pelagos]] serves long endurance maritime observation; the squadron does not undertake interception duties like [[mizrak]]."
                                             ]
                                         ],
                            "related":  [
                                            "elonya",
                                            "p8-pelagos",
                                            "mizrak",
                                            "aigaion",
                                            "ucaksavar",
                                            "kriz"
                                        ],
                            "imageKey":  "patch-pelagos-devriye",
                            "draft":  false
                        },
    "demir-iz":  {
                     "title":  "27th Demir İz Mechanized Infantry Regiment",
                     "category":  "Units",
                     "desc":  "Anatarya’s mechanized regiment defending the land approaches to Sarpburun.",
                     "lead":  "The 27th Demir İz Mechanized Infantry Regiment is an [[anatarya]] Army maneuver unit stationed at the land passes leading onto the [[sarpburun]] peninsula. It operates [[kaya-zma]] vehicles under a command separate from the [[sarp-muhafiz]] company responsible for security inside [[gokkale-4]].",
                     "facts":  [
                                   [
                                       "Country",
                                       "[[anatarya]]"
                                   ],
                                   [
                                       "Unit type",
                                       "Mechanized infantry regiment"
                                   ],
                                   [
                                       "Founded",
                                       "1986"
                                   ],
                                   [
                                       "Station",
                                       "Sarpburun land passes"
                                   ],
                                   [
                                       "Principal vehicle",
                                       "[[kaya-zma]]"
                                   ],
                                   [
                                       "Supply",
                                       "[[doruk-ikmal]]"
                                   ]
                               ],
                     "sections":  [
                                      [
                                          "History and organization",
                                          "Founded in 1986 to protect the peninsula’s connection to the interior, the regiment transitioned from infantry battalions to a mechanized organization as roads expanded and [[kaya-zma]] vehicles entered service. Its reconnaissance, infantry and maintenance elements operate as separate battalions."
                                      ],
                                      [
                                          "Defensive mission",
                                          "The regiment is not stationed inside the coastal launch site. It defends mountain passes and bridges against a land threat while keeping civilian exit routes open. It escorts [[doruk-ikmal]] convoys but does not command the logistics regiment. It receives verified reports from [[kuzey-isaret]]."
                                      ],
                                      [
                                          "GÖKKALE-4 Crisis",
                                          "During [[kriz]] it monitored both land routes onto the peninsula. As planners assessed possible [[elonya]] airborne movements, the regiment dispersed vehicles near bridge approaches in stages without halting civilian traffic. No engagement with [[iris-indirme]] is documented."
                                      ],
                                      [
                                          "Unit insignia",
                                          "Two peaks represent the mountain passes above a mechanized vehicle track. The number 27 identifies the regiment."
                                      ]
                                  ],
                     "related":  [
                                     "anatarya",
                                     "sarpburun",
                                     "kaya-zma",
                                     "doruk-ikmal",
                                     "kuzey-isaret",
                                     "sarp-muhafiz",
                                     "kriz",
                                     "iris-indirme"
                                 ],
                     "imageKey":  "patch-demir-iz",
                     "draft":  false
                 },
    "iris-indirme":  {
                         "title":  "9th Iris Airborne Brigade",
                         "category":  "Units",
                         "desc":  "Elonya’s airborne brigade assigned to the island chain.",
                         "lead":  "The 9th Iris Airborne Brigade is a rapidly deployable unit of the [[elonya]] Army. Its mission area covers the western [[kalyon-adalari]] and airfields on the Elonian mainland. It is organizationally separate from the [[nereus-komando]] naval units serving with the [[aigaion]] group.",
                         "facts":  [
                                       [
                                           "Country",
                                           "[[elonya]]"
                                       ],
                                       [
                                           "Unit type",
                                           "Airborne brigade"
                                       ],
                                       [
                                           "Founded",
                                           "1991"
                                       ],
                                       [
                                           "Operational area",
                                           "Western [[kalyon-adalari]]"
                                       ],
                                       [
                                           "Air support",
                                           "[[mizrak]]"
                                       ],
                                       [
                                           "Naval coordination",
                                           "[[aigaion]]"
                                       ]
                                   ],
                         "sections":  [
                                          [
                                              "Formation and training",
                                              "Founded in 1991 to reinforce island garrisons quickly, the brigade comprises parachute battalions, light reconnaissance elements and a medical company. It lacks heavy armored vehicles and depends on outside supply for prolonged land operations."
                                          ],
                                          [
                                              "Island operations doctrine",
                                              "An airborne movement is planned either as a landing at a secured airfield or by parachute. Flight corridors are coordinated with the [[ucaksavar]] radar network and the [[mizrak]] squadron. [[pelagos-devriye]] supplies information on maritime traffic but is not subordinate to the brigade."
                                          ],
                                          [
                                              "GÖKKALE-4 Crisis",
                                              "Following publication of the [[sarpburun-dosyasi]], the brigade went on alert along the western islands. One battalion remained in reserve at mainland airfields while other elements protected island runways. No airborne operation over [[sarpburun]] is recorded; a readiness order did not itself constitute execution of a war plan."
                                          ],
                                          [
                                              "Unit insignia",
                                              "An open parachute canopy and outstretched wings represent the airborne mission; the number 9 identifies the brigade."
                                          ]
                                      ],
                         "related":  [
                                         "elonya",
                                         "kalyon-adalari",
                                         "ucaksavar",
                                         "mizrak",
                                         "pelagos-devriye",
                                         "aigaion",
                                         "nereus-komando",
                                         "kriz",
                                         "demir-iz"
                                     ],
                         "imageKey":  "patch-iris-indirme",
                         "draft":  false
                     },
    "sarpburun-radar-istasyonu":  {
                                      "title":  "Sarpburun Radar Station",
                                      "category":  "Facilities",
                                      "desc":  "Anatarya\u0027s early warning radar installation overlooking Sarpburun and the Kalyon Sea.",
                                      "lead":  "Sarpburun Radar Station is an [[anatarya]] early warning and coastal surveillance facility perched upon the high ridges of the [[sarpburun]] peninsula. Located on the bluffs east of the [[gokkale-4]] complex, it is operated by [[kuzey-isaret]]. It relays real-time radar tracks of the Kalyon Sea and approach corridors to [[hancer]] and air defense forces.",
                                      "facts":  [
                                                    [
                                                        "Facility type",
                                                        "Early warning and coastal radar"
                                                    ],
                                                    [
                                                        "Operating country",
                                                        "[[anatarya]]"
                                                    ],
                                                    [
                                                        "Operating unit",
                                                        "[[kuzey-isaret]]"
                                                    ],
                                                    [
                                                        "Location",
                                                        "[[sarpburun]] mountain ridges"
                                                    ],
                                                    [
                                                        "Data distribution",
                                                        "[[hancer]] · [[kalkan-hss]] · [[gokkale-4]]"
                                                    ]
                                                ],
                                      "sections":  [
                                                       [
                                                           "Construction and equipment",
                                                           "Constructed to replace legacy coastal observation posts, the station features digital phased-array radars and microwave link towers. It comprises weather-hardened radomes, redundant power generation, and underground communications bunkers. Perimeter security is maintained by [[sarp-muhafiz]]."
                                                       ],
                                                       [
                                                           "Operational role",
                                                           "The facility fuses air and surface tracks into a unified tactical picture. During the [[kriz]], it provided the initial tracking data on advancing [[elonya]] forces. Radar logs from this station proved vital in refuting the flight timelines alleged in the forged [[sarpburun-dosyasi]]."
                                                       ],
                                                       [
                                                           "Connection to Black November",
                                                           "During the [[kara-kasim]] of 17 November 1994, the final telemetry loss of DAGGER 06 was recorded by this station\u0027s analog predecessor. In 2036, an emergency beacon detected on the identical frequency was logged here and forwarded to the [[dosya-94-117]] investigation."
                                                       ]
                                                   ],
                                      "related":  [
                                                      "gokkale-4",
                                                      "sarpburun",
                                                      "kuzey-isaret",
                                                      "hancer",
                                                      "kalkan-hss",
                                                      "kara-kasim",
                                                      "dosya-94-117",
                                                      "kriz"
                                                  ],
                                      "imageKey":  "",
                                      "draft":  false
                                  },
    "kara-kasim":  {
                       "title":  "Black November Incident",
                       "category":  "Events",
                       "desc":  "The mysterious disappearance of DAGGER 06 off Sarpburun on 17 November 1994.",
                       "lead":  "The Black November Incident was a military aviation mystery occurring on 17 November 1994, when an [[anatarya]] Air Force [[k4-boran]] flying under callsign DAGGER 06 from the [[hancer]] vanished from radar off the coast of [[sarpburun]]. Just 11 seconds after its last radio transmission, all radar and telemetry contact ceased; no trace of the airframe or its two-man crew was ever recovered. The event sparked a lasting squadron tradition and formed the basis of the [[dosya-94-117]] investigation.",
                       "facts":  [
                                     [
                                         "Date",
                                         "17 November 1994"
                                     ],
                                     [
                                         "Involved unit",
                                         "[[hancer]]"
                                     ],
                                     [
                                         "Missing aircraft",
                                         "DAGGER 06 ([[k4-boran]])"
                                     ],
                                     [
                                         "Location",
                                         "Off [[sarpburun]], [[kalyon-denizi]]"
                                     ],
                                     [
                                         "Crew",
                                         "Pilot Captain and Weapons System Officer"
                                     ],
                                     [
                                         "Investigation",
                                         "[[dosya-94-117]]"
                                     ],
                                     [
                                         "Motto",
                                         "Those who never returned remain on watch."
                                     ]
                                 ],
                       "sections":  [
                                        [
                                            "Sortie and disappearance",
                                            "Departing at 16:42 for a routine coastal patrol, DAGGER 06 flew low-level 18 nautical miles west of the Sarpburun Peninsula under clear weather conditions. At 17:03, the pilot confirmed navigation waypoints with flight control. Eleven seconds later, the radar return abruptly disappeared without any distress broadcast or ejection beacon activation."
                                        ],
                                        [
                                            "Search efforts and absence of wreckage",
                                            "Naval and coastal units conducted exhaustive search operations over several weeks. No oil slick, canopy debris, or survival equipment was located. Hypotheses ranging from catastrophic structural failure to unrecorded regional anomalies remained unresolved."
                                        ],
                                        [
                                            "Squadron heritage and the 2036 Signal",
                                            "Following the loss, a memorial plaque was mounted on the squadron operations wall: \u0027132ND TACTICAL SQUADRON / DAGGER 06 / 17 NOVEMBER 1994 / Those who never returned remain on watch.\u0027 In 2036, amidst the emerging [[kriz]], a fleeting signal matching DAGGER 06\u0027s emergency transponder was logged near the same bearings, reopening inquiries under [[dosya-94-117]]."
                                        ]
                                    ],
                       "related":  [
                                       "hancer",
                                       "k4-boran",
                                       "sarpburun",
                                       "sarpburun-radar-istasyonu",
                                       "dosya-94-117",
                                       "kriz"
                                   ],
                       "imageKey":  "patch-hancer",
                       "draft":  false
                   },
    "dosya-94-117":  {
                         "title":  "Classified File 94-117",
                         "category":  "Documents",
                         "desc":  "Top secret investigation into the loss of DAGGER 06 and the 2036 beacon transmission.",
                         "lead":  "Classified File 94-117 is a restricted dossier maintained by the [[anatarya]] Air Force Command and Intelligence Directorate investigating the 17 November 1994 loss of DAGGER 06 and the anomalous transmission received on identical frequencies in 2036. The file compiles telemetry logs, radar strip charts, signal intercepts, and assessments of potential electronic warfare by [[elonya-istihbarati]].",
                         "facts":  [
                                       [
                                           "Document code",
                                           "GÖK-HVK-94-117/TS"
                                       ],
                                       [
                                           "Classification",
                                           "Top Secret (Authorized Eyes Only)"
                                       ],
                                       [
                                           "Compiling authority",
                                           "Anatarya Air Force and Intelligence Directorate"
                                       ],
                                       [
                                           "Linked event",
                                           "[[kara-kasim]]"
                                       ],
                                       [
                                           "Associated units",
                                           "[[hancer]] · [[kuzey-isaret]]"
                                       ],
                                       [
                                           "Key milestones",
                                           "1994 / 2036"
                                       ]
                                   ],
                         "sections":  [
                                          [
                                              "Origin of the inquiry (1994)",
                                              "The dossier was initiated following the fruitless recovery efforts of the [[kara-kasim]]. Initial technical entries focused on whether hostile jamming or environmental ducting contributed to the 11-second telemetry breakdown off [[sarpburun]]. The formal finding concluded inconclusive."
                                          ],
                                          [
                                              "The 2036 Signal and case reopening",
                                              "In early 2036, sensors at [[sarpburun-radar-istasyonu]] and [[kuzey-isaret]] logged a fractional-second burst on 243.0 MHz military distress band. Spectral analysis matched the specific oscillator drift signature of DAGGER 06\u0027s legacy beacon."
                                          ],
                                          [
                                              "Hypotheses and crisis implications",
                                              "Investigative memoranda explore two primary possibilities: either a spoofing experiment by [[elonya-istihbarati]] during the rollout of [[cam-perde]] using vintage telemetry datasets, or an unexplained reactivation of an elusive transmitter. The inquiry remains unclosed."
                                          ]
                                      ],
                         "related":  [
                                         "kara-kasim",
                                         "hancer",
                                         "k4-boran",
                                         "elonya-istihbarati",
                                         "sarpburun-radar-istasyonu",
                                         "cam-perde",
                                         "kriz"
                                     ],
                         "imageKey":  "",
                         "draft":  false
                     },
    "ostenya":  {
                    "title":  "United States of Ostanya",
                    "category":  "Countries",
                    "desc":  "Transoceanic superpower and operator of the ARGUS global positioning constellation.",
                    "lead":  "The United States of Ostanya (USO) is a transoceanic military, technological, and economic superpower occupying a vast continent west of Avren. As the champion of maritime free trade and cutting-edge aerospace standards, Ostanya commands nuclear supercarrier strike groups and operates the ARGUS satellite constellation, projecting undisputed naval and orbital presence. A close strategic partner of [[elonya]], Ostanya declared \u0027freedom of navigation patrols\u0027 in the Kalyon Sea during the [[kriz]], dispatching guided missile cruisers and nuclear attack submarines to the periphery.",
                    "facts":  [
                                  [
                                      "Government",
                                      "Federal presidential republic"
                                  ],
                                  [
                                      "Capital",
                                      "Port Sterling"
                                  ],
                                  [
                                      "Global role",
                                      "Military and economic superpower"
                                  ],
                                  [
                                      "Regional partners",
                                      "[[elonya]] · [[kuzey-kusagi]]"
                                  ],
                                  [
                                      "Key systems",
                                      "ARGUS Satellite Constellation · 7th Fleet"
                                  ]
                              ],
                    "sections":  [
                                     [
                                         "Global doctrine and naval supremacy",
                                         "Ostanyan security doctrine centers upon keeping international sea lanes and strategic chokepoints open. Megacorporations like \u0027Iron Dome Aerospace\u0027 and \u0027General Dynamics-Osten\u0027 supply fifth-generation stealth fighters and precision munitions worldwide."
                                     ],
                                     [
                                         "Posture during the GÖKKALE-4 Crisis",
                                         "Anataria\u0027s independent orbital program at [[sarpburun]] was labeled by Ostanya as an uncontrolled escalation threatening its ally Elonia. While avoiding formal involvement in the declaration of war, Ostanya has supplied real-time reconnaissance feeds to the Elonian Navy."
                                     ]
                                 ],
                    "related":  [
                                    "elonya",
                                    "aigaion",
                                    "ursya",
                                    "huaxia",
                                    "gokkale-4",
                                    "kriz"
                                ],
                    "imageKey":  "",
                    "draft":  false
                },
    "ursya":  {
                  "title":  "Ursian Federation",
                  "category":  "Countries",
                  "desc":  "Continental superpower spanning northern tundras with vast heavy industry and nuclear arsenals.",
                  "lead":  "The Ursian Federation is a vast continental superpower spanning the frozen tundras, taiga, and interior mountain ranges northeast of Avren. Holding the world\u0027s largest landmass and colossal energy reserves, Ursya is recognized for heavy metallurgy, rocket propulsion, and strategic deterrence. Historically maintaining balanced defense ties with [[anatarya]], Ursya licensed the engine designs and baseline telemetry for Anataria\u0027s workhorse [[k4-boran]] strike jets and heavy space launch stages.",
                  "facts":  [
                                [
                                    "Government",
                                    "Federal semi-presidential republic"
                                ],
                                [
                                    "Capital",
                                    "Severograd"
                                ],
                                [
                                    "Global role",
                                    "Continental superpower and energy titan"
                                ],
                                [
                                    "Defense exports",
                                    "K-4 Boran jet engines · Heavy rocket stages"
                                ],
                                [
                                    "Doctrine",
                                    "Strategic depth and multipolar balance"
                                ]
                            ],
                  "sections":  [
                                   [
                                       "Aerospace and propulsion heritage",
                                       "Ursian design philosophy emphasizes rugged airframes and high-output engines capable of austere operations. State combines like \u0027Sever-Aviatsiya\u0027 produce some of the most potent solid and liquid rocket boosters in existence."
                                   ],
                                   [
                                       "Geopolitical counterweight in the crisis",
                                       "Viewing Ostanyan-Elonian naval maneuvers as an encirclement of southern flanks, Ursya has provided Anataria with passive electronic counter-reconnaissance components to balance Western coalition pressure."
                                   ]
                               ],
                  "related":  [
                                  "anatarya",
                                  "k4-boran",
                                  "hancer",
                                  "ostenya",
                                  "gokkale-4",
                                  "kriz"
                              ],
                  "imageKey":  "",
                  "draft":  false
              },
    "huaxia":  {
                   "title":  "People\u0027s Republic of Huaxia",
                   "category":  "Countries",
                   "desc":  "Eastern manufacturing, microelectronics, and orbital component titan.",
                   "lead":  "The People\u0027s Republic of Huaxia is an eastern industrial titan and demographic heavyweight serving as the primary foundry of global electronics. Producing the lion\u0027s share of high-purity silicon wafers, rare earth minerals, and solar array wafers, Huaxia supplied the dense photovoltaic cells and optical beam splitters utilized on [[gokkale-4]].",
                   "facts":  [
                                 [
                                     "Government",
                                     "Unitary socialist republic"
                                 ],
                                 [
                                     "Capital",
                                     "Tiandu"
                                 ],
                                 [
                                     "Global role",
                                     "Global electronics and manufacturing center"
                                 ],
                                 [
                                     "Program share",
                                     "GÖKKALE-4 high-efficiency solar cells"
                                 ],
                                 [
                                     "Foreign policy",
                                     "Pragmatic neutrality and commercial corridors"
                                 ]
                             ],
                   "sections":  [
                                    [
                                        "Semiconductor and materials leverage",
                                        "Both Anataria and Elonia rely on Huaxia\u0027s semiconductor fabrication plants for radar chips and signal processors, giving Huaxia quiet commercial leverage over regional military modernization."
                                    ],
                                    [
                                        "Commercial neutrality in the conflict",
                                        "Calling for maritime stability in the Kalyon Sea, Huaxia maintains open trade with all belligerents while honoring commercial shipments of dual-use telecommunication components."
                                    ]
                                ],
                   "related":  [
                                   "anatarya",
                                   "elonya",
                                   "gokkale-4",
                                   "ostenya",
                                   "ursya",
                                   "kriz"
                               ],
                   "imageKey":  "",
                   "draft":  false
               },
    "anasas":  {
                   "title":  "ANASAS Aerospace",
                   "category":  "Organizations",
                   "desc":  "Anataria Aerospace Industries; the nation\u0027s premier aircraft and launch system prime contractor.",
                   "lead":  "ANASAS (Anataria Aerospace Industries) is the industrial cornerstone of [[anatarya]]\u0027s sovereignty in the skies and orbital space. Founded following historical foreign arms embargoes, the company is the lead integrator of the [[k21-kaan]] 5th-generation stealth fighter, the [[simsek-iii]] space launch vehicle, and the primary bus structures for the [[gokkale-4]] satellite constellation.",
                   "facts":  [
                                 [
                                     "Founded",
                                     "1975"
                                 ],
                                 [
                                     "Headquarters",
                                     "Arkent Aerospace Valley"
                                 ],
                                 [
                                     "State affiliate",
                                     "[[anatarya]]"
                                 ],
                                 [
                                     "Flagship programs",
                                     "[[k21-kaan]] · [[simsek-iii]] · [[gokkale-4]]"
                                 ],
                                 [
                                     "Industrial partners",
                                     "[[sarpsan]] · [[korsan]] · [[baykut]]"
                                 ]
                             ],
                   "sections":  [
                                    [
                                        "Origin and self-reliance doctrine",
                                        "Formed in response to exterior supply cutoffs, ANASAS advanced from licensed component overhauls to carbon-composite airframe manufacturing and cleanroom space integration."
                                    ],
                                    [
                                        "Fifth-generation fighter engineering",
                                        "With the K-21 program, ANASAS joined an elite handful of aerospace firms capable of constructing super-cruising stealth fighters with internal weapons bays."
                                    ]
                                ],
                   "related":  [
                                   "anatarya",
                                   "k21-kaan",
                                   "gokkale-4",
                                   "simsek-iii",
                                   "sarpsan",
                                   "korsan"
                               ],
                   "imageKey":  "",
                   "draft":  false
               },
    "baykut":  {
                   "title":  "Baykut Defense Technologies",
                   "category":  "Organizations",
                   "desc":  "Pioneer of autonomous combat drones, AI flight algorithms, and unmanned stealth aircraft.",
                   "lead":  "Baykut Defense Technologies is a world-renowned [[anatarya]] defense firm pioneering armed unmanned aerial vehicles (UCAVs) and autonomous combat systems. Producing the iconic [[bayrak-t2]] tactical drone, the twin-turboprop [[akin-3]] heavy strike drone, and the [[al-elma]] supersonic unmanned stealth jet, Baykut has fundamentally transformed modern maritime and aerial warfare doctrines.",
                   "facts":  [
                                 [
                                     "Founded",
                                     "1988"
                                 ],
                                 [
                                     "Headquarters",
                                     "Arkent Autonomous Systems Campus"
                                 ],
                                 [
                                     "State affiliate",
                                     "[[anatarya]]"
                                 ],
                                 [
                                     "Core platforms",
                                     "[[bayrak-t2]] · [[akin-3]] · [[al-elma]]"
                                 ],
                                 [
                                     "Core competencies",
                                     "Autonomous flight · Machine vision · Loyal wingman swarming"
                                 ]
                             ],
                   "sections":  [
                                    [
                                        "Agile innovation and software independence",
                                        "Operating free of traditional bureaucratic drag, Baykut builds mission avionics, flight-control software, and sensor fusion algorithms in-house, eliminating dependency on foreign electronics."
                                    ],
                                    [
                                        "Tactical impact in the 2036 Crisis",
                                        "During the Kalyon Sea tensions, relentless patrols by Baykut drones tracked Elonian naval detachments around the clock, providing real-time target vectors to coastal batteries."
                                    ]
                                ],
                   "related":  [
                                   "anatarya",
                                   "bayrak-t2",
                                   "akin-3",
                                   "al-elma",
                                   "k21-kaan",
                                   "kriz"
                               ],
                   "imageKey":  "",
                   "draft":  false
               },
    "sarpsan":  {
                    "title":  "SARPSAN Electronics",
                    "category":  "Organizations",
                    "desc":  "National designer of phased-array radars, electronic warfare suites, and electro-optical sensors.",
                    "lead":  "SARPSAN (Sarpburun Defense Electronics) is the premier electronic warfare and radar design house for the [[anatarya]] Armed Forces. It designs the phased-array surveillance radars at [[sarpburun-radar-istasyonu]], the nose-mounted AESA radar for the [[k21-kaan]], and optical targeting pods deployed across unmanned fleets.",
                    "facts":  [
                                  [
                                      "Founded",
                                      "1976"
                                  ],
                                  [
                                      "Headquarters",
                                      "Arkent Radar \u0026 Avionics Park"
                                  ],
                                  [
                                      "State affiliate",
                                      "[[anatarya]]"
                                  ],
                                  [
                                      "Core capabilities",
                                      "AESA Radar · Electronic Warfare · Cryptology"
                                  ],
                                  [
                                      "Equipped units",
                                      "[[sarpburun-radar-istasyonu]] · [[kalkan-hss]] · [[k21-kaan]]"
                                  ]
                              ],
                    "sections":  [
                                     [
                                         "Jam-resistant signal engineering",
                                         "SARPSAN developed the agile frequency-hopping waveforms that counter Elonian jamming attempts originating from the AIGAION battle group."
                                     ],
                                     [
                                         "Analysis of File 94-117",
                                         "In 2036, SARPSAN laboratories conducted the definitive spectral extraction of the anomalous 243.0 MHz transmission associated with [[dosya-94-117]]."
                                     ]
                                 ],
                    "related":  [
                                    "anatarya",
                                    "sarpburun-radar-istasyonu",
                                    "kalkan-hss",
                                    "k21-kaan",
                                    "dosya-94-117"
                                ],
                    "imageKey":  "",
                    "draft":  false
                },
    "korsan":  {
                   "title":  "KORSAN Missile Systems",
                   "category":  "Organizations",
                   "desc":  "Manufacturer of solid rocket motors, air defense interceptors, and precision smart munitions.",
                   "lead":  "KORSAN (Kor Munitions \u0026 Rocket Systems) is the primary rocket propulsion and guided ordnance contractor in [[anatarya]]. It manufactures interceptors for the [[kalkan-hss]] system, solid-propellant booster stages for the [[simsek-iii]] space rocket, and laser-guided micro-munitions for the [[bayrak-t2]] fleet.",
                   "facts":  [
                                 [
                                     "Founded",
                                     "1984"
                                 ],
                                 [
                                     "Headquarters",
                                     "Arkent Rocketry Complex"
                                 ],
                                 [
                                     "State affiliate",
                                     "[[anatarya]]"
                                 ],
                                 [
                                     "Product lines",
                                     "Kalkan interceptor missiles · MAM precision glide munitions"
                                 ],
                                 [
                                     "Crisis readiness",
                                     "Round-the-clock replenishment of coastal batteries"
                                 ]
                             ],
                   "sections":  [
                                    [
                                        "Solid propellant breakthrough",
                                        "By mastering advanced composite propellants, KORSAN enabled high-burn-rate rocket motors crucial for both rapid-climb air defense and orbital satellite insertion."
                                    ]
                                ],
                   "related":  [
                                   "anatarya",
                                   "kalkan-hss",
                                   "simsek-iii",
                                   "gokkale-4",
                                   "bayrak-t2"
                               ],
                   "imageKey":  "",
                   "draft":  false
               },
    "k21-kaan":  {
                     "title":  "K-21 KAAN",
                     "category":  "Vehicles",
                     "desc":  "Anataria’s twin-engine, low-observable 5th-generation national combat stealth fighter.",
                     "lead":  "The K-21 KAAN is a twin-engine, super-cruising, low-observable (stealth) 5th-generation air superiority and deep strike fighter developed by [[anasas]] for the [[anatarya]] Air Force. Featuring internal weapons bays, an advanced [[sarpsan]] AESA radar, and an integrated helmet-mounted cueing system, the KAAN replaces legacy [[k4-boran]] aircraft. During the 2036 [[kriz]], initial operational prototypes were mobilized at Arkent Air Base, conducting deterrent combat patrols over Sarpburun and the Kalyon Sea.",
                     "facts":  [
                                   [
                                       "Aircraft type",
                                       "5th-gen multirole stealth fighter"
                                   ],
                                   [
                                       "Manufacturer",
                                       "[[anasas]] (avionics: [[sarpsan]] · [[korsan]])"
                                   ],
                                   [
                                       "Operator",
                                       "[[anatarya]] Air Force ([[hancer]])"
                                   ],
                                   [
                                       "Max speed",
                                       "Mach 1.8+ (Supercruise capable)"
                                   ],
                                   [
                                       "Combat radius",
                                       "1,100 nautical miles"
                                   ],
                                   [
                                       "Sensors",
                                       "SARPSAN Nose AESA Radar · Electro-Optical Targeting (EOTS)"
                                   ],
                                   [
                                       "Weapons bays",
                                       "Internal fuselage and lateral stations (Stealth configuration)"
                                   ]
                               ],
                     "sections":  [
                                      [
                                          "Stealth architecture and design",
                                          "Engineered to penetrate dense enemy radar networks undetected, the KAAN incorporates radar-absorbent composite skin, angled engine intakes, and serrated bay doors to minimize radar cross-section."
                                      ],
                                      [
                                          "Combat debut in the 2036 Crisis",
                                          "Following the forward deployment of the Elonian AIGAION frigate, two K-21 prototypes scrambled from Arkent on combat air patrol. Inability of Elonian radars to acquire weapons-grade locks proved pivotal in checking coalition escalation."
                                      ]
                                  ],
                     "related":  [
                                     "anatarya",
                                     "hancer",
                                     "anasas",
                                     "sarpsan",
                                     "k4-boran",
                                     "kriz"
                                 ],
                     "imageKey":  "air-k16",
                     "draft":  false
                 },
    "bayrak-t2":  {
                      "title":  "BAYRAK-T2",
                      "category":  "Vehicles",
                      "desc":  "Anataria’s 27-hour endurance tactical armed reconnaissance drone system.",
                      "lead":  "The BAYRAK-T2 is a medium-altitude long-endurance (MALE) tactical unmanned combat aerial vehicle developed by [[baykut]] Defense. Characterized by its inverted V-tail, redundant avionics, and autonomous triple-redundant flight control, the T2 carries four laser-guided smart micro-munitions engineered by [[korsan]]. Throughout the 2036 [[kriz]], T2 squadrons maintained relentless day-and-night surveillance over the Kalyon Sea and the Istara Strait.",
                      "facts":  [
                                    [
                                        "Vehicle type",
                                        "Tactical Armed Drone (UCAV)"
                                    ],
                                    [
                                        "Manufacturer",
                                        "[[baykut]] Defense"
                                    ],
                                    [
                                        "Operators",
                                        "[[anatarya]] Army, Navy \u0026 Air Force"
                                    ],
                                    [
                                        "Endurance",
                                        "27 hours continuous"
                                    ],
                                    [
                                        "Service ceiling",
                                        "25,000 ft"
                                    ],
                                    [
                                        "Armament",
                                        "4 x KOR-SAN Laser-Guided Smart Munitions"
                                    ]
                                ],
                      "sections":  [
                                       [
                                           "Maritime reconnaissance reach",
                                           "Featuring faint acoustic and infrared signatures, the T2 loiters above sea lanes for over a day without risking pilot life, identifying surface vessels from 40 kilometers away via SARPSAN optical suites."
                                       ],
                                       [
                                           "Counter-blockade operations",
                                           "The transit vectors of the AIGAION battle group were continuously relayed by orbiting T2s, frustrating Elonian attempts to establish covert amphibious footholds."
                                       ]
                                   ],
                      "related":  [
                                      "anatarya",
                                      "baykut",
                                      "korsan",
                                      "akin-3",
                                      "al-elma",
                                      "kriz"
                                  ],
                      "imageKey":  "",
                      "draft":  false
                  },
    "akin-3":  {
                   "title":  "AKIN-3",
                   "category":  "Vehicles",
                   "desc":  "Twin-turboprop heavy strategic strike UCAV capable of launching standoff cruise missiles.",
                   "lead":  "The AKIN-3 is a high-altitude long-endurance (HALE) twin-turboprop heavy strike unmanned aerial vehicle developed by [[baykut]] Defense. Boasting an unprecedented 1,500 kg payload capacity comparable to light attack jets, the AKIN-3 features a nose AESA radar, satellite communications link, and carriage capability for standoff cruise missiles.",
                   "facts":  [
                                 [
                                     "Vehicle type",
                                     "Heavy Combat UCAV"
                                 ],
                                 [
                                     "Manufacturer",
                                     "[[baykut]] Defense"
                                 ],
                                 [
                                     "Powerplant",
                                     "2 x Turboprop engines"
                                 ],
                                 [
                                     "Payload",
                                     "1,500 kg"
                                 ],
                                 [
                                     "Ceiling",
                                     "40,000 ft"
                                 ],
                                 [
                                     "Connectivity",
                                     "Encrypted SATCOM via GÖKKALE Constellation"
                                 ]
                             ],
                   "sections":  [
                                    [
                                        "Standoff strike potential",
                                        "The AKIN-3 can carry long-range precision cruise missiles under its heavy inboard pylons, allowing it to neutralize high-value coastal targets well beyond the engagement envelope of enemy surface-to-air missiles."
                                    ],
                                    [
                                        "Direct space telemetry tie-in",
                                        "Through an onboard steerable dish antenna, the platform routes mission data directly through the [[gokkale-4]] orbital relay for real-time strategic battle management."
                                    ]
                                ],
                   "related":  [
                                   "anatarya",
                                   "baykut",
                                   "bayrak-t2",
                                   "al-elma",
                                   "gokkale-4",
                                   "kriz"
                               ],
                   "imageKey":  "",
                   "draft":  false
               },
    "al-elma":  {
                    "title":  "AL-ELMA K-01",
                    "category":  "Vehicles",
                    "desc":  "AI-driven supersonic unmanned stealth combat fighter jet.",
                    "lead":  "The AL-ELMA K-01 is a single-engine supersonic unmanned combat stealth fighter (UCAV-Jet) engineered by [[baykut]] Defense. Designed with low-observable canards, radar-absorbent materials, and an aggressive flight envelope, AL-ELMA is crafted for autonomous air-to-air dogfighting, air defense suppression (SEAD), and cooperative \u0027loyal wingman\u0027 operations alongside the manned [[k21-kaan]].",
                    "facts":  [
                                  [
                                      "Vehicle type",
                                      "Unmanned Stealth Combat Jet"
                                  ],
                                  [
                                      "Manufacturer",
                                      "[[baykut]] Defense"
                                  ],
                                  [
                                      "Propulsion",
                                      "Afterburning turbofan engine"
                                  ],
                                  [
                                      "Speed",
                                      "Supersonic (Mach 1.2)"
                                  ],
                                  [
                                      "Tactical role",
                                      "Loyal wingman to K-21 KAAN · Autonomous dogfighting"
                                  ],
                                  [
                                      "Basing",
                                      "Conventional runways and short-deck amphibious carriers"
                                  ]
                              ],
                    "sections":  [
                                     [
                                         "Next-generation unmanned air combat",
                                         "Unconstrained by human G-force limits, AL-ELMA executes instantaneous high-rate turns directed by machine learning algorithms that outpace human pilot reaction times."
                                     ],
                                     [
                                         "Observation during the 2036 Crisis",
                                         "Civilian and radar monitors recorded formation flights between a K-21 KAAN and an AL-ELMA airframe departing Arkent for coastal patrol, signaling a revolution in regional air warfare."
                                     ]
                                 ],
                    "related":  [
                                    "anatarya",
                                    "baykut",
                                    "k21-kaan",
                                    "anasas",
                                    "sarpsan",
                                    "kriz"
                                ],
                    "imageKey":  "",
                    "draft":  false
                },
    "pelagos-karakolu":  {
                             "sections":  [
                                              [
                                                  "Location",
                                                  "Pelagos Station sits on an isolated rocky islet at the western edge of the disputed Kalyon chain. A concrete breakwater protects a small boat jetty capable of handling high-speed interceptor craft in heavy swells."
                                              ],
                                              [
                                                  "Duties",
                                                  "Station personnel monitor fishing fleets, report unauthorized Anatarian naval movements across maritime median lines, and relay real-time visual feeds to Lerya headquarters."
                                              ],
                                              [
                                                  "Flashpoint proximity",
                                                  "The outpost faces Anatarian border patrol stations across narrow nautical channels, leading to frequent radio exchanges and tense close encounters between patrol cutters."
                                              ]
                                          ],
                             "title":  "Pelagos Forward Coast Guard Station",
                             "tags":  [
                                          "outpost",
                                          "coast-guard",
                                          "elonya",
                                          "kalyon-denizi",
                                          "facilities"
                                      ],
                             "category":  "facilities",
                             "imageKey":  "triton-botu",
                             "related":  [
                                             "kalyon-adalari",
                                             "kalyon-denizi",
                                             "elonya",
                                             "triton-botu"
                                         ],
                             "lead":  "A forward monitoring outpost and rapid-interception patrol boat station operated by Elonia on the western approaches to the Kalyon Islands.",
                             "infobox":  [
                                             [
                                                 "Type",
                                                 "Forward Maritime Watchpost \u0026 Patrol Station"
                                             ],
                                             [
                                                 "Operator",
                                                 "Elonia Maritime Safety Authority"
                                             ],
                                             [
                                                 "Vessels",
                                                 "4 x Rapid Interceptor Patrol Craft"
                                             ],
                                             [
                                                 "Surveillance",
                                                 "Optoelectronic Mast \u0026 Marine Radar"
                                             ],
                                             [
                                                 "Location",
                                                 "Western Kalyon Islets"
                                             ],
                                             [
                                                 "Status",
                                                 "Operational"
                                             ]
                                         ]
                         },
    "kara-kasim-feneri":  {
                              "sections":  [
                                               [
                                                   "History",
                                                   "During the maritime confrontation of November 2026, known as \u0027Black November\u0027, naval units from both sides exchanged gunfire in adverse weather, resulting in lost vessels and casualties. Two years later, neutral maritime delegations established this beacon upon a central reef as both a navigational aid and an eternal memorial."
                                               ],
                                               [
                                                   "Memorial plaque",
                                                   "A bronze register affixed to the granite pedestal lists the names of sailors lost from both nations. The revolving beacon warns vessels away from jagged underwater reefs while serving as a quiet reminder of the human cost of conflict."
                                               ],
                                               [
                                                   "Annual observance",
                                                   "Every November 15, civilian fishing flotillas from both Elonia and Anataria lay floral wreaths upon the surrounding waters, marking a solemn interlude amid ongoing geopolitical rivalries."
                                               ]
                                           ],
                              "title":  "Black November Memorial Beacon \u0026 Maritime Monument",
                              "tags":  [
                                           "beacon",
                                           "memorial",
                                           "kalyon-denizi",
                                           "events",
                                           "facilities"
                                       ],
                              "category":  "facilities",
                              "imageKey":  "doruk-ikmal",
                              "related":  [
                                              "kalyon-denizi",
                                              "kalyon-adalari",
                                              "anatarya",
                                              "elonya"
                                          ],
                              "lead":  "A navigational beacon and memorial lighthouse erected in remembrance of the naval casualties of the November 2026 Kalyon Sea skirmish.",
                              "infobox":  [
                                              [
                                                  "Type",
                                                  "Memorial Navigation Beacon \u0026 Monument"
                                              ],
                                              [
                                                  "Light Characteristic",
                                                  "Fl(3) W 15s (White, 15 nm range)"
                                              ],
                                              [
                                                  "Height",
                                                  "34 meters (Granite \u0026 Bronze Pedestal)"
                                              ],
                                              [
                                                  "Inaugurated",
                                                  "November 12, 2028"
                                              ],
                                              [
                                                  "Location",
                                                  "Kalyon Sea Shoals"
                                              ],
                                              [
                                                  "Status",
                                                  "Operational (Protected Heritage Status)"
                                              ]
                                          ]
                          },
    "kor-kalkan-bataryasi":  {
                                 "sections":  [
                                                  [
                                                      "Emplacement and layout",
                                                      "The KOR-KALKAN complex comprises reinforced underground silos, mobile vertical launch containers, and SARPSAN fire-control radars. The battery can engage up to 16 airborne targets simultaneously, including stealth missiles and low-altitude cruise missiles."
                                                  ],
                                                  [
                                                      "Defense of GÃ–KKALE-4",
                                                      "The site\u0027s primary mission is creating an umbrella over the GÃ–KKALE-4 launch pads and satellite uplink stations. During the naval buildup, the battery maintained around-the-clock radar lock tracking approaching Elonian strike wings."
                                                  ],
                                                  [
                                                      "Deterrent envelope",
                                                      "The long engagement envelope reaching into the Kalyon Sea prevents hostile attack aircraft from releasing standoff precision munitions without being targeted."
                                                  ]
                                              ],
                                 "title":  "Kalyon Air Defense \u0026 Missile Battery (KOR-KALKAN)",
                                 "tags":  [
                                              "air-defense",
                                              "sarpburun",
                                              "kalkan-hss",
                                              "korsan",
                                              "missile",
                                              "facilities"
                                          ],
                                 "category":  "facilities",
                                 "imageKey":  "kalkan-hss",
                                 "related":  [
                                                 "kalkan-hss",
                                                 "korsan",
                                                 "sarpsan",
                                                 "gokkale-4",
                                                 "sarpburun"
                                             ],
                                 "lead":  "A long-range surface-to-air missile installation operated by Anataria, safeguarding Sarpburun airspace and GÃ–KKALE-4 from standoff aerial and missile strikes.",
                                 "infobox":  [
                                                 [
                                                     "Type",
                                                     "Long-Range Air \u0026 Missile Defense Battery"
                                                 ],
                                                 [
                                                     "Operator",
                                                     "Anataria 22nd Air Defense Battalion"
                                                 ],
                                                 [
                                                     "Weapon Systems",
                                                     "[[kalkan-hss]], [[korsan]] Hisar-K Interceptor Missiles"
                                                 ],
                                                 [
                                                     "Max Altitude",
                                                     "30,000 meters (Stratosphere)"
                                                 ],
                                                 [
                                                     "Engagement Range",
                                                     "150 km aerodynamic"
                                                 ],
                                                 [
                                                     "Location",
                                                     "Southwest Sarpburun Plateau"
                                                 ],
                                                 [
                                                     "Status",
                                                     "Operational (Combat Engagement Alert)"
                                                 ]
                                             ]
                             },
    "lerya-jet-ussu":  {
                           "sections":  [
                                            [
                                                "Overview",
                                                "Lerya 5th Tactical Jet Base is the central airfield defending Elonia\u0027s political center and outlying island outposts in the Kalyon Sea. Its coastal location enables aircraft to climb out over water immediately upon takeoff."
                                            ],
                                            [
                                                "Tactical duties",
                                                "Fighter-bombers and interceptors stationed at the base conduct routine sovereignty sweeps over the disputed Kalyon Islands. Aerial scrambles and close encounters with Anatarian fighters typically originate from this installation."
                                            ],
                                            [
                                                "Defenses",
                                                "The perimeter is ringed with Avren Union-standard surface-to-air missile sites. Because it lies within direct line-of-sight of Anataria\u0027s [[sarpburun-radar]], aircraft departing Lerya are tracked from rotation."
                                            ]
                                        ],
                           "title":  "Lerya 5th Tactical Jet Base (Pelican)",
                           "tags":  [
                                        "air-base",
                                        "elonya",
                                        "lerya",
                                        "kalyon-denizi",
                                        "facilities"
                                    ],
                           "category":  "facilities",
                           "imageKey":  "pelagos-devriye",
                           "related":  [
                                           "elonya",
                                           "m12-aster",
                                           "kalyon-denizi",
                                           "kalyon-adalari"
                                       ],
                           "lead":  "The Republic of Elonia\u0027s primary tactical air base on the Kalyon coast, conducting island air patrols and coastal air defense.",
                           "infobox":  [
                                           [
                                               "Type",
                                               "Tactical Interceptor \u0026 Coastal Air Base"
                                           ],
                                           [
                                               "Operator",
                                               "Elonia Air Defense Forces"
                                           ],
                                           [
                                               "Stationed Wings",
                                               "32nd Tactical Squadron (M12-Aster), Pelican Recon Detachment"
                                           ],
                                           [
                                               "Runways",
                                               "1 (2,800 m Asphalt/Concrete)"
                                           ],
                                           [
                                               "Location",
                                               "Northwest of Lerya"
                                           ],
                                           [
                                               "Status",
                                               "Operational"
                                           ]
                                       ]
                       },
    "sarp-gecidi":  {
                        "sections":  [
                                         [
                                             "Engineering and structure",
                                             "Completed in 2028 across the narrow marine narrows separating Sarpburun from the mainland, the bridge is designed to withstand severe sea gales and seismic tremors. Its double-track railway conveys heavy rocket stages and cryogenic propellant convoys to [[gokkale-4]]."
                                         ],
                                         [
                                             "Fortification",
                                             "Both anchor towers feature anti-aircraft weapon pods and GPS/datalink decoy emitters. A rapid aerosol smoke screening system can shroud the deck from precision laser and electro-optical weapon seekers."
                                         ],
                                         [
                                             "Vulnerability",
                                             "Because the peninsula has no other road connection to the mainland, the Sarp Gate bridge is a critical single point of failure; its loss would isolate all personnel and defense units stationed at GÃ–KKALE-4."
                                         ]
                                     ],
                        "title":  "Sarpburun Gate Suspension Bridge",
                        "tags":  [
                                     "bridge",
                                     "sarpburun",
                                     "transit",
                                     "gokkale-4",
                                     "facilities"
                                 ],
                        "category":  "facilities",
                        "imageKey":  "doruk-ikmal",
                        "related":  [
                                        "sarpburun",
                                        "gokkale-4",
                                        "doruk-ikmal",
                                        "anatarya"
                                    ],
                        "lead":  "The strategic heavy suspension bridge and fortified causeway linking the Sarpburun Peninsula to mainland Anataria; the lifeline of GÃ–KKALE-4 logistics.",
                        "infobox":  [
                                        [
                                            "Type",
                                            "Strategic Suspension Bridge \u0026 Causeway"
                                        ],
                                        [
                                            "Length",
                                            "1,850 m (Main Span: 1,100 m)"
                                        ],
                                        [
                                            "Lanes",
                                            "4 Highway Lanes + Dual Heavy Rail"
                                        ],
                                        [
                                            "Security",
                                            "Gate Guard Battalion \u0026 Pylon Bunkers"
                                        ],
                                        [
                                            "Location",
                                            "Sarpburun Isthmus"
                                        ],
                                        [
                                            "Status",
                                            "Operational (Military Logistics Priority)"
                                        ]
                                    ]
                    },
    "istara-garnizonu":  {
                             "sections":  [
                                              [
                                                  "Strategic position",
                                                  "The İstara Strait is the only nautical transit canal linking the Northern Sea with the Inner Sea. The garrison occupies historical fortress promontories modernized with radar domes, thermal cameras, and hardened underground bunkers."
                                              ],
                                              [
                                                  "Maritime traffic management",
                                                  "All commercial vessels and naval contingents entering the strait must report to the garrison\u0027s Vessel Traffic Service. In the event of military conflict, the garrison holds legal authority to enforce maritime interdiction."
                                              ],
                                              [
                                                  "Defensive firepower",
                                                  "Truck-mounted KOR-SAN coastal defense missile launchers deployed along the heights can engage hostile naval targets up to 180 km away, effectively denying passage to unauthorized foreign warships."
                                              ]
                                          ],
                             "title":  "İstara Strait Coastal Defense Garrison",
                             "tags":  [
                                          "garrison",
                                          "istara",
                                          "strait",
                                          "coast-guard",
                                          "korsan",
                                          "facilities"
                                      ],
                             "category":  "facilities",
                             "imageKey":  "sarp-muhafiz",
                             "related":  [
                                             "istara",
                                             "istara-bogazi",
                                             "anatarya",
                                             "korsan"
                                         ],
                             "lead":  "An Anatarian coastal defense garrison equipped with shore-to-ship missiles and surface surveillance radars guarding maritime transit through the İstara Strait.",
                             "infobox":  [
                                             [
                                                 "Type",
                                                 "Strait Fortress \u0026 Coastal Missile Battery"
                                             ],
                                             [
                                                 "Operator",
                                                 "Anataria Coastal Command"
                                             ],
                                             [
                                                 "Armament",
                                                 "[[korsan]] Atmaca-K Coastal Defense Missiles, 76 mm Coastal Guns"
                                             ],
                                             [
                                                 "Surveillance",
                                                 "İstara Vessel Traffic Service Radar Tower"
                                             ],
                                             [
                                                 "Location",
                                                 "[[istara-bogazi]] Maritime Gate"
                                             ],
                                             [
                                                 "Status",
                                                 "Operational"
                                             ]
                                         ]
                         },
    "lerya-deniz-ussu":  {
                             "sections":  [
                                              [
                                                  "Facility structure",
                                                  "Pelagos Fleet Base is sheltered within the deep, natural harbor of Lerya Bay. Outer breakwaters are fortified with coastal gun emplacements and torpedo tubes. The compound includes repair drydocks, ammunition magazines, and the naval command staff headquarters."
                                              ],
                                              [
                                                  "Aigaion task group",
                                                  "Elonia\u0027s flagship guided missile frigate [[aigaion]] and accompanying missile corvettes are homeported here. Munitions staging and pre-deployment logistics for the GÃ–KKALE-4 operation were completed at this waterfront."
                                              ],
                                              [
                                                  "Strategic impact",
                                                  "By projecting sea power through narrow nautical choke points in the Kalyon Sea, the base maintains leverage over commercial shipping lines heading toward Anatarian ports."
                                              ]
                                          ],
                             "title":  "Lerya Naval Headquarters \u0026 Pelagos Fleet Base",
                             "tags":  [
                                          "naval-base",
                                          "harbor",
                                          "elonya",
                                          "aigaion",
                                          "navy",
                                          "facilities"
                                      ],
                             "category":  "facilities",
                             "imageKey":  "aigaion",
                             "related":  [
                                             "elonya",
                                             "aigaion",
                                             "kalyon-denizi",
                                             "pelagos-karakolu"
                                         ],
                             "lead":  "The primary naval operating base, drydock shipyard, and frigate flotilla station for the Republic of Elonia Navy in the Kalyon Sea.",
                             "infobox":  [
                                             [
                                                 "Type",
                                                 "Main Naval Base \u0026 Naval Shipyard"
                                             ],
                                             [
                                                 "Operator",
                                                 "Republic of Elonia Navy"
                                             ],
                                             [
                                                 "Attached Units",
                                                 "1st Frigate Flotilla, Kalyon Fast Attack Craft Division"
                                             ],
                                             [
                                                 "Berthing Capacity",
                                                 "12 Major Warships, 2 Drydocks"
                                             ],
                                             [
                                                 "Location",
                                                 "Lerya Bay / Kalyon Coastline"
                                             ],
                                             [
                                                 "Status",
                                                 "Operational (Mobilization Readiness)"
                                             ]
                                         ]
                         },
    "arkent-jet-ussu":  {
                            "sections":  [
                                             [
                                                 "Infrastructure and layout",
                                                 "Constructed at the foothill plateau 35 km west of Arkent, the 1st Main Jet Base is Anataria\u0027s most fortified air station, featuring underground hardened aircraft shelters, bomb-proof munitions depots, and autonomous fuel pipeline galleries. The dual parallel runways connect directly to adjacent hardened highway landing strips."
                                             ],
                                             [
                                                 "Stationed wings",
                                                 "The base hosts the elite core of Anataria\u0027s tactical air fleet. The 101st \u0027Karakartal\u0027 Squadron operates the frontline [[k21-kaan]] 5th-generation stealth fighters, alongside [[k16-alaz]] interceptors maintaining combat air patrols over Sarpburun and Kalyon. Autonomous operational trials for [[baykut]]\u0027s [[al-elma]] unmanned fighter are also managed from this site."
                                             ],
                                             [
                                                 "Operational role",
                                                 "In high-readiness scenarios, interceptors from Arkent can scramble and reach Sarpburun airspace in under 6 minutes. Air operations are centrally coordinated via the underground Arkent Air Operations Center."
                                             ]
                                         ],
                            "title":  "Arkent 1st Main Jet Base Command (Karakartal)",
                            "tags":  [
                                         "air-base",
                                         "arkent",
                                         "jet",
                                         "k21-kaan",
                                         "air-force",
                                         "facilities"
                                     ],
                            "category":  "facilities",
                            "imageKey":  "kartal",
                            "related":  [
                                            "anatarya",
                                            "k21-kaan",
                                            "k16-alaz",
                                            "al-elma",
                                            "anasas"
                                        ],
                            "lead":  "The premier fighter air base defending Anataria\u0027s capital and western operational theater, home to K-21 KAAN, K16-Alaz, and unmanned combat fighter squadrons.",
                            "infobox":  [
                                            [
                                                "Type",
                                                "Main Combat Air Base"
                                            ],
                                            [
                                                "Operator",
                                                "Anataria Air Force"
                                            ],
                                            [
                                                "Assigned Squadrons",
                                                "101st Karakartal Squadron ([[k21-kaan]]), 132nd Dagger Squadron ([[k16-alaz]]), 14th Unmanned Fighter Squadron ([[al-elma]])"
                                            ],
                                            [
                                                "Runways",
                                                "2 (Reinforced Concrete, 3,400 m)"
                                            ],
                                            [
                                                "Location",
                                                "West of Arkent"
                                            ],
                                            [
                                                "Status",
                                                "Operational (Combat Readiness Condition 1)"
                                            ]
                                        ]
                        },
    "sarpburun-radar":  {
                            "sections":  [
                                             [
                                                 "Overview",
                                                 "SARP-RAD stands atop the highest elevation of the Sarpburun Peninsula. Commissioned in 2031 to protect Anataria\u0027s western territorial boundary and the [[gokkale-4]] spaceport against hostile air, surface, and ballistic missile threats, its 3D AESA antenna and advanced digital signal processors provide over-the-horizon tracking of sea-skimming targets."
                                             ],
                                             [
                                                 "Electronic warfare capabilities",
                                                 "Beyond surveillance, the installation houses high-power electronic support measures (ESM) and electronic attack (EA) suites capable of degrading and jamming [[elonya]] airborne reconnaissance platforms and GPS/datalink guidance networks along the disputed boundary."
                                             ],
                                             [
                                                 "Tactical significance",
                                                 "During the GÃ–KKALE-4 crisis, SARP-RAD was the first terrestrial radar station to detect the tactical approach of the [[aigaion]] frigate battle group. Target track data is fused and transmitted directly to [[k21-kaan]] fighters at [[arkent-jet-ussu]] and [[kor-kalkan-bataryasi]]."
                                             ]
                                         ],
                            "title":  "Sarpburun Early Warning Radar Complex (SARP-RAD)",
                            "tags":  [
                                         "radar",
                                         "sarpburun",
                                         "defense",
                                         "electronic-warfare",
                                         "sarpsan",
                                         "facilities"
                                     ],
                            "category":  "facilities",
                            "imageKey":  "sarp-muhafiz",
                            "related":  [
                                            "sarpburun",
                                            "gokkale-4",
                                            "sarpsan",
                                            "kor-kalkan-bataryasi",
                                            "kalkan-hss"
                                        ],
                            "lead":  "An active electronically scanned array (AESA) early warning and electronic warfare complex deployed on the northern crest of the Sarpburun Peninsula, monitoring a 600 km radius across the Kalyon Sea and Avren airspace.",
                            "infobox":  [
                                            [
                                                "Type",
                                                "Early Warning \u0026 Air Surveillance Radar"
                                            ],
                                            [
                                                "Operator",
                                                "Anataria Air Defense Command"
                                            ],
                                            [
                                                "Manufacturer",
                                                "[[sarpsan]]"
                                            ],
                                            [
                                                "Detection Range",
                                                "600 km aerodynamic, 1,000 km ballistic"
                                            ],
                                            [
                                                "Location",
                                                "[[sarpburun]] Northern Ridge"
                                            ],
                                            [
                                                "Protection",
                                                "[[kor-kalkan-bataryasi]]"
                                            ],
                                            [
                                                "Status",
                                                "Operational (High Alert)"
                                            ]
                                        ]
                        }
};

const lang=new URLSearchParams(location.search).get('lang')==='en'?'en':'tr';
document.documentElement.lang=lang;
const select=document.getElementById('site-language');
if(select){
  select.value=lang;
  select.addEventListener('change',()=>{
    const u=new URL(location.href);
    u.searchParams.set('lang',select.value);
    location.assign(u.href);
  });
}
if(lang==='en'){
  const f=document.getElementById('fiction-banner');if(f)f.textContent='Everything on this site is fictional.';
  const l=document.querySelector('.language-picker label');if(l)l.textContent='Language';
  document.title='GÖKKALE Archive';
  const si=document.querySelector('.search input');if(si)si.placeholder='Search the archive…';
  const ae=document.querySelector('.admin-entry');if(ae)ae.textContent='Edit the wiki';
  const sn=document.querySelector('.sidebar .nav-label');if(sn)sn.textContent='EXPLORE';
  const cn=document.querySelector('.contents .nav-label');if(cn)cn.textContent='ON THIS PAGE';
}

let pages=null,renderer=null;
const main=document.getElementById('main'),nav=document.getElementById('nav'),toc=document.getElementById('toc');

function initArticleAliases() {
  const allData = [dataTR, dataEN];
  for (const ds of allData) {
    if (!ds) continue;
    for (const [id, p] of Object.entries(ds)) {
      articleAliases[id] = id;
      if (p.title) {
        const slug = p.title.toLowerCase()
          .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
          .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
        if (slug) articleAliases[slug] = id;
      }
    }
  }
}
initArticleAliases();

function parseCurrentRoute() {
  let raw = '';
  if (location.hash && location.hash.startsWith('#/')) {
    raw = decodeURIComponent(location.hash.slice(2));
  } else {
    let p = decodeURIComponent(location.pathname);
    p = p.replace(/^\/+/, '').replace(/\/+$/, '').replace(/\.html$/, '');
    raw = p;
  }
  raw = raw.replace(/^#/, '').replace(/^\/+/, '').replace(/\/+$/, '');

  if (!raw || raw === 'ana-sayfa' || raw === 'home') {
    return { type: 'home', id: 'ana-sayfa' };
  }
  if (raw === 'tum-maddeler' || raw === 'all-articles' || raw === 'articles') {
    return { type: 'all', id: 'tum-maddeler' };
  }
  if (raw === 'edit') {
    location.replace('/edit.html' + (location.search || ''));
    return { type: 'unknown', raw: 'edit' };
  }
  if (raw === 'harita') {
    location.replace('/harita.html' + (location.search || ''));
    return { type: 'unknown', raw: 'harita' };
  }
  if (raw === 'harita-en') {
    location.replace('/harita-en.html' + (location.search || ''));
    return { type: 'unknown', raw: 'harita-en' };
  }

  const parts = raw.split('/').map(p => p.trim()).filter(Boolean);
  if (parts.length === 1) {
    const single = parts[0];
    const cat = getCategoryKey(single);
    if (cat) return { type: 'category', categoryKey: cat, id: cat };
    const artId = articleAliases[single] || (pages && pages[single] ? single : null);
    if (artId) return { type: 'article', id: artId, categoryKey: pages?.[artId] ? getCategoryKey(pages[artId].category) : null };
    return { type: 'unknown', raw: single };
  }

  if (parts.length >= 2) {
    const cat = getCategoryKey(parts[0]);
    const artSlug = parts[1];
    const artId = articleAliases[artSlug] || (pages && pages[artSlug] ? artSlug : null) || artSlug;
    return { type: 'article', id: artId, categoryKey: cat || (pages?.[artId] ? getCategoryKey(pages[artId].category) : null) };
  }

  return { type: 'home', id: 'ana-sayfa' };
}

function render() {
  const route = parseCurrentRoute();
  const r = renderer;
  if (!r) return;

  let html = '';
  let activeCatKey = route.categoryKey || null;

  if (route.type === 'home') {
    html = r.home();
    activeCatKey = 'ana-sayfa';
  } else if (route.type === 'all') {
    html = r.index();
    activeCatKey = 'tum-maddeler';
  } else if (route.type === 'category') {
    const catDisplayName = lang === 'en' ? categoryMeta[route.categoryKey]?.en : categoryMeta[route.categoryKey]?.tr;
    html = r.index(catDisplayName || route.categoryKey);
    activeCatKey = route.categoryKey;
  } else if (route.type === 'article' && pages[route.id]) {
    html = r.article(route.id);
    activeCatKey = getCategoryKey(pages[route.id].category);
  } else {
    html = lang === 'en'
      ? '<h1>Article not found</h1><p>No article exists at this address.</p><a href="/all-articles">Article index</a>'
      : '<h1>Madde bulunamadı</h1><p>Bu adreste bir madde yok.</p><a href="/tum-maddeler">Madde dizini</a>';
  }

  if (main) main.innerHTML = html;

  for (const el of main ? main.querySelectorAll('a[href="/harita"], a[href="/harita.html"]') : []) {
    el.href = '/harita' + (lang === 'en' ? '-en' : '') + '.html';
  }

  if (nav && r.navItems) {
    nav.innerHTML = r.navItems.map(([key, label, url]) => {
      const isActive = (key === activeCatKey);
      return `<a href="${url}" class="${isActive ? 'active' : ''}">${r.escapeHTML(label)}</a>`;
    }).join('');
  }

  if (toc && main) {
    toc.innerHTML = [...main.querySelectorAll('h2[id]')].map(h => `<a href="#${h.id}">${h.textContent}</a>`).join('');
  }

  const edit = document.createElement('a');
  edit.className = 'edit-link';
  edit.href = '/edit.html';
  edit.textContent = lang === 'en' ? 'Edit article' : 'Maddeyi düzenle';
  if (route.type === 'article' && pages[route.id] && main) {
    main.querySelector('.tabbar')?.append(edit);
  }

  const siteTitle = lang === 'en' ? 'GÖKKALE Archive' : 'GÖKKALE Arşivi';
  if (route.type === 'home') {
    document.title = siteTitle;
  } else if (route.type === 'all') {
    document.title = (lang === 'en' ? 'All articles' : 'Tüm maddeler') + ' — ' + siteTitle;
  } else if (route.type === 'category') {
    const catName = lang === 'en' ? categoryMeta[route.categoryKey]?.en : categoryMeta[route.categoryKey]?.tr;
    document.title = (catName || route.categoryKey) + ' — ' + siteTitle;
  } else if (route.type === 'article' && pages[route.id]) {
    document.title = pages[route.id].title + ' — ' + siteTitle;
  } else {
    document.title = (lang === 'en' ? 'Not found' : 'Bulunamadı') + ' — ' + siteTitle;
  }

  if (location.hash && location.hash.startsWith('#/')) {
    let canonical = '/';
    if (route.type === 'home') canonical = lang === 'en' ? '/home' : '/ana-sayfa';
    else if (route.type === 'all') canonical = lang === 'en' ? '/all-articles' : '/tum-maddeler';
    else if (route.type === 'category') canonical = getCategoryPageUrl(route.categoryKey, lang);
    else if (route.type === 'article' && pages[route.id]) canonical = getArticleUrl(route.id, lang, pages);

    const search = location.search || '';
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', canonical + search);
    }
  }

  window.scrollTo(0, 0);
}

document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (!link || link.target === '_blank' || link.hasAttribute('download')) return;
  const href = link.getAttribute('href');
  if (!href) return;
  if (link.classList.contains('admin-entry') || href.includes('edit.html') || href.includes('/edit')) return;
  if (href.startsWith('#') && !href.startsWith('#/')) return;

  if (href.startsWith('/') || href.startsWith('#/')) {
    const pathOnly = href.split("?")[0].split("#")[0].toLowerCase();
    const staticExts = [".svg", ".png", ".jpg", ".jpeg", ".webp", ".css", ".js", ".json", ".xml", ".txt", ".html"];
    const isStaticFile = staticExts.some(ext => pathOnly.endsWith(ext)) || pathOnly.startsWith("/uploads") || pathOnly === "/harita" || pathOnly === "/harita-en" || pathOnly === "/edit";
    if (isStaticFile) return;
    e.preventDefault();
    const cleanUrl = href.startsWith('#/') ? href.slice(1) : href;
    const currentFull = location.pathname + (location.search || '');
    if (cleanUrl !== currentFull && window.history && window.history.pushState) {
      window.history.pushState(null, '', cleanUrl);
    }
    render();
  }
});

const input = document.getElementById('search'), results = document.getElementById('results');
if (input && results) {
  const fold = s => s.toLocaleLowerCase(lang).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ı/g, 'i');
  input.addEventListener('input', () => {
    const q = fold(input.value.trim());
    results.hidden = !q;
    results.replaceChildren();
    if (!q || !pages) return;
    for (const [id, p] of Object.entries(pages).filter(([, p]) => fold(p.title + ' ' + p.desc + ' ' + p.category).includes(q))) {
      const a = document.createElement('a'), small = document.createElement('small');
      a.href = getArticleUrl(id, lang, pages);
      a.textContent = p.title;
      small.textContent = p.category + ' · ' + p.desc;
      a.append(small);
      results.append(a);
    }
    if (!results.childNodes.length) {
      results.textContent = lang === 'en' ? 'No matching article.' : 'Eşleşen madde bulunamadı.';
    }
  });
  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') results.hidden = true;
    if (e.key === 'Enter') results.querySelector('a')?.click();
  });
  document.addEventListener('keydown', e => {
    if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      input.focus();
    }
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.search')) results.hidden = true;
  });
}

window.addEventListener('popstate', () => { if (pages) render(); });
window.addEventListener('hashchange', () => { if (pages) render(); });

pages = lang === 'en' ? dataEN : dataTR;
if (pages) {
  renderer = lang === 'en' ? createRendererEN(pages) : createRenderer(pages);
  render();
} else {
  if (main) {
    main.innerHTML = lang === 'en' ? '<h1>Archive unavailable</h1><p>Refresh this page to try again.</p>' : '<h1>Arşive ulaşılamıyor</h1><p>Sayfayı yenileyip tekrar deneyin.</p>';
  }
}
