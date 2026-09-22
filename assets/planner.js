
const planner={pins:[],active:'house'};
const labels={house:'H',shed:'S',stable:'ST',office:'O',gate:'G',camera:'C'};
function drawLines(){
  const svg=document.querySelector('#lines'); if(!svg)return; svg.innerHTML='';
  if(planner.pins.length<2)return;
  const a=planner.pins[0];
  planner.pins.slice(1).forEach(b=>{
    const line=document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1',a.x+'%');line.setAttribute('y1',a.y+'%');line.setAttribute('x2',b.x+'%');line.setAttribute('y2',b.y+'%');line.setAttribute('stroke','#0b6f68');line.setAttribute('stroke-width','2.5');line.setAttribute('stroke-dasharray','8 6');svg.appendChild(line);
  });
}
function addPin(x,y){
  if(planner.pins.length>=12)return;
  const map=document.querySelector('#planner-map');
  const p={x,y,type:planner.pins.length===0?'house':planner.active,id:Date.now()+Math.random()};planner.pins.push(p);
  const el=document.createElement('div');el.className='pin';el.dataset.id=p.id;el.style.left=x+'%';el.style.top=y+'%';el.textContent=labels[p.type]||'•';el.title=p.type;map.appendChild(el);drawLines();updateSummary();
}
function updateSummary(){const s=document.querySelector('#planner-summary');if(!s)return;s.textContent=planner.pins.length?`${planner.pins.length} place${planner.pins.length===1?'':'s'} marked. The first point is treated as the internet source.`:'No places marked yet.'}
function clearPins(){document.querySelectorAll('.pin').forEach(x=>x.remove());planner.pins=[];drawLines();updateSummary()}
document.addEventListener('DOMContentLoaded',()=>{
 const map=document.querySelector('#planner-map');
 map?.addEventListener('click',e=>{if(e.target!==map && e.target.id!=='lines')return;const r=map.getBoundingClientRect();addPin((e.clientX-r.left)/r.width*100,(e.clientY-r.top)/r.height*100)});
 document.querySelectorAll('[data-pin]').forEach(b=>b.addEventListener('click',()=>{planner.active=b.dataset.pin;document.querySelector('#active-pin').textContent=b.textContent.trim()}));
 document.querySelector('#clear-pins')?.addEventListener('click',clearPins);
 document.querySelector('#save-plan')?.addEventListener('click',()=>{const data={address:document.querySelector('#planner-address').value,pins:planner.pins};const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='vinconnect-property-plan.json';a.click();URL.revokeObjectURL(a.href)});
 updateSummary();
});
