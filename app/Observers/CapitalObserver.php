<?php

namespace App\Observers;

use App\Models\Capital;

class CapitalObserver
{
    public function creating(Capital $capital)
    {
        $capital->company_id = auth()->user()->company_id;
    }
}
