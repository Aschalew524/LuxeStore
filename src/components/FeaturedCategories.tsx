import React from 'react';
import { useApp } from '../context/AppContext';

const featuredCategories = [
  {
    name: 'All Products',
    image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Browse our complete collection'
  },
  {
    name: 'Electronics',
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Latest tech gadgets'
  },
  {
    name: 'Fashion',
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Trendy clothing & accessories'
  },
  {
    name: 'Home',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Beautiful home essentials'
  }
];

export function FeaturedCategories() {
  const { state, dispatch } = useApp();

  const handleCategoryClick = (category: string) => {
    dispatch({ type: 'SET_CATEGORY', payload: category });
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated collections designed to meet your every need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredCategories.map(category => {
            const isSelected = state.selectedCategory === category.name;
            return (
              <div
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
                className={`group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ${
                  isSelected ? 'ring-4 ring-blue-500 shadow-lg' : ''
                }`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 transition-all duration-300 ${
                    isSelected ? 'bg-blue-500 bg-opacity-30' : 'bg-black bg-opacity-20 group-hover:bg-opacity-30'
                  }`}></div>
                  {isSelected && (
                    <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Selected
                    </div>
                  )}
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                    <p className="text-gray-200">{category.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}