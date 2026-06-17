<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\BookingService;
use App\Services\PaymentService;
use App\Services\DashboardService;

class SalonServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(
            BookingService::class,
            fn () => new BookingService()
        );

        $this->app->singleton(
            PaymentService::class,
            fn () => new PaymentService()
        );

        $this->app->singleton(
            DashboardService::class,
            fn () => new DashboardService()
        );
    }

    public function boot(): void
    {
        //
    }
}