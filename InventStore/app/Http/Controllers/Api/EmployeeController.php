<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Employee;
use Image;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $employee = Employee::all();
        return response()->json($employee);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required',
            'phone' => 'required|min:10',
            'sallery' => 'required',
            'address' => 'required',
            'nid' => 'required',
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:10240',
        ]);

        $path = null;
        if ($request->file('photo')) {
            $path = $request->file('photo')->store('images', 'public');
        }

        $employee = Employee::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'sallery' => $validated['sallery'],
            'address' => $validated['address'],
            'nid' => $validated['nid'],
            'photo' => $path
        ]);

        return response()->json(['message' => 'Employee created successfull', 'employee' => $employee]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $employee = Employee::where('id',$id)->first();
        return response()->json($employee);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required',
            'phone' => 'required|min:10',
            'sallery' => 'required',
            'address' => 'required',
            'nid' => 'required',
            'photo' => 'sometimes|max:10240',
            // 'photo' => 'sometimes|mimes:jpeg,png,jpg,gif,svg|max:10240',
            // 'photo' => 'nullable|file|max:10240',
        ]);

        // Handle file upload if present
        if ($request->file('photo')) {
            $path = $request->file('photo')->store('images', 'public');
        }

        $employee = Employee::find($id);

        if ($employee) {
            $employee->update([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'sallery' => $validated['sallery'],
                'address' => $validated['address'],
                'nid' => $validated['nid'],
                'photo' => isset($path) ? $path : $employee->photo
            ]);
        } else {
            return response()->json(['message' => 'Employee not found'], 404);
        }

        return response()->json(['message' => 'Employee updated successfull', 'employee' => $employee]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $employee = Employee::find($id);

        if (!$employee) {
            return response()->json(['message' => 'Employee not found'], 404);
        }
    
        // Check if the employee has a photo and delete it
        if ($employee->photo) {
            $photoPath = storage_path('app/public/' . $employee->photo);
    
            if (file_exists($photoPath)) {
                try {
                    unlink($photoPath);
                } catch (\Exception $e) {
                    return response()->json(['message' => 'Failed to delete photo', 'error' => $e->getMessage()], 500);
                }
            }
        }
    
        // Delete the employee record from the database
        $employee->delete();
    
        return response()->json(['message' => 'Employee deleted successfully']);
    }

}
