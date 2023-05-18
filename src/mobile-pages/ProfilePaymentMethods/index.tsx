import React, {useEffect} from "react";
import "./profilePaymentMethods.scss";
import BackButton from "../../components/BackButton/BackButton";
import {useNavigate} from "react-router-dom";
import ViewPaymentMethods from "../../components/Modals/PaymentMethods/components/ViewPaymentMethods";
import AddPaymentMethod from "../../components/Modals/PaymentMethods/components/AddPaymentMethod";
import {useRecoilState} from "recoil";
import {paymentMethodsModalStepState} from "../../store/settings/settings.states";

const ProfilePaymentMethods = () => {
   const navigate = useNavigate();

   const [paymentMethodsStep, setPaymentsMethodsModalStep] = useRecoilState(paymentMethodsModalStepState);

   const handlePaymentsMethodsStep = () => {
      switch (paymentMethodsStep) {
         case "view":
            return <ViewPaymentMethods isPage={true}/>;
         case "add":
            return <AddPaymentMethod/>;
         default:
            return null;
      }
   };

   useEffect(() => {
      setPaymentsMethodsModalStep("view");

      return () => setPaymentsMethodsModalStep("closed");
   }, []);

   return (
     <div className="profilePaymentMethods container">
        <div className="profilePaymentMethods__backButton">
           <BackButton
             action={() => paymentMethodsStep === "view" ? navigate(-1) : setPaymentsMethodsModalStep("view")}/>
        </div>
        {handlePaymentsMethodsStep()}
     </div>
   );
};

export default ProfilePaymentMethods;