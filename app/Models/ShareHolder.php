<?php

namespace App\Models;

use App\Observers\ShareHolderObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[ObservedBy(ShareHolderObserver::class)]
class ShareHolder extends Model
{
    protected $fillable = [
        'company_id',
        'name',
        'email',
        'phone',
        'gender',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function capitals(): HasMany
    {
        return $this->hasMany(Capital::class);
    }
}
