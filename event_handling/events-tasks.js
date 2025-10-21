// ЗАДАНИЕ 1
function handleBasicClick(event) {
    const output = document.getElementById('basic-output');
    output.innerHTML = `
        <strong>Информация о событии:</strong><br>
        Тип: ${event.type}<br>
        Координаты: X=${event.clientX}, Y=${event.clientY}<br>
        Target: ${event.target.tagName}<br>
        Время: ${new Date().toLocaleTimeString()}
    `;
    
    event.target.style.transform = 'scale(1.05)';
    setTimeout(() => {
        event.target.style.transform = 'scale(1)';
    }, 150);
}

function handleMouseEvents(event) {
    const box = document.getElementById('color-box');
    const output = document.getElementById('mouse-output');
    
    switch(event.type) {
        case 'mouseenter':
            box.style.background = '#e74c3c';
            output.textContent = 'Курсор вошел в область';
            break;
        case 'mouseleave':
            box.style.background = '#3498db';
            output.textContent = 'Курсор покинул область';
            break;
        case 'mousemove':
            output.textContent = `Координаты: X=${event.offsetX}, Y=${event.offsetY}`;
            break;
    }
}

function setupBasicEvents() {
    document.getElementById('basic-btn').addEventListener('click', handleBasicClick);
    
    const colorBox = document.getElementById('color-box');
    colorBox.addEventListener('mouseenter', handleMouseEvents);
    colorBox.addEventListener('mouseleave', handleMouseEvents);
    colorBox.addEventListener('mousemove', handleMouseEvents);
}

// ЗАДАНИЕ 2
function handleKeyEvents(event) {
    const output = document.getElementById('key-output');

    if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        output.innerHTML = '<strong>Комбинация Ctrl+S заблокирована</strong>';
        return;
    }
    
    if (event.altKey && event.key === 'c') {
        event.preventDefault();
        output.innerHTML = '<strong>Комбинация Alt+C заблокирована</strong>';
        return;
    }
    
    if (event.shiftKey && event.key === 'a') {
        event.preventDefault();
        output.innerHTML = '<strong>Комбинация Shift+A заблокирована</strong>';
        return;
    }
    
    output.innerHTML = `
        <strong>Информация о клавише:</strong><br>
        Клавиша: ${event.key}<br>
        Код: ${event.code}<br>
        Ctrl: ${event.ctrlKey}<br>
        Alt: ${event.altKey}<br>
        Shift: ${event.shiftKey}
    `;
}

function setupKeyboardEvents() {
    const keyInput = document.getElementById('key-input');
    keyInput.addEventListener('keydown', handleKeyEvents);
    keyInput.addEventListener('keyup', () => {
        document.getElementById('key-output').textContent = 'Отпущена клавиша';
    });
}

// ЗАДАНИЕ 3
function handleDelegationClick(event) {
    const output = document.getElementById('delegation-output');
    
    if (event.target.classList.contains('item')) {
        event.target.classList.toggle('selected');
    } else if (event.target.classList.contains('delete')) {
        event.target.parentElement.remove();
    }
    
    const selectedItems = document.querySelectorAll('.item.selected');
    output.textContent = `Выбрано элементов: ${selectedItems.length}`;
}

function addNewItem() {
    const itemList = document.getElementById('item-list');
    const itemCount = itemList.children.length + 1;
    
    const newItem = document.createElement('li');
    newItem.className = 'item';
    newItem.dataset.id = itemCount;
    newItem.innerHTML = `Элемент ${itemCount} <button class="delete">×</button>`;
    
    itemList.appendChild(newItem);
}

function setupDelegationEvents() {
    const itemList = document.getElementById('item-list');
    itemList.addEventListener('click', handleDelegationClick);
    
    document.getElementById('add-item-btn').addEventListener('click', addNewItem);
}

// ЗАДАНИЕ 4
function preventLinkDefault(event) {
    event.preventDefault();
    const output = document.getElementById('prevention-output');
    output.innerHTML = '<strong>Переход по ссылке заблокирован!</strong>';
    
    event.target.style.borderColor = '#e74c3c';
    setTimeout(() => {
        event.target.style.borderColor = '#3498db';
    }, 500);
}

function preventFormSubmit(event) {
    event.preventDefault();
    const input = document.getElementById('prevent-input');
    const output = document.getElementById('prevention-output');
    
    if (!input.value.trim()) {
        output.innerHTML = '<strong>Ошибка: поле не должно быть пустым</strong>';
        input.classList.add('shake');
        setTimeout(() => {
            input.style.borderColor = '#bdc3c7';
        }, 500);
        return;
    }
    
    output.innerHTML = `<strong>Данные формы:</strong> "${input.value}"`;
    input.value = '';
}

function setupPreventionEvents() {
    document.getElementById('prevent-link').addEventListener('click', preventLinkDefault);
    document.getElementById('prevent-form').addEventListener('submit', preventFormSubmit);
}

