<?php

namespace App\Models;

use App\Observers\FlotiObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[ObservedBy(FlotiObserver::class)]
class Floti extends Model 

{
    protected $fillable = [
        'company_id', 
        'capital_account_id', 
        'to_branch_id', 
        'payment_method_id', 
        'amount', 
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function capitalAccount(): BelongsTo
    {
        return $this->belongsTo(CapitalAccount::class);
    }

    public function paymentMethod(): BelongsTo
    {
        return $this->belongsTo(PaymentMethod::class);
    }

    public function toBranch(): BelongsTo
    {
        return $this->belongsTo(Branch::class, 'to_branch_id');
    }
}
