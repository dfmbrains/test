import React from "react";
import "./profileBar.scss";
import ProfileCard from "../ProfileCard";

const ProfileBar = () => {
   return (
     <section className="profileBar">
        <div className="container">
           <ProfileCard type={"profileBar"} needMenu={false}/>
        </div>
     </section>
   );
};

export default ProfileBar;