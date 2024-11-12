<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LoanProduct extends Model
{
    protected $fillable = [
        'company_id',
        'name',
        'from_amount',
        'to_amount',
        'interest',
        'penalt_type',
        'penalt_amount',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function loanFees(): HasMany
    {
        return $this->hasMany(LoanFeeByLoanProduct::class);
    }

    public function loans(): HasMany
    {
        return $this->hasMany(Loan::class);
    }
}
