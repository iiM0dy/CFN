<?php

namespace App\Http\Controllers;

use App\Http\Resources\ServiceWithPriceResource;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function show(string $serviceId)
    {
        $service = Service::with([
            'game',
            'options' => fn($q) => $q->orderBy('sort_order'),
            'options.values' => fn($q) => $q->orderBy('sort_order'),
        ])->find($serviceId);

        if (!$service) {
            $service = Service::with([
                'game',
                'options' => fn($q) => $q->orderBy('sort_order'),
                'options.values' => fn($q) => $q->orderBy('sort_order'),
            ])->get()->first(function ($s) use ($serviceId) {
                $slug = strtolower(preg_replace('/[^a-z0-9]+/i', '-', $s->name));
                return trim($slug, '-') === $serviceId;
            });
        }

        if (!$service) {
            return response()->json(['error' => 'Service not found'], 404);
        }

        return new ServiceWithPriceResource($service);
    }

    public function search(Request $request)
    {
        $q = $request->query('q', '');
        if (strlen($q) < 2) {
            return response()->json([]);
        }

        $services = Service::with([
            'game',
            'options' => fn($query) => $query->orderBy('sort_order'),
            'options.values' => fn($query) => $query->orderBy('sort_order'),
        ])
            ->where('name', 'LIKE', "%{$q}%")
            ->orWhereHas('game', fn($query) => $query->where('name', 'LIKE', "%{$q}%"))
            ->limit(12)
            ->get();

        return ServiceWithPriceResource::collection($services);
    }
}
