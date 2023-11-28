const singleswiper = new Swiper('.singleswiper', {
  direction: 'horizontal', // Это задает горизонтальное направление свайпа
  loop: true,
  autoplay: {
    delay: 10000,
  },
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  slidesPerView: 'auto',
  slidesPerGroupAuto: true,
  spaceBetween: '30',
  centerInsufficientSlides: true,
});
