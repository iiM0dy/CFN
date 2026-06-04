<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Models\User;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    public function redirect(string $provider)
    {
        if (!in_array($provider, ['google', 'facebook', 'discord'])) {
            return response()->json(['error' => 'Unsupported provider'], 400);
        }
        return Socialite::driver($provider)->stateless()->redirect();
    }

    public function callback(string $provider)
    {
        if (!in_array($provider, ['google', 'facebook', 'discord'])) {
            return response()->json(['error' => 'Unsupported provider'], 400);
        }

        $socialUser = Socialite::driver($provider)->stateless()->user();

        $account = Account::where('provider', $provider)
            ->where('provider_account_id', $socialUser->getId())
            ->first();

        if ($account) {
            $user = $account->user;
        } else {
            $user = User::where('email', $socialUser->getEmail())->first();
            if (!$user) {
                $user = User::create([
                    'name' => $socialUser->getName(),
                    'email' => $socialUser->getEmail(),
                    'image' => $socialUser->getAvatar(),
                    'email_verified_at' => now(),
                ]);
            }
            Account::create([
                'user_id' => $user->id,
                'type' => 'oauth',
                'provider' => $provider,
                'provider_account_id' => $socialUser->getId(),
                'access_token' => $socialUser->token,
                'refresh_token' => $socialUser->refreshToken,
                'expires_at' => $socialUser->expiresIn,
            ]);
        }

        $token = $user->createToken('auth-token')->plainTextToken;

        return redirect(config('app.frontend_url') . '/auth/callback?token=' . $token);
    }
}
