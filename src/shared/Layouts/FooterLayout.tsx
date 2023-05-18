import React, {lazy} from "react";
import {Outlet} from "react-router-dom";
import Loadable from "../../components/Loadable";

const Footer = Loadable(lazy(() => import("../Footer/index")));

const FooterLayout = () => {
   return (
     <>
        <Outlet/>
        <Footer/>
     </>
   );
};

export default FooterLayout;