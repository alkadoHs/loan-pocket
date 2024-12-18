<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CapitalAccount extends Model
{
    protected $fillable = [
        'company_id',
        'amount',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function flotis(): HasMany
    {
        return $this->hasMany(Floti::class);
    }
}
