// Функции для работы с числами
// Сложность: O(sqrt(n))
function isPrime(number) {
    if (number <= 1) return false;
    if (number <= 3) return true;
    if (number % 2 === 0 || number % 3 === 0) return false;
    
    for (let i = 5; i * i <= number; i += 6) {
        if (number % i === 0 || number % (i + 2) === 0) return false;
    }
    return true;
}

// Сложность: O(n)
function factorial(n) {
    if (n < 0) return undefined;
    if (n === 0 || n === 1) return 1;
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Сложность: O(n)
function fibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    
    const sequence = [0, 1];
    for (let i = 2; i < n; i++) {
        sequence.push(sequence[i-1] + sequence[i-2]);
    }
    return sequence;
}

// Сложность: O(log(min(a,b)))
function gcd(a, b) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return Math.abs(a);
}

// Функции для работы со строками
// Сложность: O(n)
function isPalindrome(str) {
    const cleanStr = str.toLowerCase().replace(/[^а-яa-z0-9]/g, '');
    let left = 0;
    let right = cleanStr.length - 1;
    
    while (left < right) {
        if (cleanStr[left] !== cleanStr[right]) return false;
        left++;
        right--;
    }
    return true;
}

// Сложность: O(n)
function countVowels(str) {
    const vowels = 'аеёиоуыэюяaeiou';
    let count = 0;
    
    for (let char of str.toLowerCase()) {
        if (vowels.includes(char)) {
            count++;
        }
    }
    return count;
}

// Сложность: O(n)
function reverseString(str) {
    let reversed = '';
    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
    return reversed;
}

// Сложность: O(n)
function findLongestWord(sentence) {
    const words = sentence.split(' ');
    let longestWord = '';
    
    for (let word of words) {
        const cleanWord = word.replace(/[^а-яa-z]/gi, '');
        if (cleanWord.length > longestWord.length) {
            longestWord = cleanWord;
        }
    }
    return longestWord;
}

// Функции для работы с массивами

// Сложность: O(n)
function findMax(arr) {
    if (arr.length === 0) return undefined;
    
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

// Сложность: O(n)
function removeDuplicates(arr) {
    const seen = new Set();
    const result = [];
    
    for (let item of arr) {
        if (!seen.has(item)) {
            seen.add(item);
            result.push(item);
        }
    }
    return result;
}

// Сложность: O(n²)
function bubbleSort(arr) {
    const sortedArr = [...arr];
    const n = sortedArr.length;
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (sortedArr[j] > sortedArr[j + 1]) {
                [sortedArr[j], sortedArr[j + 1]] = [sortedArr[j + 1], sortedArr[j]];
            }
        }
    }
    return sortedArr;
}

// Сложность: O(log n)
function binarySearch(sortedArr, target) {
    let left = 0;
    let right = sortedArr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (sortedArr[mid] === target) {
            return mid;
        } else if (sortedArr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

// Утилитарные функции
function formatCurrency(amount, currency = '₽') {
    return `${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ')} ${currency}`;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function generatePassword(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }
    return password;
}