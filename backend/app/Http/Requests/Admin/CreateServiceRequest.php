<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class CreateServiceRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string'],
            'gameId' => ['required', 'string', 'exists:game_services,id'],
            'basePrice' => ['required', 'numeric', 'min:0'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'string'],
            'platforms' => ['required', 'array'],
            'completionMethods' => ['required', 'array'],
            'maxQuantity' => ['nullable', 'integer', 'min:1'],
            'isFeatured' => ['sometimes', 'boolean'],
        ];
    }
}
