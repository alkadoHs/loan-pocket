<?php

namespace App\Observers;

use App\Models\Customer;

class CustomerObserver
{
    public function creating(Customer $customer)
    {
        if (! $customer->branch_id) {
            $customer->branch_id = auth()->user()->branch_id;
        }

        if (! $customer->user_id) {
            $customer->user_id = auth()->user()->id;
        }
    }
}
