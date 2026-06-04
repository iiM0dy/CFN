<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasUuid;

    protected $fillable = ['user_id'];

    public function user() { return $this->belongsTo(User::class); }
    public function cartItems() { return $this->hasMany(CartItem::class); }
}
