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
        Schema::table('stock_locations', function (Blueprint $table) {
            $table->renameColumn('locatin_name', 'location_name');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('stock_locations', function (Blueprint $table) {
            $table->renameColumn('location_name', 'locatin_name');
        });
    }
};
