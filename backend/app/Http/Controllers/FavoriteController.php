<?php

namespace App\Http\Controllers;

use App\Http\Requests\FavoriteRequest;
use App\Http\Resources\FavoriteResource;
use App\Http\Resources\GameFavoriteResource;
use App\Models\Favorite;
use App\Models\GameFavorite;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        $services = Favorite::where('user_id', $userId)
            ->with(['service.game', 'service.options' => fn($q) => $q->orderBy('sort_order'), 'service.options.values' => fn($q) => $q->orderBy('sort_order')])
            ->orderBy('created_at', 'desc')
            ->get();

        $games = GameFavorite::where('user_id', $userId)
            ->with('game')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'services' => FavoriteResource::collection($services),
            'games' => GameFavoriteResource::collection($games),
        ]);
    }

    public function store(FavoriteRequest $request)
    {
        $userId = $request->user()->id;

        try {
            if ($request->input('serviceId')) {
                $fav = Favorite::create(['user_id' => $userId, 'service_id' => $request->input('serviceId')]);
                return new FavoriteResource($fav);
            }
            $fav = GameFavorite::create(['user_id' => $userId, 'game_id' => $request->input('gameId')]);
            return new GameFavoriteResource($fav);
        } catch (QueryException $e) {
            if ($e->errorInfo[1] == 1062) {
                return response()->json(['error' => 'Already in favorites'], 400);
            }
            throw $e;
        }
    }

    public function destroy(Request $request)
    {
        $userId = $request->user()->id;

        if ($request->query('serviceId')) {
            Favorite::where('user_id', $userId)->where('service_id', $request->query('serviceId'))->delete();
        } elseif ($request->query('gameId')) {
            GameFavorite::where('user_id', $userId)->where('game_id', $request->query('gameId'))->delete();
        }

        return response()->json(['success' => true]);
    }
}
