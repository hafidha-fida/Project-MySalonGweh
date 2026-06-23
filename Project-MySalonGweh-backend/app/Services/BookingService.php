<?php

namespace App\Services;

use App\Contracts\BookingServiceInterface;
use App\Models\Booking;

class BookingService implements BookingServiceInterface
{
    public function getAllBookings()
    {
        return Booking::with([
            'user',
            'service',
            'payment'
        ])->get();
    }

    public function getUserBookings(int $userId)
    {
        return Booking::with([
            'service',
            'payment'
        ])
        ->where('user_id', $userId)
        ->latest()
        ->get();
    }
}