// ЗАДАНИЕ 5
function triggerCustomEvent() {
    const customEvent = new CustomEvent('customAction', {
        detail: {
            message: "Привет от кастомного события!",
            timestamp: new Date().toLocaleTimeString()
        }
    });
    
    document.dispatchEvent(customEvent);
}

function handleCustomEvent(event) {
    const output = document.getElementById('custom-output');
    output.innerHTML = `
        <strong>Кастомное событие получено:</strong><br>
        Сообщение: ${event.detail.message}<br>
        Время: ${event.detail.timestamp}
    `;
    
    const btn = document.getElementById('trigger-custom');
    btn.classList.add('bounce');
    setTimeout(() => {
        btn.classList.remove('bounce');
    }, 500);
}

function setupMultipleListeners() {
    const handler1 = (event) => {
        console.log('Обработчик 1:', event.detail.message);
    };
    
    const handler2 = (event) => {
        console.log('Обработчик 2:', event.detail.timestamp);
    };
    
    const handler3 = (event) => {
        console.log('Обработчик 3: Событие обработано!');
    };
    
    document.addEventListener('customAction', handler1);
    document.addEventListener('customAction', handler2);
    document.addEventListener('customAction', handler3);

    triggerCustomEvent();
}

function setupCustomEvents() {
    document.addEventListener('customAction', handleCustomEvent);
    document.getElementById('trigger-custom').addEventListener('click', triggerCustomEvent);
    document.getElementById('multiple-listeners').addEventListener('click', setupMultipleListeners);
}

// ЗАДАНИЕ 6
function loadImageWithEvents() {
    const container = document.getElementById('image-container');
    const output = document.getElementById('loading-output');
    
    container.innerHTML = '';
    output.textContent = 'Начало загрузки...';
    
    const img = new Image();
    
    img.onloadstart = () => {
        output.textContent = 'Загрузка началась...';
    };
    
    img.onload = () => {
        output.textContent = 'Изображение успешно загружено!';
        container.appendChild(img);
    };
    
    img.onerror = () => {
        output.textContent = 'Ошибка загрузки изображения!';
    };
    
    img.onloadend = () => {
        console.log('Загрузка завершена');
    };
    
    img.src = 'https://picsum.photos/300/200?' + Date.now();
}

function simulateLoadError() {
    const output = document.getElementById('loading-output');
    output.textContent = 'Попытка загрузки несуществующего изображения...';
    
    const img = new Image();
    img.onload = () => {
        output.textContent = 'Изображение загружено (неожиданно!)';
    };
    img.onerror = () => {
        output.textContent = 'Ошибка загрузки: изображение не найдено';
    };
    
    img.src = 'https://invalid-url-that-does-not-exist.com/image.jpg';
}

function setupLoadingEvents() {
    document.getElementById('load-image').addEventListener('click', loadImageWithEvents);
    document.getElementById('load-error').addEventListener('click', simulateLoadError);
}

// ЗАДАНИЕ 7
let timerInterval;
let timerValue = 0;

function startTimer() {
    if (timerInterval) return;
    
    const output = document.getElementById('timer-output');
    timerInterval = setInterval(() => {
        timerValue++;
        output.textContent = `${timerValue} сек`;
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    timerValue = 0;
    document.getElementById('timer-output').textContent = '0 сек';
}

function createDebounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

function createThrottle(func, interval) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= interval) {
            lastCall = now;
            func.apply(this, args);
        }
    };
}

function testDebounce() {
    const output = document.getElementById('async-output');
    const debouncedFunc = createDebounce(() => {
        output.textContent += 'Debounce сработал!\n';
    }, 1000);
    
    output.textContent = 'Быстрые клики (debounce):\n';
    for (let i = 0; i < 5; i++) {
        debouncedFunc();
    }
}

function testThrottle() {
    const output = document.getElementById('async-output');
    let count = 0;
    const throttledFunc = createThrottle(() => {
        count++;
        output.textContent = `Throttle сработал: ${count} раз\n`;
    }, 1000);
    
    output.textContent = 'Быстрые клики (throttle):\n';
    const interval = setInterval(() => {
        throttledFunc();
    }, 100);
    
    setTimeout(() => {
        clearInterval(interval);
    }, 3000);
}

function setupTimerEvents() {
    document.getElementById('start-timer').addEventListener('click', startTimer);
    document.getElementById('stop-timer').addEventListener('click', stopTimer);
    document.getElementById('debounce-btn').addEventListener('click', testDebounce);
    document.getElementById('throttle-btn').addEventListener('click', testThrottle);
}

document.addEventListener('DOMContentLoaded', function() {
    setupBasicEvents();
    setupKeyboardEvents();
    setupDelegationEvents();
    setupPreventionEvents();
    setupCustomEvents();
    setupLoadingEvents();
    setupTimerEvents();
});