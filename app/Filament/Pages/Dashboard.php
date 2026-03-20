<?php

namespace App\Filament\Pages;

use App\Filament\Widgets\StatsOverview;
use App\Filament\Widgets\SalesLineChart;
use App\Filament\Widgets\CategoriesPieChart;
use App\Filament\Widgets\RecentOrdersTable;
use App\Filament\Widgets\LowStockTable;
use Filament\Pages\Dashboard as BaseDashboard;
use Filament\Actions\Action;

class Dashboard extends BaseDashboard
{
protected string $view = 'filament.pages.dashboard';

    public function getHeaderWidgets(): array
    {
        return [
            StatsOverview::class,
        ];
    }

    public function getWidgets(): array
    {
        return [
            SalesLineChart::class,
            CategoriesPieChart::class,
            RecentOrdersTable::class,
            LowStockTable::class,
        ];
    }
}

