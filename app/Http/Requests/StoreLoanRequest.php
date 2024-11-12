<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLoanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        //from the model App/Models/Loan.php, migrations/2024_11_11_200744_create_loans_table.php
        return [
            'customer_id' => 'required|exists:customers,id',
            'branch_id' => 'required|exists:branches,id',
            'user_id' => 'required|exists:users,id',
            'disbursed_by' => 'nullable|exists:users,id',
            'formula_id' => 'required|exists:formulas,id',
            'loan_product_id' => 'required|exists:loan_products,id',
            'type' => 'required|in:individual,group',
            'amount' => 'required|numeric|min:0',
            'interest' => 'required|numeric|min:0',
            'duration' => 'required|in:daily,weekly,monthly',
            'repayments' => 'required|numeric|min:1',
            'start_date' => 'required|date',
            'disbursed_date' => 'nullable|date',
            'status' => 'required|in:pending,disbursed,active, done, default',
            'grace_period' => 'nullable|numeric|max:370',
            'outstanding_amount' => 'nullable|numeric|max:10000000000',
            'notes' => 'nullable|string',
        ];
    }
}
