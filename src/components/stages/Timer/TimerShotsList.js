import React from 'react';

function TimerShotsList({ startTimestamp, shots }) {
    if (!startTimestamp || shots.length === 0) {
        return null;
    }

    return (
        <div className="timer-shots-list">
            <ul>
                {shots.map(shot => {
                    return <li>{shot - startTimestamp}</li>
                })}
            </ul>
        </div>
    );
}

export default TimerShotsList;