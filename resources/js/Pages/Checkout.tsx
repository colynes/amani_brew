import { useState } from 'react'
import { useForm, usePage } from '@inertiajs/react'

export default function Checkout() {
  const [showConfirm, setShowConfirm] = useState(false)
  const { cart } = usePage().props || { cart: [] }
  const subtotal = 25.97
  const tax = 2.60
  const total = 28.57

  const form = useForm({
    customer_name: '',
    phone: '',
    address: '',
    payment_method: 'cash',
  })

  const submitOrder = () => {
    setShowConfirm(true)
  }

  const confirmOrder = () => {
    form.post('/api/orders', {
      onSuccess: () => {
        setShowConfirm(false)
        form.reset()
      },
    })
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-6">
      <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
        Checkout
      </h1>
      
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b pb-4">Order Summary</h2>
        <div className="space-y-3 text-lg">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (10%)</span>
            <span className="font-semibold">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between pt-4 border-t border-gray-200 font-bold text-2xl text-amber-600">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Delivery Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input 
              type="text" 
              {...form.register('customer_name')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input 
              type="tel" 
              {...form.register('phone')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label>
            <input 
              type="text" 
              {...form.register('address')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
            <select {...form.register('payment_method')} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
              <option value="cash">Cash on Delivery</option>
              <option value="mpesa">M-Pesa</option>
              <option value="card">Credit Card</option>
            </select>
          </div>
        </div>
        <div className="mt-8">
          <button 
            onClick={submitOrder}
            className="w-full py-4 px-8 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Place Order - ${total.toFixed(2)}
          </button>
        </div>
      </div>

      {/* Confirm Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Confirm Order</h2>
            <p className="text-gray-600 mb-8">Review your order details before placing. You'll receive SMS confirmation.</p>
            <div className="space-y-2 mb-8">
              <div className="flex justify-between">
                <span>Total Amount:</span>
                <span className="font-bold text-amber-600 text-xl">${total.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 px-6 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={confirmOrder}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Confirm & Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

