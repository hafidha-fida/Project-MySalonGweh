<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use App\Contracts\BookingServiceInterface;

class BookingController extends Controller
{
    protected BookingServiceInterface $bookingService;

    public function __construct(
        BookingServiceInterface $bookingService
    ) {
        $this->bookingService = $bookingService;
    }

    /*
    |--------------------------------------------------------------------------
    | Admin melihat semua booking
    |--------------------------------------------------------------------------
    */

    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Booking::with('service')
                ->latest()
                ->get()
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | User membuat booking (tanpa login)
    |--------------------------------------------------------------------------
    */

    public function store(Request $request)
    {
        $validated = $request->validate([

            'customer_name' => 'required|string|max:100',

            'customer_phone' => 'required|string|max:20',

            'customer_email' => 'required|email',

            'service_id' => 'required|exists:services,id',

            'booking_date' => 'required|date',

            'booking_time' => 'required',
        ]);

        $booking = Booking::create([

            'customer_name' => $validated['customer_name'],

            'customer_phone' => $validated['customer_phone'],

            'customer_email' => $validated['customer_email'],

            'service_id' => $validated['service_id'],

            'booking_date' => $validated['booking_date'],

            'booking_time' => $validated['booking_time'],

            // nomor antrian dibuat setelah pembayaran sukses
            'queue_number' => null,

            // menunggu pembayaran
            'status' => 'pending',
        ]);

        return response()->json([

            'success' => true,

            'message' => 'Booking berhasil dibuat',

            'data' => $booking->load('service')
        ], 201);
    }

    /*
    |--------------------------------------------------------------------------
    | Detail Booking
    |--------------------------------------------------------------------------
    */

    public function show(Booking $booking)
    {
        return response()->json([
            'success' => true,
            'data' => $booking->load('service')
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | Admin update booking
    |--------------------------------------------------------------------------
    */

    public function update(Request $request, Booking $booking)
    {
        $validated = $request->validate([

            'booking_date' => 'sometimes|date',

            'booking_time' => 'sometimes',

            'status' =>
            'sometimes|in:pending,confirmed,completed,cancelled',
        ]);

        $booking->update($validated);

        return response()->json([

            'success' => true,

            'message' => 'Booking berhasil diperbarui',

            'data' => $booking
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | Admin hapus booking
    |--------------------------------------------------------------------------
    */

    public function destroy(Booking $booking)
    {
        $booking->delete();

        return response()->json([

            'success' => true,

            'message' => 'Booking berhasil dihapus'
        ]);
    }
}
