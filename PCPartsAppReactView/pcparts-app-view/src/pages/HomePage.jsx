import React from "react";

const Home = (props) => {

    const {name} = props;
    return (
        <div>
            {name? "witaj " + name.toString(): "unknow"}
        </div>
    );
}

export default Home;