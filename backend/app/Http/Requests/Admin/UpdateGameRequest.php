<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateGameRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'string'],
            'slug' => ['sometimes', 'string'],
            'description' => ['sometimes', 'string'],
            'bgImage' => ['sometimes', 'string'],
            'charImage' => ['nullable', 'string'],
            'href' => ['sometimes', 'string'],
            'isActive' => ['sometimes', 'boolean'],
            'isPopular' => ['sometimes', 'boolean'],
            'order' => ['sometimes', 'integer'],
        ];
    }
}
