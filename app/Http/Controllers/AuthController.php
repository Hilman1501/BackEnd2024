<?php
namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $input = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ];

        $user = User::create($input);

        $data = [
            'message' => 'User is created successfully',
        ];

        return response()->json($data, 201);
    }

public function login(Request $request)
{
    // Menangkap input user
    $input = [
        'email' => $request->email,
        'password' => $request->password,
    ];

    // Mengambil data user dari database
    $user = User::where('email', $input['email'])->first();

    // Membandingkan input user dengan data user dari database
    $isLoginSuccessfully = (
        $user && Hash::check($input['password'], $user->password)
    );

    if ($isLoginSuccessfully) {
        // Membuat token
        $token = $user->createToken('authtoken')->plainTextToken;

        $data = [
            'message' => 'Login successfully',
            'token' => $token,
        ];

        // Mengembalikan response
        return response()->json($data, 200);
    } else {
        $data = [
            'message' => 'Username or Password is wrong',
        ];

        return response()->json($data, 401);
    }
}
}