<?php

namespace App\Observers;

use App\Models\LoanFee;

class LoanFeeObserver
{
    public function creating(LoanFee $fee)
    {
        $fee->company_id = auth()->user()->company_id;
    }
}
