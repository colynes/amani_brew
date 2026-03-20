<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\DB;

class SalesLineChart extends ChartWidget
{
    protected ?string $heading = 'Sales vs Target';
    protected int | string | array $columnSpan = 'full';

    protected function getData(): array
    {
        $salesData = DB::table('orders')
            ->select(
                DB::raw("DATE_FORMAT(created_at, '%Y-%m') as month"),
                DB::raw("SUM(total) as sales")
            )
            ->whereBetween('created_at', [now()->subMonths(11), now()])
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->pluck('sales', 'month')
            ->toArray();

        $months = [];
        $sales = [];
        $targets = [];

        $current = now()->subMonths(11);
        for ($i = 0; $i <= 11; $i++) {
            $month = $current->copy()->addMonths($i)->format('Y-m');
            $months[] = $month;
            $sales[] = $salesData[$month] ?? 0;
            $targets[] = 50000;
        }

        return [
            'datasets' => [
                [
                    'label' => 'Sales (TZS)',
                    'data' => $sales,
                    'borderColor' => '#C68A2B',
                    'backgroundColor' => 'rgba(198, 138, 43, 0.1)',
                    'fill' => true,
                    'tension' => 0.4,
                ],
                [
                    'label' => 'Target (TZS)',
                    'data' => $targets,
                    'borderColor' => '#6F4E37',
                    'backgroundColor' => 'rgba(111, 78, 55, 0.1)',
                    'borderDash' => [5, 5],
                    'fill' => false,
                ],
            ],
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }

    protected function getLabels(): array
    {
        return $months ?? [];
    }
}

