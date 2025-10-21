function runEventsTests() {
    console.log('=== Запуск тестов обработки событий ===');

    console.log('Тест 1: Базовые обработчики');
    const basicBtn = document.getElementById('basic-btn');
    const clickEvent = new MouseEvent('click', {
        clientX: 100,
        clientY: 100
    });
    basicBtn.dispatchEvent(clickEvent);
    console.log('Базовые обработчики работают');

    console.log('Тест 2: Делегирование событий');
    const initialItemCount = document.querySelectorAll('.item').length;
    addNewItem();
    const newItemCount = document.querySelectorAll('.item').length;
    console.assert(newItemCount === initialItemCount + 1, 'Элемент не добавлен');
    console.log('Делегирование работает');

    console.log('Тест 3: Предотвращение поведения');
    const link = document.getElementById('prevent-link');
    const linkEvent = new MouseEvent('click', { bubbles: true });
    const defaultPrevented = !link.dispatchEvent(linkEvent);
    console.log('Предотвращение поведения работает');

    console.log('Тест 4: Кастомные события');
    const customEvent = new CustomEvent('customAction', {
        detail: { message: 'Тестовое сообщение' }
    });
    document.dispatchEvent(customEvent);
    console.log('✓ Кастомные события работают');

    console.log('Тест 5: Debounce и Throttle');
    let debounceCount = 0;
    const debouncedTest = createDebounce(() => debounceCount++, 100);
    
    debouncedTest();
    debouncedTest();
    debouncedTest();
    
    setTimeout(() => {
        console.assert(debounceCount === 1, 'Debounce работает некорректно');
        console.log('✓ Debounce работает');
    }, 200);
    
    let throttleCount = 0;
    const throttledTest = createThrottle(() => throttleCount++, 100);
    
    throttledTest();
    throttledTest();
    throttledTest();
    
    console.assert(throttleCount === 1, 'Throttle работает некорректно');
    console.log('Throttle работает');
   
    console.log('Тест 6: Таймеры');
    startTimer();
    console.assert(timerInterval !== undefined, 'Таймер не запущен');
    stopTimer();
    console.assert(timerInterval === null, 'Таймер не остановлен');
    console.log('Таймеры работают');
    
    console.log('=== Все тесты пройдены успешно ===');
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(runEventsTests, 1000);
});