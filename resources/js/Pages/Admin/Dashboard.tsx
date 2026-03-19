import React from 'react'
import { Head } from '@inertiajs/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import PageHeader from '@/components/page-header'
import DataTable from '@/components/data-table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const columns = [
  { header: 'Name', accessor: 'name' },
  { header: 'Status', accessor: 'status', render: (status) => <Badge variant={status}>{status}</Badge> },
  { header: 'Price', accessor: 'price' },
  { header: 'Stock', accessor: 'stock' },
]

const mockData = [
  { id: 1, name: 'Premium Ribeye Steak', status: 'in-stock', price: '$45.99', stock: 23 },
  { id: 2, name: 'Grass Fed Ground Beef', status: 'low-stock', price: '$12.99', stock: 5 },
  { id: 3, name: 'Lamb Chops', status: 'out-of-stock', price: '$28.99', stock: 0 },
  { id: 4, name: 'Organic Chicken Breast', status: 'in-stock', price: '$9.99', stock: 45 },
]

export default function Dashboard() {
  return (
    <>
      <Head title="Dashboard" />
      <PageHeader 
        title="Dashboard" 
        subtitle="Welcome to Amani Brew Admin. Manage your premium butchery operations."
        action={<Button>Create New Product</Button>}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl">$12,345</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-secondary-text">Total Revenue</p>
            <p className="text-sm text-emerald mt-1">+12.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl">156</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-secondary-text">Orders Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl">23</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-secondary-text">Low Stock Items</p>
          </CardContent>
        </Card>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Recent Products</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={mockData} />
        </CardContent>
      </Card>
    </>
  )
}

