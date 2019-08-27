import React from 'react';
import Stage from './Stage';
import VolumeDisplay from '../VolumeDisplay';
import MicrophoneService from '../../services/MicrophoneService';
import './Calibration.css';
import AppContext, { stages } from '../../contexts/AppContext';

// todo: move somewhere global
const captureModes = {
    STANDBY: 'standby',
    LISTENING: 'listening'
}

class Calibration extends React.Component {
    static contextType = AppContext;

    state = {
        volume: MicrophoneService.volume,
        threshold: 45,
        captureMode: captureModes.STANDBY,
        recentCapturedSample: null
    }

    constructor(props) {
        super(props);

        this.handleVolumeChange = this.handleVolumeChange.bind(this);
        this.handleThresholdChange = this.handleThresholdChange.bind(this);
        this.handleAudioProcess = this.handleAudioProcess.bind(this);
    }

    componentDidMount() {
        this.initMicrophoneService();
    }

    componentWillUnmount() {
        MicrophoneService.removeListener('volume-change', this.handleVolumeChange);
        MicrophoneService.removeListener('audio-process', this.handleAudioProcess);
    }

    initMicrophoneService() {
        MicrophoneService.on('volume-change', this.handleVolumeChange);
        MicrophoneService.on('audio-process', this.handleAudioProcess);
    }

    handleVolumeChange(volume) {
        this.setState({
            volume 
        });
    }

    handleAudioProcess({ event, processor }) {
        if (MicrophoneService.volume >= this.state.threshold) {
            if (this.state.captureMode === captureModes.STANDBY) {
                const read = Array.from(event.inputBuffer.getChannelData(0));

                this.setState({
                    captureMode: captureModes.LISTENING,
                    recentCapturedSample: read
                });
            }

            return;
        }

        if (this.state.captureMode === captureModes.LISTENING) {
            this.setState({
                captureMode: captureModes.STANDBY,
            });
        }
    }

    handleThresholdChange(e) {
        this.setState({
            threshold: e.target.value
        });
    }

    handleSubmit() {
        // set current threshold in global context
        this.context.changeThreshold(this.state.threshold);
        this.context.changeStage(stages.STAGE_TIMER);
    }

    render() {
        return (
            <Stage id="calibration">
                <h2>
                    Let's pick the right sound
                </h2>
                <h3>Before we start, we need to set threshold right</h3>
                <p>Try placing a few shots and adjusting the value below to make sure I pick up shots only.</p>
                <p>Also, for best results, keep your phone exactly where you'll have it during shooting.</p>
                <div className="threshold-regulation">
                    <div className="threshold-range-input">
                        <input 
                            type="range" 
                            min="0"
                            max="100"
                            step="1"
                            value={this.state.threshold} 
                            onChange={this.handleThresholdChange}
                        />
                    </div>
                    <VolumeDisplay 
                        volume={this.state.volume} 
                        threshold={this.state.threshold}
                    />
                </div>
                {this.state.recentCapturedSample && (
                    <>
                        <p>If it looks right, let's continue to the interesting part!</p>
                        <button className="btn" onClick={this.handleSubmit.bind(this)}>CONTINUE</button>
                    </>
                )}
            </Stage>
        )
    }
}

export default Calibration;