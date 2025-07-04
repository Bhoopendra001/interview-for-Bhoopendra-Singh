import React from 'react';
import moment from 'moment';

const LaunchTable = ({ launches, setSelectedLaunch }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-[600px] w-full border border-gray-200 text-sm md:text-base">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">No.</th>
            <th className="p-3">Launched (UTC)</th>
            <th className="p-3">Location</th>
            <th className="p-3">Mission</th>
            <th className="p-3">Orbit</th>
            <th className="p-3">Launch Status</th>
            <th className="p-3">Rocket</th>
          </tr>
        </thead>
        <tbody>
          {launches.map((launch, index) => (
            <tr
              key={launch.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedLaunch(launch)}
            >
              <td className="p-3">{String(index + 1).padStart(2, '0')}</td>
              <td className="p-3">{moment(launch.date_utc).format('DD MMM YYYY HH:mm')}</td>
              <td className="p-3">{launch.launchpad}</td>
              <td className="p-3">{launch.name}</td>
              <td className="p-3">{launch.orbit || 'N/A'}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded-full text-white text-xs ${
                    launch.upcoming
                      ? 'bg-yellow-500'
                      : launch.success
                      ? 'bg-green-500'
                      : 'bg-red-500'
                  }`}
                >
                  {launch.upcoming
                    ? 'Upcoming'
                    : launch.success
                    ? 'Success'
                    : 'Failed'}
                </span>
              </td>
              <td className="p-3">{launch.rocket}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LaunchTable;
