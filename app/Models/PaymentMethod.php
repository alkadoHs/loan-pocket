<?php

namespace App\Models;

use App\Observers\PaymentMethodObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[ObservedBy(PaymentMethodObserver::class)]
class PaymentMethod extends Model
{
    protected $fillable = [
        'branch_id',
        'name',
        'number',
    ];

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }

    public function repayments(): HasMany
    {
        return $this->hasMany(Repayment::class);
    }

    public  function flotis(): HasMany
    {
        return $this->hasMany(Floti::class);
    }
}
