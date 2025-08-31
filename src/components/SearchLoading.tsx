import React from 'react';
import { Search, Loader2 } from 'lucide-react';

interface SearchLoadingProps {
  query: string;
}

export function SearchLoading({ query }: SearchLoadingProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Loading Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-blue-100 rounded-full">
            <Search className="h-8 w-8 text-blue-600" />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Searching...
            </h1>
            <p className="text-xl text-gray-600">
              Looking for products matching "{query}"
            </p>
          </div>
        </div>
        
        {/* Loading Query Display */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-blue-800 bg-blue-100 px-3 py-1 rounded-full">Searching for:</span>
            <span className="text-lg font-semibold text-blue-900">"{query}"</span>
            <div className="ml-auto">
              <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
            </div>
          </div>
        </div>
      </div>

      {/* Loading Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 animate-pulse">
            {/* Image skeleton */}
            <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
            
            {/* Content skeleton */}
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              
              {/* Price skeleton */}
              <div className="h-6 bg-blue-200 rounded w-1/3"></div>
              
              {/* Button skeleton */}
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Loading Message */}
      <div className="text-center py-12">
        <div className="inline-flex items-center gap-3 text-gray-600">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span className="text-lg">Finding the best products for you...</span>
        </div>
        <p className="text-gray-500 mt-2">This usually takes just a moment</p>
      </div>
    </div>
  );
}
