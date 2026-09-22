
(function(){
  const year = new Date().getFullYear();
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=year);
  const menu = document.querySelector('[data-mobile-menu]');
  if(menu){menu.addEventListener('click',()=>document.body.classList.toggle('menu-open'));}
})();
