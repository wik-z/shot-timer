import React from 'react';
import './TimerDisplay.css';
import { formatSplitMs } from '../../../formatters/formatSplitMs';

function TimerDisplay({ value }) {
    return (
        <div className="timer-display">
            <span>
                {value ? formatSplitMs(value) : '--:--'}
            </span>
        </div>
    )
}

export default TimerDisplay;