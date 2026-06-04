<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateServiceRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'string'],
            'description' => ['sometimes', 'string'],
            'basePrice' => ['sometimes', 'numeric'],
            'image' => ['sometimes', 'string'],
            'platforms' => ['sometimes', 'array'],
            'completionMethods' => ['sometimes', 'array'],
            'maxQuantity' => ['sometimes', 'integer'],
            'isFeatured' => ['sometimes', 'boolean'],
        ];
    }
}
