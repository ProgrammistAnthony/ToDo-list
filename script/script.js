let data = [];
data = JSON.parse(localStorage.getItem(`text`)) || [];
// try {
//     // Пытаемся загрузить и разобрать данные из localStorage
//     const loadedData = JSON.parse(localStorage.getItem('text'));
//     // Если данные существуют и это массив, используем его, иначе используем пустой массив
//     data = Array.isArray(loadedData) ? loadedData : [];
// } catch (e) {
//     // В случае ошибки (например, некорректного формата данных) инициализируем data как пустой массив
//     data = [];
// }
const btnClose = document.querySelectorAll(`.btn__close`);
const btnDelete = document.querySelector(`.btn__delete`);
const btnFinish = document.querySelector(`.btn__finish`);
const btnAdd = document.querySelector(`.btn__add`);
const input = document.querySelector(`.todo__input`);
const divContent = document.querySelector(`.todo__hero`);
const form = document.querySelector(`.header__form`);
const btnCheck = document.querySelectorAll(`.btn__checkbox`);
const btnStick = document.querySelectorAll(`.btn__stick`);
console.log(btnStick);

const createText = () =>{
    divContent.innerHTML = '';
    data.forEach((el) => {
        const text = document.createElement(`div`);
        text.className = `todo__content`;
        text.innerHTML = `<input type="checkbox" name="" id=""  class="btn__checkbox" ${el.isDone ? 'checked' : ''}>
        <p class="todo__text">${el.text}</p>
        <input type="image" src="./img/stick.png" alt="" class="btn__stick">
        <input type="image" class="btn__close" src="./img/close.png" alt="">`;
        divContent.appendChild(text);
    });
};

createText(data);

const getText = (evt) => {
    let value = input.value; 
    let obj = {
        text: value,
        isDone: false,
    }
    if (value) {
        data.push(obj); 
        createText(); 
        input.value = ''; 
    }
    localStorage.setItem("text", JSON.stringify(data));
    console.log();
};

input.addEventListener(`input`, (el) =>{
    document.querySelector(`.todo__header`).style = "border-radius: 16px 16px 0 0;"
    document.querySelector(`.todo__footer`).style = "padding: 24px;"
    document.querySelector(`.todo__footer`).classList.remove(`d-none`)
    document.querySelector(`.todo__footer`).classList.add(`visible`)
    divContent.classList.remove('d-none');
    divContent.classList.add(`visible`);
})
document.addEventListener(`click`, ()=>{
    document.querySelector(`.todo__header`).style = "border-radius: 16px;"
    document.querySelector(`.todo__footer`).style = "padding: 24px;"
    document.querySelector(`.todo__footer`).classList.add(`d-none`)
    document.querySelector(`.todo__footer`).classList.remove(`visible`)
    divContent.classList.add('d-none');
    divContent.classList.remove('visible');
})
document.querySelector('.main__todo').addEventListener('click', (event) => {
    event.stopPropagation();
});


form.addEventListener('submit', (evt) =>{
    evt.preventDefault();
    getText();
    console.log(data);
});

btnDelete.addEventListener(`click`, (evt) =>{
    evt.preventDefault();
    divContent.innerHTML = ``;
    localStorage.clear();
    data = [];
    console.log(localStorage);
})

let funcTrue = (arr, evt) =>{
    for (let i = 0; i < arr.length; i++){
        if (arr[i].text == evt.target.nextElementSibling.innerText){
            (arr[i].isDone) ? arr[i].isDone = false : arr[i].isDone = true;
            localStorage.setItem("text", JSON.stringify(arr));
        }
    }
}

let funcDelete = (arr, evt) => {
    for (let i = 0; i < arr.length; i++){
        if (arr[i].text == evt.target.previousElementSibling.innerText){
            evt.target.parentNode.remove();
            arr.splice(i, 1)
            localStorage.setItem("text", JSON.stringify(arr));
        }
    }
}

let funcFinish = (arr) => {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i].isDone === true) {
            arr.splice(i, 1); // Удаляем элемент
        }
    }
    localStorage.setItem("text", JSON.stringify(arr));
    createText(data);
}
let funcRename = (arr, evt) =>{
    for (let i = 0; i < arr.length; i++){
        if (arr[i].text == evt.target.previousElementSibling.innerText){
            let forma = document.createElement(`form`);
            let input = document.createElement('input');
            input.type = `text`;
            input.placeholder = 'Введите изменение';
            input.classList.add(`input__stick`);
            evt.target.parentNode.insertBefore(forma, evt.target.previousElementSibling);
            forma.appendChild(input);
            evt.target.previousElementSibling.remove();
            evt.target.src = `./img/check.png`;

            forma.addEventListener(`submit`, (evt)=>{
                evt.preventDefault();
                let value = input.value;
                let text = document.createElement(`p`);
                text.textContent = value;
                text.className = `todo__text`;
                evt.target.nextElementSibling.src = `./img/stick.png`;
                evt.target.parentNode.insertBefore(text, evt.target.nextElementSibling);
                forma.remove();
                input.remove();
                arr[i].text = text.textContent;
                console.log(arr[i]);
                localStorage.setItem("text", JSON.stringify(arr));
            })
        }
    }
}

divContent.addEventListener(`click`, (evt) => {
    if (evt.target.className == `btn__checkbox`) {
        funcTrue(data, evt);
    } 
    if (evt.target.className == `btn__close`){
        funcDelete(data, evt)
    }
    if (evt.target.className == `btn__stick`){
        funcRename(data, evt)
    }
})

btnFinish.addEventListener(`click`, (evt) =>{
    evt.preventDefault();
    funcFinish(data);
})
console.log(data);