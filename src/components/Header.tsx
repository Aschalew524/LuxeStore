import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Search, ShoppingCart, Heart, User, Menu, X, Clock, TrendingUp, BarChart3, List } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useSearch } from '../hooks/useSearch';
import { products } from '../data/products';

export function Header() {
  const { state, dispatch } = useApp();
  const [localSearchQuery, setLocalSearchQuery] = useState(state.searchQuery);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const cartItemsCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const { getSearchSuggestions, addToSearchHistory } = useSearch(products);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearchQuery !== state.searchQuery) {
        dispatch({ type: 'SET_SEARCH_QUERY', payload: localSearchQuery });
        // Add to search history when search is performed
        if (localSearchQuery.trim()) {
          const results = products.filter(product => 
            product.name.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
            product.brand.toLowerCase().includes(localSearchQuery.toLowerCase())
          );
          addToSearchHistory(localSearchQuery, results.length);
        }
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [localSearchQuery, state.searchQuery, dispatch, addToSearchHistory]);

  // Sync local state with global state
  useEffect(() => {
    setLocalSearchQuery(state.searchQuery);
  }, [state.searchQuery]);

  const handleSearchChange = useCallback((value: string) => {
    setLocalSearchQuery(value);
    setShowSearchSuggestions(value.length > 0 || isSearchFocused);
    setSelectedSuggestionIndex(-1); // Reset selection when typing
  }, [isSearchFocused]);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setLocalSearchQuery(suggestion);
    dispatch({ type: 'SET_SEARCH_QUERY', payload: suggestion });
    setShowSearchSuggestions(false);
    setIsSearchFocused(false);
    setSelectedSuggestionIndex(-1);
  }, [dispatch]);

  const clearSearch = useCallback(() => {
    setLocalSearchQuery('');
    dispatch({ type: 'SET_SEARCH_QUERY', payload: '' });
    setShowSearchSuggestions(false);
    setIsSearchFocused(false);
    setSelectedSuggestionIndex(-1);
  }, [dispatch]);

  const handleSearchFocus = useCallback(() => {
    setIsSearchFocused(true);
    setShowSearchSuggestions(localSearchQuery.length > 0);
    setSelectedSuggestionIndex(-1);
  }, [localSearchQuery]);

  const handleSearchBlur = useCallback(() => {
    setTimeout(() => {
      setIsSearchFocused(false);
      setShowSearchSuggestions(false);
      setSelectedSuggestionIndex(-1);
    }, 200);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const suggestions = getSearchSuggestions(localSearchQuery);
    const allSuggestions = [
      ...suggestions.recent,
      ...suggestions.popular,
      ...suggestions.matching
    ];

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < allSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0 && allSuggestions[selectedSuggestionIndex]) {
          handleSuggestionClick(allSuggestions[selectedSuggestionIndex]);
        } else if (localSearchQuery.trim()) {
          // Perform search with current input
          dispatch({ type: 'SET_SEARCH_QUERY', payload: localSearchQuery });
          setShowSearchSuggestions(false);
          setIsSearchFocused(false);
        }
        break;
      case 'Escape':
        setShowSearchSuggestions(false);
        setIsSearchFocused(false);
        searchInputRef.current?.blur();
        break;
    }
  }, [localSearchQuery, selectedSuggestionIndex, getSearchSuggestions, handleSuggestionClick, dispatch]);

  const suggestions = getSearchSuggestions(localSearchQuery);
  const allSuggestions = [
    ...suggestions.recent,
    ...suggestions.popular,
    ...suggestions.matching
  ];

  const categories = Array.from(new Set(products.map(product => product.category)));

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side - Menu & Logo */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-600 hover:text-blue-500 transition-colors lg:hidden">
              <Menu className="h-6 w-6" />
            </button>
            <div 
              className="flex-shrink-0 cursor-pointer"
              onClick={() => dispatch({ type: 'SET_VIEW', payload: 'home' })}
            >
              <h1 className="text-2xl font-bold text-blue-500">LuxeStore</h1>
            </div>
          </div>

          {/* Center - Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search essentials, groceries and more..."
                value={localSearchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                onKeyDown={handleKeyDown}
                className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-gray-700 placeholder-gray-400 text-base"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors">
                <List className="h-5 w-5" />
              </button>
              {localSearchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              
              {/* Enhanced Search Suggestions Dropdown */}
              {showSearchSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto">
                  {/* Recent Searches */}
                  {suggestions.recent.length > 0 && (
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <Clock className="h-4 w-4" />
                        Recent searches
                      </div>
                      <div className="space-y-2">
                        {suggestions.recent.map((suggestion, index) => {
                          const globalIndex = index;
                          return (
                            <button
                              key={suggestion}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                                globalIndex === selectedSuggestionIndex
                                  ? 'bg-blue-50 text-blue-600'
                                  : 'hover:bg-blue-50 text-gray-700 hover:text-blue-600'
                              }`}
                            >
                              {suggestion}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Popular Searches */}
                  {suggestions.popular.length > 0 && (
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <TrendingUp className="h-4 w-4" />
                        Popular searches
                      </div>
                      <div className="space-y-2">
                        {suggestions.popular.map((suggestion, index) => {
                          const globalIndex = suggestions.recent.length + index;
                          return (
                            <button
                              key={suggestion}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                                globalIndex === selectedSuggestionIndex
                                  ? 'bg-blue-50 text-blue-600'
                                  : 'hover:bg-blue-50 text-gray-700 hover:text-blue-600'
                              }`}
                            >
                              {suggestion}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Matching Suggestions */}
                  {suggestions.matching.length > 0 && (
                    <div className="p-4">
                      <div className="text-sm text-gray-500 mb-3">Suggestions:</div>
                      <div className="space-y-2">
                        {suggestions.matching.map((suggestion, index) => {
                          const globalIndex = suggestions.recent.length + suggestions.popular.length + index;
                          return (
                            <button
                              key={suggestion}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                                globalIndex === selectedSuggestionIndex
                                  ? 'bg-blue-50 text-blue-600'
                                  : 'hover:bg-blue-50 text-gray-700 hover:text-blue-600'
                              }`}
                            >
                              {suggestion}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* No suggestions message */}
                  {allSuggestions.length === 0 && (
                    <div className="p-3 text-center text-gray-500 text-sm">
                      No suggestions available
                    </div>
                  )}

                  {/* Keyboard navigation hint */}
                  {allSuggestions.length > 0 && (
                    <div className="p-2 text-xs text-gray-400 text-center border-t border-gray-100">
                      Use ↑↓ arrows to navigate, Enter to select, Esc to close
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Navigation Icons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => dispatch({ type: 'SET_VIEW', payload: 'analytics' })}
              className="p-2 text-gray-600 hover:text-blue-500 transition-colors"
              title="Search Analytics"
            >
              <BarChart3 className="h-6 w-6" />
            </button>

            <button
              onClick={() => dispatch({ type: 'SET_VIEW', payload: 'favorites' })}
              className="p-2 text-gray-600 hover:text-blue-500 transition-colors relative"
            >
              <Heart className={`h-6 w-6 ${state.favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
              {state.favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {state.favorites.length}
                </span>
              )}
            </button>

            <button
              onClick={() => dispatch({ type: 'SET_VIEW', payload: 'cart' })}
              className="p-2 text-gray-600 hover:text-blue-500 transition-colors relative"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => dispatch({ type: 'SET_VIEW', payload: 'auth' })}
              className="p-2 text-gray-600 hover:text-blue-500 transition-colors"
            >
              <User className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search essentials, groceries and more..."
              value={localSearchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              onKeyDown={handleKeyDown}
              className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-gray-700 placeholder-gray-400 text-base"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors">
              <List className="h-5 w-5" />
            </button>
            {localSearchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Navigation Bar */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 py-3 overflow-x-auto scrollbar-hide">
            {categories.slice(1).map(category => (
              <button
                key={category}
                onClick={() => dispatch({ type: 'SET_CATEGORY', payload: category })}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-200 ${
                  state.selectedCategory === category
                    ? 'bg-blue-100 text-blue-600 border border-blue-200'
                    : 'text-gray-700 hover:text-blue-500 hover:bg-blue-50'
                }`}
              >
                {category}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}