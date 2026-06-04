<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\GuestLoginRequest;
use App\Http\Resources\UserResource;
use App\Models\User;

class GuestLoginController extends Controller
{
    public function store(GuestLoginRequest $request)
    {
        $user = User::where('email', $request->input('email'))->first();

        if ($user && $user->password !== null) {
            return response()->json(['error' => 'This email has an account. Please log in before proceeding.'], 400);
        }

        if (!$user) {
            $user = User::create(['email' => $request->input('email')]);
        }

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'success' => true,
            'token' => $token,
            'user' => new UserResource($user),
        ]);
    }
}
