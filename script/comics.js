let first_section = ["Том и полночный сад", "Дешево и сердито ", "Майор Гром", "Первый женский университет", "Стеффен Квернеланн Мунк", "Грустные факты о животных",  "Фрэнсис Loputyn", "Пацаны", "Чумной доктор"];
let second_section = ["Бойцовский клуб", "Эпоха сериалов", "Изречения в комиксах", "Быть вместе. Дубби Танг", "Время ждать", "Властелины вселенной", "Песьи байки"];
let third_section = ["Симпсоны", "Дорога ярости", "Помутнение", "Вселенная Marvel", "Лавина", "Нейромант",  "Cotton Tales"];

async function fetchAndDisplayBooks(titleArray, section_name, section_numer) {
  let content_wrapper = document.querySelector(`#comics__${section_numer}`);
  content_wrapper.innerHTML += `<div class="comics-content-section">${section_name}</div>`;

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
          `<div class="comics-content-container">` + 
            `<div class="comics-content-img"> <img src='${imageLinks}' alt='${title} Cover'> </div>` +
            `<div class="comics-content-description">` +
              `<span class="comics-content-author">${authors}</span>` + 
              `<span class="comics-content-title">${title}</span>` + 
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
fetchAndDisplayBooks(first_section, 'С чего начать', 'first-section');
fetchAndDisplayBooks(second_section, 'Новинки', 'second-section');
fetchAndDisplayBooks(third_section, 'Фантастика и фэнтези', 'third-section');

let navlogo = document.querySelector('#comics');
navlogo.style.color = 'black';
navlogo.textContent = 'Komukcb1';
navlogo.style.fontFamily = 'Fontdiner Swanky, serif';

document.querySelector('.logo').style.color = 'black';

