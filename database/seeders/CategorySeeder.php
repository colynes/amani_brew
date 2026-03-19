<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Product;

class CategorySeeder extends Seeder
{
    public function run()
    {
        $categories = Category::factory(5)->create();

        $categories->each(function ($category) {
            Product::factory(10)->create([
                'category_id' => $category->id
            ]);
        });
    }
}

