$(document).ready(function() {
  var carouselPrefix = '#carousel ';
  var carouselCurrentId = $(carouselPrefix+'.slide:nth-of-type(1)').attr('id');
  
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

    ga('send', 'event', 'carousel', 'next-click');
  });
  $(carouselPrefix+'#prev').on('click', function() {
    $(carouselPrefix+'.scrolling').trigger('prev');

    ga('send', 'event', 'carousel', 'prev-click');
  });
  $(carouselPrefix+'.scrolling').on('scrollstart', function() {
    $('.carousel-menu').removeClass('preview');
    $('.overlay').removeClass('preview');
  });
  $(carouselPrefix+'.scrolling-wrapper li').on('scrollstopped', function() {
    $('.carousel-menu').removeClass('preview');
    menuSelector = this.dataset.menu;
    $(menuSelector).addClass('preview');
    $('.overlay').removeClass('preview');
    overlaySelector = this.dataset.overlay;
    $(overlaySelector).addClass('preview');
    carouselCurrentId = this.id;

    ga('send', 'event', 'carousel', 'slide-view', carouselCurrentId);
  });

  $(carouselPrefix+'.overlay a').on('click', function() {
    ga('send', 'event', 'carousel', 'overlay-click', this.id);
  });

  $('.carousel-menu a').on('click', function() {
    ga('send', 'event', 'carousel', 'nav-click', this.id);
  });

});
