<?php

namespace Database\Seeders;

use App\Models\PromoCode;
use Illuminate\Database\Seeder;

class PromoCodeSeeder extends Seeder
{
    public function run(): void
    {
        $codes = [
            [
                'code' => 'WELCOME10',
                'name' => 'Welcome Discount',
                'discount' => 10,
                'discount_type' => 'percentage',
                'is_active' => true,
                'usage_limit' => null,
                'expires_at' => null,
            ],
            [
                'code' => 'SAVE5',
                'name' => '$5 Off',
                'discount' => 5,
                'discount_type' => 'fixed',
                'is_active' => true,
                'usage_limit' => 100,
                'expires_at' => '2026-12-31 00:00:00',
            ],
        ];

        foreach ($codes as $code) {
            PromoCode::updateOrCreate(['code' => $code['code']], $code);
        }
    }
}
