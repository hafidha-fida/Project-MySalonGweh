<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    /**
     * Tampilkan semua layanan
     */
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Service::all()
        ]);
    }

    /**
     * Simpan layanan baru
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'duration' => 'required|integer'
        ]);

        $service = Service::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'duration' => $request->duration,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Layanan berhasil ditambahkan',
            'data' => $service
        ], 201);
    }

    /**
     * Tampilkan satu layanan
     */
    public function show($id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json([
                'success' => false,
                'message' => 'Layanan tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $service
        ]);
    }

    /**
     * Update layanan
     */
    public function update(Request $request, $id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json([
                'success' => false,
                'message' => 'Layanan tidak ditemukan'
            ], 404);
        }

        $service->update([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'duration' => $request->duration,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Layanan berhasil diupdate',
            'data' => $service
        ]);
    }

    /**
     * Hapus layanan
     */
    public function destroy($id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json([
                'success' => false,
                'message' => 'Layanan tidak ditemukan'
            ], 404);
        }

        $service->delete();

        return response()->json([
            'success' => true,
            'message' => 'Layanan berhasil dihapus'
        ]);
    }
}
