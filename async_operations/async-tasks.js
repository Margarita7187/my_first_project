// ЗАДАНИЕ 1: Основы промисов
function createBasicPromise(shouldResolve = true) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve) {
                resolve("Успех! Промис выполнен через 1 секунду");
            } else {
                reject("Ошибка! Промис отклонен через 1 секунду");
            }
        }, 1000);
    });
}

function handleBasicPromise() {
    const output = document.getElementById('promise-output');
    output.textContent = "Ожидание выполнения промиса...";
    
    createBasicPromise(true)
        .then(result => {
            output.textContent = result;
            output.className = 'output success';
        })
        .catch(error => {
            output.textContent = error;
            output.className = 'output error';
        });
}

function createPromiseChain() {
    const output = document.getElementById('promise-output');
    output.textContent = "Запуск цепочки промисов...";
    
    createBasicPromise(true)
        .then(result => {
            output.textContent += `\n1. ${result}`;
            return "Второй шаг выполнен";
        })
        .then(result => {
            output.textContent += `\n2. ${result}`;
            return "Третий шаг выполнен";
        })
        .then(result => {
            output.textContent += `\n3. ${result}`;
            output.textContent += "\nЦепочка завершена!";
            output.className = 'output success';
        })
        .catch(error => {
            output.textContent = `Ошибка в цепочке: ${error}`;
            output.className = 'output error';
        });
}

function handlePromiseError() {
    const output = document.getElementById('promise-output');
    output.textContent = "Ожидание ошибки промиса...";
    
    createBasicPromise(false)
        .then(result => {
            output.textContent = result;
            output.className = 'output success';
        })
        .catch(error => {
            output.textContent = error;
            output.className = 'output error';
        });
}

function setupPromiseEvents() {
    document.getElementById('basic-promise').addEventListener('click', handleBasicPromise);
    document.getElementById('promise-chain').addEventListener('click', createPromiseChain);
    document.getElementById('promise-error').addEventListener('click', handlePromiseError);
}

// ЗАДАНИЕ 2: Async/Await
async function basicAsyncAwait() {
    const output = document.getElementById('async-output');
    output.textContent = "Ожидание async/await...";
    
    try {
        const result = await createBasicPromise(true);
        output.textContent = result;
        output.className = 'output success';
    } catch (error) {
        output.textContent = error;
        output.className = 'output error';
    }
}

async function handleAsyncError() {
    const output = document.getElementById('async-output');
    output.textContent = "Ожидание ошибки в async...";
    
    try {
        const result = await createBasicPromise(false);
        output.textContent = result;
        output.className = 'output success';
    } catch (error) {
        output.textContent = `Поймана ошибка: ${error}`;
        output.className = 'output error';
    }
}

async function parallelAsyncExecution() {
    const output = document.getElementById('async-output');
    output.textContent = "Запуск параллельных операций...";
    
    const startTime = Date.now();
    
    try {
        const results = await Promise.all([
            createBasicPromise(true),
            createBasicPromise(true),
            createBasicPromise(true)
        ]);
        
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        output.textContent = `Все операции завершены за ${duration}мс\n`;
        results.forEach((result, index) => {
            output.textContent += `Операция ${index + 1}: ${result}\n`;
        });
        output.className = 'output success';
    } catch (error) {
        output.textContent = `Ошибка в параллельных операциях: ${error}`;
        output.className = 'output error';
    }
}

function setupAsyncEvents() {
    document.getElementById('basic-async').addEventListener('click', basicAsyncAwait);
    document.getElementById('async-error').addEventListener('click', handleAsyncError);
    document.getElementById('async-parallel').addEventListener('click', parallelAsyncExecution);
}

// ЗАДАНИЕ 3: Работа с внешними API
async function fetchUsers() {
    const output = document.getElementById('api-output');
    const dataOutput = document.getElementById('api-data');
    
    output.textContent = "Загрузка пользователей...";
    dataOutput.innerHTML = "";
    
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const users = await response.json();
        
        output.textContent = `Загружено ${users.length} пользователей`;
        output.className = 'output success';
        
        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'user-card';
            userCard.innerHTML = `
                <h3>${user.name}</h3>
                <p>Email: ${user.email}</p>
                <p>Телефон: ${user.phone}</p>
                <p>Компания: ${user.company.name}</p>
            `;
            dataOutput.appendChild(userCard);
        });
        
    } catch (error) {
        output.textContent = `Ошибка загрузки: ${error.message}`;
        output.className = 'output error';
    }
}

async function createPost() {
    const output = document.getElementById('api-output');
    output.textContent = "Отправка POST запроса...";
    
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: 'Новый пост',
                body: 'Содержание нового поста',
                userId: 1
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        output.textContent = `Пост создан! ID: ${data.id}\nЗаголовок: ${data.title}\nСодержание: ${data.body}`;
        output.className = 'output success';
        
    } catch (error) {
        output.textContent = `Ошибка создания поста: ${error.message}`;
        output.className = 'output error';
    }
}

async function testApiError() {
    const output = document.getElementById('api-output');
    output.textContent = "Тестирование обработки ошибок API...";
    
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/invalid-url');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
    } catch (error) {
        output.textContent = `Поймана ошибка: ${error.message}`;
        output.className = 'output error';
    }
}

