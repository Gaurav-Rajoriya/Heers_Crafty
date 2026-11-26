/* Boot order: layout -> data-driven DOM -> behaviour -> motion (last, so it sees final DOM). */
(function(){
  var HC = window.HC;
  function boot(){
    try{
      HC.mountLayout(); HC.renderGrids(); HC.initJournal(); HC.initProductDetail();
      HC.initEnquiry(); HC.initThankYou(); HC.initNav(); HC.initSliders();
    }catch(err){ /* never block the page on a widget error */ if(window.console) console.error('Heer\u2019s-crafty init error:',err&&err.message); }
    try{ HC.initAnimations(); }catch(err){ document.documentElement.classList.remove('gsap-on'); }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
