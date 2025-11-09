<?php

use Illuminate\Support\Facades\Route;

// Главная страница (уже есть)
Route::get('/', function () {
    return view('welcome');
});

// Простой маршрут - Задание 3, Часть A
Route::get('/hello', function () {
    return 'Hello World!';
});

// Маршрут с параметром
Route::get('/user/{name}', function ($name) {
    return "Hello, $name!";
});

// Маршрут для Blade шаблона - Задание 3, Часть B
Route::get('/greeting', function () {
    return view('greeting', ['name' => 'Student']);
});

// Дополнительный маршрут с передачей данных
Route::get('/welcome/{name?}', function ($name = 'Guest') {
    return view('welcome-user', [
        'name' => $name,
        'courses' => ['PHP', 'Laravel', 'Web Development']
    ]);
});