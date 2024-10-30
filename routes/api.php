<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AnimalController;

Route::get('animals', [AnimalController::class, 'index'])->name('animals.index');
Route::post('animals', [AnimalController::class, 'store'])->name('animals.store');
Route::put('animals/{id}', [AnimalController::class, 'update'])->name('animals.update');
Route::delete('animals/{id}', [AnimalController::class, 'destroy'])->name('animals.destroy');


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
