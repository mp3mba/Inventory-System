<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\EmployeeController;
use App\Http\Controllers\Api\SupplierController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ExpenseController;
use App\Http\Controllers\Api\PosController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\SalaryController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\LocationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'v1'], function ($router) {
    Route::post('/login', [App\Http\Controllers\AuthController::class, 'login']);
    Route::post('/signup', [App\Http\Controllers\AuthController::class, 'signup']);
});

Route::group(['middleware' => 'auth:sanctum' , 'prefix' => 'v1'],function(){
    Route::post('/logout', [App\Http\Controllers\AuthController::class, 'logout']);
    Route::apiResource('/employee', EmployeeController::class);
    Route::apiResource('/supplier', SupplierController::class);
    Route::apiResource('/category', CategoryController::class);
    Route::apiResource('/product', ProductController::class);
    Route::apiResource('/expense', ExpenseController::class);
    Route::apiResource('/customer', CustomerController::class);

    Route::apiResource('/stock_location', LocationController::class);

    Route::Post('/salary/paid/{id}', [SalaryController::class,'Paid']);
    Route::Get('/salary', [SalaryController::class, 'AllSalary']);

    Route::Get('/salary/view/{id}', [SalaryController::class, 'ViewSalary']);
    Route::Get('/edit/salary/{id}', [SalaryController::class, 'EditSalary']);
    Route::Post('/salary/update/{id}', [SalaryController::class, 'SalaryUpdate']);

    Route::Get('/getting/product/{id}', [PosController::class, 'GetProduct']);

    // Add to cart Route
    Route::Get('/addToCart/{id}', [CartController::class, 'AddToCart']);
    Route::Get('/cart/product', [CartController::class, 'CartProduct']);

    Route::Get('/remove/cart/{id}', [CartController::class, 'removeCart']);

    Route::Get('/increment/{id}', [CartController::class, 'increment']);
    Route::Get('/decrement/{id}', [CartController::class, 'decrement']);

    // Vat Route
    Route::Get('/vats', [CartController::class, 'Vats']);

    Route::Post('/orderdone', [PosController::class, 'OrderDone']);

    // Order Route
    Route::Get('/orders', [OrderController::class, 'TodayOrder']);

    Route::Get('/order/details/{id}', [OrderController::class, 'OrderDetails']);
    Route::Get('/order/orderdetails/{id}', [OrderController::class, 'OrderDetailsAll']);

    Route::Post('/search/order', [PosController::class, 'SearchOrderDate']);

    // Admin Dashboard Route

    Route::Get('/today/sell', [PosController::class, 'TodaySell']);
    Route::Get('/today/income', [PosController::class, 'TodayIncome']);
    Route::Get('/today/due', [PosController::class, 'TodayDue']);
    Route::Get('/today/expense', [PosController::class, 'TodayExpense']);
    Route::Get('/today/stockout', [PosController::class, 'Stockout']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
