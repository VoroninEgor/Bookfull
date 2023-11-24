const swiper = new swiper('.swiper', {
  direction: 'horizontal', // Это задает горизонтальное направление свайпа
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});
