import React from "react";
import "./home.scss";
import HomePromoSection from "./components/HomePromoSection";
import FeatureSection from "./components/FeatureSection";

const Home = () => {
   return (
     <>
        <HomePromoSection/>
        <FeatureSection/>
     </>
   );
};

export default Home;