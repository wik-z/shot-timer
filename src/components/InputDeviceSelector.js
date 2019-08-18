import React from 'react';

class InputDeviceSelector extends React.Component {
    state = {
        availableDevices: [],
    }

    componentDidMount() {
        this.loadAvailableDevices();
    }

    loadAvailableDevices() {
        
    }

    render() {
        return (
            <select value={this.props.value} onChange={this.props.onChange}>
                <option value={null}>Please select an input device</option>
                {this.state.availableDevices.map((device) => {
                    return <option value={device.deviceId}>{device.label}</option>
                })}
            </select>
        )
    }
}

export default InputDeviceSelector;