<?php

namespace App\Observers;

use App\Models\CapitalAccount;
use App\Models\Floti;

class FlotiObserver
{
    public function creating(Floti $floti)
    {
        $floti->company_id = auth()->user()->company_id;
        $floti->capital_account_id = CapitalAccount::where('company_id', auth()->user()->company_id)->first()->id;
    }
}
