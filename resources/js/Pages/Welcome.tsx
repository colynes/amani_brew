import AppLayout from '../Layouts/AppLayout'
import { Head } from '@inertiajs/react'
import { ArrowRight } from 'lucide-react'

export default function Welcome() {
  return (
    <>
      <Head title="AmaniBrew - Self Ordering System" />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Welcome to AmaniBrew
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Your premium self-ordering system for craft beverages. Browse our menu, add to cart, and checkout seamlessly.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Browse Menu</h3>
                <p>Discover our selection of craft beers, wines, and spirits</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Add to Cart</h3>
                <p>Customize and build your perfect order</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Quick Checkout</h3>
                <p>Pay securely and enjoy fast delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

