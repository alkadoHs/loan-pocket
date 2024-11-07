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
        Schema::create('users', function (Blueprint $table) {
                $table->id();
                $table->foreignId('branch_id')->constrained('branches')->onDelete('cascade');
                $table->string('employee_id', 20)->unique();
                $table->string('first_name', 50);
                $table->string('last_name', 50);
                $table->date(column: 'date_of_birth')->nullable();
                $table->enum('gender', ['M', 'F', 'Other']);
                $table->enum('marital_status', ['Single', 'Married', 'Divorced', 'Widowed']);
                $table->string('national_id', 30)->unique();
                $table->string('contact_number', 15);
                $table->string('email', 100)->unique();
                $table->text('address')->nullable();
                $table->string('job_title', 50)->nullable();
                $table->string('department', 50)->nullable();
                $table->enum('employee_type', ['Full-time', 'Part-time', 'Contract']);
                $table->date('date_of_hire');
                $table->date('date_of_termination')->nullable();
                $table->decimal('salary', 10, 2);
                $table->string('bank_account', 30)->nullable();
                $table->string('tin', 20)->nullable();
                $table->string('username', 50)->unique();
                $table->timestamp('email_verified_at')->nullable();
                $table->string('password');
                $table->enum('access_level', ['Admin', 'Manager', 'Staff']);
                $table->timestamp('last_login')->nullable();
                $table->enum('status', ['Active', 'On Leave', 'Terminated']);
                $table->rememberToken();
                $table->binary('photo')->nullable();
                $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
