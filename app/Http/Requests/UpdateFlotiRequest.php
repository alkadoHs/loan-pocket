<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateFlotiRequest extends FormRequest
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
            "capital_id" => "required|exists:capitals,id",
            "to_branch_id" => "required|exists:branches,id",
            "payment_method_id" => "required|exists:payment_methods,id",
            "amount" => "required|numeric|max:10000000000",
            "withdraw_charges" => "required|numeric|max:10000000",
        ];
    }
}
