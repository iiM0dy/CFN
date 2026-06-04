<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasUuid, HasFactory, Notifiable;

    protected $fillable = ['name', 'email', 'email_verified_at', 'image', 'password', 'role'];
    protected $hidden = ['password'];
    protected $casts = ['email_verified_at' => 'datetime'];

    public function accounts() { return $this->hasMany(Account::class); }
    public function cart() { return $this->hasOne(Cart::class); }
    public function favorites() { return $this->hasMany(Favorite::class); }
    public function gameFavorites() { return $this->hasMany(GameFavorite::class); }
    public function orders() { return $this->hasMany(Order::class); }
    public function serviceOrders() { return $this->hasMany(ServiceOrder::class); }
}
