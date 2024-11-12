<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCapitalRequest extends FormRequest
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
            "share_holder_id" => "required|exists:share_holders,id",
            "type" => "required|in:loan,company",
            "amount" => "required|integer|max:1000000000",
            "principal" => "nullable|integer|max:1000000000",
            "loan_amount" => "nullable|integer|max:1000000000",
            "loan_term" => "nullable|integer|max:1000000000",
            "institution_name" => "nullable|string|max:255",
        ];
    }
}
