<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLoanFeeByLoanProductRequest;
use App\Http\Requests\UpdateLoanFeeByLoanProductRequest;
use App\Models\LoanFeeByLoanProduct;

class LoanFeeByLoanProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreLoanFeeByLoanProductRequest $request)
    {
        $validated = $request->validated();

        LoanFeeByLoanProduct::create($validated);

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(LoanFeeByLoanProduct $loanFeeByLoanProduct)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LoanFeeByLoanProduct $loanFeeByLoanProduct)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLoanFeeByLoanProductRequest $request, LoanFeeByLoanProduct $loanFeeByLoanProduct)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LoanFeeByLoanProduct $loanFeeByLoanProduct)
    {
        //
    }
}
