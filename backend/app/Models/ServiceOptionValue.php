<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class ServiceOptionValue extends Model
{
    use HasUuid;

    protected $fillable = [
        'option_id', 'label', 'value', 'price_modifier', 'sort_order', 'is_default',
    ];

    protected $casts = [
        'price_modifier' => 'decimal:2',
        'sort_order' => 'integer',
        'is_default' => 'boolean',
    ];

    public function serviceOption() { return $this->belongsTo(ServiceOption::class, 'option_id'); }
}
