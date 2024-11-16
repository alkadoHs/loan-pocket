<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCapitalRequest;
use App\Http\Requests\UpdateCapitalRequest;
use App\Models\Capital;
use App\Models\CapitalAccount;
use Inertia\Inertia;

class CapitalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $capitals = Capital::with('shareHolder')->get();
        $shareHolders = \App\Models\ShareHolder::all();

        return Inertia::render('capitals/Index', [
            'capitals' => $capitals,
            'shareholders' => $shareHolders,
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
    public function store(StoreCapitalRequest $request)
    {
        $validated = $request->validated();
        
        Capital::create($validated);

        $account = CapitalAccount::where('company_id', auth()->user()->company_id)->firstOrCreate();
        $account->increment('amount', $validated['amount']);

        return redirect()->route('capitals.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Capital $capital)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Capital $capital)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCapitalRequest $request, Capital $capital)
    {
        $validated = $request->validated();

        $capital->update($validated);

        return redirect()->route('capitals.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Capital $capital)
    {
        $capital->delete();

        return redirect()->route('capitals.index');
    }
}
