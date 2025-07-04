import React from 'react';

const Filters = ({ statusFilter, setStatusFilter, dateRange, setDateRange }) => {
  const statusOptions = ['All Launches', 'Upcoming Launches', 'Successful Launches', 'Failed Launches'];
  const dateOptions = [
    'Past week',
    'Past month',
    'Past 3 months',
    'Past 6 months',
    'Past year',
    'Past 2 years'
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
      {/* Date Filter */}
      <div className="flex items-center gap-2">
        <label htmlFor="dateRange" className="font-medium text-sm">
          📅 Date:
        </label>
        <select
          id="dateRange"
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="border px-3 py-1 rounded-md text-sm"
        >
          {dateOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* Status Filter */}
      <div className="flex items-center gap-2">
        <label htmlFor="statusFilter" className="font-medium text-sm">
          🎯 Status:
        </label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-1 rounded-md text-sm"
        >
          {statusOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
