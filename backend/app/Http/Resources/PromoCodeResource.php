<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PromoCodeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'code' => $this->code,
            'name' => $this->name,
            'discount' => $this->discount,
            'discountType' => $this->discount_type,
            'isActive' => $this->is_active,
            'usageLimit' => $this->usage_limit,
            'usageCount' => $this->usage_count,
            'expiresAt' => $this->expires_at,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
