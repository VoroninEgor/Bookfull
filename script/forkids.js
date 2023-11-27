let first_section = ["Ходячий замок", "Чебурашка", "Вафельное сердце", "Приключение незнайки", "Незнайка на луне", " Собачка соня на даче",  "Вафельное сердце", "Приключение незнайки", "Незнайка на луне"];
let second_section = ["Новогодний переполох", "По щучьему велению", "Печать любви", "Герда", "Ветер в ивах", "Капкан на обыротня",  "Вафельное сердце", "Приключение незнайки", "Незнайка на луне"];
let third_section = ["Следы преступления", "Книга юного шерлока", "Ключ от послезавтра", "Тайна красного шатра", "Тайна Школы Приквиллоу", "Братство безрассудных",  "Вафельное сердце", "Приключение незнайки", "Незнайка на луне"];

async function fetchAndDisplayBooks(titleArray, section_name, section_numer) {
  let content_wrapper = document.querySelector(`#forkids__${section_numer}`);
  content_wrapper.innerHTML += `<div class="forkids-content-section">${section_name}</div>`;

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
          `<div class="forkids-content-container">` + 
            `<div class="forkids-content-img"> <img src='${imageLinks}' alt='${title} Cover'> </div>` +
            `<div class="forkids-content-description">` +
              `<span class="forkids-content-author">${authors}</span>` + 
              `<span class="forkids-content-title">${title}</span>` + 
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
fetchAndDisplayBooks(first_section, 'Популярные книги', 'first-section');
fetchAndDisplayBooks(second_section, 'Новые книги в Букфулл', 'second-section');
fetchAndDisplayBooks(third_section, 'Детективы', 'third-section');


document.querySelector('#forkids').style.color = 'rgb(255, 174, 0)';