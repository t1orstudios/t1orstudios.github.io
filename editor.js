'use strict';
const REPO='t1orstudios/t1orstudios.github.io';
const API='https://api.github.com/repos/'+REPO;
const $=id=>document.getElementById(id);
const state={en:JSON.parse($('embedded-en').textContent)};
const uploads=new Map();
let token='',login='',headSha='',language='en',selected='',preview=false,busy=false;
const status=(message,error=false)=>{$('status').textContent=message;$('status').className=error?'error':message?'success':''};
const slugify=s=>s.toLocaleLowerCase('en').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replaceAll('ı','i').replaceAll('ş','s').replaceAll('ğ','g').replaceAll('ç','c').replaceAll('ö','o').replaceAll('ü','u').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,80);
async function request(path,method='GET',body){
 const response=await fetch(path.startsWith('https:')?path:API+path,{method,headers:{'Accept':'application/vnd.github+json','Authorization':'Bearer '+token,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined,cache:'no-store'});
 let data;try{data=await response.json()}catch{throw Error('GitHub response could not be read ('+response.status+').')}
 if(!response.ok)throw Error(response.status===401?'The access token is invalid or has expired.':response.status===403?'This account has no write access to the repository, or API access is restricted.':response.status===409||response.status===422?'Depo bu sırada değişti. Sayfayı yenileyip tekrar dene.':data.message||'GitHub hatası '+response.status);
 return data;
}
function decodeBase64(content){const bytes=Uint8Array.from(atob(content.replace(/\s/g,'')),c=>c.charCodeAt(0));return new TextDecoder().decode(bytes)}
async function fileAt(path,revision){const data=await request('/contents/'+path+'?ref='+encodeURIComponent(revision));if(data.encoding!=='base64')throw Error(path+' could not be read from GitHub.');return decodeBase64(data.content)}
function row(container,kind,first='',second=''){
 const wrap=document.createElement('div');wrap.className=kind==='facts'?'pair':'section-field';
 const a=document.createElement('input');a.value=first;a.placeholder=kind==='facts'?'Field name':'Section title';a.setAttribute('aria-label',a.placeholder);
 const b=document.createElement(kind==='facts'?'input':'textarea');b.value=second;b.placeholder=kind==='facts'?'Value':'Section text';b.setAttribute('aria-label',b.placeholder);if(kind==='sections')b.rows=6;
 const remove=document.createElement('button');remove.type='button';remove.className='remove-row';remove.textContent='Delete';remove.setAttribute('aria-label','Delete row');remove.onclick=()=>wrap.remove();
 if(kind==='sections'){const head=document.createElement('div');head.className='section-head';head.append(a,remove);wrap.append(head,b)}else wrap.append(a,b,remove);
 container.append(wrap);return wrap;
}
function fieldRows(id,items,kind){const container=$(id);container.replaceChildren();for(const item of items||[])if(Array.isArray(item))row(container,kind,item[0]||'',item[1]||'')}
function rows(id){return [...$(id).children].map(w=>{const [a,b]=w.querySelectorAll('input,textarea');return [a.value.trim(),b.value.trim()]}).filter(([a,b])=>a||b)}
function flush(){if(!selected||preview)return;const previous=state[language][selected]||{};state[language][selected]={...previous,title:$('field-title').value.trim(),category:$('field-category').value.trim(),desc:$('field-desc').value.trim(),lead:$('field-lead').value.trim(),facts:rows('fact-fields'),sections:rows('section-fields'),related:$('field-related').value.split(',').map(s=>s.trim()).filter(Boolean),imageKey:$('field-image').value.trim(),draft:$('field-draft').checked}}
function list(){const q=$('article-search').value.toLocaleLowerCase('en');const box=$('article-list');box.replaceChildren();for(const [slug,page] of Object.entries(state[language]).sort((a,b)=>a[1].title.localeCompare(b[1].title,language))){if(!(`${slug} ${page.title}`.toLocaleLowerCase('en').includes(q)))continue;const button=document.createElement('button');button.type='button';button.className=slug===selected?'active':'';button.textContent=page.title||slug;const small=document.createElement('small');small.textContent=page.category||slug;button.append(small);button.onclick=()=>{flush();select(slug)};box.append(button)}}
function select(slug){selected=slug;preview=false;$('fields').hidden=false;$('preview').hidden=true;$('preview-button').textContent='Preview';const page=state[language][slug];if(!page)return;$('current-slug').textContent=slug;$('form-title').textContent=page.title||'New article';$('field-title').value=page.title||'';$('field-category').value=page.category||'';$('field-desc').value=page.desc||'';$('field-lead').value=page.lead||'';$('field-related').value=(page.related||[]).join(', ');$('field-image').value=page.imageKey||'';$('field-draft').checked=!!page.draft;$('photo').value='';$('photo-preview').hidden=true;$('photo-preview').removeAttribute('src');fieldRows('fact-fields',page.facts,'facts');fieldRows('section-fields',page.sections,'sections');list()}
function previewPage(){flush();const p=state[language][selected],box=$('preview');box.replaceChildren();const h=document.createElement('h2');h.textContent=p.title;box.append(h);const desc=document.createElement('p');desc.textContent=p.desc;box.append(desc);const lead=document.createElement('p');lead.textContent=p.lead;box.append(lead);if(p.facts?.length){const dl=document.createElement('dl');for(const [name,value] of p.facts){const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=name;dd.textContent=value;dl.append(dt,dd)}box.append(dl)}for(const [title,text] of p.sections||[]){const heading=document.createElement('h3'),para=document.createElement('p');heading.textContent=title;para.textContent=text;box.append(heading,para)}preview=true;$('fields').hidden=true;box.hidden=false;$('preview-button').textContent='Back to editing'}
function safeName(file){const ext=file.type==='image/png'?'png':file.type==='image/jpeg'?'jpg':file.type==='image/webp'?'webp':'';if(!ext)throw Error('Only PNG, JPEG or WebP images can be uploaded.');if(file.size>5*1024*1024)throw Error('The image exceeds the 5 MB limit.');return slugify(file.name.replace(/\.[^.]+$/,''))+'-'+Date.now().toString(36)+'.'+ext}
$('photo').addEventListener('change',()=>{const file=$('photo').files?.[0];if(!file)return;try{const name=safeName(file);uploads.set(name,file);$('field-image').value='file:'+name;const img=$('photo-preview');img.src=URL.createObjectURL(file);img.hidden=false;status('Image ready. It will be uploaded to the repository when you publish the article.')}catch(e){$('photo').value='';status(e.message,true)}});
$('article-search').addEventListener('input',list);
$('new-article').addEventListener('click',()=>{flush();const name=prompt('Name of the new article:');if(!name)return;const slug=slugify(name);if(!slug){status('Enter a valid name.',true);return}if(state[language][slug]){select(slug);return}state[language][slug]={title:name.trim(),category:'',desc:'',lead:'',facts:[],sections:[],related:[],imageKey:''};$('article-search').value='';select(slug);$('field-category').focus()});
$('delete-button').addEventListener('click',()=>{if(!selected||!confirm('Delete the article “'+state[language][selected].title+'”?'))return;delete state[language][selected];select(Object.keys(state[language])[0]||'');list();status('Article deleted. Save to publish the change.')});
$('preview-button').addEventListener('click',()=>{if(!selected)return;if(preview)select(selected);else previewPage()});
$('login-form').addEventListener('submit',async e=>{e.preventDefault();const candidate=$('token').value.trim();if(!candidate)return;token=candidate;$('token').value='';status('Checking the GitHub account and the current articles…');try{const user=await request('https://api.github.com/user');const repo=await request('');if(!repo.permissions?.push)throw Error('This GitHub account has no write permission for the published repository.');const ref=await request('/git/ref/heads/main');state.en=JSON.parse(await fileAt('en.json',ref.object.sha));login=user.login;headSha=ref.object.sha;$('account').textContent='@'+login;$('login-panel').hidden=true;$('workspace').hidden=false;select(Object.keys(state.en)[0]);status('Signed in. You can publish your changes.')}catch(error){token='';status(error.message,true)}});
async function hash(text){const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(text));return [...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,'0')).join('').slice(0,12)}
async function createBlob(content,encoding='utf-8'){return (await request('/git/blobs','POST',{content,encoding})).sha}
async function imageData(file){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result).split(',')[1]);reader.onerror=()=>reject(Error('The image could not be read.'));reader.readAsDataURL(file)})}
async function publish(){if(!token)throw Error('Sign in with GitHub admin access first.');flush();const p=state[language][selected];if(p&&(!p.title||!p.category))throw Error('Title and category cannot be empty.');
 const ref=await request('/git/ref/heads/main');if(ref.object.sha!==headSha)throw Error('The repository changed elsewhere. Refresh this tab and edit the new version.');
 const commit=await request('/git/commits/'+headSha);
 const [oldScript,oldIndex,old404,oldEdit]=await Promise.all(['pages.js','index.html','404.html','edit.html','ana-sayfa.html'].map(path=>fileAt(path,headSha)));
 const expression=/const dataEN\s*=\s*[\s\S]*?;\s*(?=const lang\b)/;
 if(!expression.test(oldScript))throw Error('The wiki data structure has changed. Check the new version before saving.');
 const script=oldScript.replace(expression,()=>'const dataEN='+JSON.stringify(state.en)+';\n\n');
 const version=await hash(script);
 const updateHTML=html=>{if(!/\/pages\.js(?:\?v=[a-f0-9]+)?"/.test(html))throw Error('The wiki script was not found on the home page.');return html.replace(/\/pages\.js(?:\?v=[a-f0-9]+)?"/g,'/pages.js?v='+version+'"')};
 const files=[['en.json',JSON.stringify(state.en,null,2)+'\n'],['pages.js',script],['index.html',updateHTML(oldIndex)],['404.html',updateHTML(old404)]];
 const tree=await Promise.all(files.map(async([path,content])=>({path,mode:'100644',type:'blob',sha:await createBlob(content)})));
 for(const [name,file] of uploads)if(Object.values(state).some(pages=>Object.values(pages).some(page=>page.imageKey==='file:'+name)))tree.push({path:name,mode:'100644',type:'blob',sha:await createBlob(await imageData(file),'base64')});
 const newTree=await request('/git/trees','POST',{base_tree:commit.tree.sha,tree});
 const newCommit=await request('/git/commits','POST',{message:'Update wiki articles via editor',tree:newTree.sha,parents:[headSha]});
 await request('/git/refs/heads/main','PATCH',{sha:newCommit.sha,force:false});headSha=newCommit.sha;uploads.clear();return newCommit.sha;
}
$('article-form').addEventListener('submit',async e=>{e.preventDefault();if(busy)return;busy=true;$('save-button').disabled=true;status('Saving to the GitHub repository…');try{await publish();status('Saved. The wiki updates when the GitHub Pages deployment finishes.')}catch(error){status(error.message,true)}finally{busy=false;$('save-button').disabled=false}});
select(Object.keys(state.en)[0]);
