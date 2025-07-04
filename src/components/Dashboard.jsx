import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import spacexLogo from '../assets/spacex-logo.png';

const Dashboard = () => {
  const [launches, setLaunches] = useState([]);
  const [filteredLaunches, setFilteredLaunches] = useState([]);
  const [timeRange, setTimeRange] = useState('All Time');
  const [statusFilter, setStatusFilter] = useState('All Launches');
  const [customDate, setCustomDate] = useState('');
  const [rockets, setRockets] = useState({});
  const [launchpads, setLaunchpads] = useState({});
  const [selectedLaunch, setSelectedLaunch] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get('https://api.spacexdata.com/v4/rockets').then((res) => {
      const map = {};
      res.data.forEach((r) => (map[r.id] = r));
      setRockets(map);
    });

    axios.get('https://api.spacexdata.com/v4/launchpads').then((res) => {
      const map = {};
      res.data.forEach((p) => (map[p.id] = p.name));
      setLaunchpads(map);
    });

    axios.get('https://api.spacexdata.com/v4/launches')
      .then((res) => {
        const shuffled = res.data.sort(() => 0.5 - Math.random());
        const updated = shuffled.map((item, index) => {
          const date = new Date();
          const offset = index % 20;
          date.setMonth(date.getMonth() - offset);
          return { ...item, date_utc: date.toISOString() };
        });
        setLaunches(updated);
        setFilteredLaunches(updated);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    applyFilters();
  }, [timeRange, statusFilter, customDate, launches]);

  const applyFilters = () => {
    let filtered = [...launches];

    const getPastDate = (months) => {
      const d = new Date();
      d.setMonth(d.getMonth() - months);
      d.setHours(0, 0, 0, 0);
      return d;
    };

    if (timeRange !== 'All Time') {
      if (timeRange === 'Custom Date' && customDate) {
        const selectedDate = new Date(customDate);
        selectedDate.setHours(0, 0, 0, 0);
        filtered = filtered.filter(
          (l) => new Date(l.date_utc).toDateString() === selectedDate.toDateString()
        );
      } else {
        const dateMap = {
          'Past Month': 1,
          'Past 3 Months': 3,
          'Past 6 Months': 6,
          'Past Year': 12,
          'Past 2 Years': 24
        };
        const months = dateMap[timeRange];
        const fromDate = getPastDate(months);
        filtered = filtered.filter((l) => new Date(l.date_utc) >= fromDate);
      }
    }

    if (statusFilter === 'Success') {
      filtered = filtered.filter((l) => l.success);
    } else if (statusFilter === 'Failed') {
      filtered = filtered.filter((l) => l.success === false && !l.upcoming);
    } else if (statusFilter === 'Upcoming') {
      filtered = filtered.filter((l) => l.upcoming);
    }

    setFilteredLaunches(filtered);
  };

  const getLaunchStatus = (launch) => {
    if (launch.upcoming) return 'Upcoming';
    if (launch.success) return 'Success';
    return 'Failed';
  };

  const renderBadge = (status) => {
    const className = status.toLowerCase();
    return <span className={`badge ${className}`}>{status}</span>;
  };

  const openModal = (launch) => {
    setSelectedLaunch(launch);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedLaunch(null);
    setShowModal(false);
  };

  return (
    <div className="dashboard">
      {showModal && selectedLaunch && (
        <div className={`popup-modal ${getLaunchStatus(selectedLaunch).toLowerCase()}`}>
          <div className="popup-content">
            <h2>{selectedLaunch.name}</h2>
            <p><strong>Status:</strong> {getLaunchStatus(selectedLaunch)}</p>
            <p><strong>Rocket:</strong> {rockets[selectedLaunch.rocket]?.name}</p>
            <p><strong>Rocket Type:</strong> {rockets[selectedLaunch.rocket]?.type}</p>
            <p><strong>Manufacturer:</strong> {rockets[selectedLaunch.rocket]?.company}</p>
            <p><strong>Nationality:</strong> {rockets[selectedLaunch.rocket]?.country}</p>
            <p><strong>Launch Date:</strong> {new Date(selectedLaunch.date_utc).toLocaleString()}</p>
            <p><strong>Payload Type:</strong> {selectedLaunch.payloads?.[0]?.type || 'N/A'}</p>
            <p><strong>Orbit:</strong> {selectedLaunch.payloads?.[0]?.orbit || 'N/A'}</p>
            <p><strong>Launch Site:</strong> {launchpads[selectedLaunch.launchpad]}</p>
            <p><strong>Details:</strong> {selectedLaunch.details || 'No details available.'}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}

      <div style={{ textAlign: 'center' }}>
        <img src={spacexLogo} alt="SpaceX Logo" className="spacex-logo" />
        
      </div>

      <div
  className="filters"
  style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    maxWidth: '1200px',
    margin: '20px auto',
    padding: '0 10px',
    gap: '40px',
  }}
>  </div>
        <div
  className="filters"
  style={{
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '20px auto',
    alignItems: 'flex-end',
  }}
>
  {/* Time Range Dropdown - Left */}
  <div
  className="filter-group"
  style={{
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap'
  }}
>
  <span role="img" aria-label="calendar" style={{ fontSize: '18px' }}>📅</span>
  <select
    id="timeRange"
    value={timeRange}
    onChange={(e) => setTimeRange(e.target.value)}
    style={{ height: '32px' }}
  >
    <option>All Time</option>
    <option>Past Month</option>
    <option>Past 3 Months</option>
    <option>Past 6 Months</option>
    <option>Past Year</option>
    <option>Past 2 Years</option>
    <option>Custom Date</option>
  </select>

  {timeRange === 'Custom Date' && (
    <input
      type="date"
      value={customDate}
      onChange={(e) => setCustomDate(e.target.value)}
      className="date-input"
      style={{ height: '32px' }}
    />
  )}
</div>


  {/* Launch Status Dropdown - Right */}
  <div className="filter-group" style={{ textAlign: 'right', minWidth: '200px' }}>
    <label htmlFor="statusFilter">
      Launch Status <span style={{ fontSize: '12px' }}>▼</span>
    </label>
    <select
      id="statusFilter"
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
    >
      <option>All Launches</option>
      <option>Success</option>
      <option>Failed</option>
      <option>Upcoming</option>
    </select>
  </div>
</div>

      


      {filteredLaunches.length === 0 ? (
        <div className="empty-state">🚀 No Launches Found for the selected filters.</div>
      ) : (
        <table className="launch-table">
          <thead>
            <tr>
              <th>Flight No.</th>
              <th>Launched (UTC)</th>
              <th>Location</th>
              <th>Mission</th>
              <th>Orbit</th>
              <th>Launch Status</th>
              <th>Rocket</th>
            </tr>
          </thead>
          <tbody>
            {filteredLaunches.map((launch, idx) => (
              <tr key={launch.id} onClick={() => openModal(launch)}>
                <td>{String(idx + 1).padStart(2, '0')}</td>
                <td>{new Date(launch.date_utc).toUTCString()}</td>
                <td>{launchpads[launch.launchpad] || 'Unknown'}</td>
                <td>{launch.name}</td>
                <td>{launch.payloads?.[0]?.orbit || 'LEO'}</td>
                <td>{renderBadge(getLaunchStatus(launch))}</td>
                <td>{rockets[launch.rocket]?.name || 'Unknown'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
