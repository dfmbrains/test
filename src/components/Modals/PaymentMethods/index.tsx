import React from "react";
import "./paymentMethods.scss";
import ModalLayout from "../ModalLayout";
import {useRecoilState} from "recoil";
import {paymentMethodsModalStepState} from "../../../store/settings/settings.states";
import ViewPaymentMethods from "./components/ViewPaymentMethods";
import AddPaymentMethod from "./components/AddPaymentMethod";

const PaymentMethods = () => {
   const [paymentMethodsStep, setPaymentsMethodsModalStep] = useRecoilState(paymentMethodsModalStepState);

   if (paymentMethodsStep === "closed") return null;

   const handlePaymentsMethodsStep = () => {
      switch (paymentMethodsStep) {
         case "view":
            return <ViewPaymentMethods isPage={false}/>;
         case "add":
            return <AddPaymentMethod/>;
         default:
            return null;
      }
   };

   return (
     <ModalLayout closeModal={() => setPaymentsMethodsModalStep("closed")} clx={"paymentMethods"}>
        {handlePaymentsMethodsStep()}
     </ModalLayout>
   );
};

export default PaymentMethods;