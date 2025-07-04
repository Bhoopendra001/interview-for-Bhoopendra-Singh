import React from 'react';

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center text-gray-500">
      <img
        src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
        alt="No data"
        className="w-24 h-24 mb-4 opacity-60"
      />
      <p className="text-lg font-medium">No results found for the selected filter.</p>
      <p className="text-sm">Try changing the filter or date range.</p>
    </div>
  );
};

export default EmptyState;
