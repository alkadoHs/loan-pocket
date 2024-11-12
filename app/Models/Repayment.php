<?php

namespace App\Models;

use App\Observers\RepaymentObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[ObservedBy(RepaymentObserver::class)]
class Repayment extends Model
{
    // from migration: 2024_11_12_075140_create_repayments_table.php
    protected $fillable = [
        "loan_id",
        "user_id",
        "payment_method_id",
        "description",
        "amount",
        "payment_date",
        "payer_name",
        "withdral_amount",
        "balance",
        "status",
        "duration",
        "repayments",
        "next_repayment_date",
        "last_repayment_date",
    ];

    public function loan(): BelongsTo
    {
        return $this->belongsTo(Loan::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function paymentMethod(): BelongsTo
    {
        return $this->belongsTo(PaymentMethod::class);
    }
}
