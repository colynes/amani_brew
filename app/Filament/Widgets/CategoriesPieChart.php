<?php

namespace App\Filament\Widgets;

use App\Models\OrderItem;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\DB;

class CategoriesPieChart extends ChartWidget
{
protected ?string $heading = 'Top Categories by Sales';
    protected int | string | array $columnSpan = 'full';

    protected function getData(): array
    {
        $topCategories = OrderItem::join('products', 'order_items.product_id', '=', 'products.id')
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->select('categories.name', DB::raw('SUM(order_items.quantity * order_items.unit_price) as total_sales'))
            ->groupBy('categories.id', 'categories.name')
            ->orderByDesc('total_sales')
            ->limit(6)
            ->pluck('total_sales', 'categories.name')
            ->toArray();

        return [
            'datasets' => [
                [
                    'label' => 'Sales by Category',
                    'data' => array_values($topCategories),
                    'backgroundColor' => [
                        '#C68A2B',
                        '#6F4E37',
                        '#4B2E1E',
                        '#F8F5F0',
                        '#EFE7DD',
                        '#FAFAF9',
                    ],
                ],
            ],
        ];
    }

    protected function getType(): string
    {
        return 'pie';
    }

    protected function getLabels(): array
    {
        return array_keys($topCategories ?? []);
    }
}

