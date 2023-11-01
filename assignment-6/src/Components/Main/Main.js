import React from 'react';
import Body from './Body/Body';
import LeftSide from './LeftSide/LeftSide';

const Main = () => {
    return (
        <section className="wrapper">
            <LeftSide></LeftSide>
            {/* <!-- posts container  --> */}
            <Body></Body>
        </section>
    );
};

export default Main;