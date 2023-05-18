import React, {useEffect} from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentProfileState } from "../../store/profiles/profiles.states";
import { authModalStepState } from "../../store/settings/settings.states";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useMediaQuery from "../../hooks/useMediaQuery";
import { mediaQueriesConstants } from "../../helpers/constants";
import MobileAuth from "../MobileAuth";

const RequireAuth = () => {
   const { pathname } = useLocation();

   const isLargeTablet = useMediaQuery(mediaQueriesConstants.minLargeTablet);

   const currentProfile = useRecoilValue(currentProfileState);
   const setAuthModalStep = useSetRecoilState(authModalStepState);

   useEffect(() => {
      if (!currentProfile) {
         setAuthModalStep("login");
      }
   }, [currentProfile, setAuthModalStep]);

   if (!currentProfile) {
      if (isLargeTablet) {
         return <Navigate replace to="/" state={{ from: pathname }} />;
      } else {
         return <MobileAuth />;
      }
   }

   return (
     <main>
        <Outlet />
     </main>
   );
};

export default RequireAuth;