var bookTitle = "0";

function giveBookTitle() {
  title = document.getElementById('searching-field').value;
  console.log("результат запроса: " + title);
  searchingByName(title);
}

async function searchingByName(title, count = 4) {
  document.querySelector('.advice-wrapper').innerHTML = '';
  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(title)}&maxResults=${count}`);
    const data = await response.json();

    if (data.items && data.items.length == count) {
        const container = document.querySelector('.searching-content');
        container.innerHTML = '';
        for (i = 0; i < count; i++) {
          const book = data.items[i].volumeInfo;
          const imageLinks = book.imageLinks && book.imageLinks.thumbnail;
          const title = book.title;
          const authors = book.authors;

          if (imageLinks && title && authors && container) {
            container.innerHTML += 
            `<div class="searching-item">` +
              `<div class="searching-item__img"> <img src='${imageLinks}' alt='${title} Cover'> </div>` + 
              `<div class="searching-item__description"> <span class="searching-item__authors">${authors}</span> <span class="searching-item__title">${title}</span> </div>` + 
              `<div class="searching-item__plus-img" onclick="addBookToLocalSorage('${imageLinks}','${title}','${authors}')">` +
                `<i class="fa-solid fa-plus"></i>` +
              `</div>` +
            `</div>`;


          }
        }

      }
    } catch(error) {
      console.error('Error during fetch operation:', error);
    }
  }

function handleEnter(event) {
   if (event.key === "Enter") {
     giveBookTitle();
   }
}

var adviceTitles = ['Алина Адлер. Ты в порядке', 'Красная шапочка', 'Вселенная Хаяо Миядзаки', 'Джером Сэлинджер «Над пропастью во ржи»', 'Уильям Голдинг «Повелитель мух»', 'Харпер Ли «Убить пересмешника»', 'Рэй Брэдбери «451 градус по Фаренгейту»', 'Герман Гессе «Степной волк»', 'Олдос Хаксли «Гений и богиня»', 'Кен Кизи «Пролетая над гнездом кукушки»', 'Эдуард Веркин. Кусатель ворон', 'Эдуард Веркин «Облачный полк» '];

function addAdviceBlock(adviceTitles) {
  let adviceWrapper = document.querySelector('.advice-wrapper');
  
  for (i = 0; i < adviceTitles.length; i++) {
    adviceWrapper.innerHTML +=
    `<div class="advice-conteiner" id="${i}" onclick="handleAdviceClick(this)" >` +
      `<span>${adviceTitles[i]}</span>` +
    `</div>`;
  }
}
addAdviceBlock(adviceTitles);

function handleAdviceClick(adviceElemet) {
  let elementId = adviceElemet.id;
  searchingByName(adviceTitles[elementId]);
}




document.querySelector('#search').style.color = 'rgb(255, 174, 0)';

function generateKey(title, author){
  return `${title}_${author}`;
}

function addBookToLocalSorage(imageLinks, title, author) {
  let bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || {};

  let key = generateKey(title, author);

  bookshelf[key] = {imageLinks: imageLinks, title: title, author: author};


  localStorage.setItem('bookshelf', JSON.stringify(bookshelf));
}