<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LoanFeeByGeneral extends Model
{
    protected $fillable = [
        'loan_fee_id',
        'description',
        'amount',
        'type',
    ];

    public function loanFee(): BelongsTo
    {
        return $this->belongsTo(LoanFee::class);
    }

}
