
const VC = window.VINCONNECT_CONFIG || {};
let selectedAddress = '';

function money(n){return new Intl.NumberFormat('en-AU',{style:'currency',currency:'AUD',maximumFractionDigits:0}).format(n)}

async function loadPlaces(){
  const key=VC.googleMapsBrowserKey;
  const status=document.querySelector('#address-status');
  if(!key){ status.textContent='Address autocomplete is in manual fallback mode. Add a Google Maps browser key in assets/config.js to enable suggestions.'; return; }
  await new Promise((resolve,reject)=>{
    window.__vcMapsReady=resolve;
    const s=document.createElement('script');
    s.src=`https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&libraries=places&callback=__vcMapsReady`;
    s.async=true;s.onerror=reject;document.head.appendChild(s);
  });
  const input=document.querySelector('#address');
  const ac=new google.maps.places.Autocomplete(input,{componentRestrictions:{country:'au'},fields:['formatted_address','geometry']});
  ac.addListener('place_changed',()=>{
    const place=ac.getPlace();
    if(place && place.formatted_address){selectedAddress=place.formatted_address; input.value=selectedAddress; status.textContent='Address selected.'; status.className='status good';}
  });
}

function clientBaseTotal(){
  const height=document.querySelector('input[name="height"]:checked')?.value || 'single';
  let t=height==='double'?550:300;
  if(document.querySelector('#conduit').checked)t+=120;
  if(document.querySelector('#router').checked)t+=150;
  return t;
}

async function calculate(){
  const btn=document.querySelector('#calculate');
  const address=document.querySelector('#address').value.trim();
  const result=document.querySelector('#result');
  const out=document.querySelector('#price');
  const note=document.querySelector('#result-note');
  if(address.length<8){document.querySelector('#address-status').textContent='Please enter the full installation address.';document.querySelector('#address-status').className='status bad';return;}
  btn.disabled=true; btn.textContent='Checking…';
  const base=clientBaseTotal();
  try{
    const response=await fetch('/.netlify/functions/estimate',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({address,base})});
    if(response.ok){
      const data=await response.json();
      out.textContent=money(data.total);
      note.textContent='Indicative installation estimate for the information supplied. Final price is confirmed after VINCONNECT reviews site access, mounting and cable route.';
    }else{throw new Error('server unavailable')}
  }catch(e){
    out.textContent=`From ${money(base)}`;
    note.textContent='Base installation estimate shown. Location/travel could not be checked automatically, so VINCONNECT will confirm the complete price before booking.';
  }
  result.classList.add('show');btn.disabled=false;btn.textContent='Check My Install Price';
}

document.addEventListener('DOMContentLoaded',()=>{loadPlaces().catch(()=>{});document.querySelector('#calculate')?.addEventListener('click',calculate)});
