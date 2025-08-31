import React from 'react';
import { ArrowLeft, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { products } from '../data/products';
import { ProductCard } from './ProductCard';

export function Favorites() {
  const { state, dispatch } = useApp();
  
  const favoriteProducts = products.filter(product => 
    state.favorites.includes(product.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => dispatch({ type: 'SET_VIEW', payload: 'home' })}
        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-8"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to shopping
      </button>

      <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
        <Heart className="h-8 w-8 mr-3 text-red-500 fill-red-500" />
        My Favorites
      </h1>

      {favoriteProducts.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No favorites yet</h2>
          <p className="text-gray-600 mb-8">Start adding products to your wishlist by clicking the heart icon</p>
          <button
            onClick={() => dispatch({ type: 'SET_VIEW', payload: 'home' })}
            className="bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <p className="text-gray-600">
              {favoriteProducts.length} {favoriteProducts.length === 1 ? 'item' : 'items'} in your favorites
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}