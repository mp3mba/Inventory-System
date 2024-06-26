<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Model\Pos;
use App\Model\Extra;
use App\Model\Product;

class CartController extends Controller
{
    public function AddToCart(Request $request, $id){
    	$product = Product::where('id',$id)->first();

    	$check = Pos::where('pro_id',$id)->first();

    	if ($check) {
            Pos::where('pro_id',$id)->increment('pro_quantity');

            $product = Pos::where('pro_id',$id)->first();
            $subtotal = $product->pro_quantity * $product->product_price;
            Pos::where('pro_id',$id)->update(['sub_total'=> $subtotal]);

    	} else {
            $data = array();
            $data['pro_id'] = $id;
            $data['pro_name'] = $product->product_name;
            $data['pro_quantity'] = 1;
            $data['product_price'] = $product->selling_price;
            $data['sub_total'] = $product->selling_price;

            DB::table('pos')->insert($data);
    	}
    }

    public function CartProduct(){
        $cart = DB::table('pos')->get();
           return response()->json($cart);
    }

    public function removeCart($id){
        DB::table('pos')->where('id',$id)->delete();
        return response('Done');
   
    }

    public function increment($id){
        $quantity = DB::table('pos')->where('id',$id)->increment('pro_quantity');
  
        $product = DB::table('pos')->where('id',$id)->first();
        $subtotal = $product->pro_quantity * $product->product_price;
        DB::table('pos')->where('id',$id)->update(['sub_total'=> $subtotal]);
        return response('Done');
    }
  
    public function decrement($id){
        $quantity = DB::table('pos')->where('id',$id)->decrement('pro_quantity');
  
        $product = DB::table('pos')->where('id',$id)->first();
        $subtotal = $product->pro_quantity * $product->product_price;
        DB::table('pos')->where('id',$id)->update(['sub_total'=> $subtotal]);
        return response('Done');
    }

    public function Vats(){
        $vat = Extra::first();
        return response()->json($vat);
    }
}
