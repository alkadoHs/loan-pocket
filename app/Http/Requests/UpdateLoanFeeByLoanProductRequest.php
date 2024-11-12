<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLoanFeeByLoanProductRequest extends FormRequest
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
        return [
            "loan_fee_id" => "required|integer|exists:loan_fees,id",
            "loan_product_id" => "required|integer|exists:loan_products,id",
            "description" => "required|string|max:255",
            "amount" => "required|integer|max:1000000000",
            "type" => "required|in:percent_value,money_value",
        ];
    }
}
