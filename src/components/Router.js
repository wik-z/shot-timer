import React from 'react';
import AppContext, { stages } from '../contexts/AppContext';
import Privileges from './stages/Privileges';
import Calibration from './stages/Calibration';

const stageMap = {
    [stages.STAGE_CALIBRATION]: Calibration,
    [stages.STAGE_PRIVILEGES]: Privileges
}

class Router extends React.Component {
    render() {
        return (
            <AppContext.Consumer>
                {(context) => React.createElement(stageMap[context.stage], context)}
            </AppContext.Consumer>
        )
    }
}

export default Router;