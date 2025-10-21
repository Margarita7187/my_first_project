function runTests() {
    console.log('=== Запуск тестов DOM манипуляций ===');
    
    console.log('Тест 1: Создание карточки');
    const initialCardCount = document.querySelectorAll('.card').length;
    createCard('Тестовая карточка', 'Тестовое содержимое');
    const newCardCount = document.querySelectorAll('.card').length;
    console.assert(newCardCount === initialCardCount + 1, 'Карточка не создана');
    console.log('Карточка создана успешно');

    console.log('Тест 2: Создание списка');
    const testItems = ['Элемент 1', 'Элемент 2', 'Элемент 3'];
    createList(testItems);
    const listItems = document.querySelectorAll('#target1 ol li');
    console.assert(listItems.length === testItems.length, 'Список создан неверно');
    console.log('Список создан успешно');

    console.log('Тест 3: Подсчет дочерних элементов');
    const childCount = countChildren();
    console.assert(childCount === 3, 'Неверное количество дочерних элементов');
    console.log('Подсчет элементов выполнен');

    console.log('Тест 4: Поиск специального элемента');
    const specialText = findSpecialChild();
    console.assert(specialText.includes('Специальный'), 'Специальный элемент не найден');
    console.log('Специальный элемент найден');

    console.log('Тест 5: Валидация формы');

    const invalidData = {
        name: 'A',
        email: 'invalid-email',
        age: '150'
    };
    const invalidErrors = validateForm(invalidData);
    console.assert(invalidErrors !== null, 'Невалидные данные должны возвращать ошибки');
    console.assert(invalidErrors.name, 'Должна быть ошибка имени');
    console.assert(invalidErrors.email, 'Должна быть ошибка email');
    console.assert(invalidErrors.age, 'Должна быть ошибка возраста');

    const validData = {
        name: 'Иван',
        email: 'ivan@example.com',
        age: '25'
    };
    const validErrors = validateForm(validData);
    console.assert(validErrors === null, 'Валидные данные не должны возвращать ошибки');
    console.log('Валидация формы работает корректно');

    console.log('Test 6: Очистка списка');
    const list = document.getElementById('dynamic-list');
    const testItem = document.createElement('li');
    testItem.textContent = 'Тестовый элемент';
    list.appendChild(testItem);
    clearList();
    console.assert(list.children.length === 0, 'Список не очищен');
    console.log('Очистка списка работает');
    
    console.log('=== Все тесты пройдены успешно ===');
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(runTests, 1000);
});