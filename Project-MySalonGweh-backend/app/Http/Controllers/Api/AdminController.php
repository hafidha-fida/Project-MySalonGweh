<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Booking;
use App\Models\Payment;
use App\Models\Service;

class AdminController extends Controller
{
    public function dashboard()
    {
        return response()->json([
            'success' => true,
            'data' => [
                'total_user' => User::count(),
                'total_booking' => Booking::count(),
                'total_payment' => Payment::count(),
                'total_service' => Service::count(),

                'booking_pending' =>
                Booking::where('status', 'pending')->count(),

                'booking_confirmed' =>
                Booking::where('status', 'confirmed')->count(),

                'payment_paid' =>
                Payment::where('payment_status', 'paid')->count(),
            ]
        ]);
    }
}
