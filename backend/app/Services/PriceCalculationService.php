<?php

namespace App\Services;

use App\Models\Service;

class PriceCalculationService
{
    public function calculateDisplayPrice(Service $service): string
    {
        $basePrice = (float) $service->base_price;
        $minAdditionalPrice = 0;

        if ($service->relationLoaded('options')) {
            foreach ($service->options as $option) {
                if (in_array($option->type, ['number', 'range'])) {
                    if ($option->min_value && $option->min_value > 0) {
                        if (str_contains(strtolower($service->name), 'coin')) {
                            $basePrice = ($basePrice * $option->min_value) / 1000;
                        } else {
                            $basePrice = $basePrice * $option->min_value;
                        }
                    }
                } elseif ($option->required && $option->relationLoaded('values') && $option->values->count() > 0) {
                    $minModifier = $option->values->min('price_modifier');
                    $minAdditionalPrice += (float) ($minModifier ?? 0);
                }
            }
        }

        return number_format($basePrice + $minAdditionalPrice, 2, '.', '');
    }
}
