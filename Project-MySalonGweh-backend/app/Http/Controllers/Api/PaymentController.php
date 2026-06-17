<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Booking;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function index()
    {
        $payments = Payment::with('booking')->get();

        return response()->json([
            'success' => true,
            'data' => $payments
        ]);
    }

    public function store(Request $request)
{
    $validated = $request->validate([
        'booking_id' => 'required|exists:bookings,id',
    ]);

    $booking = Booking::with('service')->findOrFail($validated['booking_id']);

    $payment = Payment::create([
        'booking_id' => $booking->id,
        'amount' => $booking->service->harga,
        'payment_status' => 'paid',
        'transaction_id' => 'TRX-' . time(),
    ]);

    $booking->update([
        'status' => 'confirmed'
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Pembayaran berhasil',
        'data' => $payment
    ], 201);
}

    public function show(Payment $payment)
    {
        return response()->json([
            'success' => true,
            'data' => $payment->load('booking')
        ]);
    }

    public function update(Request $request, Payment $payment)
    {
        $validated = $request->validate([
            'payment_status' => 'required|in:pending,paid,failed'
        ]);

        $payment->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Status pembayaran diperbarui',
            'data' => $payment
        ]);
    }

    public function destroy(Payment $payment)
    {
        $payment->delete();

        return response()->json([
            'success' => true,
            'message' => 'Data pembayaran dihapus'
        ]);
    }
}