<?php

namespace App\Observers;

use App\Models\Loan;

class LoanObserver
{
    public function creating(Loan $loan)
    {
        if (! $loan->user_id) {
            $loan->user_id = auth()->user()->id;
        }

        if (! $loan->branch_id) {
            $loan->branch_id = auth()->user()->branch_id;
        }
    }
}
