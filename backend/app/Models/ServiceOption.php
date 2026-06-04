<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class ServiceOption extends Model
{
    use HasUuid;

    protected $fillable = [
        'service_id', 'label', 'type', 'required', 'sort_order',
        'min_value', 'max_value', 'step',
    ];

    protected $casts = [
        'required' => 'boolean',
        'sort_order' => 'integer',
        'min_value' => 'integer',
        'max_value' => 'integer',
        'step' => 'integer',
    ];

    public function service() { return $this->belongsTo(Service::class); }
    public function values() { return $this->hasMany(ServiceOptionValue::class, 'option_id'); }
}
