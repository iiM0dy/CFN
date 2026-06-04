<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'basePrice' => $this->base_price,
            'image' => $this->image,
            'gameId' => $this->game_id,
            'platforms' => $this->platforms,
            'completionMethods' => $this->completion_methods,
            'maxQuantity' => $this->max_quantity,
            'isFeatured' => $this->is_featured,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'options' => ServiceOptionResource::collection($this->whenLoaded('options')),
            'game' => new GameResource($this->whenLoaded('game')),
        ];
    }
}
