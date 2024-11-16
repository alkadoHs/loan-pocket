<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\CapitalAccount;
use App\Models\Company;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        // dd(session()->get("wizard:step_one:form_data"));
        $regions = DB::table('regions')->get();
        return Inertia::render('Auth/Register', [
            'regions' => $regions,
            'admin' => Session::get('wizard:step_one:form_data'),
            'company' => Session::get('wizard:step_two:form_data'),
            'branch' => Session::get('wizard:step_three:form_data'),
        ]);
    }

    public function adminData(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'phone' => 'required|max:15',
            'password' => ['required'],
        ]);

        session()->put(
            key: 'wizard:step_one:form_data',
            value: $validated,
        );

        return back();
    }

    public function companyData(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'phone' => 'required|max:15',
        ]);

        session()->put(
            key: 'wizard:step_two:form_data',
            value: $validated,
        );

        return back();
    }


    public function branchData(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|max:50',
            'region' => 'required|string|max:40'
        ]);

        session()->put(
            key: 'wizard:step_three:form_data',
            value: $validated,
        );

        return back();
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $admin_data = Session::pull('wizard:step_one:form_data');
        $company_data = Session::pull('wizard:step_two:form_data');
        $branch_data = Session::pull('wizard:step_three:form_data');

        DB::transaction(function () use($admin_data, $company_data, $branch_data) {
            //create company
            $company = Company::create($company_data);
    
            //create branch
            $branch = Branch::create(['company_id' => $company->id, ...$branch_data]);
    
            // create an admin
            $user = User::create(['company_id' => $company->id, 'branch_id' => $branch->id, ...$admin_data]);

            //create company account
            CapitalAccount::create(['company_id' => $company->id, 'amount' => 0]);
    
            event(new Registered($user));
    
            Auth::login($user);
        }, 5);


        return back();
    }
}
