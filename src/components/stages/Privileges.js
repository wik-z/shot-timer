import React from 'react';
import MicrophoneService from '../../services/MicrophoneService';
import VolumeDisplay from '../VolumeDisplay';
import { stages } from '../../contexts/AppContext';
// import { stages } from '../../contexts/AppContext';

class Privileges extends React.Component {
    state = {
        error: false,
        goodToProceed: false,
        clickedStart: false,
        volume: 0
    }

    constructor(props) {
        super(props);

        this.handleVolumeChange = this.handleVolumeChange.bind(this);
    }
    
    async componentDidMount() {
        if (MicrophoneService.error) {
            this.setState({
                error: true
            });
        }
    }

    async init() {
        try {
            MicrophoneService.init();

            const devices = await MicrophoneService.getAvailableInputDevices();
    
            if (!devices || devices.length < 4) {
                return this.setState({
                    error: true
                });
            }
    
            MicrophoneService.selectDevice(devices[3].deviceId);
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

    render() {
        return (
            <div className="stage-privileges">
                {this.state.error ? (
                    <div className="error">
                        <p>An error occured.</p> 
                        <p>Looks like your browser doesn't support our core features (or you didn't grant us access).</p>
                    </div>
                ) : (
                    <div>
                        {this.state.goodToProceed ? (
                            <div className="current-read">
                                <h2>Our current microphone read:</h2>
                                <VolumeDisplay volume={this.state.volume} />
                                <h4>All good?</h4>
                                <button onClick={this.handleProceed.bind(this)}>PROCEED</button>
                            </div>
                        ) : (
                            <div className="access-request">
                                {this.state.clickedStart ? (
                                    <>
                                        <p>Waiting for access to microphone...</p>
                                    </>
                                ) : (
                                    <>
                                        <p>We need access to your microphone (duh)</p>
                                        <p>Please click the button below to start.</p>
                                        <p>
                                            <button onClick={this.handleClickedStart.bind(this)}>
                                                START
                                            </button>
                                        </p>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        )
    }
}

export default Privileges;