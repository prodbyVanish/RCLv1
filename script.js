const levels=[
{name:'Mini Challenge',creator:'CurtaGD',verifier:'CurtaGD',points:200,id:'111838059',pass:'No Pass',qualify:'79% or better to qualify',records:[['YourName',100],['Player2',92]]},
{name:'TRAGIC',creator:'zoinks lil cousin',verifier:'zoinks lil cousin',points:190,id:'123456789',pass:'No Pass',qualify:'80% or better to qualify',records:[['YourName',87]]},
{name:'Wave Challenge',creator:'RCL Creator',verifier:'RCL Verifier',points:180,id:'987654321',pass:'No Pass',qualify:'75% or better to qualify',records:[]},
{name:'Happy Purple',creator:'RCL Creator',verifier:'RCL Verifier',points:170,id:'246813579',pass:'No Pass',qualify:'70% or better to qualify',records:[]},
{name:'Childlike',creator:'RCL Creator',verifier:'RCL Verifier',points:160,id:'135792468',pass:'No Pass',qualify:'70% or better to qualify',records:[]},
{name:'Smurtzii Challenge',creator:'RCL Creator',verifier:'RCL Verifier',points:150,id:'112233445',pass:'No Pass',qualify:'70% or better to qualify',records:[]},
{name:'Bandit',creator:'RCL Creator',verifier:'RCL Verifier',points:140,id:'556677889',pass:'No Pass',qualify:'70% or better to qualify',records:[]}
];
const $=x=>document.getElementById(x);
function show(l){$('title').textContent=l.name;$('creator').textContent=l.creator;$('verifier').textContent=l.verifier;$('publisher').textContent='RCL';$('points').textContent=l.points;$('id').textContent=l.id;$('pass').textContent=l.pass;$('qualify').textContent=l.qualify;$('count').textContent=`(${l.records.length})`;$('rows').innerHTML=l.records.length?l.records.map(r=>`<div class="row"><b>${r[0]}</b><span>${r[1]}%</span></div>`).join(''):'<div class="row"><span>No records yet.</span><span>—</span></div>'}
function render(filter=''){let out='';levels.filter(l=>l.name.toLowerCase().includes(filter.toLowerCase())).forEach((l,i)=>{let n=levels.indexOf(l)+1;out+=`<div class="level ${!filter&&i===0?'active':''}" data-i="${levels.indexOf(l)}"><span>#${n}</span><span>${l.name}</span></div>`});$('levels').innerHTML=out;document.querySelectorAll('.level').forEach(e=>e.onclick=()=>{document.querySelectorAll('.level').forEach(x=>x.classList.remove('active'));e.classList.add('active');show(levels[e.dataset.i])})}
function page(p){document.querySelectorAll('.page').forEach(x=>x.classList.add('hidden'));$(p).classList.remove('hidden');document.querySelectorAll('.nav').forEach(x=>x.classList.toggle('active',x.dataset.page===p));if(p==='leaderboard')board()}
$('search').oninput=e=>render(e.target.value);$('theme').onclick=()=>document.body.classList.toggle('dark');document.querySelectorAll('.nav').forEach(b=>b.onclick=()=>page(b.dataset.page));
function board(){let a={};levels.forEach(l=>l.records.forEach(r=>a[r[0]]=(a[r[0]]||0)+l.points));let s=Object.entries(a).sort((a,b)=>b[1]-a[1]);$('board').innerHTML=s.length?s.map((r,i)=>`<div class="boardrow"><span>#${i+1}</span><b>${r[0]}</b><span>${r[1]} pts</span></div>`).join(''):'<p class="muted">No records yet.</p>'}
$('spin').onclick=()=>{ $('result').textContent='🎲';setTimeout(()=>{$('result').textContent=levels[Math.floor(Math.random()*levels.length)].name},450)};
$('submit').onclick=()=>$('modal').classList.remove('hidden');$('close').onclick=()=>$('modal').classList.add('hidden');$('demo').onclick=()=>{$('msg').textContent='Demo submission received — database coming soon.'};
render();show(levels[0]);
