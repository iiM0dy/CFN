<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FavoriteRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'serviceId' => ['nullable', 'string', 'exists:services,id'],
            'gameId' => ['nullable', 'string', 'exists:game_services,id'],
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            if (!$this->input('serviceId') && !$this->input('gameId')) {
                $validator->errors()->add('serviceId', 'Either serviceId or gameId is required.');
            }
        });
    }
}