function setupApiEvents() {
    document.getElementById('fetch-users').addEventListener('click', fetchUsers);
    document.getElementById('fetch-post').addEventListener('click', createPost);
    document.getElementById('fetch-error').addEventListener('click', testApiError);
}

// ЗАДАНИЕ 4: Асинхронные таймеры
let intervalId;
let intervalCounter = 0;

async function startAsyncInterval() {
    const output = document.getElementById('interval-output');
    
    if (intervalId) {
        output.textContent = "Интервал уже запущен";
        return;
    }
    
    intervalCounter = 0;
    output.textContent = intervalCounter;
    
    intervalId = setInterval(async () => {
        intervalCounter++;
        output.textContent = intervalCounter;

        await new Promise(resolve => setTimeout(resolve, 100));
        
    }, 1000);
}

function stopAsyncInterval() {
    const output = document.getElementById('interval-output');
    
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        output.textContent = "Интервал остановлен";
    }
}

function delayWithPromise(ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`Задержка ${ms}мс завершена`);
        }, ms);
    });
}

async function testDelay() {
    const output = document.getElementById('timer-output');
    output.textContent = "Тестирование задержек...";
    
    try {
        output.textContent += "\nЗадержка 500мс...";
        await delayWithPromise(500);
        output.textContent += "\nЗадержка 1000мс...";
        await delayWithPromise(1000);
        output.textContent += "\nЗадержка 1500мс...";
        await delayWithPromise(1500);
        output.textContent += "\nВсе задержки завершены!";
        output.className = 'output success';
    } catch (error) {
        output.textContent += `\nОшибка: ${error}`;
        output.className = 'output error';
    }
}

function setupTimerEvents() {
    document.getElementById('start-interval').addEventListener('click', startAsyncInterval);
    document.getElementById('stop-interval').addEventListener('click', stopAsyncInterval);
    document.getElementById('delay-promise').addEventListener('click', testDelay);
}

// ЗАДАНИЕ 5: Обработка ошибок
async function asyncTryCatch() {
    const output = document.getElementById('error-output');
    output.textContent = "Тестирование try/catch...";
    
    try {
        const result1 = await createBasicPromise(true);
        output.textContent += `\n1. ${result1}`;

        const result2 = await createBasicPromise(false);
        output.textContent += `\n2. ${result2}`;

        output.textContent += "\n3. Эта строка не должна появиться";
        
    } catch (error) {
        output.textContent += `\nПоймана ошибка в блоке catch: ${error}`;
        output.className = 'output error';
    }
}

async function handleMultipleErrors() {
    const output = document.getElementById('error-output');
    output.textContent = "Тестирование множественных ошибок...";
    
    const promises = [
        createBasicPromise(true),
        createBasicPromise(false),
        createBasicPromise(true),
        createBasicPromise(false)
    ];
    
    const results = await Promise.allSettled(promises);
    
    let successCount = 0;
    let errorCount = 0;
    
    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            output.textContent += `\nПромис ${index + 1}: Успех - ${result.value}`;
            successCount++;
        } else {
            output.textContent += `\nПромис ${index + 1}: Ошибка - ${result.reason}`;
            errorCount++;
        }
    });
    
    output.textContent += `\n\nСтатистика: Успешно - ${successCount}, Ошибок - ${errorCount}`;
    output.className = errorCount > 0 ? 'output warning' : 'output success';
}

async function retryWithBackoff(operation, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const result = await operation();
            return result;
        } catch (error) {
            if (attempt === maxRetries) {
                throw new Error(`Все ${maxRetries} попытки завершились ошибкой: ${error}`);
            }
            
            const delay = Math.pow(2, attempt) * 100;
            console.log(`Попытка ${attempt} не удалась, повтор через ${delay}мс`);
            await delayWithPromise(delay);
        }
    }
}

function setupErrorEvents() {
    document.getElementById('try-catch').addEventListener('click', asyncTryCatch);
    document.getElementById('multiple-errors').addEventListener('click', handleMultipleErrors);
    document.getElementById('retry-pattern').addEventListener('click', async () => {
        const output = document.getElementById('error-output');
        output.textContent = "Тестирование повторных попыток...";
        
        const failingOperation = () => createBasicPromise(false);
        
        try {
            await retryWithBackoff(failingOperation, 3);
        } catch (error) {
            output.textContent = error.message;
            output.className = 'output error';
        }
    });
}

// ЗАДАНИЕ 6: Параллельные операции
async function demonstratePromiseAll() {
    const output = document.getElementById('parallel-output');
    output.textContent = "Тестирование Promise.all...";
    
    const startTime = Date.now();
    
    const promises = [
        delayWithPromise(1000),
        delayWithPromise(1500),
        delayWithPromise(800),
        delayWithPromise(1200)
    ];
    
    try {
        const results = await Promise.all(promises);
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        output.textContent += `\nВсе операции завершены за ${duration}мс\n`;
        results.forEach((result, index) => {
            output.textContent += `Операция ${index + 1}: ${result}\n`;
        });
        output.className = 'output success';
    } catch (error) {
        output.textContent += `\nОшибка: ${error}`;
        output.className = 'output error';
    }
}

