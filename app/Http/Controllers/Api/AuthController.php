<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Register User
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Registrasi berhasil',
            'user' => $user
        ], 201);
    }

    /**
     * Login User
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'success' => false,
                'message' => 'Email atau password salah'
            ], 401);
        }

        $user = Auth::user();

        return response()->json([
            'success' => true,
            'message' => 'Login berhasil',
            'user' => $user
        ]);
    }

    /**
     * Profile User
     */
    public function profile(Request $request)
    {
        return response()->json([
            'success' => true,
            'user' => $request->user()
        ]);
    }

    /**
     * Logout User
     */
    public function logout(Request $request)
    {
        Auth::logout();

        return response()->json([
            'success' => true,
            'message' => 'Logout berhasil'
        ]);
    }
}
