export interface Product {
  id: number;
  name: string;
  description?: string | null;
  sku?: string | null;
  barcode?: string | null;
  image?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  category?: Category | null;
// prices?: ProductPrice[];
  // stocks?: Stock[];
  status?: 'in-stock' | 'low-stock' | 'out-of-stock';
  price?: string;
  stock?: number;
}


export interface Category {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: number;
  order_number: string;
  customer_id: number;
  branch_id: number;
  status: string;
  subtotal: number;
  tax: number;
  total: number;
  payment_method: string;
  is_paid: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface DashboardProps {
  totalRevenue: number;
  ordersToday: number;
  lowStockItems: number;
  recentProducts: Product[];
}

