'use strict';
const REPO='t1orstudios/t1orstudios.github.io';
const API='https://api.github.com/repos/'+REPO;
const $=id=>document.getElementById(id);
const state={tr:JSON.parse($('embedded-tr').textContent),en:JSON.parse($('embedded-en').textContent)};
const uploads=new Map();
let token='',login='',headSha='',language='tr',selected='',preview=false,busy=false;
const status=(message,error=false)=>{$('status').textContent=message;$('status').className=error?'error':message?'success':''};
const slugify=s=>s.toLocaleLowerCase('tr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replaceAll('ı','i').replaceAll('ş','s').replaceAll('ğ','g').replaceAll('ç','c').replaceAll('ö','o').replaceAll('ü','u').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,80);
async function request(path,method='GET',body){
 const response=await fetch(path.startsWith('https:')?path:API+path,{method,headers:{'Accept':'application/vnd.github+json','Authorization':'Bearer '+token,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined,cache:'no-store'});
 let data;try{data=await response.json()}catch{throw Error('GitHub yanıtı okunamadı ('+response.status+').')}
 if(!response.ok)throw Error(response.status===401?'Erişim anahtarı geçersiz veya süresi dolmuş.':response.status===403?'Bu hesabın depoya yazma yetkisi yok veya API erişimi kısıtlı.':response.status===409||response.status===422?'Depo bu sırada değişti. Sayfayı yenileyip tekrar dene.':data.message||'GitHub hatası '+response.status);
 return data;
}
function decodeBase64(content){const bytes=Uint8Array.from(atob(content.replace(/\s/g,'')),c=>c.charCodeAt(0));return new TextDecoder().decode(bytes)}
async function fileAt(path,revision){const data=await request('/contents/'+path+'?ref='+encodeURIComponent(revision));if(data.encoding!=='base64')throw Error(path+' GitHub üzerinden okunamadı.');return decodeBase64(data.content)}
function row(container,kind,first='',second=''){
 const wrap=document.createElement('div');wrap.className=kind==='facts'?'pair':'section-field';
 const a=document.createElement('input');a.value=first;a.placeholder=kind==='facts'?'Alan adı':'Bölüm başlığı';a.setAttribute('aria-label',a.placeholder);
 const b=document.createElement(kind==='facts'?'input':'textarea');b.value=second;b.placeholder=kind==='facts'?'Değer':'Bölüm metni';b.setAttribute('aria-label',b.placeholder);if(kind==='sections')b.rows=6;
 const remove=document.createElement('button');remove.type='button';remove.className='remove-row';remove.textContent='Sil';remove.setAttribute('aria-label','Satırı sil');remove.onclick=()=>wrap.remove();
 if(kind==='sections'){const head=document.createElement('div');head.className='section-head';head.append(a,remove);wrap.append(head,b)}else wrap.append(a,b,remove);
 container.append(wrap);return wrap;
}
function fieldRows(id,items,kind){const container=$(id);container.replaceChildren();for(const item of items||[])if(Array.isArray(item))row(container,kind,item[0]||'',item[1]||'')}
function rows(id){return [...$(id).children].map(w=>{const [a,b]=w.querySelectorAll('input,textarea');return [a.value.trim(),b.value.trim()]}).filter(([a,b])=>a||b)}
function flush(){if(!selected||preview)return;const previous=state[language][selected]||{};state[language][selected]={...previous,title:$('field-title').value.trim(),category:$('field-category').value.trim(),desc:$('field-desc').value.trim(),lead:$('field-lead').value.trim(),facts:rows('fact-fields'),sections:rows('section-fields'),related:$('field-related').value.split(',').map(s=>s.trim()).filter(Boolean),imageKey:$('field-image').value.trim(),draft:$('field-draft').checked}}
function list(){const q=$('article-search').value.toLocaleLowerCase('tr');const box=$('article-list');box.replaceChildren();for(const [slug,page] of Object.entries(state[language]).sort((a,b)=>a[1].title.localeCompare(b[1].title,language))){if(!(`${slug} ${page.title}`.toLocaleLowerCase('tr').includes(q)))continue;const button=document.createElement('button');button.type='button';button.className=slug===selected?'active':'';button.textContent=page.title||slug;const small=document.createElement('small');small.textContent=page.category||slug;button.append(small);button.onclick=()=>{flush();select(slug)};box.append(button)}}
function select(slug){selected=slug;preview=false;$('fields').hidden=false;$('preview').hidden=true;$('preview-button').textContent='Önizle';const page=state[language][slug];if(!page)return;$('current-slug').textContent=slug;$('form-title').textContent=page.title||'Yeni madde';$('field-title').value=page.title||'';$('field-category').value=page.category||'';$('field-desc').value=page.desc||'';$('field-lead').value=page.lead||'';$('field-related').value=(page.related||[]).join(', ');$('field-image').value=page.imageKey||'';$('field-draft').checked=!!page.draft;$('photo').value='';$('photo-preview').hidden=true;$('photo-preview').removeAttribute('src');fieldRows('fact-fields',page.facts,'facts');fieldRows('section-fields',page.sections,'sections');list()}
function previewPage(){flush();const p=state[language][selected],box=$('preview');box.replaceChildren();const h=document.createElement('h2');h.textContent=p.title;box.append(h);const desc=document.createElement('p');desc.textContent=p.desc;box.append(desc);const lead=document.createElement('p');lead.textContent=p.lead;box.append(lead);if(p.facts?.length){const dl=document.createElement('dl');for(const [name,value] of p.facts){const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=name;dd.textContent=value;dl.append(dt,dd)}box.append(dl)}for(const [title,text] of p.sections||[]){const heading=document.createElement('h3'),para=document.createElement('p');heading.textContent=title;para.textContent=text;box.append(heading,para)}preview=true;$('fields').hidden=true;box.hidden=false;$('preview-button').textContent='Düzenlemeye dön'}
function safeName(file){const ext=file.type==='image/png'?'png':file.type==='image/jpeg'?'jpg':file.type==='image/webp'?'webp':'';if(!ext)throw Error('Yalnızca PNG, JPEG veya WebP yüklenebilir.');if(file.size>5*1024*1024)throw Error('Görsel 5 MB sınırını aşıyor.');return slugify(file.name.replace(/\.[^.]+$/,''))+'-'+Date.now().toString(36)+'.'+ext}
$('photo').addEventListener('change',()=>{const file=$('photo').files?.[0];if(!file)return;try{const name=safeName(file);uploads.set(name,file);$('field-image').value='file:'+name;const img=$('photo-preview');img.src=URL.createObjectURL(file);img.hidden=false;status('Görsel hazır. Maddeyi yayımladığında depoya yüklenecek.')}catch(e){$('photo').value='';status(e.message,true)}});
$('editor-language').addEventListener('change',e=>{flush();language=e.target.value;select(Object.keys(state[language])[0]);status('')});
$('article-search').addEventListener('input',list);
$('new-article').addEventListener('click',()=>{flush();const name=prompt('Yeni maddenin adı:');if(!name)return;const slug=slugify(name);if(!slug){status('Geçerli bir ad gir.',true);return}if(state[language][slug]){select(slug);return}state[language][slug]={title:name.trim(),category:'',desc:'',lead:'',facts:[],sections:[],related:[],imageKey:''};$('article-search').value='';select(slug);$('field-category').focus()});
$('delete-button').addEventListener('click',()=>{if(!selected||!confirm('“'+state[language][selected].title+'” maddesini '+(language==='en'?'İngilizce':'Türkçe')+' sürümden silmek istiyor musun?'))return;delete state[language][selected];select(Object.keys(state[language])[0]||'');list();status('Madde silindi. Değişikliği yayımlamak için kaydet.')});
$('preview-button').addEventListener('click',()=>{if(!selected)return;if(preview)select(selected);else previewPage()});
$('login-form').addEventListener('submit',async e=>{e.preventDefault();const candidate=$('token').value.trim();if(!candidate)return;token=candidate;$('token').value='';status('GitHub hesabı ve güncel maddeler kontrol ediliyor…');try{const user=await request('https://api.github.com/user');const repo=await request('');if(!repo.permissions?.push)throw Error('Bu GitHub hesabının yayımdaki depoya yazma izni yok.');const ref=await request('/git/ref/heads/main');const [tr,en]=await Promise.all([fileAt('tr.json',ref.object.sha),fileAt('en.json',ref.object.sha)]);state.tr=JSON.parse(tr);state.en=JSON.parse(en);login=user.login;headSha=ref.object.sha;$('account').textContent='@'+login;$('login-panel').hidden=true;$('workspace').hidden=false;select(Object.keys(state.tr)[0]);status('Giriş yapıldı. Değişikliklerini yayımlayabilirsin.')}catch(error){token='';status(error.message,true)}});
async function hash(text){const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(text));return [...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,'0')).join('').slice(0,12)}
async function createBlob(content,encoding='utf-8'){return (await request('/git/blobs','POST',{content,encoding})).sha}
async function imageData(file){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result).split(',')[1]);reader.onerror=()=>reject(Error('Görsel okunamadı.'));reader.readAsDataURL(file)})}
async function publish(){if(!token)throw Error('Önce GitHub yönetici erişimiyle giriş yap.');flush();const p=state[language][selected];if(p&&(!p.title||!p.category))throw Error('Başlık ve kategori boş bırakılamaz.');
 const ref=await request('/git/ref/heads/main');if(ref.object.sha!==headSha)throw Error('Depo başka bir yerde değişti. Bu sekmeyi yenileyip yeni sürüm üzerinden düzenle.');
 const commit=await request('/git/commits/'+headSha);
 const [oldScript,oldIndex,old404,oldEdit]=await Promise.all(['pages.js','index.html','404.html','edit.html'].map(path=>fileAt(path,headSha)));
 const expression=/const dataTR=[^\n]*;\nconst dataEN=[^\n]*;/;
 if(!expression.test(oldScript))throw Error('Wiki veri yapısı değişmiş. Kaydetmeden önce yeni sürümü kontrol et.');
 const script=oldScript.replace(expression,'const dataTR='+JSON.stringify(state.tr)+';\nconst dataEN='+JSON.stringify(state.en)+';');
 const version=await hash(script);
 const updateHTML=html=>{if(!/\/pages\.js(?:\?v=[a-f0-9]+)?"/.test(html))throw Error('Ana sayfada wiki betiği bulunamadı.');return html.replace(/\/pages\.js(?:\?v=[a-f0-9]+)?"/g,'/pages.js?v='+version+'"')};
 const updateEdit=html=>html.replace(/<script id="embedded-tr" type="application\/json">.*?<\/script>/,'<script id="embedded-tr" type="application/json">'+JSON.stringify(state.tr)+'</script>').replace(/<script id="embedded-en" type="application\/json">.*?<\/script>/,'<script id="embedded-en" type="application/json">'+JSON.stringify(state.en)+'</script>');
 const files=[['tr.json',JSON.stringify(state.tr,null,2)+'\n'],['en.json',JSON.stringify(state.en,null,2)+'\n'],['pages.js',script],['index.html',updateHTML(oldIndex)],['404.html',updateHTML(old404)],['edit.html',updateEdit(oldEdit)]];
 const tree=await Promise.all(files.map(async([path,content])=>({path,mode:'100644',type:'blob',sha:await createBlob(content)})));
 for(const [name,file] of uploads)if(Object.values(state).some(pages=>Object.values(pages).some(page=>page.imageKey==='file:'+name)))tree.push({path:name,mode:'100644',type:'blob',sha:await createBlob(await imageData(file),'base64')});
 const newTree=await request('/git/trees','POST',{base_tree:commit.tree.sha,tree});
 const newCommit=await request('/git/commits','POST',{message:'Update wiki articles via editor',tree:newTree.sha,parents:[headSha]});
 await request('/git/refs/heads/main','PATCH',{sha:newCommit.sha,force:false});headSha=newCommit.sha;uploads.clear();return newCommit.sha;
}
$('article-form').addEventListener('submit',async e=>{e.preventDefault();if(busy)return;busy=true;$('save-button').disabled=true;status('GitHub deposuna kaydediliyor…');try{await publish();status('Kaydedildi. GitHub Pages dağıtımı tamamlandığında wiki güncellenecek.')}catch(error){status(error.message,true)}finally{busy=false;$('save-button').disabled=false}});
select(Object.keys(state.tr)[0]);
