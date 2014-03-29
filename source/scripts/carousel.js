$(document).ready(function() {
  var carouselPrefix = '#carousel ';
  
  $(carouselPrefix+'.scrolling').scrollsnap({
      direction: 'x',
      snaps: '.scrolling-wrapper li',
      proximity: 1000,
      latency: 200,
      duration: 500,
      easing: 'easeInOutCirc'
  });
  $(carouselPrefix+'#next').on('click', function() {
    $(carouselPrefix+'.scrolling').trigger('next');
  });
  $(carouselPrefix+'#prev').on('click', function() {
    $(carouselPrefix+'.scrolling').trigger('prev');
  });
  $(carouselPrefix+'.scrolling').on('scrollstart', function() {
    $('.casestudies a').removeClass('preview');
    $('.overlay').removeClass('preview');
  });
  $(carouselPrefix+'.scrolling-wrapper li').on('scrollstopped', function() {
    $('.casestudies a').removeClass('preview');
    menuSelector = this.dataset.menu;
    $(menuSelector).addClass('preview');
    $('.overlay').removeClass('preview');
    overlaySelector = this.dataset.overlay;
    $(overlaySelector).addClass('preview');
  });

});