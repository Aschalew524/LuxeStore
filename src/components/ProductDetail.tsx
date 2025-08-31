import React, { useState } from 'react';
import { ArrowLeft, Star, Heart, ShoppingCart, Minus, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function ProductDetail() {
  const { state, dispatch } = useApp();
  const { selectedProduct } = state;
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) return null;

  const isFavorite = state.favorites.includes(selectedProduct.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_TO_CART', payload: selectedProduct });
    }
  };

  const handleToggleFavorite = () => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: selectedProduct.id });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={() => dispatch({ type: 'SET_VIEW', payload: 'home' })}
        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-8"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-xl overflow-hidden">
            <img
              src={selectedProduct.images[selectedImage]}
              alt={selectedProduct.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {selectedProduct.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {selectedProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-amber-500' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h1>
            <p className="text-gray-600">{selectedProduct.brand}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(selectedProduct.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              {selectedProduct.rating} ({selectedProduct.reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-3">
            <span className="text-3xl font-bold text-gray-900">${selectedProduct.price}</span>
            {selectedProduct.originalPrice && (
              <>
                <span className="text-xl text-gray-500 line-through">${selectedProduct.originalPrice}</span>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-semibold">
                  {Math.round((1 - selectedProduct.price / selectedProduct.originalPrice) * 100)}% OFF
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{selectedProduct.description}</p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedProduct.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Quantity and Actions */}
          {selectedProduct.inStock ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-gray-900 font-medium">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={handleToggleFavorite}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    isFavorite
                      ? 'border-red-500 text-red-500 bg-red-50'
                      : 'border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500'
                  }`}
                >
                  <Heart className={`h-6 w-6 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <span className="text-red-800 font-semibold">Currently out of stock</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}