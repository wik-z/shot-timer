import React from 'react';
import './TimerShotsList.css';
import { formatSplitMs } from '../../../formatters/formatSplitMs';

function TimerShotsList({ startTimestamp, shots }) {
    if (!startTimestamp || shots.length === 0) {
        return null;
    }

    return (
        <div className="timer-shots-list">
            <ul>
                {shots.map((shot, i) => {
                    return <li>+ {formatSplitMs(shot - (i === 0 ? startTimestamp : shots[i-1]))}</li>
                })}
            </ul>
        </div>
    );
}

export default TimerShotsList;