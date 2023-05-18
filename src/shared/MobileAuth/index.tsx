import React, {useEffect} from "react";
import "./mobileAuth.scss";
import Login from "../../components/Modals/Auth/Login";
import Verification from "../../components/Modals/Auth/Verification";
import {useRecoilState} from "recoil";
import {authModalStepState} from "../../store/settings/settings.states";

const MobileAuth = () => {
   const [authModalStep, seAuthModalStep] = useRecoilState(authModalStepState);

   const handleAuthStep = () => {
      switch (authModalStep) {
         case "login":
            return <Login/>;
         case "verification":
            return <Verification/>;
         default:
            return null;
      }
   };

   useEffect(() => {
      return () => seAuthModalStep("closed");
   }, []);

   return (
     <div className="container">
        <div className="mobileAuth">
           {handleAuthStep()}
        </div>
     </div>
   );
};

export default MobileAuth;