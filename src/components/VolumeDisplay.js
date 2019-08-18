import React from 'react';
import './VolumeDisplay.css';

function VolumeDisplay({ volume, peak, treshold }) {
    return (
        <div className="volume-display">
            <div className="bar" style={{ width: `${volume}%`}} />
            <div className="peak-indicator"  />
            <div className="threshold-indicator" style={{ width: `${treshold}%`}} />
        </div>
    )
}

export default VolumeDisplay;