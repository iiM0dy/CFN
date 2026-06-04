<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CheckoutSessionRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'items' => ['required', 'array', 'min:1'],
            'items.*.id' => ['required', 'string'],
            'items.*.name' => ['required', 'string'],
            'items.*.price' => ['required', 'numeric', 'min:0'],
            'items.*.quantity' => ['sometimes', 'integer', 'min:1'],
            'items.*.description' => ['nullable', 'string'],
            'items.*.image' => ['nullable', 'string'],
            'customerEmail' => ['nullable', 'email'],
            'metadata' => ['nullable', 'array'],
            'successUrl' => ['nullable', 'string'],
            'cancelUrl' => ['nullable', 'string'],
        ];
    }
}
