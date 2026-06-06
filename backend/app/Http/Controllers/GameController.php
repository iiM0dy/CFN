<?php

namespace App\Http\Controllers;

use App\Http\Resources\GameResource;
use App\Http\Resources\ServiceWithPriceResource;
use App\Models\GameService;

class GameController extends Controller
{
    public function index()
    {
        return GameResource::collection(GameService::where('is_active', true)->orderBy('name')->get());
    }

    public function services(string $gameSlug)
    {
        $game = GameService::where('slug', $gameSlug)->where('is_active', true)->first();
        if (!$game) {
            return response()->json(['error' => 'Game not found'], 404);
        }

        $services = $game->services()
            ->with(['options' => fn($q) => $q->orderBy('sort_order'), 'options.values' => fn($q) => $q->orderBy('sort_order')])
            ->get();

        $gameData = new GameResource($game);
        $gameArray = $gameData->toArray(request());
        $gameArray['services'] = ServiceWithPriceResource::collection($services);

        return response()->json($gameArray);
    }
}
