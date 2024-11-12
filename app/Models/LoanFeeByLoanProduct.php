<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LoanFeeByLoanProduct extends Model
{
    protected $fillable = [
        'loan_fee_id',
        'loan_product_id',
        'description',
        'amount',
        'type',
    ];

    public function loanFee(): BelongsTo
    {
        return $this->belongsTo(LoanFee::class);
    }

    public function loanProduct(): BelongsTo
    {
        return $this->belongsTo(LoanProduct::class);
    }
}
