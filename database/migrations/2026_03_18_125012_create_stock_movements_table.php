<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {

        Schema::create('stock_movements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('stock_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['in', 'out', 'adjustment', 'transfer']);
            $table->decimal('quantity_change', 10, 2);
            $table->text('reason')->nullable();
$table->unsignedBigInteger('user_id')->nullable()->index()->references('id')->on('users')->onDelete('set null');
$table->unsignedBigInteger('order_id')->nullable()->index()->references('id')->on('orders')->onDelete('set null');
            $table->timestamps();
            
            $table->index(['stock_id', 'type']);
            $table->index('created_at');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stock_movements');
    }
};
