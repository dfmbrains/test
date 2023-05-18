import React from "react";
import {Outlet} from "react-router-dom";
import BottomBar from "../BottomBar";

const BottomBarLayout = () => {
   return (
     <>
        <main className="bottomBarLayout">
           <Outlet/>
        </main>
        <BottomBar/>
     </>
   );
};

export default BottomBarLayout;