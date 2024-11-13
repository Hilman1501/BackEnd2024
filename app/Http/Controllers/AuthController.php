<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    //Registrasi 
    public function register(Request $request)
    {
        // Validasi input yang diterima dari request
        $validator = \Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        // Respon Jika validasi gagal
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        // Membuat pengguna baru 
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        //respons JSON dengan pesan sukses dan data pengguna baru
        return response()->json([
            'message' => 'User berhasil dibuat',
            'data' => $user
        ], 201);
    }

    //Login pengguna.

    public function login(Request $request)
    {
        // Validasi input yang diterima dari request
        $validator = \Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string|min:6',
        ]);

        //  respons JSON Jika validasi gagal
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        // Cek apakah pengguna terdaftar 
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            // Jika login berhasil, buat token API untuk pengguna
            $user = Auth::user();
            $token = $user->createToken('API Token')->plainTextToken;

            //  respons JSON dengan pesan sukses 
            return response()->json([
                'message' => 'Login berhasil',
                'token' => $token,
            ], 200);
        } else {
            //respons JSON Jika kredensial tidak sesuai
            return response()->json([
                'message' => 'Email atau password salah',
            ], 401);
        }
    }

}