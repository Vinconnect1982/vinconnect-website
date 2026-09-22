const VC = window.VINCONNECT_CONFIG || {};
let selectedAddress = '';
let currentStep = 1;
let placeElement = null;

function money(n){
  return new Intl.NumberFormat('en-AU',{style:'currency',currency:'AUD',maximumFractionDigits:0}).format(n);
}

function setStatus(message, type=''){
  const el=document.querySelector('#address-status');
  if(!el) return;
  el.textContent=message;
  el.className='status'+(type?' '+type:'');
}

function showManualAddress(reason){
  const manual=document.querySelector('#address-manual-wrap');
  if(manual) manual.hidden=false;
  if(reason) setStatus(reason);
}

function getAddress(){
  const manual=document.querySelector('#address-manual');
  return (selectedAddress || manual?.value || '').trim();
}

function setStep(step){
  currentStep=Math.max(1,Math.min(4,step));
  document.querySelectorAll('[data-est-step]').forEach(el=>{
    el.hidden=Number(el.dataset.estStep)!==currentStep;
  });
  document.querySelectorAll('[data-step-dot]').forEach(el=>{
    const n=Number(el.dataset.stepDot);
    el.classList.toggle('active',n===currentStep);
    el.classList.toggle('done',n<currentStep);
  });
  const label=document.querySelector('#step-label');
  if(label) label.textContent='Step '+currentStep+' of 4';
  const progress=document.querySelector('#estimate-progress');
  if(progress) progress.style.width=(currentStep*25)+'%';
}

async function loadGoogleMaps(){
  const key=VC.googleMapsBrowserKey;
  if(!key){
    showManualAddress('Google address suggestions are not configured yet. You can still enter the full address manually.');
    return;
  }
  await new Promise((resolve,reject)=>{
    if(window.google?.maps){resolve();return;}
    const s=document.createElement('script');
    s.src='https://maps.googleapis.com/maps/api/js?key='+encodeURIComponent(key)+'&v=weekly&loading=async';
    s.async=true;
    s.onload=resolve;
    s.onerror=reject;
    document.head.appendChild(s);
  });
  const {PlaceAutocompleteElement}=await google.maps.importLibrary('places');
  placeElement=new PlaceAutocompleteElement();
  placeElement.placeholder='Start typing your street address';
  placeElement.includedRegionCodes=['au'];
  placeElement.className='vc-place-autocomplete';
  document.querySelector('#address-autocomplete')?.appendChild(placeElement);
  placeElement.addEventListener('gmp-select',async({placePrediction})=>{
    try{
      const place=placePrediction.toPlace();
      await place.fetchFields({fields:['formattedAddress','location']});
      if(place.formattedAddress){
        selectedAddress=place.formattedAddress;
        setStatus('Address selected.','good');
        document.querySelector('#address-selected').textContent=selectedAddress;
      }
    }catch(e){
      showManualAddress('We could not confirm that address automatically. Please enter it manually below.');
    }
  });
}

function baseTotal(){
  const height=document.querySelector('input[name="height"]:checked')?.value||'single';
  let total=height==='double'?550:300;
  if(document.querySelector('#conduit')?.checked) total+=120;
  if(document.querySelector('#router')?.checked) total+=150;
  return total;
}

async function calculate(){
  const address=getAddress();
  if(address.length<8){
    setStatus('Please choose or enter the full installation address.','bad');
    setStep(1);
    return;
  }
  const base=baseTotal();
  const out=document.querySelector('#price');
  const note=document.querySelector('#result-note');
  const addressOut=document.querySelector('#result-address');
  if(addressOut) addressOut.textContent=address;
  if(out) out.textContent='Checking…';
  if(note) note.textContent='Calculating the likely installation price for this property.';
  setStep(4);
  try{
    const response=await fetch('/.netlify/functions/estimate',{
      method:'POST',
      headers:{'content-type':'application/json'},
      body:JSON.stringify({address,base})
    });
    if(!response.ok) throw new Error('route');
    const data=await response.json();
    if(out) out.textContent=money(data.total);
    if(note) note.textContent='Indicative installation estimate based on the address and options selected. Final pricing is confirmed after VINCONNECT reviews access, mounting and cable route.';
  }catch(e){
    if(out) out.textContent='From '+money(base);
    if(note) note.textContent='The installation subtotal is shown. Location could not be checked automatically, so VINCONNECT will confirm the complete price before booking.';
  }
}

function nextFromAddress(){
  const address=getAddress();
  if(address.length<8){
    setStatus('Please choose an address from the suggestions or enter the full address manually.','bad');
    return;
  }
  selectedAddress=address;
  document.querySelector('#address-selected').textContent=address;
  setStep(2);
}

document.addEventListener('DOMContentLoaded',()=>{
  setStep(1);
  loadGoogleMaps().catch(()=>showManualAddress('Address suggestions could not load. Please enter the full address manually.'));
  setTimeout(()=>{
    if(!placeElement && !VC.googleMapsBrowserKey) showManualAddress();
  },5000);
  document.querySelector('#address-next')?.addEventListener('click',nextFromAddress);
  document.querySelector('#height-next')?.addEventListener('click',()=>setStep(3));
  document.querySelector('#height-back')?.addEventListener('click',()=>setStep(1));
  document.querySelector('#extras-back')?.addEventListener('click',()=>setStep(2));
  document.querySelector('#calculate')?.addEventListener('click',calculate);
  document.querySelector('#result-back')?.addEventListener('click',()=>setStep(3));
  document.querySelector('#manual-address-toggle')?.addEventListener('click',()=>showManualAddress());
});
