<?php

namespace App\Services;

use App\Models\Booking;
use Midtrans\Config;
use Midtrans\Snap;

class MidtransService
{
    public function createTransaction(Booking $booking)
    {
        Config::$serverKey = env('MIDTRANS_SERVER_KEY');
        Config::$isProduction = false;
        Config::$isSanitized = true;
        Config::$is3ds = true;

        $params = [
            'transaction_details' => [
                'order_id' => 'BOOK-' . $booking->id,
                'gross_amount' => $booking->service->harga,
            ],

            'customer_details' => [
                'first_name' => $booking->customer_name,
                'email' => $booking->customer_email,
                'phone' => $booking->customer_phone,
            ],

            'item_details' => [[
                'id' => $booking->service->id,
                'price' => $booking->service->harga,
                'quantity' => 1,
                'name' => $booking->service->nama_layanan,
            ]]
        ];

        return Snap::getSnapToken($params);
    }
}
