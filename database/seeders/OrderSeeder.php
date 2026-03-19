<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Customer;
use App\Models\ProductPrice;
use App\Models\Invoice;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        $customers = Customer::all();
        $prices = ProductPrice::all();

        for ($i = 0; $i < 20; $i++) {
            $customer = $customers->random();
            $order = Order::create([
                'order_number' => 'ORD' . str_pad($i + 1, 4, '0', STR_PAD_LEFT),
                'customer_id' => $customer->id,
                'branch_id' => 1,
                'status' => ['submitted', 'approved', 'delivered', 'cancelled'][rand(0,3)],
                'subtotal' => rand(1000, 5000) / 100,
                'tax' => rand(100, 500) / 100,
                'total' => rand(1100, 5500) / 100,
                'payment_method' => ['cash', 'mpesa', 'card'][rand(0,2)],
                'is_paid' => rand(0,1),
            ]);

            // 2-5 items
            $itemsCount = rand(2,5);
            for ($j = 0; $j < $itemsCount; $j++) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $prices[rand(0, count($prices)-1)]->product_id,
                    'product_price_id' => $prices[rand(0, count($prices)-1)]->id,
                    'quantity' => rand(1,3),
                    'unit_price' => rand(100, 800) / 100,
                    'subtotal' => rand(100, 800) / 100,
                ]);
            }

            // Invoice
            if (rand(0,1)) {
                Invoice::create([
                    'order_id' => $order->id,
                    'invoice_number' => 'INV' . str_pad($i + 1, 4, '0', STR_PAD_LEFT),
                    'total' => $order->total,
                    'status' => 'paid',
                ]);
            }
        }
    }
}

