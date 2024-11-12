<?php

namespace App\Observers;

use App\Models\LoanProduct;

class LoanProductObserver
{
    public function creating(LoanProduct $loanProduct)
    {
        $loanProduct->company_id = auth()->user()->company_id;
    }
}
