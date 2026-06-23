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

    public function index(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => $this->bookingService
                ->getUserBookings($request->user()->id)
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'service_id' => 'required|exists:services,id',
            'booking_date' => 'required|date',
            'booking_time' => 'required',
        ]);

        $booking = Booking::create([
            'user_id' => $request->user()->id,
            'service_id' => $validated['service_id'],
            'booking_date' => $validated['booking_date'],
            'booking_time' => $validated['booking_time'],
            'status' => 'pending',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Booking berhasil dibuat',
            'data' => $booking->load(['user', 'service'])
        ], 201);
    }

    public function show(Booking $booking)
    {
        return response()->json([
            'success' => true,
            'data' => $booking->load(['user', 'service'])
        ]);
    }

    public function update(Request $request, Booking $booking)
    {
        $validated = $request->validate([
            'booking_date' => 'sometimes|date',
            'booking_time' => 'sometimes',
            'status' => 'sometimes|in:pending,confirmed,completed,cancelled',
        ]);

        $booking->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Booking berhasil diperbarui',
            'data' => $booking
        ]);
    }

    public function destroy(Booking $booking)
    {
        $booking->delete();

        return response()->json([
            'success' => true,
            'message' => 'Booking berhasil dihapus'
        ]);
    }

    public function myBookings(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => $this->bookingService
                ->getUserBookings($request->user()->id)
        ]);
    }
}