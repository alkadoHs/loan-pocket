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
        Schema::table('capitals', function (Blueprint $table) {
            $table->dropColumn(['type','principal', 'institution_name', 'loan_amount', 'loan_term']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('capitals', function (Blueprint $table) {
            //
        });
    }
};
