<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\AnnouncementResource;
use App\Models\Announcement;
use Illuminate\Http\Request;

class AdminAnnouncementController extends Controller
{
    public function index()
    {
        return AnnouncementResource::collection(
            Announcement::orderBy('created_at', 'desc')->get()
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'message' => 'required|string',
            'isActive' => 'required|boolean',
        ]);

        if ($validated['isActive']) {
            Announcement::where('is_active', true)->update(['is_active' => false]);
        }

        $announcement = Announcement::create([
            'message' => $validated['message'],
            'is_active' => $validated['isActive'],
        ]);

        return new AnnouncementResource($announcement);
    }

    public function update(Request $request, string $id)
    {
        $announcement = Announcement::findOrFail($id);

        $validated = $request->validate([
            'message' => 'sometimes|string',
            'isActive' => 'sometimes|boolean',
        ]);

        if (isset($validated['isActive']) && $validated['isActive']) {
            Announcement::where('is_active', true)->where('id', '!=', $id)->update(['is_active' => false]);
        }

        $announcement->update(array_filter([
            'message' => $validated['message'] ?? null,
            'is_active' => $validated['isActive'] ?? null,
        ], fn ($v) => $v !== null));

        return new AnnouncementResource($announcement->fresh());
    }

    public function destroy(string $id)
    {
        Announcement::findOrFail($id)->delete();
        return response()->noContent();
    }
}
