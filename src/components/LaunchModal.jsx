import React from 'react';

const LaunchModal = ({ launch, onClose }) => {
  if (!launch) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-btn">X</button>
        <h2>{launch.name}</h2>
        <p><strong>Date:</strong> {new Date(launch.date_utc).toLocaleString()}</p>
        <p><strong>Rocket:</strong> {launch.rocket?.name || "N/A"}</p>
        <p><strong>Launchpad:</strong> {launch.launchpad?.name || "N/A"}</p>
        <p><strong>Status:</strong> {launch.success ? "Success" : launch.upcoming ? "Upcoming" : "Failed"}</p>
        <p><strong>Details:</strong> {launch.details || "No details available."}</p>
      </div>
    </div>
  );
};

export default LaunchModal;
