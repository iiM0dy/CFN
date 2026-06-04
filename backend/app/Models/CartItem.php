<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    use HasUuid;

    public $timestamps = false;

    protected $fillable = ['cart_id', 'product_id', 'quantity'];

    public function cart() { return $this->belongsTo(Cart::class); }
    public function product() { return $this->belongsTo(Product::class); }
}
