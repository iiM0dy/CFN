<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateOrderRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'serviceId' => ['required', 'string', 'exists:services,id'],
            'totalPrice' => ['required', 'numeric', 'min:0'],
            'quantity' => ['required', 'integer', 'min:1'],
            'platform' => ['required', 'string'],
            'completionMethod' => ['required', 'string'],
            'completionSpeed' => ['nullable', 'string'],
            'orderNotes' => ['nullable', 'string'],
            'promoCode' => ['nullable', 'string'],
            'discount' => ['nullable', 'numeric', 'min:0'],
            'selectedOptions' => ['nullable', 'array'],
        ];
    }
}
