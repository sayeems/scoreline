<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\MatchController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/sayeems', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/', [MatchController::class, 'index'])->name('matches.index');
Route::get('/match/{slug}', [MatchController::class, 'show'])->name('matches.show');


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/matches/create', [MatchController::class, 'create'])->name('matches.create');
    Route::get('/matches/{slug}/edit', [MatchController::class, 'edit'])->name('matches.edit');
    Route::post('/matches', [MatchController::class, 'store'])->name('matches.store');
    Route::put('/matches/{slug}', [MatchController::class, 'update'])->name('matches.update');
    Route::delete('/matches/{slug}', [MatchController::class, 'destroy'])->name('matches.destroy');
});

require __DIR__.'/auth.php';
