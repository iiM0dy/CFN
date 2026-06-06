<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasUuid;

    protected $fillable = [
        'user_id', 'service_id', 'username', 'rating',
        'message', 'status', 'is_featured',
    ];

    protected $casts = [
        'rating' => 'integer',
        'is_featured' => 'boolean',
    ];

    public function user() { return $this->belongsTo(User::class); }
    public function service() { return $this->belongsTo(Service::class); }
}
