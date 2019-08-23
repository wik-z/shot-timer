import React from 'react';
import Stage from './Stage';
import VolumeDisplay from '../VolumeDisplay';
import EqualizerDisplay from '../EqualizerDisplay';
import MicrophoneService from '../../services/MicrophoneService';
import './Calibration.css';

const modes = {
    NEW_PROFILE: 'new-profile',
    SELECT_PROFILES: 'select-profiles'
}

const captureModes = {
    STANDBY: 'standby',
    LISTENING: 'listening'
}

class Calibration extends React.Component {
    state = {
        volume: MicrophoneService.volume,
        threshold: 45,
        profiles: [],
        selectedProfiles: [],
        mode: modes.NEW_PROFILE,
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
        this.loadCalibrationData();
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

    loadCalibrationData() {
        let storedConfig = localStorage.getItem('calibration');
        
        if (!storedConfig) {
            return;
        }

        try {
            storedConfig = JSON.parse(storedConfig);
        } catch (e) {
            console.error(e);
            localStorage.removeItem('calibration');
            return;
        }

        if (storedConfig.profiles && storedConfig.profiles.length) {
            this.setState({
                mode: modes.SELECT_PROFILES,
                profiles: storedConfig.profiles,
                threshold: storedConfig.threshold || this.state.threshold
            });
        }
    }

    handleVolumeChange(volume) {
        this.setState({
            volume 
        });
    }

    handleAudioProcess({ event, processor }) {
        if (this.state.mode !== modes.NEW_PROFILE) {
            return;
        }

        if (MicrophoneService.volume >= this.state.threshold) {
            console.log('ABOVE THRESHOLD');

            if (this.state.captureMode === captureModes.STANDBY) {
                const read = Array.from(event.inputBuffer.getChannelData(0));

                console.log('UPDATING SAMPLE');

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

    handleNewProfileSubmit() {
        // for now: let's see the most active frequencies
        const frequencies = this.state.recentCapturedSample
            .reduce((a, b, i) => {
                if (b > 0.4) {
                    return [...a, i];
                }

                return a;
            }, []);

        console.log(frequencies);
    }

    render() {
        return (
            <Stage id="calibration">
                {this.state.mode === modes.NEW_PROFILE ? (
                    <>
                        <h2>
                            Let's create {this.state.profiles.length ? 'another' : 'your first'} profile
                        </h2>
                        <p>
                            <strong>Profile</strong> is basically a set of information I collect about the sound of your firearm<br/>
                            so that we can identify it better (otherwise I'll just pick up background noise as shots). 
                        </p>
                        <p>
                            I really think you should create <strong>1 profile per every gun you use</strong> in your excercises,<br />
                            although I can't promise I will always differentiate between them correctly.
                        </p>
                        <h3>First, let's adjust the volume threshold</h3>
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
                                <EqualizerDisplay values={this.state.recentCapturedSample.slice(127, 383)} />
                                <p>If it looks right, name this profile and press "Continue".</p>
                                <input type="text" placeholder="Profile name..." /><br />
                                <button className="btn" onClick={this.handleNewProfileSubmit.bind(this)}>CONTINUE</button>
                            </>
                        )}
                    </>
                ) : (
                    <>

                    </>
                )}
            </Stage>
        )
    }
}

export default Calibration;