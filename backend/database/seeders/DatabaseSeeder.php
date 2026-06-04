<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@cfnboost.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('password'),
                'role' => 'ADMIN',
            ]
        );

        $this->call([
            GameServiceSeeder::class,
            PromoCodeSeeder::class,
        ]);
    }
}
