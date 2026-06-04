<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class ServiceOrder extends Model
{
    use HasUuid;

    protected $fillable = [
        'user_id', 'service_id', 'status', 'total_price', 'quantity',
        'platform', 'completion_method', 'completion_speed', 'promo_code',
        'discount', 'selected_options', 'guest_email', 'order_notes', 'completed_at',
    ];

    protected $casts = [
        'total_price' => 'decimal:2',
        'discount' => 'decimal:2',
        'selected_options' => 'array',
        'completed_at' => 'datetime',
    ];

    public function user() { return $this->belongsTo(User::class); }
    public function service() { return $this->belongsTo(Service::class); }
}
