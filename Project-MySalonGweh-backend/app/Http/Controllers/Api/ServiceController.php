<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::all();

        return response()->json([
            'success' => true,
            'data' => $services
        ]);
    }

    public function show(Service $service)
    {
        return response()->json([
            'success' => true,
            'data' => $service
        ]);
    }
}
