<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceOrderResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'userId' => $this->user_id,
            'serviceId' => $this->service_id,
            'status' => $this->status,
            'totalPrice' => $this->total_price,
            'quantity' => $this->quantity,
            'platform' => $this->platform,
            'completionMethod' => $this->completion_method,
            'completionSpeed' => $this->completion_speed,
            'promoCode' => $this->promo_code,
            'discount' => $this->discount,
            'selectedOptions' => $this->selected_options,
            'guestEmail' => $this->guest_email,
            'orderNotes' => $this->order_notes,
            'completedAt' => $this->completed_at,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'service' => new ServiceWithPriceResource($this->whenLoaded('service')),
            'user' => new UserResource($this->whenLoaded('user')),
        ];
    }
}
