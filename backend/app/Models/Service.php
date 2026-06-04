<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasUuid;

    protected $fillable = [
        'name', 'description', 'base_price', 'image', 'game_id',
        'platforms', 'completion_methods', 'max_quantity', 'is_featured',
    ];

    protected $casts = [
        'platforms' => 'array',
        'completion_methods' => 'array',
        'base_price' => 'decimal:4',
        'is_featured' => 'boolean',
        'max_quantity' => 'integer',
    ];

    public function game() { return $this->belongsTo(GameService::class, 'game_id'); }
    public function options() { return $this->hasMany(ServiceOption::class); }
    public function favorites() { return $this->hasMany(Favorite::class); }
    public function serviceOrders() { return $this->hasMany(ServiceOrder::class); }
}
