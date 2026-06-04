<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateChatSessionRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'userEmail' => ['nullable', 'email'],
            'userName' => ['nullable', 'string'],
            'userId' => ['nullable', 'string'],
        ];
    }
}
