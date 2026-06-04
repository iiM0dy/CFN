<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    use HasUuid;

    protected $fillable = ['message', 'is_active'];
    protected $casts = ['is_active' => 'boolean'];
}
