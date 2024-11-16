<?php

use App\Http\Controllers\CapitalController;
use App\Http\Controllers\FlotiController;
use App\Http\Controllers\FormulaController;
use App\Http\Controllers\LoanFeeController;
use App\Http\Controllers\LoanProductController;
use App\Http\Controllers\PaymentMethodController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShareHolderController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('shareholders', ShareHolderController::class)
        ->only(['index', 'store', 'update', 'destroy']);
    Route::resource('capitals', CapitalController::class)
        ->only(['index', 'store', 'update', 'destroy']);
    Route::resource('flotis', FlotiController::class)
        ->only(['index','store', 'update','destroy']);
    Route::resource('loan-products', LoanProductController::class)
        ->only(['index','store', 'update','destroy']);
    Route::resource('loan-fees', LoanFeeController::class)
        ->only(['index','store', 'update','destroy']);
    Route::resource('formulas', FormulaController::class)
        ->only(['index','store', 'update','destroy']);
    Route::resource('transactions', PaymentMethodController::class)
        ->only(['index','store', 'update','destroy']);
    // Route::resource('branches', Branch)
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


require __DIR__.'/auth.php';
