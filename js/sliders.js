/* Swiper instances. Falls back to a scrollable row if Swiper is unavailable. */
(function(){
  var HC = window.HC = window.HC || {};
  HC.initSliders = function(){
    if(typeof Swiper==='undefined') return;
    document.querySelectorAll('.swiper[data-swiper]').forEach(function(el){
      if(el.swiper) return;
      var scope = el.closest('[data-slider-scope]')||el.parentElement;
      var prev=scope.querySelector('.sw-prev'), next=scope.querySelector('.sw-next');
      new Swiper(el,{
        slidesPerView:1.25, spaceBetween:18, grabCursor:true, watchOverflow:true, a11y:{enabled:true},
        navigation: prev&&next?{prevEl:prev,nextEl:next}:false,
        breakpoints:{600:{slidesPerView:2.2,spaceBetween:22},900:{slidesPerView:3.1,spaceBetween:28},1280:{slidesPerView:4,spaceBetween:30}}
      });
    });
  };
})();
