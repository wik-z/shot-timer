import React from 'react';
import './EqualizerDisplay.css';

function EqualizerDisplay({ values }) {
    return (
        <div className="equalizer-display">
            {values.map(value => {
                return <div className="inner" style={{ height: `${Math.round(100 - (value * 100 / 255))}px`}} />
            })}
        </div>
    )
}

export default EqualizerDisplay;