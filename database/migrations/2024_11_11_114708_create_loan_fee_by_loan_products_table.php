<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('loan_fee_by_loan_products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('loan_fee_id')->constrained()->cascadeOnDelete();
            $table->foreignId('loan_product_id')->constrained()->cascadeOnDelete();
            $table->string('description');
            $table->integer('amount');
            $table->enum('type' , ['percent_value','money_value'])->default('money_value');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('loan_fee_by_loan_products');
    }
};
