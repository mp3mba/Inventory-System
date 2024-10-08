<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->integer('category_id');
            $table->string('product_name');
            $table->string('product_code')->nullable();
            $table->string('root')->nullable();
            $table->string('buying_price')->nullable();
            $table->string('selling_price');
            $table->integer('supplier_id')->nullable();
            $table->string('buying_date')->nullable();
            $table->string('image')->nullable();
            $table->string('product_quantity');
            $table->unsignedBigInteger('stock_location_id')->nullable()->after('unit_of_measure_id');
            $table->unsignedBigInteger('unit_of_measure_id')->nullable()->after('product_quantity');
            $table->foreign('unit_of_measure_id')->references('id')->on('unit_of_measures')->onCascade('delete');
            $table->foreign('stock_location_id')->references('id')->on('stock_locations')->onCascade('delete');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
};
