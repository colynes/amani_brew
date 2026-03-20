<?php

namespace App\Filament\Widgets;

use App\Models\Product;
use App\Models\Category;
use App\Models\Order;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Products', Product::count())
                ->description('All products in inventory')
                ->descriptionIcon('heroicon-m-archive-box')
                ->color('success'),
            Stat::make('Total Categories', Category::count())
                ->description('Product categories')
                ->descriptionIcon('heroicon-m-tag')
                ->color('primary'),
            Stat::make('Total Orders', Order::count())
                ->description('All orders')
                ->descriptionIcon('heroicon-m-shopping-cart')
                ->color('warning'),
            Stat::make('Total Revenue', 'TZS ' . number_format(Order::sum('total')))
                ->description('All time revenue')
                ->descriptionIcon('heroicon-m-currency-dollar')
                ->color('danger'),
            Stat::make('Low Stock Products', Product::whereHas('stocks', function ($query) {
                $query->whereColumn('quantity', '<=', 'min_stock');
            })->count())
                ->description('Products needing restock')
                ->descriptionIcon('heroicon-m-exclamation-triangle')
                ->color('warning'),
            Stat::make('Out of Stock', Product::whereHas('stocks', function ($query) {
                $query->where('quantity', 0);
            })->count())
                ->description('Completely out of stock')
                ->descriptionIcon('heroicon-m-x-mark')
                ->color('danger'),
        ];
    }
}

