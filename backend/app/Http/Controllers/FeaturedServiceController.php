<?php

namespace App\Http\Controllers;

use App\Http\Resources\ServiceWithPriceResource;
use App\Models\Service;

class FeaturedServiceController extends Controller
{
    public function index()
    {
        $services = Service::where('is_featured', true)
            ->with(['game', 'options' => fn($q) => $q->orderBy('sort_order'), 'options.values' => fn($q) => $q->orderBy('sort_order')])
            ->orderBy('created_at', 'desc')
            ->take(8)
            ->get();

        return ServiceWithPriceResource::collection($services);
    }
}
