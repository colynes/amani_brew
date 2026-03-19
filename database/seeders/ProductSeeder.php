<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\ProductPrice;

class ProductSeeder extends Seeder
{
    public function run()
    {
        Product::factory(50)->create()->each(function ($product) {
            ProductPrice::create([
                'product_id' => $product->id,
                'price' => rand(50, 500) / 10,
                'currency' => 'USD',
            ]);
        });
    }
}

