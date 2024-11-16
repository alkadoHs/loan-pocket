<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFlotiRequest;
use App\Http\Requests\UpdateFlotiRequest;
use App\Models\Floti;
use Inertia\Inertia;

class FlotiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("flots/Index");
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
        //
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
