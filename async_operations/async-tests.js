async function runAsyncTests() {
    console.log('=== Запуск тестов асинхронных операций ===');

    console.log('Тест 1: Базовые промисы');
    try {
        const result = await createBasicPromise(true);
        console.assert(result.includes('Успех'), 'Промис должен завершиться успехом');
        console.log('Базовые промисы работают');
    } catch (error) {
        console.error('Ошибка в тесте базовых промисов:', error);
    }

    console.log('Тест 2: Обработка ошибок промисов');
    try {
        await createBasicPromise(false);
        console.error('Промис должен был завершиться ошибкой');
    } catch (error) {
        console.assert(error.includes('Ошибка'), 'Промис должен завершиться ошибкой');
        console.log('Обработка ошибок промисов работает');
    }

    console.log('Тест 3: Delay функция');
    const startTime = Date.now();
    await delayWithPromise(100);
    const duration = Date.now() - startTime;
    console.assert(duration >= 90 && duration <= 150, 'Delay работает некорректно');

    console.log('Тест 4: Promise.all');
    try {
        const promises = [
            delayWithPromise(50),
            delayWithPromise(30),
            delayWithPromise(70)
        ];
        const results = await Promise.all(promises);
        console.assert(results.length === 3, 'Promise.all должен вернуть все результаты');
        console.log('Promise.all работает');
    } catch (error) {
        console.error('Ошибка в Promise.all:', error);
    }
    
    console.log('Тест 5: Promise.race');
    try {
        const promises = [
            delayWithPromise(100),
            delayWithPromise(50),
            delayWithPromise(200)
        ];
        const result = await Promise.race(promises);
        console.assert(result.includes('50мс'), 'Promise.race должен вернуть самый быстрый результат');
        console.log('Promise.race работает');
    } catch (error) {
        console.error('Ошибка в Promise.race:', error);
    }

    console.log('Тест 6: Retry with backoff');
    let attemptCount = 0;
    const failingOperation = () => {
        attemptCount++;
        return createBasicPromise(false);
    };
    
    try {
        await retryWithBackoff(failingOperation, 2);
        console.error('✗ Retry должен был завершиться ошибкой');
    } catch (error) {
        console.assert(attemptCount === 2, 'Должно быть 2 попытки');
        console.assert(error.includes('2 попытки'), 'Сообщение об ошибке должно указывать количество попыток');
        console.log('✓ Retry with backoff работает');
    }

    console.log('Тест 7: Кэширование');
    const cachedFetch = createRequestCache();
    const testUrl = 'https://jsonplaceholder.typicode.com/users/1';
    
    const firstCall = await cachedFetch(testUrl);
    const secondCall = await cachedFetch(testUrl);
    
    console.assert(firstCall === secondCall, 'Кэширование должно возвращать одинаковые результаты');
    console.log('Кэширование работает');
    
    console.log('=== Все тесты пройдены успешно ===');
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(runAsyncTests, 1000);
});