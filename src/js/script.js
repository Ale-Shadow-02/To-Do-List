const button = document.querySelector('.form__btn');
const ulList = document.querySelector('.js-list');
let liItem = document.querySelector('.form__item');
let deletLi = document.querySelector('.form__item--delet');
let formBodySort = document.querySelector('.form__body--sort');


deletLi.addEventListener('click', function () {
  ulList.removeChild(liItem);
});

button.addEventListener('click', function (event) {
  event.preventDefault();

  let li = document.createElement('li');
  let divDelet = document.createElement('div');
  let divDrag = document.createElement('div');
  let input = document.createElement('input');

  li.classList.add('form__item');
  li.setAttribute('draggable', true);
  divDelet.classList.add('form__item--delet');
  divDrag.classList.add('form__item--drag');
  input.classList.add('form__input');
  li.appendChild(divDelet);
  li.appendChild(divDrag);
  li.appendChild(input);

  ulList.appendChild(li);



  divDelet.addEventListener('click', function (event) {
    // let target = event.target;
    // [...liItems].splice(0, 1);
    //ulList.removeChild(li);
    //divDelet.parentElement.remove();
    divDelet.closest('li').remove();
  });




  ulList.addEventListener('dragstart', function (event) {
    event.target.classList.add('selected');
  });

  ulList.addEventListener('dragend', function (event) {
    event.target.classList.remove('selected');
  });

  const getNextElement = function (cursorPosition, currentElement) {
    const currentElementCoord = currentElement.getBoundingClientRect();
    const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

    const nextElement = (cursorPosition < currentElementCenter) ?
      currentElement :
      currentElement.nextElementSibling;

    return nextElement;
  };

  ulList.addEventListener('dragover', function (event) {
    event.preventDefault();
    const activeElement = ulList.querySelector('.selected');
    const currentElement = event.target;
    const isMoveable = activeElement !== currentElement && currentElement.classList.contains('form__item');

    if (!isMoveable) {
      return;
    }
    //!Переписать 
    /* const nextElement = (currentElement === activeElement.nextElementSibling) ?
      currentElement.nextElementSibling :
      currentElement; */

    const nextElement = getNextElement(event.clientY, currentElement);

    if (
      nextElement && activeElement === nextElement.previousElementSibling || activeElement === nextElement) {
      return;
    }

    ulList.insertBefore(activeElement, nextElement);
  });

  let liItems = document.querySelectorAll('li');
  console.log('liItems: ', liItems);

  formBodySort.addEventListener('click', function (event) {
    event.target.classList.toggle('sort-bottom');
    let sortLiItems;
    if (event.target.classList.contains('sort-bottom')) {
      sortLiItems = [...liItems].sort(function (a, b) {
        if (a.lastElementChild.value.charCodeAt(0) >= b.lastElementChild.value.charCodeAt(0)) {
          return 1;
        } else {
          return -1;
        }
      });
    } else {
      sortLiItems = [...liItems].sort(function (a, b) {
        if (a.lastElementChild.value.charCodeAt(0) <= b.lastElementChild.value.charCodeAt(0)) {
          return 1;
        } else {
          return -1;
        }
      });
    }

    ulList.innerHTML = '';

    for (let li of sortLiItems) {
      ulList.appendChild(li);
    }

  });

});