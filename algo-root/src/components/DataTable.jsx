import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, Search } from 'lucide-react';

const ITEMS_PER_PAGE = 10;

const mockData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: ['Admin', 'User', 'Editor'][Math.floor(Math.random() * 3)],
  status: ['Active', 'Inactive'][Math.floor(Math.random() * 2)],
  lastActive: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString(),
}));

const DataTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedData = useMemo(() => {
    return mockData
      .filter(item =>
        Object.values(item).some(value =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
      .sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
  }, [searchTerm, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredAndSortedData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredAndSortedData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="h-screen w-full flex flex-col items-center bg-gray-100 p-4 sm:p-6">
      
      <div className="mb-4 w-full max-w-4xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 sm:top-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
        </div>
      </div>

      
      <div className="w-full max-w-6xl overflow-hidden rounded-lg shadow-lg bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm">
            <thead className="bg-indigo-600 text-white">
              <tr>
                {Object.keys(mockData[0]).map((key) => (
                  <th
                    key={key}
                    className="px-2 py-2 sm:px-6 sm:py-3 text-left font-semibold tracking-wider uppercase cursor-pointer text-xs sm:text-sm"
                    onClick={() => handleSort(key)}
                  >
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <span>{key}</span>
                      <div className="flex flex-col">
                        <ChevronUp
                          className={`h-3 w-3 sm:h-4 sm:w-4 ${
                            sortField === key && sortDirection === 'asc' ? 'text-white' : 'text-gray-300'
                          }`}
                        />
                        <ChevronDown
                          className={`h-3 w-3 sm:h-4 sm:w-4 ${
                            sortField === key && sortDirection === 'desc' ? 'text-white' : 'text-gray-300'
                          }`}
                        />
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  {Object.values(item).map((value, index) => (
                    <td key={index} className="px-2 py-2 sm:px-6 sm:py-4 text-gray-700 text-xs sm:text-sm">
                      {value.toString()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

     
      <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between w-full max-w-4xl">
        <p className="text-xs sm:text-sm text-gray-700 text-center sm:text-left mb-2 sm:mb-0">
          Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
          {Math.min(currentPage * ITEMS_PER_PAGE, filteredAndSortedData.length)} of{' '}
          {filteredAndSortedData.length} users
        </p>
        <div className="flex space-x-1 sm:space-x-2 justify-center">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 sm:px-4 sm:py-2 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-200 disabled:opacity-50 text-xs sm:text-sm"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 sm:px-4 sm:py-2 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-200 disabled:opacity-50 text-xs sm:text-sm"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
