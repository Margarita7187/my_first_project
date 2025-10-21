async function runFetchTests() {
    console.log('=== Запуск тестов Fetch API ===');

    console.log('Тест 1: Базовый GET запрос');
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        const data = await response.json();
        console.assert(data.id === 1, 'Должен вернуться пост с ID 1');
        console.log('Базовый GET запрос работает');
    } catch (error) {
        console.error('Ошибка в базовом GET запросе:', error);
    }

    console.log('Тест 2: POST запрос');
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: 'Test Post',
                body: 'Test Content',
                userId: 1
            })
        });
        const data = await response.json();
        console.assert(data.id, 'POST запрос должен вернуть созданный объект с ID');
        console.log('✓ POST запрос работает');
    } catch (error) {
        console.error('✗ Ошибка в POST запросе:', error);
    }
    
    console.log('Тест 3: Обработка ошибок');
    try {
        await fetch('https://jsonplaceholder.typicode.com/invalid-url');
        console.error('Запрос должен был завершиться ошибкой');
    } catch (error) {
        console.assert(error instanceof Error, 'Должна быть поймана ошибка');
        console.log('Обработка ошибок работает');
    }

    console.log('Тест 4: Параметры URL');
    try {
        const params = new URLSearchParams({ '_limit': '2' });
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?${params}`);
        const data = await response.json();
        console.assert(data.length === 2, 'Должно вернуться 2 поста');
        console.log('Параметры URL работают');
    } catch (error) {
        console.error('Ошибка в параметрах URL:', error);
    }

    console.log('Тест 5: Promise.all');
    try {
        const [users, posts] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/users').then(r => r.json()),
            fetch('https://jsonplaceholder.typicode.com/posts').then(r => r.json())
        ]);
        console.assert(users.length > 0 && posts.length > 0, 'Оба запроса должны вернуть данные');
        console.log('Promise.all работает');
    } catch (error) {
        console.error('Ошибка в Promise.all:', error);
    }
    
    console.log('=== Все тесты пройдены успешно ===');
}

// Запуск тестов при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(runFetchTests, 1000);
});