<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Company extends Model
{
    protected $fillable = ['name', 'address', 'phone'];
    
    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function loanProducts(): HasMany
    {
        return $this->hasMany(LoanProduct::class);
    }

    public function loanFees(): HasMany
    {
        return $this->hasMany(LoanFee::class);
    }

    public function shareholders(): HasMany
    {
        return $this->hasMany(Shareholder::class);
    }

    public function flotis(): HasMany
    {
        return $this->hasMany(Floti::class);
    }

    public function capitals(): HasMany
    {
        return $this->hasMany(Capital::class);
    }
    
    public function formulas(): HasMany
    {
        return $this->hasMany(Formula::class);
    }

    public function capitalAccount(): HasOne
    {
        return $this->hasOne(CapitalAccount::class);
    }
}
