// ЗАДАНИЕ 1: Создание и вставка элементов
function createCard(title, content) {
    const card = document.createElement('div');
    card.className = 'card';
    
    const cardTitle = document.createElement('h4');
    cardTitle.textContent = title;
    
    const cardContent = document.createElement('p');
    cardContent.textContent = content;
    
    card.appendChild(cardTitle);
    card.appendChild(cardContent);
    
    document.getElementById('target1').appendChild(card);
}

function createList(items) {
    const list = document.createElement('ol');
    
    items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        list.appendChild(listItem);
    });
    
    document.getElementById('target1').appendChild(list);
}

// ЗАДАНИЕ 2: Навигация по DOM
function countChildren() {
    const parent = document.getElementById('parent-element');
    return parent.children.length;
}

function findSpecialChild() {
    const specialElement = document.querySelector('#parent-element .special');
    return specialElement ? specialElement.textContent : 'Элемент не найден';
}

function getParentBackground() {
    const child = document.querySelector('.child');
    const parent = child.parentElement;
    return window.getComputedStyle(parent).backgroundColor;
}

// ЗАДАНИЕ 3: Работа с классами и стилями
function setupStyleToggle() {
    document.getElementById('toggle-style').addEventListener('click', function() {
        const target = document.getElementById('style-target');
        target.classList.toggle('active-style');
    });
}

function changeHeaderColor() {
    const header = document.getElementById('main-header');
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    header.style.backgroundColor = randomColor;
}

function animateElement() {
    const element = document.getElementById('style-target');
    element.classList.add('animated');
    setTimeout(() => {
        element.classList.remove('animated');
    }, 1000);
}

// ЗАДАНИЕ 4: Обработка событий
function setupClickCounter() {
    let count = 0;
    const button = document.getElementById('click-btn');
    const counter = document.getElementById('click-counter');
    
    button.addEventListener('click', function() {
        count++;
        counter.textContent = count;
    });
}

function setupInputDisplay() {
    const input = document.getElementById('text-input');
    const display = document.getElementById('input-display');
    
    input.addEventListener('input', function() {
        display.textContent = input.value;
    });
}

function setupKeyboardEvents() {
    document.addEventListener('keydown', function(event) {
        console.log('Key pressed:', event.key, 'Code:', event.code);
    });
    
    document.addEventListener('keyup', function(event) {
        console.log('Key released:', event.key);
    });
}

// ЗАДАНИЕ 5: Динамические списки
function addListItem() {
    const input = document.getElementById('item-input');
    const list = document.getElementById('dynamic-list');
    
    if (input.value.trim() === '') return;
    
    const listItem = document.createElement('li');
    listItem.className = 'list-item';
    listItem.textContent = input.value;
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.onclick = removeListItem;
    
    listItem.appendChild(deleteButton);
    list.appendChild(listItem);
    
    input.value = '';
}

function removeListItem(event) {
    const listItem = event.target.parentElement;
    listItem.remove();
}

function clearList() {
    const list = document.getElementById('dynamic-list');
    list.innerHTML = '';
}

function setupListEvents() {
    document.getElementById('add-item-btn').addEventListener('click', addListItem);
    document.getElementById('clear-list-btn').addEventListener('click', clearList);
    
    document.getElementById('item-input').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addListItem();
        }
    });
}

// ЗАДАНИЕ 6: Работа с формами
function validateForm(formData) {
    const errors = {};
    
    if (!formData.name || formData.name.length < 2) {
        errors.name = 'Имя должно содержать минимум 2 символа';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
        errors.email = 'Введите корректный email';
    }
    
    const age = parseInt(formData.age);
    if (!formData.age || isNaN(age) || age < 1 || age > 120) {
        errors.age = 'Возраст должен быть числом от 1 до 120';
    }
    
    return Object.keys(errors).length === 0 ? null : errors;
}

function displayFormErrors(errors) {
    const output = document.getElementById('form-output');
    output.innerHTML = '';
    
    Object.values(errors).forEach(error => {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = error;
        output.appendChild(errorElement);
    });
}

function displayFormSuccess(userData) {
    const output = document.getElementById('form-output');
    output.innerHTML = '';
    
    const successElement = document.createElement('div');
    successElement.className = 'success-message';
    successElement.innerHTML = `
        <h3>Данные успешно отправлены!</h3>
        <p><strong>Имя:</strong> ${userData.name}</p>
        <p><strong>Email:</strong> ${userData.email}</p>
        <p><strong>Возраст:</strong> ${userData.age}</p>
    `;
    
    output.appendChild(successElement);
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        age: document.getElementById('age').value
    };
    
    const errors = validateForm(formData);
    
    if (errors) {
        displayFormErrors(errors);
    } else {
        displayFormSuccess(formData);
    }
}

function setupForm() {
    document.getElementById('user-form').addEventListener('submit', handleFormSubmit);
}

document.addEventListener('DOMContentLoaded', function() {
    setupStyleToggle();
    setupClickCounter();
    setupInputDisplay();
    setupKeyboardEvents();
    setupListEvents();
    setupForm();
});