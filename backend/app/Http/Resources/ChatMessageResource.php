<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ChatMessageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'sessionId' => $this->session_id,
            'text' => $this->text,
            'sender' => $this->sender,
            'isAdmin' => $this->is_admin,
            'createdAt' => $this->created_at,
        ];
    }
}
