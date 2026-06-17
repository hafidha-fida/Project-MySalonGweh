<?php

namespace App\Services;

use App\Models\User;
use App\Models\Service;
use App\Models\Booking;
use App\Models\Payment;

class DashboardService
{
    public function getStatistics()
    {
        return [
            'total_users' => User::count(),
            'total_services' => Service::count(),
            'total_bookings' => Booking::count(),
            'total_payments' => Payment::count(),
            'total_revenue' => Payment::where(
                'payment_status',
                'paid'
            )->sum('amount')
        ];
    }
}