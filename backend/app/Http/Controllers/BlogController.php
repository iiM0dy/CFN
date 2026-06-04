<?php

namespace App\Http\Controllers;

use App\Http\Resources\BlogPostResource;
use App\Models\BlogPost;

class BlogController extends Controller
{
    public function index()
    {
        return BlogPostResource::collection(BlogPost::where('is_active', true)->orderBy('published_at', 'desc')->get());
    }

    public function show(string $slug)
    {
        $post = BlogPost::where('slug', $slug)->where('is_active', true)->first();
        if (!$post) {
            return response()->json(['error' => 'Post not found'], 404);
        }
        return new BlogPostResource($post);
    }
}
