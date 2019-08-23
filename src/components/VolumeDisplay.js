import React from 'react';
import './VolumeDisplay.css';

function VolumeDisplay({ volume, peak, threshold }) {
    return (
        <div className="volume-display">
            <div className="bar" style={{ width: `${volume}%`}} />
            {peak && <div className="peak-indicator" />}
            {threshold && <div className="threshold-indicator" style={{ width: `${threshold}%`}} />}
        </div>
    )
}

export default VolumeDisplay;