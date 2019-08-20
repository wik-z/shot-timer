import React from 'react';
import MicrophoneService from '../services/MicrophoneService';

class InputDeviceSelector extends React.Component {
    state = {
        availableDevices: [],
    }

    async componentDidMount() {
        const availableDevices = await MicrophoneService.getAvailableInputDevices();

        this.setState({
            availableDevices
        });
    }

    render() {
        return (
            <select value={this.props.value} onChange={this.props.onChange}>
                <option value={null}>Please select an input device</option>
                {this.state.availableDevices.map((device, index) => {
                    return <option 
                        value={device.deviceId}
                        key={device.deviceId}
                    >{device.label || `Unknown device #${index + 1}`}</option>
                })}
            </select>
        )
    }
}

export default InputDeviceSelector;