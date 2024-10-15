<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Unit_of_measure;
use DB;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $product = DB::table('products')
        ->join('categories','products.category_id','categories.id')
        ->join('suppliers','products.supplier_id','suppliers.id')
        ->select('categories.category_name','suppliers.name as supplier_name','products.*')
        ->orderBy('products.id','DESC')
        ->get();
        return response()->json($product);
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
            'product_name' => 'required',
            'product_code' => 'required|unique:products|numeric',
            'category_id' => 'required',
            'supplier_id' => 'required',
            'buying_price' => 'required|numeric',
            'selling_price' => 'required|numeric',
            'buying_date' => 'required',
            'product_quantity' => 'required|numeric',
            'reorder_level' => 'required',
            'unit_of_measure' => 'required',
            'stock_location_id' => 'required',
           ]);

           $product = Product::create([
                'product_name' => $validated['product_name'],
                'product_code' => $validated['product_code'],
                'category_id' => $validated['category_id'],
                'supplier_id' => $validated['supplier_id'],
                'buying_price' => $validated['buying_price'],
                'selling_price' => $validated['selling_price'],
                'buying_date' => $validated['buying_date'],
                'product_quantity' => $validated['product_quantity'],
                'reorder_level' => $validated['reorder_level'],
                'unit_of_measure_id' => $validated['unit_of_measure'],
                'stock_location_id' => $validated['stock_location'],
           ]);
           
           return response()->json(['message' => 'Product created successfull', 'product' => $product]);
       }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $product = DB::table('products')
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->join('suppliers', 'products.supplier_id', '=', 'suppliers.id')
            ->select('categories.category_name', 'suppliers.name as supplier_name', 'products.*')
            ->where('products.id', $id)
            ->first();
    
        return response()->json($product);
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
            'product_name' => 'required',
            'product_code' => 'required|numeric',
            'category_id' => 'required',
            'supplier_id' => 'required',
            'buying_price' => 'required|numeric',
            'selling_price' => 'required|numeric',
            'buying_date' => 'required',
            'product_quantity' => 'required|numeric',
        ]);

        $product = Product::find($id);

        if($product) {
            $product -> update([
                'product_name' => $validated['product_name'],
                'product_code' => $validated['product_code'],
                'category_id' => $validated['category_id'],
                'supplier_id' => $validated['supplier_id'],
                'buying_price' => $validated['buying_price'],
                'selling_price' => $validated['selling_price'],
                'buying_date' => $validated['buying_date'],
                'product_quantity' => $validated['product_quantity'],
           ]);
        } else {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json(['message' => 'Product updated successfull']);
    }

    public function getUnitOfMeasure()
    {
        $unitOfMeasure = unit_of_measure::all();

        return response()->json($unitOfMeasure);
    }

    public function InsertUnitOfMeasure(Request $request)
    {
       $validateData = $request->validate([
        'unit_of_measure' => 'required'
       ]);

       $unitOfMeasure = Unit_of_measure::create([
        'unit_of_measure' => $validateData['unit_of_measure']
       ]);

       return response()->json(['message' => 'unit of measure created successfull']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = DB::table('products')->where('id',$id)->first();
         Product::where('id',$id)->delete();
    }
    
}
