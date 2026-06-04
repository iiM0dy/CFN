<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GameResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'bgImage' => $this->bg_image,
            'charImage' => $this->char_image,
            'href' => $this->href,
            'isActive' => $this->is_active,
            'isPopular' => $this->is_popular,
            'order' => $this->sort_order,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
