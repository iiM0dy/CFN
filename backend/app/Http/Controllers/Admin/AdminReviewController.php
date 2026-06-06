<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReviewResource;
use App\Models\Review;
use Illuminate\Http\Request;

class AdminReviewController extends Controller
{
    public function index()
    {
        return ReviewResource::collection(
            Review::with('service.game')->orderBy('created_at', 'desc')->get()
        );
    }

    public function update(Request $request, string $id)
    {
        $review = Review::findOrFail($id);

        $validated = $request->validate([
            'status' => 'sometimes|in:pending,approved,rejected',
            'isFeatured' => 'sometimes|boolean',
        ]);

        $update = [];
        if (isset($validated['status'])) $update['status'] = $validated['status'];
        if (isset($validated['isFeatured'])) $update['is_featured'] = $validated['isFeatured'];

        $review->update($update);

        return new ReviewResource($review->fresh()->load('service.game'));
    }

    public function destroy(string $id)
    {
        Review::findOrFail($id)->delete();
        return response()->noContent();
    }
}
