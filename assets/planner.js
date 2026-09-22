const VC = window.VINCONNECT_CONFIG || {};
const planner = {
  map:null,
  active:'house',
  points:[],
  markers:[],
  lines:[],
  boundary:[],
  polygon:null,
  boundaryMode:false,
  locked:false,
  address:''
};

const labels={house:'H',shed:'S',stable:'ST',office:'O',gate:'G',camera:'C'};

function plannerStatus(message,type=''){
  const el=document.querySelector('#planner-status');
  if(!el)return;
  el.textContent=message;
  el.className='status'+(type?' '+type:'');
}

function updateSummary(){
  const summary=document.querySelector('#planner-summary');
  const distances=document.querySelector('#planner-distances');
  if(summary){
    summary.textContent=planner.points.length
      ? planner.points.length+' place'+(planner.points.length===1?'':'s')+' marked. The first point is treated as the internet source.'
      : 'No places marked yet.';
  }
  if(!distances || !window.google?.maps?.geometry) return;
  distances.innerHTML='';
  if(planner.points.length<2) return;
  const origin=planner.points[0];
  planner.points.slice(1).forEach((point,index)=>{
    const metres=google.maps.geometry.spherical.computeDistanceBetween(origin.position,point.position);
    const row=document.createElement('div');
    row.className='distance-row';
    row.textContent=(index+2)+'. '+point.type.charAt(0).toUpperCase()+point.type.slice(1)+' — '+(metres<1000?Math.round(metres)+' m':(metres/1000).toFixed(2)+' km');
    distances.appendChild(row);
  });
}

function clearLines(){
  planner.lines.forEach(line=>line.setMap(null));
  planner.lines=[];
}

function redrawLines(){
  clearLines();
  if(!planner.map || planner.points.length<2) return;
  const origin=planner.points[0].position;
  planner.points.slice(1).forEach(point=>{
    const line=new google.maps.Polyline({
      map:planner.map,
      path:[origin,point.position],
      geodesic:true,
      strokeColor:'#28ced1',
      strokeOpacity:.9,
      strokeWeight:3
    });
    planner.lines.push(line);
  });
  updateSummary();
}

function addMapPoint(position){
  if(planner.points.length>=20){
    plannerStatus('Maximum of 20 points reached. Clear the plan to start again.','bad');
    return;
  }
  const type=planner.points.length===0?'house':planner.active;
  const marker=new google.maps.Marker({
    map:planner.map,
    position,
    label:{text:labels[type]||'•',color:'#ffffff',fontWeight:'700'},
    title:type
  });
  const point={type,position};
  planner.points.push(point);
  planner.markers.push(marker);
  redrawLines();
  plannerStatus(type.charAt(0).toUpperCase()+type.slice(1)+' point added.','good');
}

function addBoundaryPoint(position){
  planner.boundary.push(position);
  drawBoundary();
  plannerStatus(planner.boundary.length+' boundary point'+(planner.boundary.length===1?'':'s')+' added. Continue around the property, then press Finish boundary.','good');
}

function drawBoundary(){
  if(planner.polygon) planner.polygon.setMap(null);
  if(planner.boundary.length<2) return;
  planner.polygon=new google.maps.Polygon({
    map:planner.map,
    paths:planner.boundary,
    strokeColor:'#28ced1',
    strokeOpacity:.9,
    strokeWeight:2,
    fillColor:'#28ced1',
    fillOpacity:.10,
    clickable:false
  });
}

function toggleBoundary(){
  planner.boundaryMode=!planner.boundaryMode;
  const btn=document.querySelector('#boundary-mode');
  if(btn) btn.textContent=planner.boundaryMode?'Finish boundary':'Trace property boundary';
  plannerStatus(
    planner.boundaryMode
      ? 'Boundary mode is on. Click around the edge of the property.'
      : (planner.boundary.length>=3?'Property boundary saved on the map.':'Boundary mode finished. Add at least three points to form an outline.'),
    planner.boundary.length>=3?'good':''
  );
}

function toggleLock(){
  planner.locked=!planner.locked;
  planner.map?.setOptions({
    gestureHandling:planner.locked?'none':'greedy',
    zoomControl:!planner.locked,
    scrollwheel:!planner.locked,
    disableDoubleClickZoom:planner.locked
  });
  const btn=document.querySelector('#lock-view');
  if(btn) btn.textContent=planner.locked?'Unlock map view':'Lock map view';
  plannerStatus(planner.locked?'Map view locked. You can still add planning points.':'Map view unlocked.','good');
}

