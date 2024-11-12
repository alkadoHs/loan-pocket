<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCustomerRequest extends FormRequest
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
            "branch_id" => "required|exists:branches,id",
            "user_id" => "required|exists:users,id",
            "first_name" => "required|string|max:255",
            "middle_name" => "required|string|max:255",
            "last_name" => "required|string|max:255",
            "nick_name" => "nullable|string|max:255",
            "gender" => "required|in:male,female",
            "birth_date" => "nullable|date",
            "phone" => "required|string|max:255",
            "marital_status" => "required|in:single,married,divorced,widowed",
            "work_status" => "nullable|string|max:255",
            "work_address" => "nullable|string|max:255",
            "id_type" => "nullable|in:nida,voter_id",
            "id_number" => "nullable|string|max:255",
            "image" => "nullable|string|max:255",
            "status" => "required|in:active,pending,disbursed,done,default",
        ];
    }
}
