<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    use HasUuid;

    protected $fillable = [
        'user_id', 'type', 'provider', 'provider_account_id',
        'refresh_token', 'access_token', 'expires_at', 'token_type',
        'scope', 'id_token', 'session_state',
    ];

    public function user() { return $this->belongsTo(User::class); }
}
