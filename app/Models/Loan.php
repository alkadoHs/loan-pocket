<?php

namespace App\Models;

use App\Observers\LoanObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[ObservedBy(LoanObserver::class)]
class Loan extends Model
{
    protected $fillable = [
        'loan_number',
        'customer_id',
        'branch_id',
        'user_id',
        'disbursed_by',
        'formula_id',
        'loan_product_id',
        'type',
        'amount',
        'interest',
        'duration',
        'repayments',
        'start_date',
        'end_date',
        'next_repayment_date',
        'disbursed_date',
        'status',
        'grace_period',
        'outstanding_balance',
        'notes',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function loanProduct(): BelongsTo
    {
        return $this->belongsTo(LoanProduct::class);
    }

    public function formula(): BelongsTo
    {
        return $this->belongsTo(Formula::class);
    }   

    public function disbursedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'disbursed_by');
    }

    public function collaterals(): HasMany
    {
        return $this->hasMany(Collateral::class);
    }

    public function govermentDetails(): HasMany
    {
        return $this->hasMany(GovermentDetail::class);
    }

    public function repayments(): HasMany
    {
        return $this->hasMany(Repayment::class);
    }
}
