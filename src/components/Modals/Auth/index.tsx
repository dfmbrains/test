import React from "react";
import {useRecoilState} from "recoil";
import {authModalStepState} from "../../../store/settings/settings.states";
import Login from "./Login";
import Verification from "./Verification";
import ModalLayout from "../ModalLayout";

const Auth = () => {
   const [authModalStep, setAuthModalStep] = useRecoilState(authModalStepState);

   if (authModalStep === "closed") return null;

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

   return (
     <ModalLayout closeModal={() => setAuthModalStep("closed")} clx={"authModal"}>
        {handleAuthStep()}
     </ModalLayout>
   );
};

export default Auth;