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
    $('.casestudies a').removeClass('current');
    $('.overlay').removeClass('current');
  });
  $(carouselPrefix+'.scrolling-wrapper li').on('scrollstopped', function() {
    $('.casestudies a').removeClass('current');
    menuSelector = this.dataset.menu;
    $(menuSelector).addClass('current');
    $('.overlay').removeClass('current');
    overlaySelector = this.dataset.overlay;
    $(overlaySelector).addClass('current');
  });

});