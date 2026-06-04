<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    use HasUuid;

    const UPDATED_AT = null;

    protected $fillable = ['user_id', 'service_id'];

    public function user() { return $this->belongsTo(User::class); }
    public function service() { return $this->belongsTo(Service::class); }
}
