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
}
