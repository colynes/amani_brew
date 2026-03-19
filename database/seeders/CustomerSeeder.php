<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Customer;

class CustomerSeeder extends Seeder
{
    public function run(): void
    {
        Customer::factory(10)->create();

        // Sample customers for Figma demos
        Customer::create([
            'name' => 'Jane Smith',
            'phone' => '+254 712 345 678',
            'email' => 'jane@example.com',
        ]);
        Customer::create([
            'name' => 'Mike Johnson',
            'phone' => '+254 723 456 789',
            'email' => 'mike@example.com',
        ]);
    }
}

