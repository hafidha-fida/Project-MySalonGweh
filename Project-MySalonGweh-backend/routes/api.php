<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Models\Service;
use App\Models\Payment;
use App\Models\Booking;

use App\Services\BookingService;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\AdminController;

/*
|--------------------------------------------------------------------------
| TEST API
|--------------------------------------------------------------------------
*/

Route::get('/test', function () {
    return response()->json([
        'success' => true,
        'message' => 'API MySalonGweh berjalan'
    ]);
});

/*
|--------------------------------------------------------------------------
| MIDTRANS TEST
|--------------------------------------------------------------------------
*/

Route::get('/midtrans-test', function () {

    return response()->json([
        'server_key' => env('MIDTRANS_SERVER_KEY'),
        'client_key' => env('MIDTRANS_CLIENT_KEY'),
    ]);
});

/*
|--------------------------------------------------------------------------
| SERVICE CONTAINER TEST
|--------------------------------------------------------------------------
*/

Route::get('/test-service', function (
    BookingService $bookingService
) {

    return response()->json([
        'success' => true,
        'data' => $bookingService->getAllBookings()
    ]);
});

/*
|--------------------------------------------------------------------------
| AUTHENTICATION (ADMIN ONLY)
|--------------------------------------------------------------------------
*/

Route::post(
    '/register',
    [AuthController::class, 'register']
);

Route::post(
    '/login',
    [AuthController::class, 'login']
);

/*
|--------------------------------------------------------------------------
| PUBLIC SERVICES
|--------------------------------------------------------------------------
*/

Route::get(
    '/services',
    [ServiceController::class, 'index']
);

Route::get(
    '/services/{service}',
    [ServiceController::class, 'show']
);

/*
|--------------------------------------------------------------------------
| PUBLIC BOOKING (TANPA LOGIN)
|--------------------------------------------------------------------------
*/

Route::post(
    '/bookings',
    [BookingController::class, 'store']
);

Route::get(
    '/bookings/{booking}',
    [BookingController::class, 'show']
);

/*
|--------------------------------------------------------------------------
| CEK BOOKING BERDASARKAN EMAIL
|--------------------------------------------------------------------------
*/

Route::get(
    '/customer/bookings/{email}',
    [BookingController::class, 'customerBookings']
);

/*
|--------------------------------------------------------------------------
| PUBLIC PAYMENT
|--------------------------------------------------------------------------
*/

Route::post(
    '/payments/create/{booking}',
    [PaymentController::class, 'createPayment']
);

Route::get(
    '/payments',
    [PaymentController::class, 'index']
);

/*
|--------------------------------------------------------------------------
| MIDTRANS WEBHOOK
|--------------------------------------------------------------------------
*/

Route::post(
    '/payments/notification',
    [PaymentController::class, 'notification']
);

/*
|--------------------------------------------------------------------------
| AUTHENTICATED ADMIN ROUTES
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    Route::get(
        '/profile',
        [AuthController::class, 'profile']
    );

    Route::post(
        '/logout',
        [AuthController::class, 'logout']
    );
});

/*
|--------------------------------------------------------------------------
| ADMIN ROUTES
|--------------------------------------------------------------------------
*/

Route::middleware([
    'auth:sanctum',
    'admin'
])->group(function () {

    /*
    |--------------------------------------------------------------------------
    | ADMIN DASHBOARD
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/admin/dashboard',
        [AdminController::class, 'dashboard']
    );

    /*
    |--------------------------------------------------------------------------
    | SERVICE MANAGEMENT
    |--------------------------------------------------------------------------
    */

    Route::post(
        '/services',
        [ServiceController::class, 'store']
    );

    Route::put(
        '/services/{service}',
        [ServiceController::class, 'update']
    );

    Route::delete(
        '/services/{service}',
        [ServiceController::class, 'destroy']
    );

    /*
    |--------------------------------------------------------------------------
    | BOOKING MANAGEMENT
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/admin/bookings',
        [BookingController::class, 'index']
    );

    Route::put(
        '/admin/bookings/{booking}',
        [BookingController::class, 'update']
    );

    Route::delete(
        '/admin/bookings/{booking}',
        [BookingController::class, 'destroy']
    );

    /*
    |--------------------------------------------------------------------------
    | PAYMENT MANAGEMENT
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/admin/payments',
        [PaymentController::class, 'index']
    );

    Route::put(
        '/admin/payments/{payment}',
        [PaymentController::class, 'update']
    );

    Route::delete(
        '/admin/payments/{payment}',
        [PaymentController::class, 'destroy']
    );
});
