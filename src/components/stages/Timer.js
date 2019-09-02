import React from 'react';
import Stage from './Stage';
import './Timer.css';

import TimerDisplay from './Timer/TimerDisplay';
import TimerButtons from './Timer/TimerButtons';

import Beeper from '../../services/Beeper';
import MicrophoneService from '../../services/MicrophoneService';
import AppContext from '../../contexts/AppContext';
import TimerShotsList from './Timer/TimerShotsList';

export const modes = {
    OFF: 'off', // excercise has not started yet
    STANDBY: 'standby', // button has been pressed, waiting for the buzzer
    ON: 'on' // registering shots
}

const captureModes = {
    STANDBY: 'standby', // waiting to go over threshold
    LISTENING: 'listening' // current soundwave is over volume threshold
}

class Timer extends React.Component {
    static contextType = AppContext;

    state = {
        mode: modes.OFF,
        captureMode: captureModes.STANDBY,
        shots: [],
    }

    beeper = new Beeper();

    constructor(props) {
        super(props);

        this.handleStartButton = this.handleStartButton.bind(this);
        this.handleStopButton = this.handleStopButton.bind(this);
        this.startExcercise = this.startExcercise.bind(this);
        this.handleVolumeChange = this.handleVolumeChange.bind(this);
    }

    componentDidMount() {
        this.initMicrophoneService();
    }

    componentWillUnmount() {
        MicrophoneService.removeListener('volume-change', this.handleVolumeChange);
    }

    initMicrophoneService() {
        MicrophoneService.on('volume-change', this.handleVolumeChange);
    }

    handleVolumeChange(volume) {
        if (this.state.mode !== modes.ON) {
            return;
        }

        if (volume < this.context.threshold) {
            if (this.state.captureMode === captureModes.LISTENING) {
                this.setState({
                    captureMode: captureModes.STANDBY
                });
            }
            return;
        }

        if (this.state.captureMode === captureModes.STANDBY) {
            this.setState({
                captureMode: captureModes.LISTENING,
                shots: [
                    ...this.state.shots,
                    (new Date()).getTime()
                ]
            });
        }
    }

    handleStartButton() {
        this.setState({
            mode: modes.STANDBY,
            shots: [],
        });

        setTimeout(this.startExcercise, 2000);
    }

    startExcercise() {
        this.beeper.play();

        // avoid catching the beeper as a sample
        setTimeout(() => {
            this.setState({
                mode: modes.ON,
                captureMode: captureModes.LISTENING,
                startTimestamp: (new Date()).getTime() - this.beeper.duration,
            });
        }, this.beeper.duration);
    }

    handleStopButton() {
        this.setState({
            mode: modes.OFF
        });
    }

    getLastShotDelta() {
        const { shots, startTimestamp } = this.state;

        if (shots.length === 0 || !startTimestamp) {
            return null;
        }

        const lastShot = shots[shots.length - 1];

        return lastShot - startTimestamp;
    }

    render() {
        return (
            <Stage id="timer">
                <TimerDisplay
                    value={this.getLastShotDelta()}
                />
                <TimerShotsList
                    startTimestamp={this.state.startTimestamp}
                    shots={this.state.shots}
                />
                <TimerButtons
                    modes={modes}
                    mode={this.state.mode}
                    onStartButtonClick={this.handleStartButton}
                    onStopButtonClick={this.handleStopButton}
                />
            </Stage>
        )
    }
}

export default Timer;