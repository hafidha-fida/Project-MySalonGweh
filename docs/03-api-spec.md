# API Specification

> Dokumentasikan setiap endpoint yang dikembangkan maupun yang dikonsumsi dari layanan eksternal.

---

## Login Pengguna

**Method:** `POST`

**URL:** `/api/v1/login`

**Deskripsi:** Melakukan autentikasi pengguna dan menghasilkan token akses.

**Autentikasi Diperlukan:** `Tidak`

**Sumber:** `Internal System`

**Request Headers:**

```http
Content-Type: application/json
```

**Request Body:**

```json
{
  "email": "user@email.com",
  "password": "password123"
}
```

**Response Sukses (`200 OK`):**

```json
{
  "status": "success",
  "token": "access_token"
}
```

**Response Gagal:**

```json
{
  "status": "error",
  "message": "Email atau password salah"
}
```

---

## Registrasi Pelanggan

**Method:** `POST`

**URL:** `/api/v1/register`

**Deskripsi:** Membuat akun pelanggan baru.

**Autentikasi Diperlukan:** `Tidak`

**Sumber:** `Internal System`

**Request Headers:**

```http
Content-Type: application/json
```

**Request Body:**

```json
{
  "name": "Annisa",
  "email": "annisa@email.com",
  "phone": "08123456789",
  "password": "password123"
}
```

**Response Sukses (`201 Created`):**

```json
{
  "status": "success",
  "message": "Registrasi berhasil"
}
```

**Response Gagal:**

```json
{
  "status": "error",
  "message": "Registrasi gagal"
}
```

---

## Mendapatkan Daftar Layanan Salon

**Method:** `GET`

**URL:** `/api/v1/services`

**Deskripsi:** Menampilkan seluruh layanan salon yang tersedia.

**Autentikasi Diperlukan:** `Tidak`

**Sumber:** `Internal System`

**Request Headers:**

```http
Content-Type: application/json
```

**Request Body:**

```json
{}
```

**Response Sukses (`200 OK`):**

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "nama_layanan": "Haircut",
      "harga": 50000,
      "durasi": 60
    }
  ]
}
```

**Response Gagal:**

```json
{
  "status": "error",
  "message": "Data layanan tidak ditemukan"
}
```

---

## Membuat Reservasi

**Method:** `POST`

**URL:** `/api/v1/bookings`

**Deskripsi:** Membuat reservasi layanan salon.

**Autentikasi Diperlukan:** `Ya`

**Sumber:** `Internal System`

**Request Headers:**

```http
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "service_id": 1,
  "booking_date": "2026-06-20",
  "booking_time": "14:00"
}
```

**Response Sukses (`201 Created`):**

```json
{
  "status": "success",
  "message": "Reservasi berhasil dibuat"
}
```

**Response Gagal:**

```json
{
  "status": "error",
  "message": "Jadwal tidak tersedia"
}
```

---

## Melihat Riwayat Reservasi

**Method:** `GET`

**URL:** `/api/v1/bookings`

**Deskripsi:** Menampilkan riwayat reservasi pelanggan.

**Autentikasi Diperlukan:** `Ya`

**Sumber:** `Internal System`

**Request Headers:**

```http
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

```json
{}
```

**Response Sukses (`200 OK`):**

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "layanan": "Haircut",
      "tanggal": "2026-06-20",
      "status": "Selesai"
    }
  ]
}
```

**Response Gagal:**

```json
{
  "status": "error",
  "message": "Data reservasi tidak ditemukan"
}
```

---

## Membatalkan Reservasi

**Method:** `DELETE`

**URL:** `/api/v1/bookings/{id}`

**Deskripsi:** Membatalkan reservasi yang telah dibuat.

**Autentikasi Diperlukan:** `Ya`

**Sumber:** `Internal System`

**Request Headers:**

```http
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

```json
{}
```

**Response Sukses (`200 OK`):**

```json
{
  "status": "success",
  "message": "Reservasi berhasil dibatalkan"
}
```

**Response Gagal:**

```json
{
  "status": "error",
  "message": "Reservasi tidak ditemukan"
}
```

---

## Menambah Layanan Salon

**Method:** `POST`

**URL:** `/api/v1/admin/services`

**Deskripsi:** Menambahkan layanan salon baru oleh admin.

**Autentikasi Diperlukan:** `Ya`

**Sumber:** `Internal System`

**Request Headers:**

```http
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "nama_layanan": "Hair Coloring",
  "harga": 250000,
  "durasi": 120
}
```

**Response Sukses (`201 Created`):**

```json
{
  "status": "success",
  "message": "Layanan berhasil ditambahkan"
}
```

**Response Gagal:**

```json
{
  "status": "error",
  "message": "Gagal menambahkan layanan"
}
```

---

## Dashboard Admin

**Method:** `GET`

**URL:** `/api/v1/admin/dashboard`

**Deskripsi:** Menampilkan ringkasan data salon untuk administrator.

**Autentikasi Diperlukan:** `Ya`

**Sumber:** `Internal System`

**Request Headers:**

```http
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

```json
{}
```

**Response Sukses (`200 OK`):**

```json
{
  "status": "success",
  "data": {
    "total_pelanggan": 120,
    "total_reservasi": 350,
    "pendapatan_bulan_ini": 15000000
  }
}
```

**Response Gagal:**

```json
{
  "status": "error",
  "message": "Gagal memuat dashboard"
}
```

---

## Laporan Pendapatan

**Method:** `GET`

**URL:** `/api/v1/admin/reports`

**Deskripsi:** Menampilkan laporan pendapatan berdasarkan periode tertentu.

**Autentikasi Diperlukan:** `Ya`

**Sumber:** `Internal System`

**Request Headers:**

```http
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "bulan": 6,
  "tahun": 2026
}
```

**Response Sukses (`200 OK`):**

```json
{
  "status": "success",
  "data": {
    "total_transaksi": 180,
    "total_pendapatan": 15000000
  }
}
```

**Response Gagal:**

```json
{
  "status": "error",
  "message": "Laporan tidak dapat dibuat"
}
```

---

## Monitoring Server

**Method:** `GET`

**URL:** `/api/v1/system/health`

**Deskripsi:** Mengecek status server dan database untuk kebutuhan monitoring DevOps.

**Autentikasi Diperlukan:** `Ya`

**Sumber:** `Internal System`

**Request Headers:**

```http
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

```json
{}
```

**Response Sukses (`200 OK`):**

```json
{
  "status": "healthy",
  "database": "connected",
  "server": "running"
}
```

**Response Gagal:**

```json
{
  "status": "error",
  "message": "Server tidak dapat dijangkau"
}
```
