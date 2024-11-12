<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRepaymentRequest extends FormRequest
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
            'loan_id' => 'required|exists:loans,id',
            'payment_method_id' => 'required|exists:payment_methods,id',
            'description' => 'nullable|string',
            'amount' => 'required|numeric|min:0',
            'payment_date' => 'required|date',
            'payer_name' => 'nullable|string',
            'withdral_amount' => 'nullable|numeric|min:0',
            'status' => 'nullable|string',
            'duration' => 'nullable|string|in:daily,weekly,monthly,yearly',
            'repayments' => 'nullable|numeric|min:1',
        ];
    }
}
