import React from 'react';
import MicrophoneService from '../../services/MicrophoneService';
import VolumeDisplay from '../VolumeDisplay';
import InputDeviceSelector from '../InputDeviceSelector';
import { stages } from '../../contexts/AppContext';
import Stage from './Stage';

import './Privileges.css';

class Privileges extends React.Component {
    state = {
        error: false,
        goodToProceed: false,
        clickedStart: false,
        selectedDevice: '',
        volume: 0
    }

    constructor(props) {
        super(props);

        this.handleVolumeChange = this.handleVolumeChange.bind(this);
    }
    
    async componentDidMount() {
        if (MicrophoneService.error) {
            console.error('MicrophoneService failed to load');

            this.setState({
                error: true
            });
        }
    }

    async init() {
        try {
            MicrophoneService.init();

            const devices = await MicrophoneService.getAvailableInputDevices();
    
            if (!devices || !devices.length) {
                console.log('No devices found!');

                return this.setState({
                    error: true
                });
            }
    
            MicrophoneService.selectDevice(this.state.selectedDevice);
            MicrophoneService.on('volume-change', this.handleVolumeChange);
            
            await MicrophoneService.listen();

            this.setState({
                goodToProceed: true
            })
        } catch (e) {
            console.log(e);

            this.setState({
                error: true
            });
        }
    }

    componentWillUnmount() {
        MicrophoneService.removeListener('volume-change', this.handleVolumeChange);
    }

    handleVolumeChange(volume) {
        this.setState({
            volume
        });
    }

    handleClickedStart() {
        this.setState({
            clickedStart: true
        });

        this.init();
    }

    handleProceed() {
        this.props.changeStage(stages.STAGE_CALIBRATION);
    }

    handleDeviceChange(e) {
        const value = e.target.value;

        this.setState({
            selectedDevice: value
        });
    }

    render() {
        return (
            <Stage id="privileges">
                {this.state.error ? (
                    <div className="error">
                        <p>An error occured.</p> 
                        <p>Looks like your browser doesn't support our core features (or you didn't grant us access).</p>
                    </div>
                ) : (
                    <div>
                        {this.state.goodToProceed ? (
                            <div className="current-read">
                                <h2>Current microphone read:</h2>
                                <VolumeDisplay volume={this.state.volume} />
                                <h4>All good?</h4>
                                <p>
                                    (If not, it might be worth reloading the page and picking a different device)
                                </p>
                                <button 
                                    onClick={this.handleProceed.bind(this)}
                                    className="btn"
                                >PROCEED</button>
                            </div>
                        ) : (
                            <div className="access-request">
                                {this.state.clickedStart ? (
                                    <>
                                        <p>Waiting for access to microphone...</p>
                                    </>
                                ) : (
                                    <>

                                        <h4>
                                            We need access to your microphone <i>(duh...)</i>
                                        </h4>
                                        {this.state.selectedDevice ? (
                                            <>
                                                <p>Now click the button below to start.</p>
                                                <p>
                                                    <button
                                                        onClick={this.handleClickedStart.bind(this)}
                                                        className="btn"    
                                                    >
                                                        START
                                                    </button>
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <p>First, please select the microphone you'd like to use:</p>
                                                <InputDeviceSelector
                                                    value={this.state.selectedDevice}
                                                    onChange={this.handleDeviceChange.bind(this)}
                                                />
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </Stage>
        )
    }
}

export default Privileges;