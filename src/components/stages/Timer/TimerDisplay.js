import React from 'react';
import './TimerDisplay.css';

function formatNumber(value) {
    const toFloat = value / 1000;
    const twoLast = parseFloat((toFloat - Math.floor(toFloat)).toFixed(2)) * 1000;
    const mainPart = Math.floor(toFloat);

    return String(mainPart).padStart(2, '0') + ':' + String(twoLast).substr(0, 2);
}

function TimerDisplay({ value }) {
    return (
        <div className="timer-display">
            <span>
                {value ? formatNumber(value) : '--:--'}
            </span>
        </div>
    )
}

export default TimerDisplay;