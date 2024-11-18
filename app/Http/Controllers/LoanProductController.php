<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLoanProductRequest;
use App\Http\Requests\UpdateLoanProductRequest;
use App\Models\LoanProduct;
use Inertia\Inertia;

class LoanProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('loan-products/Index', [
            'loanProducts' => LoanProduct::get(),
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
    public function store(StoreLoanProductRequest $request)
    {
        $validated = $request->validated();

        LoanProduct::create($validated);

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(LoanProduct $loanProduct)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LoanProduct $loanProduct)
    {
        return Inertia::render('loan-products/Edit', [
            'loanProduct' => $loanProduct,
            'loanFees' => $loanProduct->loanFeesByLoanProduct()->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLoanProductRequest $request, LoanProduct $loanProduct)
    {
        $validated = $request->validated();

        $loanProduct->update($validated);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LoanProduct $loanProduct)
    {
        //
    }
}
