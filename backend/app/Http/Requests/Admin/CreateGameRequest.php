<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class CreateGameRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'unique:game_services,name'],
            'slug' => ['required', 'string', 'unique:game_services,slug'],
            'description' => ['required', 'string'],
            'bgImage' => ['required', 'string'],
            'charImage' => ['nullable', 'string'],
            'href' => ['required', 'string'],
            'order' => ['nullable', 'integer'],
            'isActive' => ['sometimes', 'boolean'],
            'isPopular' => ['sometimes', 'boolean'],
        ];
    }
}
