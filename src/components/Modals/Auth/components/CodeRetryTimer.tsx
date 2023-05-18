import React, {useEffect, useState} from "react";
import Loader from "../../../Loader";
import {useRecoilState, useRecoilValue} from "recoil";
import {resendCodeState} from "../../../../store/auth/auth.states";
import {coordinatesState} from "../../../../store/geo/geo.states";
import {IPutResendVerificationBody} from "../../../../models/auth";
import {reSendVerificationCode} from "../../../../api/auth.api";

const CodeRetryTimer = () => {
   //recoil states
   const coordinates = useRecoilValue(coordinatesState);
   const [resendCode, setResendCode] = useRecoilState(resendCodeState);

   //use states
   const [timer, setTimer] = useState<number>(60);
   const [loading, setLoading] = useState<boolean>(false);

   const startTimer = () => {
      setTimer(60);
      let timeId: any = setInterval(() => setTimer((prevState) => prevState - 1), 1000);
      setTimeout(() => clearInterval(timeId), 60000);
   };
   const handleResendCode = async () => {
      if (resendCode) {
         setLoading(true);

         const requestData: IPutResendVerificationBody = {
            Lon: String(coordinates.Lon),
            PhoneNumber: resendCode?.phoneNumber,
            Lat: String(coordinates.Lat),
            ResendToken: resendCode.ResendToken
         };
         const response = await reSendVerificationCode(requestData);

         setResendCode({
            phoneNumber: resendCode.phoneNumber,
            ResendToken: response.resendToken,
            verificationToken: response.verificationToken
         });

         startTimer();
         setLoading(false);
      }
   };

   useEffect(() => {
      startTimer();
   }, []);

   return (
     <div className="authModal__verification_resend">
        {loading
          ? <span className="authModal__varification"><Loader window={false} size={"small"}/></span>
          : timer > 0
            ? <span className="authModal__verification_resend-timer typography-h6">
               Получить новый код можно через {timer}</span>
            : <button className="authModal__verification_resend-button" onClick={handleResendCode}>Получить новый
               код</button>
        }
     </div>
   );
};

export default CodeRetryTimer;