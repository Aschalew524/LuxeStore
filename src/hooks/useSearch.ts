import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Product } from '../types';

export interface SearchResult {
  query: string;
  timestamp: number;
  resultCount: number;
}

export function useSearch(products: Product[]) {
  const [searchHistory, setSearchHistory] = useLocalStorage<SearchResult[]>('searchHistory', []);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [popularSearches, setPopularSearches] = useState<string[]>([]);

  // Popular search terms based on product data
  const popularTerms = useMemo(() => {
    const terms = new Map<string, number>();
    
    products.forEach(product => {
      // Add product names
      product.name.toLowerCase().split(' ').forEach(word => {
        if (word.length > 2) {
          terms.set(word, (terms.get(word) || 0) + 1);
        }
      });
      
      // Add categories
      terms.set(product.category.toLowerCase(), (terms.get(product.category.toLowerCase()) || 0) + 1);
      
      // Add brands
      terms.set(product.brand.toLowerCase(), (terms.get(product.brand.toLowerCase()) || 0) + 1);
    });
    
    return Array.from(terms.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([term]) => term);
  }, [products]);

  // Update popular searches
  useEffect(() => {
    setPopularSearches(popularTerms);
  }, [popularTerms]);

  // Update recent searches from history
  useEffect(() => {
    const recent = searchHistory
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 5)
      .map(result => result.query);
    setRecentSearches(recent);
  }, [searchHistory]);

  // Add search to history
  const addToSearchHistory = useCallback((query: string, resultCount: number) => {
    if (!query.trim()) return;
    
    const newSearch: SearchResult = {
      query: query.trim(),
      timestamp: Date.now(),
      resultCount
    };
    
    setSearchHistory(prev => {
      // Remove duplicate queries and add new one at the beginning
      const filtered = prev.filter(item => item.query.toLowerCase() !== query.toLowerCase());
      return [newSearch, ...filtered].slice(0, 20); // Keep only last 20 searches
    });
  }, [setSearchHistory]);

  // Clear search history
  const clearSearchHistory = useCallback(() => {
    setSearchHistory([]);
  }, [setSearchHistory]);

  // Get search suggestions based on current input
  const getSearchSuggestions = useCallback((input: string) => {
    if (!input.trim()) {
      return {
        recent: recentSearches.slice(0, 3),
        popular: popularSearches.slice(0, 3),
        matching: []
      };
    }

    const inputLower = input.toLowerCase();
    
    // Find matching terms from products
    const matching = products
      .flatMap(product => [
        product.name,
        product.brand,
        product.category,
        ...product.features
      ])
      .filter(term => term.toLowerCase().includes(inputLower))
      .slice(0, 5);

    // Filter recent and popular searches
    const matchingRecent = recentSearches.filter(search => 
      search.toLowerCase().includes(inputLower)
    ).slice(0, 2);

    const matchingPopular = popularSearches.filter(search => 
      search.toLowerCase().includes(inputLower)
    ).slice(0, 2);

    return {
      recent: matchingRecent,
      popular: matchingPopular,
      matching: [...new Set(matching)] // Remove duplicates
    };
  }, [products, recentSearches, popularSearches]);

  // Enhanced search function with multiple criteria
  const searchProducts = useCallback((query: string, filters?: {
    category?: string;
    priceRange?: [number, number];
    minRating?: number;
    inStock?: boolean;
  }) => {
    const searchTerm = query.toLowerCase().trim();
    
    let results = products.filter(product => {
      // Basic search matching
      const matchesSearch = 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.features.some(feature => 
          feature.toLowerCase().includes(searchTerm)
        ) ||
        // Advanced search patterns
        (searchTerm.includes('under') && 
         /\d+/.test(searchTerm) && 
         product.price < parseInt(searchTerm.match(/\d+/)?.[0] || '0')) ||
        (searchTerm.includes('over') && 
         /\d+/.test(searchTerm) && 
         product.price > parseInt(searchTerm.match(/\d+/)?.[0] || '0')) ||
        (searchTerm.includes('star') && 
         /\d+/.test(searchTerm) && 
         product.rating >= parseInt(searchTerm.match(/\d+/)?.[0] || '0')) ||
        (searchTerm.includes('rated') && product.rating >= 4.5) ||
        (searchTerm.includes('cheap') && product.price < 100) ||
        (searchTerm.includes('expensive') && product.price > 500) ||
        (searchTerm.includes('premium') && product.price > 300);

      // Apply additional filters
      const matchesCategory = !filters?.category || product.category === filters.category;
      const matchesPrice = !filters?.priceRange || 
        (product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]);
      const matchesRating = !filters?.minRating || product.rating >= filters.minRating;
      const matchesStock = !filters?.inStock || product.inStock === filters.inStock;

      return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesStock;
    });

    // Sort by relevance
    results.sort((a, b) => {
      const aNameStartsWith = a.name.toLowerCase().startsWith(searchTerm);
      const bNameStartsWith = b.name.toLowerCase().startsWith(searchTerm);
      
      if (aNameStartsWith && !bNameStartsWith) return -1;
      if (bNameStartsWith && !aNameStartsWith) return 1;
      
      const aNameMatch = a.name.toLowerCase().includes(searchTerm);
      const bNameMatch = b.name.toLowerCase().includes(searchTerm);
      
      if (aNameMatch && !bNameMatch) return -1;
      if (bNameMatch && !aNameMatch) return 1;
      
      return b.rating - a.rating;
    });

    return results;
  }, [products]);

  return {
    searchProducts,
    addToSearchHistory,
    clearSearchHistory,
    getSearchSuggestions,
    recentSearches,
    popularSearches,
    searchHistory
  };
}
