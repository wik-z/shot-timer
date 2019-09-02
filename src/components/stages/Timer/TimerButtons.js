import React from 'react';
import './TimerButtons.css';

function TimerButtons({ mode, modes, onStartButtonClick, onStopButtonClick }) {
    return (
        <div className="timer-buttons">
            {mode === modes.OFF && <button className="timer-button timer-button-start" onClick={onStartButtonClick}>START</button>}
            {mode === modes.STANDBY && <button className="timer-button timer-button-standby" disabled>STANDBY</button>}
            {mode === modes.ON && <button className="timer-button timer-button-stop" onClick={onStopButtonClick}>STOP</button>}
        </div>
    )
}

export default TimerButtons;