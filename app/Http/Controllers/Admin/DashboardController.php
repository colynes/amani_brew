<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\Stock;
use App\Models\Branch;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $totalRevenue = Order::sum('total') ?? 0;
        $ordersToday = Order::whereDate('created_at', Carbon::today())->count();
        $lowStockItems = Stock::whereColumn('quantity', '<=', 'min_stock')->count();
        $recentProducts = Product::with(['category', 'prices', 'stocks.branch'])
            ->latest()
            ->take(10)
            ->get()
            ->map(function ($product) {
                $latestStock = $product->stocks->where('branch_id', 1)->first(); // default branch
                $product->stock = $latestStock ? $latestStock->quantity : 0;
                $product->status = $latestStock && $latestStock->quantity <= $latestStock->min_stock ? 'low-stock' : 'in-stock';
                $product->price = $product->prices->first()?->price ?? '0';
                return $product;
            });

        return Inertia::render('Admin/Dashboard', compact(
            'totalRevenue',
            'ordersToday',
            'lowStockItems',
            'recentProducts'
        ));
    }
}

