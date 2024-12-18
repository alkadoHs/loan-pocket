<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreShareHolderRequest;
use App\Http\Requests\UpdateShareHolderRequest;
use App\Models\ShareHolder;
use Inertia\Inertia;

class ShareHolderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $shareholders = Shareholder::all();
        return Inertia::render("shareholders/Index", ["shareholders" => $shareholders]);
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
    public function store(StoreShareHolderRequest $request)
    {
        $validated = $request->validated();

        ShareHolder::create($validated);

        return redirect()->route("shareholders.index");
    }

    /**
     * Display the specified resource.
     */
    public function show(ShareHolder $shareHolder)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ShareHolder $shareHolder)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateShareHolderRequest $request, ShareHolder $shareholder)
    {
        $validated = $request->validated();

        $shareholder->update($validated);

        return redirect()->route("shareholders.index");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ShareHolder $shareholder)
    {
        $shareholder->delete();

        return redirect()->route("shareholders.index");
    }
}
