import { useState } from 'react'
import { useForm, usePage } from '@inertiajs/react'

export default function Cart() {
  const [cart, setCart] = useState([
    { id: 1, name: 'Craft IPA', price: 5.99, quantity: 2 },
    { id: 2, name: 'Stout', price: 6.49, quantity: 1 },
  ])

  const { post } = useForm({})
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  const removeItem = (id) => setCart(cart.filter(item => item.id !== id))
  const updateQuantity = (id, quantity) => {
    setCart(cart.map(item => item.id === id ? {...item, quantity} : item))
  }

  const checkout = () => {
    post('/checkout', { cart })
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Your Cart</h1>
        <button onClick={() => setCart([])} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
          Clear Cart
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Order Items ({cart.length} items)</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {cart.map(item => (
                <tr key={item.id}>
                  <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                  <td className="px-6 py-4">${item.price.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <input 
                      type="number" 
                      min="1" 
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                      className="w-16 h-10 border border-gray-300 rounded-md px-3 text-center focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => removeItem(item.id)} className="text-sm text-red-600 hover:text-red-900 font-medium">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 pt-6 space-y-2 text-lg">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (10%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-2xl text-amber-600 border-t pt-4">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <div className="px-6 pb-6 pt-4 flex justify-end space-x-3">
          <button className="px-8 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            Continue Shopping
          </button>
          <button onClick={checkout} className="px-12 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-lg text-lg shadow-lg hover:shadow-xl transition-all">
            Checkout Securely
          </button>
        </div>
      </div>
    </div>
  )
}

