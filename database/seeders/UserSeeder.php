<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Create roles if not exist
// Create roles table if needed (Spatie migration auto-runs)
        Role::firstOrCreate(['name' => 'admin']);
        Role::firstOrCreate(['name' => 'staff']);
        Role::firstOrCreate(['name' => 'customer']);

        // Admin
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@amanibrew.com',
            'email_verified_at' => now(),
            'password' => bcrypt('password'),
        ]);
        $admin->assignRole('admin');

        // Staff
        $staff = User::create([
            'name' => 'Staff Member',
            'email' => 'staff@amanibrew.com',
            'email_verified_at' => now(),
            'password' => bcrypt('password'),
        ]);
        $staff->assignRole('staff');

        // Customer
        $customer = User::create([
            'name' => 'John Doe',
            'email' => 'customer@amanibrew.com',
            'email_verified_at' => now(),
            'password' => bcrypt('password'),
        ]);
        $customer->assignRole('customer');

        User::factory(7)->create();
    }
}

