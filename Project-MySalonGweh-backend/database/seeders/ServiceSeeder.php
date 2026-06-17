<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        Service::insert([
            [
                'nama_layanan' => 'Hair Cut',
                'harga' => 50000,
                'durasi' => 30,
                'deskripsi' => 'Potong rambut'
            ],
            [
                'nama_layanan' => 'Hair Coloring',
                'harga' => 150000,
                'durasi' => 90,
                'deskripsi' => 'Pewarnaan rambut'
            ],
            [
                'nama_layanan' => 'Creambath',
                'harga' => 100000,
                'durasi' => 60,
                'deskripsi' => 'Perawatan rambut'
            ]
        ]);
    }
}