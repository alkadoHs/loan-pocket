<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFlotiRequest;
use App\Http\Requests\UpdateFlotiRequest;
use App\Models\Branch;
use App\Models\Capital;
use App\Models\CapitalAccount;
use App\Models\Floti;
use App\Models\PaymentMethod;
use Inertia\Inertia;

class FlotiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $flotis = Floti::with(['paymentMethod', 'toBranch'])->get();
        $branches = Branch::get();
        $payments = PaymentMethod::get();
        $capital = CapitalAccount::where('company_id', auth()->user()->company_id)->first()->amount;

        return Inertia::render("flots/Index", [
            "flotis"=> $flotis,
            "branches"=> $branches,
            "paymentMethods"=> $payments,
            'capital' => $capital,
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
    public function store(StoreFlotiRequest $request)
    {
        $validated = $request->validated();

        $capital = CapitalAccount::where('company_id', auth()->user()->company_id)->first();;

        if ($capital->amount < $validated['amount']) {
            return redirect()->back()->withErrors(['error' => "Capital is not enough"]);
        }

        $floti = Floti::where([['to_branch_id', $validated['to_branch_id'], ['payment_method_id', $validated['payment_method_id']]]])->first();

        if($floti) {
            $floti->increment('amount', $validated['amount']);
            $capital->decrement('amount', $validated['amount']);
        } else {
            $newFloti = Floti::create($validated);
            $capital->decrement('amount', $newFloti->amount);
        }

        return redirect()->route("flotis.index");
    }

    /**
     * Display the specified resource.
     */
    public function show(Floti $floti)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Floti $floti)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFlotiRequest $request, Floti $floti)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Floti $floti)
    {
        //
    }
}
