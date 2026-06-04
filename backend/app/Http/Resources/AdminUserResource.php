<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;

class AdminUserResource extends UserResource
{
    public function toArray(Request $request): array
    {
        $data = parent::toArray($request);
        $data['serviceOrdersCount'] = $this->service_orders_count ?? 0;
        return $data;
    }
}
