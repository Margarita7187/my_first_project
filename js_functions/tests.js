function runAllTests() {
    const results = document.getElementById('results');
    results.innerHTML = '';
    
    testBasicFunctions();
    testHigherOrderFunctions();
    testAdvancedFunctions();
    
    results.innerHTML += '<p class="success">Все тесты завершены</p>';
}

function testBasicFunctions() {
    const results = document.getElementById('results');
    results.innerHTML += '<h3>Базовые функции</h3>';
    
    // Тест sum
    try {
        console.assert(sum(1, 2, 3) === 6, 'sum(1,2,3) должен вернуть 6');
        console.assert(sum() === 0, 'sum() должен вернуть 0');
        results.innerHTML += '<p class="success">sum - пройдено</p>';
    } catch (e) {
        results.innerHTML += '<p class="error">sum - ошибка</p>';
    }
    
    // Тест createUser
    try {
        const user1 = createUser({ name: "Иван", age: 25 });
        console.assert(user1 === "Пользователь: Иван, возраст: 25, email: не указан", 
                      'createUser должен работать с email по умолчанию');
        
        const user2 = createUser({ name: "Мария", age: 30, email: "maria@test.ru" });
        console.assert(user2 === "Пользователь: Мария, возраст: 30, email: maria@test.ru", 
                      'createUser должен использовать переданный email');
        results.innerHTML += '<p class="success">createUser - пройдено</p>';
    } catch (e) {
        results.innerHTML += '<p class="error">createUser - ошибка</p>';
    }
    
    // Тест secretMessage
    try {
        const secret = secretMessage("123", "Секретное сообщение");
        console.assert(secret("123") === "Секретное сообщение", 
                      'secretMessage должен возвращать сообщение при правильном пароле');
        console.assert(secret("wrong") === "Доступ запрещен", 
                      'secretMessage должен блокировать доступ при неправильном пароле');
        results.innerHTML += '<p class="success">secretMessage - пройдено</p>';
    } catch (e) {
        results.innerHTML += '<p class="error">secretMessage - ошибка</p>';
    }
}

function testHigherOrderFunctions() {
    const results = document.getElementById('results');
    results.innerHTML += '<h3>Функции высшего порядка</h3>';
    
    // Тест compose
    try {
        const add5 = x => x + 5;
        const multiply2 = x => x * 2;
        const composed = compose(add5, multiply2);
        console.assert(composed(3) === 11, 'compose должен применять функции справа налево');
        results.innerHTML += '<p class="success">compose - пройдено</p>';
    } catch (e) {
        results.innerHTML += '<p class="error">compose - ошибка</p>';
    }
    
    // Тест myMap
    try {
        const arr = [1, 2, 3];
        const doubled = myMap(arr, x => x * 2);
        console.assert(JSON.stringify(doubled) === JSON.stringify([2, 4, 6]), 
                      'myMap должен преобразовывать массив');
        results.innerHTML += '<p class="success">myMap - пройдено</p>';
    } catch (e) {
        results.innerHTML += '<p class="error">myMap - ошибка</p>';
    }
    
    // Тест myFilter
    try {
        const arr = [1, 2, 3, 4, 5];
        const even = myFilter(arr, x => x % 2 === 0);
        console.assert(JSON.stringify(even) === JSON.stringify([2, 4]), 
                      'myFilter должен фильтровать массив');
        results.innerHTML += '<p class="success">myFilter - пройдено</p>';
    } catch (e) {
        results.innerHTML += '<p class="error">myFilter - ошибка</p>';
    }
    
    // Тест myReduce
    try {
        const arr = [1, 2, 3, 4];
        const sum = myReduce(arr, (acc, curr) => acc + curr, 0);
        console.assert(sum === 10, 'myReduce должен накапливать значение');
        results.innerHTML += '<p class="success">myReduce - пройдено</p>';
    } catch (e) {
        results.innerHTML += '<p class="error">myReduce - ошибка</p>';
    }
}

function testAdvancedFunctions() {
    const results = document.getElementById('results');
    results.innerHTML += '<h3>Продвинутые функции</h3>';
    
    // Тест curry
    try {
        const add = (a, b, c) => a + b + c;
        const curriedAdd = curry(add);
        console.assert(curriedAdd(1)(2)(3) === 6, 'curry должен работать с цепочкой вызовов');
        console.assert(curriedAdd(1, 2)(3) === 6, 'curry должен работать с частичным применением');
        results.innerHTML += '<p class="success">curry - пройдено</p>';
    } catch (e) {
        results.innerHTML += '<p class="error">curry - ошибка</p>';
    }
    
    // Тест memoize
    try {
        let callCount = 0;
        const memoizedFn = memoize((a, b) => {
            callCount++;
            return a + b;
        });
        
        memoizedFn(1, 2);
        memoizedFn(1, 2);
        console.assert(callCount === 1, 'memoize должен кэшировать результаты');
        results.innerHTML += '<p class="success">memoize - пройдено</p>';
    } catch (e) {
        results.innerHTML += '<p class="error">memoize - ошибка</p>';
    }
    
    // Тест createValidator
    try {
        const validator = createValidator({
            minLength: 6,
            requireDigits: true,
            requireUppercase: true
        });
        
        const weakResult = validator("weak");
        const strongResult = validator("Strong123");
        
        console.assert(!weakResult.isValid, 'Валидатор должен отвергать слабые пароли');
        console.assert(strongResult.isValid, 'Валидатор должен принимать сильные пароли');
        results.innerHTML += '<p class="success">createValidator - пройдено</p>';
    } catch (e) {
        results.innerHTML += '<p class="error">createValidator - ошибка</p>';
    }
}