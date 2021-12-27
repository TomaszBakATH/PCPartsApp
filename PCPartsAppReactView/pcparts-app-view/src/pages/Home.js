import React from "react";

const Home = (props) => {

    const {name} = props;
    return (
        <div>
            {name? "Hi " + name.toString(): "chuj"}
        </div>
    );
}

export default Home;