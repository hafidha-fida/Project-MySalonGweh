<?php

namespace App\Services;

use App\Contracts\BookingServiceInterface;
use App\Models\Booking;

class BookingService implements BookingServiceInterface
{
    public function getAllBookings()
    {
        return Booking::with([
            'service',
            'payment'
        ])
            ->latest()
            ->get();
    }

    public function getCustomerBookings(string $email)
    {
        return Booking::with([
            'service',
            'payment'
        ])
            ->where('customer_email', $email)
            ->latest()
            ->get();
    }
}
