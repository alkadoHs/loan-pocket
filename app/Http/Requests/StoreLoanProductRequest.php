<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLoanProductRequest extends FormRequest
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
            "name" => "required|string|max:255",
            "from_amount" => "required|integer|max:1000000000",
            "to_amount" => "required|integer|max:1000000000",
            "interest" => "required|integer|max:1000",
            "penalt_type" => "required|in:percent_value,money_value",
            "penalt_amount" => "required|integer|max:1000000000",
        ];
    }
}
