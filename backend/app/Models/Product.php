<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasUuid;

    protected $fillable = ['name', 'description', 'price', 'image', 'stock', 'category'];
    protected $casts = ['price' => 'decimal:2'];

    public function cartItems() { return $this->hasMany(CartItem::class); }
    public function orderItems() { return $this->hasMany(OrderItem::class); }
}
