<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Branch extends Model
{
    protected $fillable = ['name', 'company_id', 'address', 'phone', 'region'];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    
    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function paymentMethods(): HasMany
    {
        return $this->hasMany(PaymentMethod::class);
    }

    public function flotis(): HasMany
    {
        return $this->hasMany(Floti::class);
    }

    public function customers(): HasMany
    {
        return $this->hasMany(Customer::class);
    }

    public function loans(): HasMany
    {
        return $this->hasMany(Loan::class);
    }
}
