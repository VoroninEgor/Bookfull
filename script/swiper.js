const swiper = new Swiper('.swiper', {
  direction: 'horizontal', // Это задает горизонтальное направление свайпа
  loop: false,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  slidesPerView: 'auto',
  slidesPerGroupAuto: true,
  spaceBetween: '20',
  centerInsufficientSlides: true,
});
