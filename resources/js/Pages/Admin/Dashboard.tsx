import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PageHeader from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardProps {
  totalRevenue: number;
  ordersToday: number;
  lowStockItems: number;
  recentProducts: Array<any>;
}

export default function Dashboard({ totalRevenue, ordersToday, lowStockItems, recentProducts }: DashboardProps) {
  return (
    <>
      <Head title="Dashboard" />

      <div className="page-container">
        {/* Header */}
        <div className="page-header mb-12">
          <h1 className="section-title text-text-heading">Dashboard</h1>
          <p className="section-subtitle text-text-muted">Welcome to Amani Brew admin panel. All data loaded from database.</p>
        </div>

        {/* Stats Grid */}
        <div className="dashboard-grid mb-12">
          <Card className="stat-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-text-muted">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-text-heading">
                TZS {totalRevenue?.toLocaleString() || '0'}
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-text-muted">Orders Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {ordersToday || 0}
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-text-muted">Low Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">
                {lowStockItems || 0}
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-text-muted">Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {recentProducts?.length || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Products */}
        <div className="table-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl font-semibold text-text-heading">Recent Products</CardTitle>
          </CardHeader>
          <CardContent>
            {recentProducts?.length ? (
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="text-left p-4 font-semibold text-text-muted text-sm">Product</th>
                        <th className="text-left p-4 font-semibold text-text-muted text-sm">Stock</th>
                        <th className="text-left p-4 font-semibold text-text-muted text-sm">Price</th>
                        <th className="text-left p-4 font-semibold text-text-muted text-sm">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentProducts.map((product) => (
                        <tr key={product.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                          <td className="p-4">
                            <div className="font-medium text-text-heading">{product.name}</div>
                            <div className="text-sm text-text-muted">{product.category?.name}</div>
                          </td>
                          <td className="p-4">
                            <span className={`text-sm font-medium ${
                              product.status === 'low-stock' ? 'text-warning' : 'text-success'
                            }`}>
                              {product.stock}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="text-lg font-semibold text-primary">
                              TZS {product.price}
                            </span>
                          </td>
                          <td className="p-4">
                            <Badge variant={product.status === 'low-stock' ? 'destructive' : 'default'}>
                              {product.status.replace('-', ' ').toUpperCase()}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <h3 className="text-lg font-semibold text-text-heading mb-2">No products yet</h3>
                <p className="text-text-muted mb-6">Get started by creating your first product category.</p>
                <Button asChild>
                  <Link href="/admin/categories">
                    Manage Categories
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </div>
      </div>
    </>
  );
}

