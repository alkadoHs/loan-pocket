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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->text('address')->nullable();
            $table->string('phone', 15)->nullable();
            $table->timestamps();
        });

        Schema::create('branches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained()->cascadeOnDelete();
            $table->string('name', 100);
            $table->text('address')->nullable();
            $table->string('phone', 15)->nullable();
            $table->string('region')->nullable();
            $table->timestamps();
        });

        Schema::create('users', function (Blueprint $table) {
                $table->id();
                $table->string('employee_id', 20)->unique();
                $table->string('name')->unique();
                $table->foreignId('branch_id')->nullable()->constrained('branches')->onDelete('cascade');
                $table->foreignId('company_id')->nullable()->constrained()->cascadeOnDelete();
                $table->string('phone', 15)->nullable();
                $table->string('email', 100)->unique();
                $table->string('national_id', length: 30)->unique()->nullable();
                $table->string('job_title', 50)->nullable();
                $table->text('address')->nullable();
                $table->enum('gender', ['M', 'F', 'Other']);
                $table->date('date_of_hire')->nullable();
                $table->date('date_of_termination')->nullable();
                $table->decimal('salary', 10, 2)->default(0);
                $table->string('bank_account', 30)->nullable();
                $table->timestamp('email_verified_at')->nullable();
                $table->string('password');
                $table->enum('access_level', ['Admin', 'Manager', 'General Manager', 'Staff'])->default('Admin');
                $table->timestamp('last_login')->nullable();
                $table->enum('status', ['Active', 'On Leave', 'Terminated', 'Blocked'])->default('Active');
                $table->binary('photo')->nullable();
                $table->rememberToken();
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
        Schema::dropIfExists('branches');
        Schema::dropIfExists('companies');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
