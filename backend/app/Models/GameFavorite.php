<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class GameFavorite extends Model
{
    use HasUuid;

    const UPDATED_AT = null;

    protected $fillable = ['user_id', 'game_id'];

    public function user() { return $this->belongsTo(User::class); }
    public function game() { return $this->belongsTo(GameService::class, 'game_id'); }
}
