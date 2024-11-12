<?php

namespace App\Observers;

use App\Models\ShareHolder;

class ShareHolderObserver
{
    public function creating(ShareHolder $shareholder)
    {
        $shareholder->company_id = auth()->user()->company_id;
    }
}
