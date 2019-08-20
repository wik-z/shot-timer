import React from 'react';
import './Stage.css';

function Stage({ children, id }) {
    return (
        <div className="stage-wrapper" id={`stage-${id}`}>
            {children}
        </div>
    )
}

export default Stage;