<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\BookingController;

Route::get('/test', function () {
    return response()->json([
        'message' => 'API MySalonGweh berjalan'
    ]);
});

/*
|--------------------------------------------------------------------------
| AUTH
|--------------------------------------------------------------------------
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/profile', [AuthController::class, 'profile']);
Route::post('/logout', [AuthController::class, 'logout']);

/*
|--------------------------------------------------------------------------
| SERVICES
|--------------------------------------------------------------------------
*/

Route::get('/services', [ServiceController::class, 'index']);
Route::post('/services', [ServiceController::class, 'store']);
Route::get('/services/{id}', [ServiceController::class, 'show']);
Route::put('/services/{id}', [ServiceController::class, 'update']);
Route::delete('/services/{id}', [ServiceController::class, 'destroy']);
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/bookings', [BookingController::class, 'index']);
Route::post('/bookings', [BookingController::class, 'store']);
