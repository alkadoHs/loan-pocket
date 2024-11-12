<?php

namespace App\Models;

use App\Observers\FlotiObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[ObservedBy(FlotiObserver::class)]
class Floti extends Model
{
    protected $fillable = ['company_id', 'capital_id', 'to_branch_id', 'payment_method_id', 'amount', 'withdraw_charges'];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function capital(): BelongsTo
    {
        return $this->belongsTo(Capital::class);
    }

    public function toBranch(): BelongsTo
    {
        return $this->belongsTo(Branch::class, 'to_branch_id');
    }
}
