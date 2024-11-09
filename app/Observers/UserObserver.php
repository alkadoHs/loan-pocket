<?php

namespace App\Observers;

use App\Models\User;

class UserObserver
{
    public function creating(User $user)
    {
        $nthToCompany = $user?->company?->users()->count() + 1;
        $dateOfHire =  $user->date_of_hire ?? date("mY");
        $branchId = $user->branch_id ?? "000";

        $user->employee_id = "$dateOfHire$branchId$nthToCompany";
    }
}
