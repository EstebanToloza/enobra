import React from 'react';

const Main = ({ children }) => {
    return (
        <div>
            <div>este es el principio del main content</div>
            {children}
            <div>este es el final del main content</div>
        </div>
    );
};

export default Main;
