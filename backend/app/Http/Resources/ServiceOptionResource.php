<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceOptionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'serviceId' => $this->service_id,
            'label' => $this->label,
            'type' => $this->type,
            'required' => $this->required,
            'order' => $this->sort_order,
            'minValue' => $this->min_value,
            'maxValue' => $this->max_value,
            'step' => $this->step,
            'values' => ServiceOptionValueResource::collection($this->whenLoaded('values')),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
