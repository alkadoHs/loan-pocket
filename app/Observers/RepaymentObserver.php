<?php

namespace App\Observers;

use App\Models\Repayment;

class RepaymentObserver
{
    public function creating(Repayment $repayment)
    {
        if (! $repayment->user_id) {
            $repayment->user_id = auth()->user()->id;
        }
    }
}
