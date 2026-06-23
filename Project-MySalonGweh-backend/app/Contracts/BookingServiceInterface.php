<?php

namespace App\Contracts;

interface BookingServiceInterface
{
    public function getAllBookings();

    public function getUserBookings(int $userId);
}