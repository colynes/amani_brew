import { useState } from 'react'

export default function Menu() {
  const [cart, setCart] = useState([])
  const products = [
    {
      id: 1,
      name: 'Craft IPA',
      description: 'Citrusy hop-forward IPA with tropical notes',
      price: 5.99,
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop',
      category: 'Drafts'
    },
    {
      id: 2,
      name: 'Hazy Pale Ale',
      description: 'Juicy NEIPA with oats and mosaic hops',
      price: 6.49,
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c2d868b?w=400&h=300&fit=crop',
      category: 'Drafts'
    },
    {
      id: 3,
      name: 'Stout',
      description: 'Rich chocolate stout with coffee notes',
      price: 6.99,
      image: 'https://images.unsplash.com/photo-1549497532-9e4d7245d8c5?w=400&h=300&fit=crop',
      category: 'Bottles'
    },
    {
      id: 4,
      name: 'Lager',
      description: 'Classic crisp lager, perfect refreshment',
      price: 4.99,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop',
      category: 'Bottles'
    },
    {
      id: 5,
      name: 'Red Ale',
      description: 'Malty red ale with caramel sweetness',
      price: 5.49,
      image: 'https://images.unsplash.com/photo-1621996346565-e3adc808ee44?w=400&h=300&fit=crop',
      category: 'Drafts'
    },
  ]

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? {...item, quantity: item.quantity + 1} : item));
    } else {
      setCart([...cart, {...product, quantity: 1}]);
    }
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700 bg-clip-text text-transparent mb-6">
            Our Menu
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our selection of craft beers, refreshing brews, and premium selections
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product.id} className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2">
              <div className="h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-8">
                <span className="inline-block px-3 py-1 text-xs font-semibold bg-amber-100 text-amber-800 rounded-full mb-3">
                  {product.category}
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-amber-600">${product.price}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="mt-16 text-center">
            <p className="text-lg text-gray-600 mb-4">Added {cart.length} items to cart!</p>
            <a href="/cart" className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-4 px-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              View Cart → ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

