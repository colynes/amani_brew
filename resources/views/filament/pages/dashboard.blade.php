<x-filament-panels::page>
  <div class="space-y-8">
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-4">
      <x-stat-card 
        title="Quick Actions" 
        icon="heroicon-o-sparkles" 
        color="primary"
      >
        <div class="grid grid-cols-2 gap-4 mt-4">
          <a href="/admin/products/create" class="block p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl hover:shadow-lg transition-all">
            <div className="text-primary text-lg font-semibold mb-1">+ Add Product</div>
          </a>
          <a href="/admin/categories/create" class="block p-4 bg-gradient-to-r from-success/10 to-primary/10 rounded-xl hover:shadow-lg transition-all">
            <div class="text-success text-lg font-semibold mb-1">+ Add Category</div>
          </a>
          <a href="/admin/orders" class="block p-4 bg-gradient-to-r from-warning/10 to-primary/10 rounded-xl hover:shadow-lg transition-all">
            <div class="text-warning text-lg font-semibold mb-1">View Orders</div>
          </a>
          <a href="/admin/reports" class="block p-4 bg-gradient-to-r from-info/10 to-primary/10 rounded-xl hover:shadow-lg transition-all">
            <div class="text-info text-lg font-semibold mb-1">Reports</div>
          </a>
        </div>
      </x-stat-card>
    </div>
  </div>
</x-filament-panels::page>