function clearPlan(){
  planner.markers.forEach(marker=>marker.setMap(null));
  planner.markers=[];
  planner.points=[];
  clearLines();
  planner.boundary=[];
  if(planner.polygon){planner.polygon.setMap(null);planner.polygon=null;}
  planner.boundaryMode=false;
  const boundaryBtn=document.querySelector('#boundary-mode');
  if(boundaryBtn) boundaryBtn.textContent='Trace property boundary';
  updateSummary();
  plannerStatus('Plan cleared.');
}

function savePlan(){
  const data={
    address:planner.address || document.querySelector('#planner-manual-address')?.value || '',
    mapCenter:planner.map ? {lat:planner.map.getCenter().lat(),lng:planner.map.getCenter().lng(),zoom:planner.map.getZoom()} : null,
    points:planner.points.map(p=>({type:p.type,lat:p.position.lat(),lng:p.position.lng()})),
    boundary:planner.boundary.map(p=>({lat:p.lat(),lng:p.lng()}))
  };
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='vinconnect-property-plan.json';
  a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href),250);
}

async function loadMaps(){
  const key=VC.googleMapsBrowserKey;
  if(!key){
    document.querySelector('#planner-manual-wrap').hidden=false;
    plannerStatus('Google Maps is not configured yet. Add the browser key to assets/config.js to enable the live satellite planner.','bad');
    return;
  }

  await new Promise((resolve,reject)=>{
    if(window.google?.maps){resolve();return;}
    const script=document.createElement('script');
    script.src='https://maps.googleapis.com/maps/api/js?key='+encodeURIComponent(key)+'&v=weekly&loading=async';
    script.async=true;
    script.onload=resolve;
    script.onerror=reject;
    document.head.appendChild(script);
  });

  const [{Map},placesLib]=await Promise.all([
    google.maps.importLibrary('maps'),
    google.maps.importLibrary('places'),
    google.maps.importLibrary('geometry')
  ]);

  planner.map=new Map(document.querySelector('#planner-map'),{
    center:{lat:-38.113, lng:145.283},
    zoom:16,
    mapTypeId:'satellite',
    streetViewControl:false,
    fullscreenControl:true,
    mapTypeControl:true,
    gestureHandling:'greedy'
  });

  planner.map.addListener('click',event=>{
    if(!event.latLng) return;
    if(planner.boundaryMode) addBoundaryPoint(event.latLng);
    else addMapPoint(event.latLng);
  });

  const placeElement=new placesLib.PlaceAutocompleteElement();
  placeElement.placeholder='Start typing the property address';
  placeElement.includedRegionCodes=['au'];
  placeElement.className='vc-place-autocomplete';
  document.querySelector('#planner-autocomplete')?.appendChild(placeElement);

  placeElement.addEventListener('gmp-select',async({placePrediction})=>{
    try{
      const place=placePrediction.toPlace();
      await place.fetchFields({fields:['formattedAddress','location','viewport']});
      if(place.formattedAddress) planner.address=place.formattedAddress;
      if(place.viewport) planner.map.fitBounds(place.viewport);
      else if(place.location){
        planner.map.setCenter(place.location);
        planner.map.setZoom(19);
      }
      plannerStatus('Property loaded. Switch to satellite detail, lock the view when ready, then place the house first.','good');
    }catch(e){
      plannerStatus('The address was found but the map could not be positioned. Try the address again.','bad');
    }
  });

  plannerStatus('Satellite map ready. Search for the property address to begin.','good');
}

document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('[data-pin]').forEach(button=>{
    button.addEventListener('click',()=>{
      planner.active=button.dataset.pin;
      document.querySelectorAll('[data-pin]').forEach(x=>x.classList.toggle('active',x===button));
      const active=document.querySelector('#active-pin');
      if(active) active.textContent=button.textContent.trim();
    });
  });
  document.querySelector('#boundary-mode')?.addEventListener('click',toggleBoundary);
  document.querySelector('#lock-view')?.addEventListener('click',toggleLock);
  document.querySelector('#clear-pins')?.addEventListener('click',clearPlan);
  document.querySelector('#save-plan')?.addEventListener('click',savePlan);
  loadMaps().catch(()=>{
    document.querySelector('#planner-manual-wrap').hidden=false;
    plannerStatus('The Google satellite map could not load. Check the Maps browser key and enabled APIs.','bad');
  });
  updateSummary();
});
