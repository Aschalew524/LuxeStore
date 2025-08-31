import React, { useMemo, useState } from 'react';
import { ProductCard } from './ProductCard';
import { products, categories } from '../data/products';
import { useApp } from '../context/AppContext';
import { useSearch } from '../hooks/useSearch';
import { Search, Grid3X3, List, SortAsc } from 'lucide-react';

type SortOption = 'relevance' | 'price-low' | 'price-high' | 'rating' | 'name' | 'newest';
type ViewMode = 'grid' | 'list';

export function ProductGrid() {
  const { state, dispatch } = useApp();
  const { searchProducts } = useSearch(products);
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Enhanced search filtering with useMemo for performance
  const filteredProducts = useMemo(() => {
    if (!state.searchQuery.trim() && state.selectedCategory === 'All Products') {
      return products;
    }

    // Use the enhanced search function from the hook
    const searchResults = searchProducts(state.searchQuery, {
      category: state.selectedCategory === 'All Products' ? undefined : state.selectedCategory
    });

    return searchResults;
  }, [state.searchQuery, state.selectedCategory, searchProducts]);

  // Sort products based on selected option
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'newest':
        return sorted.sort((a, b) => parseInt(b.id) - parseInt(a.id));
      case 'relevance':
      default:
        // Relevance sorting is already handled by the search hook
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  const clearAllFilters = () => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: '' });
    dispatch({ type: 'SET_CATEGORY', payload: 'All Products' });
    setSortBy('relevance');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Results Header */}
      {state.searchQuery.trim() && (
        <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Search className="h-6 w-6 text-blue-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-blue-800 mb-1">
                Search Results for "{state.searchQuery}"
              </h3>
              <p className="text-blue-600">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </p>
            </div>
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-100 rounded-lg transition-all duration-200"
            >
              Clear Search
            </button>
          </div>
        </div>
      )}

      {/* Simple Results Summary */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-900">{sortedProducts.length}</span> {sortedProducts.length === 1 ? 'product' : 'products'} found
            {state.searchQuery.trim() && (
              <span className="text-blue-500"> for "{state.searchQuery}"</span>
            )}
            {state.selectedCategory !== 'All Products' && (
              <span className="text-blue-500"> in {state.selectedCategory}</span>
            )}
          </p>
          {sortBy !== 'relevance' && (
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              Sorted by {sortBy.replace('-', ' ')}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {/* Sort Options */}
          <div className="flex items-center gap-2">
            <SortAsc className="h-4 w-4 text-blue-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white"
            >
              <option value="relevance">Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name A-Z</option>
              <option value="newest">Newest First</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === 'grid' 
                  ? 'bg-white text-blue-500 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              title="Grid View"
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === 'list' 
                  ? 'bg-white text-blue-500 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              title="List View"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedProducts.map(product => (
            <div key={product.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200">
              <div className="flex gap-6">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-500 transition-colors cursor-pointer">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-3">{product.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-500 mb-1">${product.price}</div>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <div className="text-sm text-gray-500 line-through">${product.originalPrice}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                    <span className="font-medium text-gray-700">{product.brand}</span>
                    <span className="bg-gray-100 px-3 py-1 rounded-full">{product.category}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span className="font-medium text-gray-700">{product.rating}</span>
                      <span className="text-gray-400">({product.reviews})</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                      Add to Cart
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results State */}
      {sortedProducts.length === 0 && (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
          <div className="text-gray-300 mb-6">
            <Search className="h-24 w-24 mx-auto" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">No products found</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            {state.searchQuery.trim() 
              ? `We couldn't find any products matching "${state.searchQuery}"`
              : 'Try adjusting your filter criteria or browse our categories'
            }
          </p>
          <div className="space-y-4">
            <p className="text-sm text-gray-500 font-medium">Popular searches:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {['headphones', 'watch', 'camera', 'shoes', 'coffee', 'electronics'].map(suggestion => (
                <button
                  key={suggestion}
                  onClick={() => dispatch({ type: 'SET_SEARCH_QUERY', payload: suggestion })}
                  className="px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
                >
                  {suggestion}
                </button>
              ))}
            </div>
            <div className="pt-4">
              <button
                onClick={clearAllFilters}
                className="text-blue-500 hover:text-blue-600 font-medium hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors"
              >
                Clear all filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}