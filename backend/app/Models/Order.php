<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasUuid;

    protected $fillable = ['user_id', 'status', 'total'];
    protected $casts = ['total' => 'decimal:2'];

    public function user() { return $this->belongsTo(User::class); }
    public function orderItems() { return $this->hasMany(OrderItem::class); }
}
