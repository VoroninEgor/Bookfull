let first_section = ["Один плюс один", "Великий Гэтсби", "KGBT+", "Энцо Феррари", "To Kill a Mockingbird", "В унисон", "Аномалия", "Изобретатель кроссовок"];
let second_section = ["Противостояние", "Лондон в огне", "Гарри Поттер", "Герда", "Пучина", "Под крики сов", "Лисья нора", "Иные"];
let third_section = ["Жаренные зеленые помидоры", "Корпорация самозванцев ", "Шантарм", "Скафандр и бабочка", "Ставок больше нет", "Лисьи чары", "Доктор кто. День доктора", "В унисон"];

async function fetchAndDisplayBooks(titleArray, section_name, section_numer) {
  let content_wrapper = document.querySelector(`#index__${section_numer}`);
  content_wrapper.innerHTML += `<div class="index-content-section">${section_name}</div>`;
  
  let swiperContainer = document.createElement('div');
  swiperContainer.className = 'swiper';
  let swiperWrapper = document.createElement('div');
  swiperWrapper.className = 'swiper-wrapper';
  let swiperBtnPrev = document.createElement('div');
  swiperBtnPrev.className = 'swiper-button-prev';
  let swiperBtnNext = document.createElement('div');
  swiperBtnNext.className = 'swiper-button-next';
  swiperContainer.appendChild(swiperWrapper);
  swiperContainer.appendChild(swiperBtnPrev);
  swiperContainer.appendChild(swiperBtnNext);
  content_wrapper.appendChild(swiperContainer);
  for (let title of titleArray) {
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(title)}&maxResults=1`);
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        const book = data.items[0].volumeInfo;
        const imageLinks = book.imageLinks && book.imageLinks.thumbnail;
        const title = book.title;
        const authors = book.authors;
        if (content_wrapper && imageLinks && title && authors) {
          swiperWrapper.innerHTML +=
          `<div class="swiper-slide">` + 
            `<div class="index-content-container">` + 
              `<div class="index-content-img"> <img src='${imageLinks}' alt='${title} Cover'> </div>` +
              `<div class="index-content-description">` +
                `<span class="index-content-author">${authors}</span>` + 
               `<span class="index-content-title">${title}</span>` + 
               `</div>` + 
              `</div>` +
            `</div>`;

        }

      }
      
  
    }catch(error) {
        console.error('Error during fetch operation:', error);
      }
  }

}
fetchAndDisplayBooks(first_section, 'Новинки', 'first-section');
fetchAndDisplayBooks(second_section, 'Суперхиты', 'second-section');
fetchAndDisplayBooks(third_section, 'Популярно сейчас', 'third-section');

document.querySelector('#main').style.color = 'rgb(255, 174, 0)';