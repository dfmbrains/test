import React from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import {mediaQueriesConstants} from "../../helpers/constants";
import {Navigate, Outlet} from "react-router-dom";

const RequireMobile = () => {
   const isLargeTablet = useMediaQuery(mediaQueriesConstants.minLargeTablet);

   if (isLargeTablet) {
      return <Navigate to={"/"}/>;
   }

   return (
     <Outlet/>
   );
};

export default RequireMobile;