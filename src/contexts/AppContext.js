import React, { createContext } from 'react';

export const stages = {
    STAGE_PRIVILEGES: 'privileges',
    STAGE_CALIBRATION: 'calibration',
    STAGE_TIMER: 'timer'
};

const AppContext = createContext({
    stage: stages.STAGE_PRIVILEGES,
    changeStage: (state) => {} 
});


class Controller extends React.Component {
    state = {
        stage: stages.STAGE_PRIVILEGES,
        changeStage: this.changeStage
    }

    constructor(props) {
        super(props);

        this.state.changeStage = this.changeStage.bind(this);
    }

    changeStage(stage) {
        this.setState({
            stage
        });
    }
    
    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}

AppContext.Controller = Controller;

export default AppContext;