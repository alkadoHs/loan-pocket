<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLoanFeeRequest;
use App\Http\Requests\UpdateLoanFeeRequest;
use App\Models\LoanFee;
use App\Models\LoanProduct;
use Inertia\Inertia;

class LoanFeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("loan-fees/Index", [
            "loanFee" => LoanFee::with(['loanFeesByGeneral'])->first(),
            "loanProducts" => LoanProduct::with('loanFeesByLoanProduct')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLoanFeeRequest $request)
    {
        $validated = $request->validated();

        LoanFee::create($validated);

        return redirect()->route('loan-fees.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(LoanFee $loanFee)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LoanFee $loanFee)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLoanFeeRequest $request, LoanFee $loanFee)
    {
        $validated = $request->validated();

        $loanFee->update($validated);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LoanFee $loanFee)
    {
        //
    }
}
