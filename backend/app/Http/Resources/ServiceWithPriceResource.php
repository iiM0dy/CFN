<?php

namespace App\Http\Resources;

use App\Services\PriceCalculationService;
use Illuminate\Http\Request;

class ServiceWithPriceResource extends ServiceResource
{
    public function toArray(Request $request): array
    {
        $data = parent::toArray($request);
        $data['displayPrice'] = app(PriceCalculationService::class)->calculateDisplayPrice($this->resource);
        return $data;
    }
}
