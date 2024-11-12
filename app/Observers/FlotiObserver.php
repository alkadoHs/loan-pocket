<?php

namespace App\Observers;

use App\Models\Floti;

class FlotiObserver
{
    public function creating(Floti $floti)
    {
        $floti->company_id = auth()->user()->company_id;
    }
}
