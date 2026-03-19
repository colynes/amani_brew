<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Branch;

class BranchSeeder extends Seeder
{
    public function run(): void
    {
        Branch::create([
            'name' => 'Main Branch',
            'address' => '123 Brew Street, Nairobi',
            'phone' => '+254 20 1234567',
            'is_active' => true,
        ]);
        Branch::create([
            'name' => 'Westlands Branch',
            'address' => '456 West Ave, Westlands',
            'phone' => '+254 20 7654321',
            'is_active' => true,
        ]);
    }
}

