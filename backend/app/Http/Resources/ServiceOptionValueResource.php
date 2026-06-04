<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceOptionValueResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'optionId' => $this->option_id,
            'label' => $this->label,
            'value' => $this->value,
            'priceModifier' => $this->price_modifier,
            'order' => $this->sort_order,
            'isDefault' => $this->is_default,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
