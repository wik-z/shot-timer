import React from 'react';

function TimerButtons({ mode, modes, onStartButtonClick, onStopButtonClick }) {
    return (
        <div className="timer-buttons">
            {mode === modes.OFF && <button onClick={onStartButtonClick}>START</button>}
            {mode === modes.STANDBY && <button disabled>STANDBY</button>}
            {mode === modes.ON && <button onClick={onStopButtonClick}>STOP</button>}
        </div>
    )
}

export default TimerButtons;