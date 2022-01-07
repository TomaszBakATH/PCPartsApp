import React from "react";
import ProposedAnnouncements from "../components/ProposedAnnouncements/ProposedAnnouncements";
import HomepageBanner from "../components/HomepageBanner/HomepageBanner";
import CategoryList from "../components/CategoryList/CategoryList";
import Searchbar from "../components/Searchbar/Searchbar";

const HomePage = (props) => {

    const {name} = props;
    return (
        <div>
            <Searchbar />
            <CategoryList />
            <HomepageBanner />
            <ProposedAnnouncements />
        </div>
    );
}

export default HomePage;