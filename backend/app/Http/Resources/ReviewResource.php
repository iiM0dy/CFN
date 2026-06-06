<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'userId' => $this->user_id,
            'serviceId' => $this->service_id,
            'username' => $this->username,
            'rating' => $this->rating,
            'message' => $this->message,
            'status' => $this->status,
            'isFeatured' => $this->is_featured,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'service' => $this->whenLoaded('service', fn () => [
                'id' => $this->service->id,
                'name' => $this->service->name,
                'game' => $this->service->game ? ['name' => $this->service->game->name] : null,
            ]),
        ];
    }
}
