<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SendChatMessageRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'sessionId' => ['required', 'string', 'exists:chat_sessions,id'],
            'text' => ['required', 'string'],
            'sender' => ['required', 'string'],
            'isAdmin' => ['sometimes', 'boolean'],
        ];
    }
}
