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
        Schema::create('repayments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('loan_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('payment_method_id')->constrained()->cascadeOnDelete();
            $table->string('description');
            $table->decimal('amount', 11, 2);
            $table->date('payment_date');
            $table->string('payer_name')->nullable();
            $table->decimal('withdral_amount', 11, 2)->default(0.00);
            $table->decimal('balance', 11, 2)->virtualAs('amount - withdral_amount');
            $table->string('status')->default('customer');
            $table->enum('duration', ['daily', 'weekly', 'monthly'])->default('daily');
            $table->decimal('repayments', 5, 2)->default(0.00);
            $table->date('next_repayment_date')->nullable()->virtualAs("
                CASE
                    WHEN payment_date IS NOT NULL THEN
                        CASE
                            WHEN duration = 'daily' THEN DATE_ADD(payment_date, INTERVAL (repayments + 1) DAY)
                            WHEN duration = 'weekly' THEN DATE_ADD(payment_date, INTERVAL (repayments + 1) * 7 DAY)
                            WHEN duration = 'monthly' THEN DATE_ADD(payment_date, INTERVAL (repayments + 1) * 30 DAY)
                            ELSE NULL
                        END
                    ELSE NULL
                END
            ");
        
            $table->date('last_repayment_date')->nullable()->virtualAs("
                CASE
                    WHEN payment_date IS NOT NULL THEN
                        CASE
                        WHEN duration = 'daily' THEN DATE_ADD(payment_date, INTERVAL (repayments - 1) DAY)
                            WHEN duration = 'weekly' THEN DATE_ADD(payment_date, INTERVAL (repayments - 1) * 7 DAY)
                            WHEN duration = 'monthly' THEN DATE_ADD(payment_date, INTERVAL (repayments - 1) * 30 DAY)
                            ELSE NULL
                        END
                    ELSE NULL
                END
            ");
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('repayments');
    }
};
