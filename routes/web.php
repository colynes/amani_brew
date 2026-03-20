<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return redirect('/login');
});

Route::get('/login', [App\Http\Controllers\Auth\LoginController::class, 'showLoginForm']);
Route::post('/login', [App\Http\Controllers\Auth\LoginController::class, 'login']);
Route::post('/logout', [App\Http\Controllers\Auth\LoginController::class, 'logout']);

Route::get('/menu', function () {
    return Inertia::render('Menu');
});

Route::get('/cart', function () {
    return Inertia::render('Cart');
});

Route::middleware(['auth', 'role:admin,manager'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [App\Http\Controllers\Admin\DashboardController::class, 'index']);
    Route::get('/inventory/categories', function () {
        return Inertia::render('Admin/Inventory/Categories/Index');
    });
    Route::get('/inventory/products', function () {
        return Inertia::render('Admin/Inventory/Products/Index');
    });
    Route::get('/orders', function () {
        return Inertia::render('Admin/Orders/Index');
    });
    Route::get('/sales', function () {
        return Inertia::render('Admin/Sales/Index');
    });
    Route::get('/reports', function () {
        return Inertia::render('Admin/Reports/Index');
    });
    Route::get('/users', function () {
        return Inertia::render('Admin/Users/Index');
    });
});

