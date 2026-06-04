<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class ChatSession extends Model
{
    use HasUuid;

    protected $fillable = ['user_id', 'user_email', 'user_name', 'status'];

    public function messages() { return $this->hasMany(ChatMessage::class, 'session_id'); }
}
