import React, { useState } from 'react';
import { Search, TrendingUp, Clock, BarChart3, RefreshCw, Trash2, Zap, Target, Users, Eye } from 'lucide-react';
import { useSearch } from '../hooks/useSearch';
import { useApp } from '../context/AppContext';
import { products } from '../data/products';

export function SearchAnalytics() {
  const { searchHistory, popularSearches, recentSearches, clearSearchHistory } = useSearch(products);
  const { dispatch } = useApp();
  const [selectedTimeframe, setSelectedTimeframe] = useState<'all' | 'week' | 'month'>('all');

  // Calculate search statistics
  const totalSearches = searchHistory.length;
  const uniqueSearches = new Set(searchHistory.map(h => h.query.toLowerCase())).size;
  const averageResults = searchHistory.length > 0 
    ? Math.round(searchHistory.reduce((sum, h) => sum + h.resultCount, 0) / searchHistory.length)
    : 0;

  // Filter searches by timeframe
  const getFilteredHistory = () => {
    const now = Date.now();
    const weekAgo = now - (7 * 24 * 60 * 60 * 1000);
    const monthAgo = now - (30 * 24 * 60 * 60 * 1000);

    switch (selectedTimeframe) {
      case 'week':
        return searchHistory.filter(h => h.timestamp > weekAgo);
      case 'month':
        return searchHistory.filter(h => h.timestamp > monthAgo);
      default:
        return searchHistory;
    }
  };

  const filteredHistory = getFilteredHistory();

  // Get top performing searches (most results)
  const topSearches = [...filteredHistory]
    .sort((a, b) => b.resultCount - a.resultCount)
    .slice(0, 5);

  // Get most recent searches
  const latestSearches = filteredHistory
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 5);

  // Get search trends
  const searchTrends = popularSearches.slice(0, 8);

  // Handle search suggestion click
  const handleSearchClick = (query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  // Calculate success rate (searches with results > 0)
  const successfulSearches = filteredHistory.filter(h => h.resultCount > 0).length;
  const successRate = filteredHistory.length > 0 
    ? Math.round((successfulSearches / filteredHistory.length) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Search Analytics</h2>
            <p className="text-gray-600">Insights into your search behavior and popular products</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value as 'all' | 'week' | 'month')}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Time</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
            </select>
            <button
              onClick={() => window.location.reload()}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-200 rounded-xl">
              <Search className="h-6 w-6 text-blue-700" />
            </div>
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Searches</p>
              <p className="text-2xl font-bold text-blue-900">{filteredHistory.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-200 rounded-xl">
              <Target className="h-6 w-6 text-green-700" />
            </div>
            <div>
              <p className="text-sm text-green-600 font-medium">Unique Queries</p>
              <p className="text-2xl font-bold text-green-900">{uniqueSearches}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-200 rounded-xl">
              <TrendingUp className="h-6 w-6 text-purple-700" />
            </div>
            <div>
              <p className="text-sm text-purple-600 font-medium">Avg Results</p>
              <p className="text-2xl font-bold text-purple-900">{averageResults}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl border border-amber-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-200 rounded-xl">
              <Zap className="h-6 w-6 text-amber-700" />
            </div>
            <div>
              <p className="text-sm text-amber-600 font-medium">Success Rate</p>
              <p className="text-2xl font-bold text-amber-900">{successRate}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Popular Searches */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Popular Search Terms</h3>
            </div>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              Top {searchTrends.length}
            </span>
          </div>
          <div className="space-y-3">
            {searchTrends.map((term, index) => (
              <div key={term} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-blue-600 w-6">#{index + 1}</span>
                  <span className="text-gray-700 font-medium">{term}</span>
                </div>
                <button
                  onClick={() => handleSearchClick(term)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors"
                >
                  Search
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Searches */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Recent Searches</h3>
            </div>
            <button
              onClick={clearSearchHistory}
              className="text-sm text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded-lg transition-colors flex items-center gap-1"
            >
              <Trash2 className="h-4 w-4" />
              Clear
            </button>
          </div>
          <div className="space-y-3">
            {latestSearches.length > 0 ? (
              latestSearches.map((search, index) => (
                <div key={`${search.query}-${search.timestamp}`} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-gray-700 font-medium">{search.query}</span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {new Date(search.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{search.resultCount} results</p>
                  </div>
                  <button
                    onClick={() => handleSearchClick(search.query)}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors"
                  >
                    Search Again
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Clock className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No recent searches</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top Performing Searches */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Top Performing Searches</h3>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            Most Results
          </span>
        </div>
        <div className="space-y-3">
          {topSearches.length > 0 ? (
            topSearches.map((search, index) => (
              <div key={`${search.query}-${search.timestamp}`} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-blue-600">#{index + 1}</span>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">{search.query}</p>
                    <p className="text-sm text-gray-500">
                      {search.resultCount} results • {new Date(search.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">{search.resultCount}</p>
                  <p className="text-xs text-gray-500">results</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <BarChart3 className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>No search data available</p>
            </div>
          )}
        </div>
      </div>

      {/* Search Tips and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Search Tips */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Search Tips
          </h3>
          <div className="space-y-4 text-sm text-blue-800">
            <div>
              <p className="font-medium mb-1">• Use specific terms:</p>
              <p>Try "wireless headphones" instead of just "headphones"</p>
            </div>
            <div>
              <p className="font-medium mb-1">• Search by price:</p>
              <p>Use "under 200" or "over 500" to filter by price range</p>
            </div>
            <div>
              <p className="font-medium mb-1">• Search by rating:</p>
              <p>Use "4+ stars" or "highly rated" to find top products</p>
            </div>
            <div>
              <p className="font-medium mb-1">• Search by features:</p>
              <p>Try "noise cancellation" or "water resistant"</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Eye className="h-5 w-5 text-gray-600" />
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button
              onClick={() => handleSearchClick('electronics')}
              className="w-full text-left p-3 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-700 rounded-lg transition-all duration-200 border border-gray-200 hover:border-blue-200"
            >
              <div className="font-medium">Browse Electronics</div>
              <div className="text-sm text-gray-500">Latest gadgets and tech</div>
            </button>
            <button
              onClick={() => handleSearchClick('fashion')}
              className="w-full text-left p-3 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-700 rounded-lg transition-all duration-200 border border-gray-200 hover:border-blue-200"
            >
              <div className="font-medium">Explore Fashion</div>
              <div className="text-sm text-gray-500">Trendy clothing and accessories</div>
            </button>
            <button
              onClick={() => handleSearchClick('under 100')}
              className="w-full text-left p-3 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-700 rounded-lg transition-all duration-200 border border-gray-200 hover:border-blue-200"
            >
              <div className="font-medium">Budget Finds</div>
              <div className="text-sm text-gray-500">Products under $100</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
