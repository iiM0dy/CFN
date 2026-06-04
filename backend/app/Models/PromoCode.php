<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class PromoCode extends Model
{
    use HasUuid;

    protected $fillable = [
        'code', 'name', 'discount', 'discount_type', 'is_active',
        'usage_limit', 'usage_count', 'expires_at',
    ];

    protected $casts = [
        'discount' => 'decimal:2',
        'is_active' => 'boolean',
        'usage_count' => 'integer',
        'usage_limit' => 'integer',
        'expires_at' => 'datetime',
    ];
}
