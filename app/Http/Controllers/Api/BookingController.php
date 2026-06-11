<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        $booking = Booking::create([
            'user_id' => $request->user_id,
            'service_id' => $request->service_id,
            'booking_date' => $request->booking_date,
            'booking_time' => $request->booking_time,
            'status' => 'pending'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Booking berhasil',
            'data' => $booking
        ]);
    }

    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Booking::all()
        ]);
    }
}
