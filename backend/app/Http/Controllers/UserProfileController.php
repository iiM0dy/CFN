<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\ChangePasswordRequest;
use App\Http\Requests\UpdateProfileRequest;
use Illuminate\Support\Facades\Hash;

class UserProfileController extends Controller
{
    public function update(UpdateProfileRequest $request)
    {
        $request->user()->update(['name' => $request->input('name')]);
        return response()->json(['success' => 'Profile updated!']);
    }

    public function changePassword(ChangePasswordRequest $request)
    {
        $user = $request->user();

        if ($user->password !== null) {
            if (!$request->input('currentPassword') || !Hash::check($request->input('currentPassword'), $user->password)) {
                return response()->json(['error' => 'Current password is incorrect'], 400);
            }
        }

        $user->update(['password' => Hash::make($request->input('newPassword'))]);

        return response()->json(['success' => 'Password changed!']);
    }
}
