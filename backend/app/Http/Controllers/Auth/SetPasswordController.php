<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\SetPasswordRequest;
use Illuminate\Support\Facades\Hash;

class SetPasswordController extends Controller
{
    public function store(SetPasswordRequest $request)
    {
        $user = $request->user();

        if ($user->password !== null) {
            return response()->json(['error' => 'Password already set'], 400);
        }

        $user->update(['password' => Hash::make($request->input('password'))]);

        return response()->json(['success' => 'Password set successfully!']);
    }
}
