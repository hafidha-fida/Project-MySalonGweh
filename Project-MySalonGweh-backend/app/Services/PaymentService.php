<?php

namespace App\Services;

use App\Models\Payment;

class PaymentService
{
    public function createPayment(array $data)
    {
        return Payment::create($data);
    }

    public function getAllPayments()
    {
        return Payment::with('booking')->get();
    }
}