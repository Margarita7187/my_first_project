function runAllTests() {
    testNumbers();
    testStrings();
    testArrays();
    testUtilities();
}

function testNumbers() {
    console.log('=== ТЕСТИРОВАНИЕ ЧИСЕЛ ===');
    
    // isPrime
    console.assert(isPrime(7) === true, 'isPrime(7) должен вернуть true');
    console.assert(isPrime(10) === false, 'isPrime(10) должен вернуть false');
    console.assert(isPrime(1) === false, 'isPrime(1) должен вернуть false');
    
    // factorial
    console.assert(factorial(5) === 120, 'factorial(5) должен вернуть 120');
    console.assert(factorial(0) === 1, 'factorial(0) должен вернуть 1');
    
    // fibonacci
    console.assert(JSON.stringify(fibonacci(5)) === JSON.stringify([0,1,1,2,3]), 
                  'fibonacci(5) должен вернуть [0,1,1,2,3]');
    
    // gcd
    console.assert(gcd(54, 24) === 6, 'gcd(54, 24) должен вернуть 6');
    console.assert(gcd(17, 13) === 1, 'gcd(17, 13) должен вернуть 1');
    
    console.log('Тесты чисел пройдены');
}

function testStrings() {
    console.log('=== ТЕСТИРОВАНИЕ СТРОК ===');
    
    // isPalindrome
    console.assert(isPalindrome('А роза упала на лапу Азора') === true, 
                  'Палиндром должен определяться правильно');
    console.assert(isPalindrome('hello') === false, 
                  'Не палиндром должен возвращать false');
    
    // countVowels
    console.assert(countVowels('Привет') === 2, 
                  'countVowels("Привет") должен вернуть 2');
    
    // reverseString
    console.assert(reverseString('hello') === 'olleh', 
                  'reverseString("hello") должен вернуть "olleh"');
    
    // findLongestWord
    console.assert(findLongestWord('Самое длинное слово') === 'длинное', 
                  'findLongestWord должен найти самое длинное слово');
    
    console.log('Тесты строк пройдены');
}

function testArrays() {
    console.log('=== ТЕСТИРОВАНИЕ МАССИВОВ ===');
    
    // findMax
    console.assert(findMax([1,5,3,9,2]) === 9, 
                  'findMax должен найти максимальный элемент');
    
    // removeDuplicates
    console.assert(JSON.stringify(removeDuplicates([1,2,2,3,4,4,5])) === JSON.stringify([1,2,3,4,5]), 
                  'removeDuplicates должен удалять дубликаты');
    
    // bubbleSort
    console.assert(JSON.stringify(bubbleSort([3,1,4,2])) === JSON.stringify([1,2,3,4]), 
                  'bubbleSort должен сортировать массив');
    
    // binarySearch
    console.assert(binarySearch([1,2,3,4,5], 3) === 2, 
                  'binarySearch должен находить элемент');
    console.assert(binarySearch([1,2,3,4,5], 6) === -1, 
                  'binarySearch должен возвращать -1 для отсутствующего элемента');
    
    console.log('Тесты массивов пройдены');
}

function testUtilities() {
    console.log('=== ТЕСТИРОВАНИЕ УТИЛИТ ===');
    
    // formatCurrency
    console.assert(formatCurrency(1234.56) === '1 234.56 ₽', 
                  'formatCurrency должен правильно форматировать сумму');
    
    // isValidEmail
    console.assert(isValidEmail('test@example.com') === true, 
                  'Валидный email должен проходить проверку');
    console.assert(isValidEmail('invalid-email') === false, 
                  'Невалидный email должен не проходить проверку');
    
    // generatePassword
    const password = generatePassword(8);
    console.assert(password.length === 8, 
                  'generatePassword должен генерировать пароль нужной длины');
    
    console.log('Тесты утилит пройдены');
    console.log('Все тесты успешно пройдены!');
}

// Запуск тестов при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('Для запуска тестов вызовите runAllTests() или нажмите кнопку');
});