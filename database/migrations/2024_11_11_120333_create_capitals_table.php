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
        Schema::create('capitals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained()->cascadeOnDelete();
            $table->foreignId('share_holder_id')->constrained()->cascadeOnDelete();
            $table->enum('type', ['loan', 'company'])->default('company');
            $table->integer('amount');
            $table->integer('principal')->default(0);
            $table->integer('loan_amount')->default(0);
            $table->decimal('loan_term')->default(0);
            $table->string('institution_name')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('capitals');
    }
};
