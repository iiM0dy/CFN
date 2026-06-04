<?php

namespace App\Http\Controllers;

use App\Http\Requests\ValidatePromoCodeRequest;
use App\Models\PromoCode;

class PromoCodeController extends Controller
{
    public function validate(ValidatePromoCodeRequest $request)
    {
        $promo = PromoCode::where('code', strtoupper($request->input('code')))->first();

        if (!$promo) {
            return response()->json(['error' => 'Invalid promo code'], 404);
        }
        if (!$promo->is_active) {
            return response()->json(['error' => 'Promo code is not active'], 400);
        }
        if ($promo->expires_at && $promo->expires_at->isPast()) {
            return response()->json(['error' => 'Promo code has expired'], 400);
        }
        if ($promo->usage_limit !== null && $promo->usage_count >= $promo->usage_limit) {
            return response()->json(['error' => 'Promo code usage limit reached'], 400);
        }

        return response()->json([
            'valid' => true,
            'discount' => $promo->discount,
            'discountType' => $promo->discount_type,
            'name' => $promo->name,
        ]);
    }
}
