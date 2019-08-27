import React from 'react';
import './Stage.css';

function Stage({ children, id }) {
    return (
        <div className="stage-wrapper" id={`stage-${id}`}>
            <div className="stage-inner">
                {children}
            </div>
        </div>
    )
}

export default Stage;