const button = document.querySelector('.form__btn');
const ulList = document.querySelector('.js-list');
const deletLi = document.querySelector('.js-delet');



button.addEventListener('click', (event) => {
  event.preventDefault();

  let li = document.createElement('li');
  li.classList.add('form__item');
  li.innerHTML = '<div class="form__item--delet"></div><input type="text" class="form__input">';
  ulList.appendChild(li);
});

let liItem = document.querySelector('.form__item');
console.log('liItem: ', liItem);



deletLi.addEventListener('click', () => {
  // let target = event.target;
  ulList.removeChild(liItem);
});