async function demonstratePromiseRace() {
    const output = document.getElementById('parallel-output');
    output.textContent = "Тестирование Promise.race...";
    
    const promises = [
        delayWithPromise(2000),
        delayWithPromise(1000),
        delayWithPromise(1500)
    ];
    
    try {
        const result = await Promise.race(promises);
        output.textContent += `\nПобедитель гонки: ${result}`;
        output.className = 'output success';
    } catch (error) {
        output.textContent += `\nОшибка: ${error}`;
        output.className = 'output error';
    }
}

async function demonstratePromiseAllSettled() {
    const output = document.getElementById('parallel-output');
    output.textContent = "Тестирование Promise.allSettled...";
    
    const promises = [
        createBasicPromise(true),
        createBasicPromise(false),
        createBasicPromise(true),
        createBasicPromise(false)
    ];
    
    const results = await Promise.allSettled(promises);
    
    output.textContent += "\nРезультаты всех промисов:\n";
    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            output.textContent += `Промис ${index + 1}: Успех - ${result.value}\n`;
        } else {
            output.textContent += `Промис ${index + 1}: Ошибка - ${result.reason}\n`;
        }
    });
    output.className = 'output success';
}

function setupParallelEvents() {
    document.getElementById('promise-all').addEventListener('click', demonstratePromiseAll);
    document.getElementById('promise-race').addEventListener('click', demonstratePromiseRace);
    document.getElementById('promise-allSettled').addEventListener('click', demonstratePromiseAllSettled);
}

// ЗАДАНИЕ 7: Реальные сценарии
async function sequentialApiRequests() {
    const output = document.getElementById('scenario-output');
    output.textContent = "Выполнение последовательных запросов...";
    
    try {
        output.textContent += "\n1. Получение пользователя...";
        const userResponse = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const user = await userResponse.json();
        output.textContent += `\n   Пользователь: ${user.name}`;

        output.textContent += "\n2. Получение постов пользователя...";
        const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
        const posts = await postsResponse.json();
        output.textContent += `\n   Найдено постов: ${posts.length}`;
        
        if (posts.length > 0) {
            output.textContent += "\n3. Получение комментариев к первому посту...";
            const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${posts[0].id}`);
            const comments = await commentsResponse.json();
            output.textContent += `\n   Найдено комментариев: ${comments.length}`;
        }
        
        output.textContent += "\n\nВсе запросы завершены успешно!";
        output.className = 'output success';
        
    } catch (error) {
        output.textContent += `\nОшибка: ${error.message}`;
        output.className = 'output error';
    }
}

async function simulateFileUpload() {
    const output = document.getElementById('scenario-output');
    const progressFill = document.getElementById('progress-fill');
    
    output.textContent = "Симуляция загрузки файла...";
    progressFill.style.width = '0%';
    
    for (let progress = 0; progress <= 100; progress += 10) {
        await delayWithPromise(200);
        progressFill.style.width = `${progress}%`;
        output.textContent = `Загрузка... ${progress}%`;
    }
    
    output.textContent = "Загрузка завершена!";
    output.className = 'output success';
}

function createRequestCache() {
    const cache = new Map();
    
    return async function cachedRequest(url) {
        if (cache.has(url)) {
            console.log('Возвращаю закэшированный результат для:', url);
            return cache.get(url);
        }
        
        console.log('Выполняю новый запрос для:', url);
        const response = await fetch(url);
        const data = await response.json();
        
        cache.set(url, data);
        return data;
    };
}

function setupRealScenarioEvents() {
    document.getElementById('sequential-requests').addEventListener('click', sequentialApiRequests);
    document.getElementById('upload-simulation').addEventListener('click', simulateFileUpload);
    document.getElementById('cache-requests').addEventListener('click', async () => {
        const output = document.getElementById('scenario-output');
        output.textContent = "Тестирование кэширования...";
        
        const cachedFetch = createRequestCache();
        const url = 'https://jsonplaceholder.typicode.com/users/1';
        
        try {
            output.textContent += "\nПервый запрос (должен быть медленным)...";
            const start1 = Date.now();
            const data1 = await cachedFetch(url);
            const duration1 = Date.now() - start1;
            output.textContent += `\n   Получено: ${data1.name} (${duration1}мс)`;
            
            output.textContent += "\nВторой запрос (должен быть быстрым)...";
            const start2 = Date.now();
            const data2 = await cachedFetch(url);
            const duration2 = Date.now() - start2;
            output.textContent += `\n   Получено: ${data2.name} (${duration2}мс)`;
            
            output.textContent += `\n\nУскорение: ${(duration1 / duration2).toFixed(1)}x`;
            output.className = 'output success';
            
        } catch (error) {
            output.textContent += `\nОшибка: ${error.message}`;
            output.className = 'output error';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setupPromiseEvents();
    setupAsyncEvents();
    setupApiEvents();
    setupTimerEvents();
    setupErrorEvents();
    setupParallelEvents();
    setupRealScenarioEvents();
});