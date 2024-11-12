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
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('branch_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('first_name');
            $table->string('middle_name');
            $table->string('last_name');
            $table->string('nick_name')->nullable();
            $table->enum('gender', ['male','female']);
            $table->date('birth_date')->nullable();
            $table->string('phone')->unique();
            $table->enum('marital_status', ['single', 'married', 'divorced', 'widowed']);
            $table->string('work_status')->nullable();
            $table->string('work_address')->nullable();
            $table->enum('id_type', ['nida','voter_id'])->nullable();
            $table->string('id_number')->nullable();
            $table->string('image')->nullable();
            $table->enum('status', ['active', 'pending', 'disbursed', 'done', 'default'])->default('pending');
            $table->string('full_name')->virtualAs("CONCAT(first_name, ' ', middle_name, ' ', last_name)");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
