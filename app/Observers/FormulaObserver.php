<?php

namespace App\Observers;

use App\Models\Formula;

class FormulaObserver
{
    public function creating(Formula $formula)
    {
        $formula->company_id = auth()->user()->company_id;
    }
}
