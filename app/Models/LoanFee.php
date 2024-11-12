<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LoanFee extends Model
{
    protected $fillable = ['company_id', 'type'];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function loanFeesByGeneral(): HasMany
    {
        return $this->hasMany(LoanFeeByGeneral::class);
    }

    public function loanFeesByLoanProduct(): HasMany
    {
        return $this->hasMany(LoanFeeByLoanProduct::class);
    }
}
