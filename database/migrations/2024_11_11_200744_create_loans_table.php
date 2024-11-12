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
        Schema::create('loans', function (Blueprint $table) {
            $table->id();
            $table->string('loan_number')->nullable()->unique();
            $table->foreignId('customer_id')->constrained()->cascadeOnDelete();
            $table->foreignId('branch_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('disbursed_by')->nullable()->constrained('users')->cascadeOnDelete();
            $table->foreignId('formula_id')->constrained()->cascadeOnDelete();
            $table->foreignId('loan_product_id')->constrained()->cascadeOnDelete();
            $table->enum('type', ['individual', 'group'])->default('individual');
            $table->decimal('amount', 11, 2);
            $table->decimal('interest', 5, 2)->default(0.00);
            $table->enum('duration', ['daily', 'weekly', 'monthly'])->default('daily');
            $table->decimal('repayments', 5, 2)->default(0.00);
            $table->date('start_date')->nullable();
        
            $table->date('end_date')->nullable()->virtualAs("
                CASE
                    WHEN start_date IS NOT NULL THEN
                        CASE
                            WHEN duration = 'daily' THEN DATE_ADD(start_date, INTERVAL repayments DAY)
                            WHEN duration = 'weekly' THEN DATE_ADD(start_date, INTERVAL repayments * 7 DAY)
                            WHEN duration = 'monthly' THEN DATE_ADD(start_date, INTERVAL repayments * 30 DAY)
                            ELSE NULL
                        END
                    ELSE NULL
                END
            ");
        
            $table->date('next_repayment_date')->nullable();
        
            $table->date('last_repayment_date')->nullable();
        
            $table->date('disbursed_date')->nullable();
            $table->enum('status', ['pending', 'active', 'disbursed', 'done', 'default'])->default('pending');
            $table->integer('grace_period')->nullable();
            $table->decimal('outstanding_balance', 11, 2)->default(0.00);
            $table->string('notes')->nullable();
            $table->decimal('loan_amount', 11, 2)->virtualAs('amount * (interest / 100) + amount');
            $table->decimal('collection', 11, 2)->virtualAs('(amount * (interest / 100) + amount) / repayments');
            $table->softDeletes();
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('loans');
    }
};
