import React from 'react';
import { Search, TrendingUp, Clock, Sparkles, Zap } from 'lucide-react';

interface SearchSuggestionsProps {
  query: string;
  suggestions: {
    recent: string[];
    popular: string[];
    matching: string[];
  };
  onSuggestionClick: (suggestion: string) => void;
  onClose: () => void;
}

export function SearchSuggestions({ query, suggestions, onSuggestionClick, onClose }: SearchSuggestionsProps) {
  const allSuggestions = [
    ...suggestions.recent,
    ...suggestions.popular,
    ...suggestions.matching
  ];

  if (allSuggestions.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-gray-50 px-4 py-3 border-b border-gray-100 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              Search suggestions for "{query}"
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Recent Searches */}
      {suggestions.recent.length > 0 && (
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Clock className="h-4 w-4" />
            Recent searches
          </div>
          <div className="space-y-2">
            {suggestions.recent.map((suggestion, index) => (
              <button
                key={suggestion}
                onClick={() => onSuggestionClick(suggestion)}
                className="w-full text-left px-3 py-2 hover:bg-amber-50 text-gray-700 hover:text-amber-700 rounded-lg transition-all duration-200 flex items-center gap-3 group"
              >
                <div className="w-2 h-2 bg-amber-400 rounded-full group-hover:scale-125 transition-transform"></div>
                <span className="font-medium">{suggestion}</span>
              </button>
            ))}
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
            {suggestions.popular.map((suggestion, index) => (
              <button
                key={suggestion}
                onClick={() => onSuggestionClick(suggestion)}
                className="w-full text-left px-3 py-2 hover:bg-amber-50 text-gray-700 hover:text-amber-700 rounded-lg transition-all duration-200 flex items-center gap-3 group"
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full group-hover:scale-125 transition-transform"></div>
                <span className="font-medium">{suggestion}</span>
                <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                  Trending
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Matching Suggestions */}
      {suggestions.matching.length > 0 && (
        <div className="p-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Sparkles className="h-4 w-4" />
            Smart suggestions
          </div>
          <div className="space-y-2">
            {suggestions.matching.map((suggestion, index) => (
              <button
                key={suggestion}
                onClick={() => onSuggestionClick(suggestion)}
                className="w-full text-left px-3 py-2 hover:bg-amber-50 text-gray-700 hover:text-amber-700 rounded-lg transition-all duration-200 flex items-center gap-3 group"
              >
                <div className="w-2 h-2 bg-purple-400 rounded-full group-hover:scale-125 transition-transform"></div>
                <span className="font-medium">{suggestion}</span>
                <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                  AI
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="sticky bottom-0 bg-gray-50 px-4 py-3 border-t border-gray-100 rounded-b-xl">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <Zap className="h-3 w-3" />
            <span>Use ↑↓ arrows to navigate, Enter to select</span>
          </div>
          <span>{allSuggestions.length} suggestions</span>
        </div>
      </div>
    </div>
  );
}
