<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Supplier;
use Image;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $supplier = Supplier::all();
        return response()->json($supplier);
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
            'address' => 'required',
            'shopname' => 'required',   
            'phone' => 'required',   
            'shopname' => 'required',   
        ]);

        $supplier = Supplier::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'address' => $validated['address'],
            'shopname' => $validated['shopname'],
            'shopname' => $validated['shopname'],
            'phone' => $validated['phone'],
            'photo' => $request['photo'],
        ]);
      
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $supplier = Supplier::where('id',$id)->first();
        return response()->json($supplier);
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
            'address' => 'required',
            'shopname' => 'required',   
            'phone' => 'required',   
        ]);

        $supplier = Supplier::find($id);

        if($supplier){
            $supplier->update([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'address' => $validated['address'],
                'shopname' => $validated['shopname'],
                'phone' => $validated['phone'],
            ]);
        } else {
            return response()->json(['message' => 'Supplier not found'], 404);
        }

        return response()->json(['message' => 'Supplier updated successfull']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $supplier = Supplier::where('id',$id)->first();
       $photo = $supplier->photo;
       if ($photo) {
        unlink($photo);
        Supplier::where('id',$id)->delete();
       }else{
        Supplier::where('id',$id)->delete();
       }
    }
}

