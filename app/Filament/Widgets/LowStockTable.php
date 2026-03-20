<?php

namespace App\Filament\Widgets;

use App\Models\Product;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget;
use Illuminate\Database\Eloquent\Builder;

class LowStockTable extends TableWidget
{
    protected int | string | array $columnSpan = 'full';

    protected function getTableQuery(): Builder
    {
        return Product::query()
            ->whereHas('stocks', function ($query) {
                $query->whereColumn('quantity', '<=', 'min_stock');
            })
            ->with('category')
            ->orderBy('created_at', 'desc')
            ->limit(10);
    }

    protected function getTableColumns(): array
    {
        return [
            Tables\Columns\TextColumn::make('name')
                ->searchable()
                ->sortable(),
            Tables\Columns\TextColumn::make('category.name')
                ->label('Category')
                ->searchable(),
            Tables\Columns\TextColumn::make('stocks.quantity')
                ->label('Stock')
                ->sortable(),
            Tables\Columns\TextColumn::make('stocks.min_stock')
                ->label('Min Stock')
                ->sortable(),
        ];
    }

protected static ?string $heading = 'Low Stock Products';
}

