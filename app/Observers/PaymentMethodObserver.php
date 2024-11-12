<?php

namespace App\Observers;

use App\Models\PaymentMethod;

class PaymentMethodObserver
{
    public function creating(PaymentMethod $paymentMethod)
    {
        if(! $paymentMethod->branch_id) {
            $paymentMethod->branch_id = auth()->user()->branch_id;
        }
    }
}
