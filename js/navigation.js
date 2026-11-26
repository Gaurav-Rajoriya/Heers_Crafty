/* Header behaviour, desktop dropdown, mobile menu (body-level, touch-friendly), light page transitions. */
(function(){
  var HC = window.HC = window.HC || {};
  HC.lock=function(on){
    document.documentElement.classList.toggle('is-locked',on);
    if(HC.lenis){ on?HC.lenis.stop():HC.lenis.start(); }
  };
  HC.initNav=function(){
    if(HC._nav) return; HC._nav=true;
    var header=document.getElementById('site-header'); if(!header) return;
    var darkHero=document.body.hasAttribute('data-dark-hero');
    var announceH=parseInt(getComputedStyle(document.documentElement).getPropertyValue('--announce-h'),10)||34;
    var ticking=false;
    var onScroll=function(){ header.classList.toggle('solid',window.scrollY>40); header.style.top=Math.max(0,announceH-window.scrollY)+'px'; ticking=false; };
    onScroll(); window.addEventListener('scroll',function(){ if(!ticking){ticking=true;requestAnimationFrame(onScroll);} },{passive:true});

    // ---- desktop dropdown (hover, click, keyboard; click-toggle also serves touch laptops/tablets) ----
    var dd=header.querySelector('.has-dd'), btn=header.querySelector('.dd-btn');
    if(dd&&btn){
      var setDD=function(o){ dd.classList.toggle('open',o); btn.setAttribute('aria-expanded',o); };
      btn.addEventListener('click',function(e){ e.stopPropagation(); setDD(!dd.classList.contains('open')); });
      document.addEventListener('click',function(e){ if(!dd.contains(e.target)) setDD(false); });
      dd.addEventListener('keydown',function(e){ if(e.key==='Escape'){setDD(false);btn.focus();} });
    }

    // ---- mobile menu ----
    var burger=header.querySelector('.burger'), menu=document.getElementById('mobile-menu');
    if(!burger||!menu) return;
    var toggle=menu.querySelector('.mm-toggle'), sub=menu.querySelector('.mm-sub');
    var isOpen=function(){return menu.classList.contains('open');};
    var focusables=function(){ return [burger].concat([].slice.call(menu.querySelectorAll('a,button')).filter(function(el){ return el.offsetParent!==null && getComputedStyle(el).visibility!=='hidden'; })); };
    function setMenu(open){
      if(open===isOpen()) return;
      menu.classList.toggle('open',open); header.classList.toggle('menu-open',open);
      burger.setAttribute('aria-expanded',open); burger.setAttribute('aria-label',open?'Close menu':'Open menu');
      if(!open){ sub.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); }
      menu.toggleAttribute('inert',!open);
      HC.lock(open);
      if(open){ var f=menu.querySelector('a,button'); f&&f.focus({preventScroll:true}); } else { burger.focus({preventScroll:true}); }
    }
    menu.setAttribute('inert','');
    burger.addEventListener('click',function(){ setMenu(!isOpen()); });
    toggle.addEventListener('click',function(){ var o=!sub.classList.contains('open'); sub.classList.toggle('open',o); toggle.setAttribute('aria-expanded',o); });
    menu.addEventListener('click',function(e){ if(e.target===menu||e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown',function(e){
      if(!isOpen()) return;
      if(e.key==='Escape'){ setMenu(false); return; }
      if(e.key==='Tab'){ var f=focusables(); if(!f.length) return; var i=f.indexOf(document.activeElement);
        if(e.shiftKey&&(i<=0)){e.preventDefault();f[f.length-1].focus();} else if(!e.shiftKey&&i===f.length-1){e.preventDefault();f[0].focus();} }
    });
    window.matchMedia('(min-width:1101px)').addEventListener('change',function(m){ if(m.matches) setMenu(false); });
    window.addEventListener('pagehide',function(){ HC.lock(false); });

    // ---- page transition: short fade for same-site links only ----
    var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(!reduce) document.addEventListener('click',function(e){
      var a=e.target.closest('a'); if(!a||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey) return;
      if(a.target&&a.target!=='_self') return;
      var u; try{u=new URL(a.href,location.href);}catch(x){return;}
      if(u.origin!==location.origin||(u.pathname===location.pathname&&u.search===location.search)) return;
      e.preventDefault(); document.body.classList.add('leaving');
      setTimeout(function(){location.href=u.href;},200);
    });
    window.addEventListener('pageshow',function(e){ if(e.persisted){ document.body.classList.remove('leaving'); HC.lock(false); } });
  };
})();
