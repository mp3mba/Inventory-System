<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function supplier(){
        return $this->belongsTo(Supplier::class);
    }

    public function unit_of_measure(){
        return $this->hasMany(Unit_of_measure::class);
    }

    public function stock_location(){
        return $this->hasMany(Stock_location::class);
    }
}
