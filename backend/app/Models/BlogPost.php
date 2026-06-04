<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class BlogPost extends Model
{
    use HasUuid;

    protected $fillable = [
        'title', 'slug', 'excerpt', 'content', 'image',
        'category', 'author', 'published_at', 'is_active',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'is_active' => 'boolean',
    ];
}
