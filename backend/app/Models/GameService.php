<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class GameService extends Model
{
    use HasUuid;

    protected $table = 'game_services';

    protected $fillable = [
        'name', 'slug', 'description', 'bg_image', 'char_image',
        'href', 'is_active', 'is_popular', 'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'is_popular' => 'boolean',
    ];

    public function services() { return $this->hasMany(Service::class, 'game_id'); }
    public function gameFavorites() { return $this->hasMany(GameFavorite::class, 'game_id'); }
}
