import React, { useMemo, useState } from 'react';
import { ProductCard } from './ProductCard';
import { products } from '../data/products';
import { useApp } from '../context/AppContext';
import { useSearch } from '../hooks/useSearch';
import { Search, Filter, SortAsc, Grid3X3, List, SlidersHorizontal, X, TrendingUp } from 'lucide-react';

type SortOption = 'relevance' | 'price-low' | 'price-high' | 'rating' | 'name' | 'newest';
type ViewMode = 'grid' | 'list';

export function SearchResults() {
  const { state, dispatch } = useApp();
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [showFilters, setShowFilters] = useState(false);
  const [minRating, setMinRating] = useState<string>('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  
  const { searchProducts } = useSearch(products);

  // Enhanced search filtering with price range using the hook
  const filteredProducts = useMemo(() => {
    if (!state.searchQuery.trim()) {
      return products;
    }

    // Use the enhanced search function from the hook
    return searchProducts(state.searchQuery, {
      priceRange: priceRange
    });
  }, [state.searchQuery, priceRange, searchProducts]);

  // Apply additional filters
  const finalFilteredProducts = useMemo(() => {
    let results = [...filteredProducts];
    
    // Rating filter
    if (minRating) {
      results = results.filter(product => product.rating >= parseFloat(minRating));
    }
    
    // Stock filter
    if (inStockOnly) {
      results = results.filter(product => product.inStock);
    }
    
    // Sale filter
    if (onSaleOnly) {
      results = results.filter(product => product.originalPrice && product.originalPrice > product.price);
    }
    
    return results;
  }, [filteredProducts, minRating, inStockOnly, onSaleOnly]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...finalFilteredProducts];
    
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
  }, [finalFilteredProducts, sortBy]);

  const clearAllFilters = () => {
    setSortBy('relevance');
    setPriceRange([0, 2000]);
    setMinRating('');
    setInStockOnly(false);
    setOnSaleOnly(false);
    dispatch({ type: 'SET_SEARCH_QUERY', payload: '' });
  };

  const activeFiltersCount = [
    sortBy !== 'relevance',
    priceRange[0] !== 0 || priceRange[1] !== 2000,
    minRating !== '',
    inStockOnly,
    onSaleOnly
  ].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-blue-100 rounded-full">
            <Search className="h-8 w-8 text-blue-600" />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Search Results
            </h1>
            <p className="text-xl text-gray-600">
              {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'} found for "{state.searchQuery}"
            </p>
          </div>
        </div>
        
        {/* Search Query Display */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-blue-800 bg-blue-100 px-3 py-1 rounded-full">Searching for:</span>
              <span className="text-lg font-semibold text-blue-900">"{state.searchQuery}"</span>
            </div>
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-700 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-all duration-200"
            >
              <X className="h-4 w-4" />
              Clear search
            </button>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="mb-6 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          {/* Sort Options */}
          <div className="flex items-center gap-2">
            <SortAsc className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
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
                  ? 'bg-white text-blue-600 shadow-sm' 
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
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              title="List View"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Active Filters Badge */}
          {activeFiltersCount > 0 && (
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              {activeFiltersCount} active filter{activeFiltersCount !== 1 ? 's' : ''}
            </span>
          )}

          {/* Filters Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              showFilters 
                ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-700 border border-gray-200'
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="mb-6 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-blue-600" />
            Advanced Filters
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 2000])}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="2000"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
              <select 
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Any Rating</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.0">4.0+ Stars</option>
                <option value="3.5">3.5+ Stars</option>
                <option value="3.0">3.0+ Stars</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                  />
                  <span className="ml-2 text-sm text-gray-700">In Stock Only</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={onSaleOnly}
                    onChange={(e) => setOnSaleOnly(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                  />
                  <span className="ml-2 text-sm text-gray-700">On Sale Only</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quick Actions</label>
              <div className="space-y-2">
                <button
                  onClick={() => setPriceRange([0, 100])}
                  className="w-full text-left text-sm text-gray-600 hover:text-blue-600 px-3 py-1 rounded hover:bg-blue-50 transition-colors"
                >
                  Under $100
                </button>
                <button
                  onClick={() => setPriceRange([100, 500])}
                  className="w-full text-left text-sm text-gray-600 hover:text-blue-600 px-3 py-1 rounded hover:bg-blue-50 transition-colors"
                >
                  $100 - $500
                </button>
                <button
                  onClick={() => setMinRating('4.5')}
                  className="w-full text-left text-sm text-gray-600 hover:text-blue-600 px-3 py-1 rounded hover:bg-blue-50 transition-colors"
                >
                  Top Rated (4.5+)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Count and Summary */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-900">{sortedProducts.length}</span> {sortedProducts.length === 1 ? 'product' : 'products'} found
            {sortBy !== 'relevance' && (
              <span className="text-blue-600"> • Sorted by {sortBy.replace('-', ' ')}</span>
            )}
          </p>
          {activeFiltersCount > 0 && (
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} applied
            </span>
          )}
        </div>
        
        <button
          onClick={clearAllFilters}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors"
        >
          Clear all filters
        </button>
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
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors cursor-pointer">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-3">{product.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600 mb-1">${product.price}</div>
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
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
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
            No products match "{state.searchQuery}" with the current filters
          </p>
          <div className="space-y-4">
            <p className="text-sm text-gray-500 font-medium">Try adjusting your search:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setPriceRange([0, 2000])}
                className="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
              >
                Clear price filter
              </button>
              <button
                onClick={() => setSortBy('relevance')}
                className="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
              >
                Reset sorting
              </button>
              <button
                onClick={() => {
                  setMinRating('');
                  setInStockOnly(false);
                  setOnSaleOnly(false);
                }}
                className="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
              >
                Clear all filters
              </button>
            </div>
            <div className="pt-4">
              <button
                onClick={clearAllFilters}
                className="text-blue-600 hover:text-blue-700 font-medium hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors"
              >
                Start new search
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
