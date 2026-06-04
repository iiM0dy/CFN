<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class ChatMessage extends Model
{
    use HasUuid;

    const UPDATED_AT = null;

    protected $fillable = ['session_id', 'text', 'sender', 'is_admin'];
    protected $casts = ['is_admin' => 'boolean'];

    public function session() { return $this->belongsTo(ChatSession::class, 'session_id'); }
}
