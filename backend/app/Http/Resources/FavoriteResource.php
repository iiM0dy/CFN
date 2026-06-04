<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FavoriteResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'userId' => $this->user_id,
            'serviceId' => $this->service_id,
            'createdAt' => $this->created_at,
            'service' => new ServiceWithPriceResource($this->whenLoaded('service')),
        ];
    }
}
