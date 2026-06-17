<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\BookingService;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(
            BookingService::class,
            fn () => new BookingService()
        );
    }

    public function boot(): void
    {
        //
    }
}