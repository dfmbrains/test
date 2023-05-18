import React, {useEffect, useRef, useState} from "react";
import {useRecoilState, useSetRecoilState} from "recoil";
import {credentialsState, resendCodeState} from "../../../store/auth/auth.states";
import Loader from "../../Loader";
import CodeRetryTimer from "./components/CodeRetryTimer";
import {authModalStepState, sessionRoleState} from "../../../store/settings/settings.states";
import {
   currentProfileAvatarState,
   currentProfileGroupState,
   currentProfileState
} from "../../../store/profiles/profiles.states";
import {connectTokenConstants, LS_CREDENTIALS_KEY} from "../../../helpers/constants";
import {postConnectToken} from "../../../api/auth.api";
import {getCurrentProfile, getCurrentProfileGroup} from "../../../api/profile.api";
import {getFileById} from "../../../api/files.api";
import {getCurrentProfileBonuses} from "../../../api/billing.api";
import {currentProfileBonusesState} from "../../../store/billing/billing.states";
import {getCurrentProfileCards} from "../../../api/payment.api";
import {currentProfileCardsState} from "../../../store/payment/payment.states";
import {currentProfileApplicationState} from "../../../store/applications/application.states";
import {getProfileApplication} from "../../../api/applications.api";
import {formatPhoneNumberForReading} from "../../../helpers/utils";
import {useLocation, useNavigate} from "react-router-dom";

const Verification = () => {
   const navigate = useNavigate();
   const {state: locationState} = useLocation();

   const [resendCode, setResendCode] = useRecoilState(resendCodeState);

   const setAuthModalStep = useSetRecoilState(authModalStepState);
   const setCurrentProfile = useSetRecoilState(currentProfileState);
   const setCurrentProfileCards = useSetRecoilState(currentProfileCardsState);
   const setCurrentProfileGroup = useSetRecoilState(currentProfileGroupState);
   const setCurrentProfileAvatar = useSetRecoilState(currentProfileAvatarState);
   const setCurrentProfileBonuses = useSetRecoilState(currentProfileBonusesState);
   const setCurrentProfileApplication = useSetRecoilState(currentProfileApplicationState);
   const setCredentials = useSetRecoilState(credentialsState);
   const setSessionRole = useSetRecoilState(sessionRoleState);

   const inputRef = useRef<HTMLInputElement | null>(null);
   const [code, setCode] = useState<string>(resendCode?.verificationToken || "");
   const [loading, setLoading] = useState<boolean>(false);

   const handleDisableInput = (status: boolean) => {
      if ((!status && inputRef.current?.disabled) || status) {
         inputRef.current!.disabled = status;
      }
   };

   const handleSubmit = async () => {
      setLoading(true);
      //get token
      const requestData = new URLSearchParams();
      requestData.append("username", resendCode?.phoneNumber || "");
      requestData.append("client_id", connectTokenConstants.client_id);
      requestData.append("client_secret", connectTokenConstants.client_secret);
      requestData.append("grant_type", connectTokenConstants.grant_type);
      requestData.append("verification_token", code);
      const credentials = await postConnectToken(requestData);
      localStorage.setItem(LS_CREDENTIALS_KEY, JSON.stringify(credentials));
      setCredentials(credentials);

      //get current profile
      const profileData = await getCurrentProfile();
      setCurrentProfile(profileData);
      setSessionRole(profileData.role);

      //get user data
      const [profileAvatar, profileBonuses, profileGroup, profileCards] = await Promise.all([
         profileData.avatarPath ? getFileById(profileData.avatarPath) : "",
         getCurrentProfileBonuses(),
         getCurrentProfileGroup(),
         getCurrentProfileCards(),
      ]);
      //set user data
      setCurrentProfileBonuses(profileBonuses);
      setCurrentProfileGroup(profileGroup);
      setCurrentProfileAvatar(profileAvatar);
      setCurrentProfileCards(profileCards);

      try {
         const profileApplication = await getProfileApplication();
         setCurrentProfileApplication(profileApplication);
      } catch (e) {
         setCurrentProfileApplication(null);
      }

      setLoading(false);
   };

   useEffect(() => {
      handleDisableInput(code.length === 6);

      if (code.length === 6) {
         handleSubmit()
           .then(() => {
              setResendCode(null);
              setAuthModalStep("closed");
              navigate(locationState.from);
           })
           .catch(e => {
              console.log(e);
              handleDisableInput(false);
           });
      }
   }, [code]);

   return (
     <>
        <h2 className="modal__title typography-h2">Введите код из SMS</h2>

        <label className="authModal__verification_label">
           <input onChange={(e) => setCode(e.target.value)} maxLength={6} ref={inputRef} value={code}
                  className="authModal__verification_input" type="text" placeholder={"* * * * * *"}/>
           {loading && <span><Loader window={false} size={"small"}/></span>}
        </label>

        <p className="authModal__verification_text typography-h6">
           {resendCode?.phoneNumber ? `Код выслан на ${formatPhoneNumberForReading(resendCode.phoneNumber)}` : "Код не отправлен. Ошибка"}
        </p>
        <CodeRetryTimer/>
     </>
   );
};

export default Verification;