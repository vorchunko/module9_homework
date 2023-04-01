// Задание 1.
// Вам дана заготовка и результат, который вы должны получить. Ваша задача — написать код, который будет преобразовывать XML в JS-объект и выводить его в консоль.

const parser = new DOMParser ();
const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

const xmlDOM = parser.parseFromString(xmlString, "text/xml");

// const listNode = xmlDOM.querySelector("list");
// const studentNode = listNode.querySelector("student");

const studentNode = xmlDOM.querySelectorAll("student");
const result = [];

studentNode.forEach((studentNode) => {
const nameNode = studentNode.querySelector("name");
const firstNode = nameNode.querySelector("first");
const secondNode = nameNode.querySelector("second");
const ageNode = studentNode.querySelector("age");
const profNode = studentNode.querySelector("prof")
const langAttr = nameNode.getAttribute("lang");

    result.push({
    first: `${firstNode.textContent}`, 
    second: `${secondNode.textContent}`,
    age: ageNode.textContent,
    prof: profNode.textContent,
    lang: langAttr,
  });

});
console.log (result);

// Задание 2.
// Вам дана заготовка и результат, который вы должны получить. Ваша задача — написать код, который будет преобразовывать JSON в JS-объект и выводить его в консоль.

const jsonString = `{
  "list": [
  {
  "name": "Petr",
  "age": "20",
  "prof": "mechanic"
  },
  {
  "name": "Vova",
  "age": "60",
  "prof": "pilot"
  }
  ]
}`;
  
const data = JSON.parse(jsonString);
  
console.log(data);

  //  Задание 3
  //  Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число. При клике на кнопку происходит следующее:
  // Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
  //Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL https://picsum.photos/v2/list?limit=10, где get-параметр limit — это введённое число.
  const numberNode = document.querySelector(".numberInput");
  const submitNode = document.querySelector(".submitButton");
  const resultNode = document.querySelector(".resultInput");
  
  function useRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    
    xhr.onload = function() {
      if (xhr.status != 200) {
        console.log('Статус ответа: ', xhr.status);
      } else {
        const result = JSON.parse(xhr.response);
        if (callback) {
          callback(result);
        }
      }
    };
    
    xhr.onerror = function() {
      console.log('Ошибка! Статус ответа: ', xhr.status);
    };
    
    xhr.send();
  };
  
  function displayResult(apiData) {
    let cards = '';
    // console.log('start cards', cards);
    
    apiData.forEach(item => {
      const cardBlock = `
        <div class="card">
          <img
            src="${item.download_url}"
            class="card-image"
          />
          <p>${item.author}</p>
        </div>
      `;
      cards = cards + cardBlock;
    });
    
  resultNode.innerHTML = cards;
  }
  
  submitNode.addEventListener('click', () => {
    const number = parseInt(numberNode.value);
    if (number >= 1 && number <= 10) {
      const url = `https://picsum.photos/v2/list?limit=${number}`;
      useRequest(url, displayResult);
    } else {
      resultNode.innerHTML = 'число вне диапазона от 1 до 10';
    }
  });

  Задание 4
  // Напишите код приложения, интерфейс которого представляет собой 2 input и кнопку submit. В input можно ввести любое число.
  // При клике на кнопку происходит следующее:
  // Если оба числа не попадают в диапазон от 100 до 300 или введено не число — выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;
  // Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch по URL https://picsum.photos/200/300, где первое число — ширина картинки, второе — высота.

  {/* <html>
<input class="width" type="number">
<input class="height" type="number">
<button class="submitButton">Submit</button>
<div class="resultInput"></div>
</html> */}

const btn = document.querySelector(".submitButton");
const result = document.querySelector(".resultInput");

btn.addEventListener('click', () => {
  const number1 = document.querySelector('.width').value;
  const number2 = document.querySelector('.height').value;
  if (isNaN(number1) || isNaN(number2) || number1 < 100 || number1 > 300 || number2 < 100 || number2 > 300) {
    result.innerHTML = 'Одно из чисел вне диапазона от 100 до 300';
  } else {
    fetch(`https://picsum.photos/${number1}/${number2}`)
      .then((response) => {
      download_url = response.url
      let image = ''
      const cards = `
        <div class="card">
          <img
            src="${download_url}"
            class="card-image"
          />`;
        image=image+cards
      result.innerHTML = image; 
  });
};
})

// Задание 5
// Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.
// Заголовок первого input — «номер страницы».
// Заголовок второго input — «лимит».
// Заголовок кнопки — «запрос».

{/* <input class="number" type="number" placeholder ="номер страницы">
<input class="limit" type="number" placeholder ="лимит">
<button class="submitButton">Запрос</button>
<div class="resultInput"></div> */}

const btn = document.querySelector(".submitButton");
const result = document.querySelector(".resultInput");


   function generateImage(data) {
  let image = '';
  for (item in data){
 image += `<div class="card"><img src="${data[item].download_url}" class="card-image"/></div>`;
  }
  result.innerHTML = image;
  localStorage.setItem("imageData", JSON.stringify(data));
}

btn.addEventListener('click', () => {
  const number = document.querySelector('.number').value;
  const limit = document.querySelector('.limit').value;
  if (isNaN(number) || number < 1 || number > 10) {
    result.innerHTML = 'Номер страницы вне диапазона от 1 до 10';
  } else if (isNaN(number) || limit < 1 || limit > 10) {
  result.innerHTML = 'Лимит вне диапазона от 1 до 10';
  }else if ((isNaN(number) || number < 1 || number > 10) && (isNaN(number) || limit < 1 || limit > 10 )) {
 result.innerHTML = 'Номер страницы и лимит вне диапазона от 1 до 10';
 }else fetch(`https://picsum.photos/v2/list?page=${number}&limit=${limit}`)
 .then((response) => {
   return response.json();
   })
  .then((data) => {
   generateImage(data);
 })
   .catch(() => { console.log('error') });
});
  
window.addEventListener('load', () => {
  const storedData = localStorage.getItem("imageData");
  if (storedData) {
    generateImage(JSON.parse(storedData));
  }
});
  
  
  
  


