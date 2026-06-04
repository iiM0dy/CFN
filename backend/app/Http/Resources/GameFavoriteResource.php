<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GameFavoriteResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'userId' => $this->user_id,
            'gameId' => $this->game_id,
            'createdAt' => $this->created_at,
            'game' => new GameResource($this->whenLoaded('game')),
        ];
    }
}
