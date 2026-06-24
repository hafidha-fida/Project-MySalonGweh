<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Booking;
use Illuminate\Http\Request;
use App\Services\MidtransService;
use Midtrans\Notification;

class PaymentController extends Controller
{
    protected MidtransService $midtransService;

    public function __construct(MidtransService $midtransService)
    {
        $this->midtransService = $midtransService;
    }
    public function index()
    {
        $payments = Payment::with([
            'booking.service'
        ])->latest()->get();

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
    public function createPayment(Booking $booking)
    {
        $booking->load('service');

        $snapToken = $this->midtransService
            ->createTransaction($booking);

        Payment::updateOrCreate(
            [
                'booking_id' => $booking->id
            ],
            [
                'amount' => $booking->service->harga,
                'payment_status' => 'pending',
                'transaction_id' => 'BOOK-' . $booking->id
            ]
        );
        return response()->json([
            'success' => true,
            'snap_token' => $snapToken
        ]);
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
    public function notification(Request $request)
    {
        $notif = new Notification();

        $transactionStatus = $notif->transaction_status;
        $orderId = $notif->order_id;

        // ambil id booking dari BOOK-{id}
        $bookingId = str_replace('BOOK-', '', $orderId);

        $payment = Payment::where(
            'booking_id',
            $bookingId
        )->first();

        if (!$payment) {
            return response()->json([
                'message' => 'Payment tidak ditemukan'
            ], 404);
        }

        // pembayaran berhasil
        if (
            $transactionStatus == 'settlement' ||
            $transactionStatus == 'capture'
        ) {

            $payment->update([
                'payment_status' => 'paid'
            ]);

            $booking = $payment->booking;

            if ($booking->queue_number == null) {

                $totalQueue = Booking::whereDate(
                    'booking_date',
                    $booking->booking_date
                )
                    ->where('status', 'confirmed')
                    ->count() + 1;

                $queueNumber = 'A-' .
                    str_pad(
                        $totalQueue,
                        3,
                        '0',
                        STR_PAD_LEFT
                    );

                $booking->update([
                    'status' => 'confirmed',
                    'queue_number' => $queueNumber
                ]);
            }
        }

        // pending
        if ($transactionStatus == 'pending') {

            $payment->update([
                'payment_status' => 'pending'
            ]);
        }

        // gagal
        if (
            $transactionStatus == 'expire' ||
            $transactionStatus == 'cancel' ||
            $transactionStatus == 'deny'
        ) {

            $payment->update([
                'payment_status' => 'failed'
            ]);

            $payment->booking->update([
                'status' => 'cancelled'
            ]);
        }

        return response()->json([
            'success' => true
        ]);
    }
}
