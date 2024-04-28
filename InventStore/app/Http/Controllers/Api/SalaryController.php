<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Model\Salary;
use DB;

class SalaryController extends Controller
{
    public function Paid(Request $request,$id){
   
        $ValidateData = $request->validate([
         'salary_month' => 'required',
        ]);
     
        $month = $request->salary_month;
        $check = Salary::where('employee_id',$id)->where('salary_month',$month)->first();
        if ($check) {
           return response()->json('Salary Alrady Paid');
        }else{
            $data = array();
            $data['employee_id'] = $id;
            $data['amount'] = $request->sallery;
            $data['salary_date'] = date('d/m/Y');
            $data['salary_month'] = $month;
            $data['salary_year'] = date('Y');
            Salary::insert($data); 
            } 
    }

    public function AllSalary(){
        $salary = Salary::select('salary_month')->groupBy('salary_month')->get();
        return response()->json($salary);	
    }

    public function ViewSalary($id){

        $month = $id;
          $view = DB::table('salaries')
                  ->join('employees','salaries.employee_id','employees.id')
                  ->select('employees.name','salaries.*')
                  ->where('salaries.salary_month',$month)
                  ->get();
                  return response()->json($view);
    
    }

    public function EditSalary($id){

        $view = DB::table('salaries')
                ->join('employees','salaries.employee_id','employees.id')
                ->select('employees.name','employees.email','salaries.*')
                ->where('salaries.id',$id)
                ->first();
                return response()->json($view);
  
    }

    public function SalaryUpdate(Request $request,$id){

        $data = array();
        $data['employee_id'] = $request->employee_id;
        $data['amount'] = $request->amount;
        $data['salary_month'] = $request->salary_month;
        
      Salary::where('id',$id)->update($data);
    }
  
     
}
