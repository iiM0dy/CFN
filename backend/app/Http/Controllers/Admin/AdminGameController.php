<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CreateGameRequest;
use App\Http\Requests\Admin\ReorderGamesRequest;
use App\Http\Requests\Admin\UpdateGameRequest;
use App\Http\Resources\GameResource;
use App\Models\GameService;
use Illuminate\Support\Facades\DB;

class AdminGameController extends Controller
{
    public function index()
    {
        return GameResource::collection(GameService::orderBy('sort_order')->get());
    }

    public function store(CreateGameRequest $request)
    {
        $game = GameService::create([
            'name' => $request->input('name'),
            'slug' => $request->input('slug'),
            'description' => $request->input('description'),
            'bg_image' => $request->input('bgImage'),
            'char_image' => $request->input('charImage'),
            'href' => $request->input('href'),
            'is_active' => $request->input('isActive', true),
            'is_popular' => $request->input('isPopular', false),
            'sort_order' => $request->input('order') ?? ((int) GameService::max('sort_order') + 1),
        ]);

        return new GameResource($game);
    }

    public function update(string $id, UpdateGameRequest $request)
    {
        $game = GameService::findOrFail($id);

        $data = [];
        if ($request->has('name')) $data['name'] = $request->input('name');
        if ($request->has('slug')) $data['slug'] = $request->input('slug');
        if ($request->has('description')) $data['description'] = $request->input('description');
        if ($request->has('bgImage')) $data['bg_image'] = $request->input('bgImage');
        if ($request->has('charImage')) $data['char_image'] = $request->input('charImage');
        if ($request->has('href')) $data['href'] = $request->input('href');
        if ($request->has('isActive')) $data['is_active'] = $request->input('isActive');
        if ($request->has('isPopular')) $data['is_popular'] = $request->input('isPopular');
        if ($request->has('order')) $data['sort_order'] = $request->input('order');

        $game->update($data);
        return new GameResource($game);
    }

    public function reorder(ReorderGamesRequest $request)
    {
        DB::transaction(function () use ($request) {
            foreach ($request->input('ids') as $index => $id) {
                GameService::where('id', $id)->update(['sort_order' => $index]);
            }
        });

        return response()->json(['success' => true]);
    }

    public function destroy(string $id)
    {
        GameService::findOrFail($id)->delete();
        return response()->noContent();
    }
}
