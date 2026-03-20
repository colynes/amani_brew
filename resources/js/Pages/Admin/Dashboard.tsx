import React from 'react'
import { Head, usePage } from '@inertiajs/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import PageHeader from '@/components/page-header'
import DataTable from '@/components/data-table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { DashboardProps, Product } from '@/types'

// -----------------------------
// Badge variant mapping
// -----------------------------
const getBadgeVariant = (status: Product['status'] | string): 'success' | 'warning' | 'destructive' | 'default' => {
  switch (status) {
    case 'in-stock':
      return 'success'
    case 'low-stock':
      return 'warning'
    case 'out-of-stock':
      return 'destructive'
    default:
      return 'default'
  }
}

// -----------------------------
// Table columns
// -----------------------------
const columns = [
  { header: 'Name', accessor: 'name' },
  {
    header: 'Status',
    accessor: 'status',
    render: (status: string) => (
      <Badge variant={getBadgeVariant(status)}>
        {status?.replace('-', ' ') || 'Unknown'}
      </Badge>
    ),
  },
  { header: 'Price', accessor: 'price' },
  { header: 'Stock', accessor: 'stock' },
]

export default function Dashboard() {
  // -----------------------------
  // Inertia props from backend
  // -----------------------------
  const {
    totalRevenue,
    ordersToday,
    lowStockItems,
    recentProducts,
  } = usePage().props as unknown as DashboardProps & {
    recentProducts: (Product & { price: string; stock: number; status: string })[]
  }

  // -----------------------------
  // Currency formatter
  // -----------------------------
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <>
      <Head title="Dashboard" />

      <PageHeader
        title="Dashboard"
        subtitle="Live coffee operations dashboard"
        action={<Button className="stat-card">Create New Product</Button>}
      />

      {/* -----------------------------
          Stats Cards
      ----------------------------- */}
      <div className="dashboard-grid mb-8">
        <Card className="stat-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-3xl font-bold text-coffee">
              {formatCurrency(totalRevenue)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-text-muted mb-1">Total Revenue</p>
            <p className="text-success text-sm font-medium">Live data</p>
          </CardContent>
        </Card>

        <Card className="stat-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-3xl font-bold text-coffee">{ordersToday}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-text-muted mb-1">Orders Today</p>
            <Badge className="mt-1">Live</Badge>
          </CardContent>
        </Card>

        <Card className="stat-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-3xl font-bold text-warning">{lowStockItems}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-text-muted mb-1">Low Stock Items</p>
            <Badge variant="destructive" className="mt-1">
              Restock needed
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* -----------------------------
          Recent Products Table
      ----------------------------- */}
      <Card className="table-card">
        <CardHeader>
          <CardTitle className="section-title">Recent Products ({recentProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {recentProducts.length === 0 ? (
            <div className="empty-state">
              <h3 className="text-2xl font-bold text-text-muted mb-2">No products yet</h3>
              <p className="text-text-muted mb-4">Create your first product to get started.</p>
              <Button className="stat-card">Add Product</Button>
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={recentProducts}
              className="stat-card"
              onRowClick={(row: Product) => console.log('Clicked row:', row)}
            />
          )}
        </CardContent>
      </Card>
    </>
  )
}