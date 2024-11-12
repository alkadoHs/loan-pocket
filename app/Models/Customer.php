<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Model
{
    protected $fillable = [
        'branch_id',
        'user_id',
        'first_name',
        'middle_name',
        'last_name',
        'nick_name',
        'gender',
        'birth_date',
        'phone',
        'marital_status',
        'work_status',
        'work_address',
        'id_type',
        'id_number',
        'image',
        'status',
        'full_name',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }

    public function loans(): HasMany
    {
        return $this->hasMany(Loan::class);
    }
}
