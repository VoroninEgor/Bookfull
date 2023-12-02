function displayBookshelf(){
  let bookshelf = JSON.parse(localStorage.getItem('bookshelf'));

  let content_wrapper = document.querySelector(`#index__bookshelf-section`);
  content_wrapper.innerHTML += `<div class="index-content-section">Книжная полка</div>`;
  
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

  for (let key in bookshelf){
    if (bookshelf.hasOwnProperty(key)) {
      let book = bookshelf[key];

      swiperWrapper.innerHTML +=
      `<div class="swiper-slide">` + 
        `<div class="index-content-container">` + 
          `<div class="bookshelf-read-btn" onclick="addToReading('${book.imageLinks}','${book.title}','${book.author}', '${key}')">ЧИТАТЬ</div>` +
          `<div class="bookshelf-delete-btn" onclick="deleteFromBookshelf('${key}')">` +
            `<i class="fa-solid fa-xmark"></i>` +
          `</div>` +
          `<div class="index-content-img"> <img src='${book.imageLinks}' alt='${book.title} Cover'> </div>` +
          `<div class="index-content-description">` +
            `<span class="index-content-author">${book.author}</span>` + 
           `<span class="index-content-title">${book.title}</span>` + 
           `</div>` + 
          `</div>` +
        `</div>`;
    }
  }
}

function displayReadingBooks() {
  let booksContainer = document.querySelector('#reading-swiper');
  let readingBooks = JSON.parse(localStorage.getItem('readingBooks')) || {};

  for (let key in readingBooks){
    if (readingBooks.hasOwnProperty(key)) {
      let book = readingBooks[key];


      booksContainer.innerHTML += 
      `<div class="swiper-slide">` +
        `<div class="advice-element">` +
          `<div class="reading-book">` +
            `<img src="${book.imageLinks}" class="reading-img">` +
            `<div class="reading-description">` + 
              `<div class="reading-author">${book.author}</div>` +
              `<div class="reading-title">${book.title}</div>` +
              `<div class="reading-footer">` +
                `<div class="reading-progressbar">` +
                  `<div class="reading-progressbar-filling" style="width: 30%; background-color: green;">10%</div>` +
                `</div>` +
                `<div class="reading-read-btn">ЧИТАТЬ</div>` +
              `</div>` +
            `</div>` +
            `<div class="reading-delete-btn">` +
              `<i class="fa-solid fa-xmark"></i>` +
              `</div>` +
          `</div>` +
        `</div>` + 
      `</div>`;

    }
  }

}

function addToReading(imageLinks, title, author, key){

  let readingBooks = JSON.parse(localStorage.getItem('readingBooks')) || {};

  readingBooks[key] = {imageLinks: imageLinks, title: title, author: author};
  localStorage.setItem('readingBooks', JSON.stringify(readingBooks));
}

function deleteFromBookshelf(key) {
  let bookshelf = JSON.parse(localStorage.getItem('bookshelf'));
  let readingBooks = JSON.parse(localStorage.getItem('readingBooks'));


  if (bookshelf.hasOwnProperty(key)) {

    delete bookshelf[key];

    delete readingBooks[key];

    localStorage.setItem('bookshelf', JSON.stringify(bookshelf));
    localStorage.setItem('readingBooks', JSON.stringify(readingBooks));
  }
  let content_wrapper = document.querySelector(`#index__bookshelf-section`);
  content_wrapper.innerHTML = '';
  displayBookshelf();
}

displayBookshelf();
displayReadingBooks();

document.querySelector('#mybook').style.color = 'rgb(255, 174, 0)';