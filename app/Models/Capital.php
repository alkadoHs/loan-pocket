<?php

namespace App\Models;

use App\Observers\CapitalObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[ObservedBy(CapitalObserver::class)]
class Capital extends Model
{
    protected $fillable = [
        "company_id",
        "share_holder_id",
        "type",
        "amount",
        "principal",
        "loan_amount",
        "loan_term",
        "institution_name",
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function shareHolder(): BelongsTo
    {
        return $this->belongsTo(ShareHolder::class);
    }

    public function flotis(): HasMany
    {
        return $this->hasMany(Floti::class);
    }
}
