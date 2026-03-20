<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget;
use Illuminate\Database\Eloquent\Builder;

class RecentOrdersTable extends TableWidget
{
    protected int | string | array $columnSpan = 'full';

    protected static ?string $heading = 'Recent Orders';

    protected function getTableQuery(): Builder
    {
        return Order::query()
            ->with('customer')
            ->latest()
            ->limit(10);
    }

    protected function getTableColumns(): array
    {
        return [
            Tables\Columns\TextColumn::make('id')
                ->label('#')
                ->sortable(),
            Tables\Columns\TextColumn::make('customer.name')
                ->label('Customer')
                ->searchable(),
            Tables\Columns\TextColumn::make('total')
                ->label('Total (TZS)')
                ->money('TZS')
                ->sortable(),
            Tables\Columns\IconColumn::make('status')
                ->boolean(),
            Tables\Columns\TextColumn::make('created_at')
                ->label('Date')
                ->dateTime()
                ->sortable(),
        ];
    }
}

