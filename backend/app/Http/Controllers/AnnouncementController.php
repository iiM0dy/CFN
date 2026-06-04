<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateAnnouncementRequest;
use App\Http\Resources\AnnouncementResource;
use App\Models\Announcement;

class AnnouncementController extends Controller
{
    public function index()
    {
        $announcement = Announcement::where('is_active', true)->latest()->first();
        return $announcement ? new AnnouncementResource($announcement) : response()->json(null);
    }

    public function store(CreateAnnouncementRequest $request)
    {
        if ($request->input('isActive')) {
            Announcement::where('is_active', true)->update(['is_active' => false]);
        }

        $announcement = Announcement::create([
            'message' => $request->input('message'),
            'is_active' => $request->input('isActive'),
        ]);

        return new AnnouncementResource($announcement);
    }

    public function destroy()
    {
        Announcement::where('is_active', true)->delete();
        return response()->noContent();
    }
}
