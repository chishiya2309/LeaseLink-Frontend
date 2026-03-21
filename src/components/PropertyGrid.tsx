import { useState } from 'react';
import { PropertyCard } from './PropertyCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { mockProperties } from '../data/mockData';

const PROPERTIES_PER_PAGE = 8;

export function PropertyGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(mockProperties.length / PROPERTIES_PER_PAGE);

  const startIndex = (currentPage - 1) * PROPERTIES_PER_PAGE;
  const currentProperties = mockProperties.slice(startIndex, startIndex + PROPERTIES_PER_PAGE);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Bất động sản nổi bật</h2>
          <p className="text-gray-500">Khám phá các không gian sống tuyệt vời dành cho bạn</p>
        </div>
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {currentProperties.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 mt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Trang trước"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>

          <div className="flex space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-teal-600 text-white'
                    : 'hover:bg-gray-50 text-gray-700 border border-transparent'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Trang tiếp theo"
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>
      )}
    </div>
  );
}
