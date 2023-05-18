import {useSetRecoilState} from "recoil";
import {credentialsState} from "../store/auth/auth.states";
import {LS_CREDENTIALS_KEY} from "../helpers/constants";
import {
   currentProfileAvatarState,
   currentProfileGroupState,
   currentProfileState
} from "../store/profiles/profiles.states";
import {currentProfileBonusesState} from "../store/billing/billing.states";
import {currentProfileCardsState} from "../store/payment/payment.states";
import {currentProfileApplicationState} from "../store/applications/application.states";
import {currentProfileDocumentsState} from "../store/files/files.states";
import {sessionRoleState} from "../store/settings/settings.states";
import {currentProfileTemplatesState} from "../store/clinic/clinic.states";

const useLogout = (): () => void => {
   const setCredentials = useSetRecoilState(credentialsState);
   const setCurrentProfile = useSetRecoilState(currentProfileState);
   const setProfileGroup = useSetRecoilState(currentProfileGroupState);
   const setCurrentProfileAvatar = useSetRecoilState(currentProfileAvatarState);
   const setCurrentProfileCards = useSetRecoilState(currentProfileCardsState);
   const setCurrentProfileBonuses = useSetRecoilState(currentProfileBonusesState);
   const setCurrentProfileApplication = useSetRecoilState(currentProfileApplicationState);
   const setCurrentProfileDocuments = useSetRecoilState(currentProfileDocumentsState);
   const setCurrentProfileTemplates = useSetRecoilState(currentProfileTemplatesState);
   const setSessionRole = useSetRecoilState(sessionRoleState);

   return () => {
      setCredentials(null);
      setCurrentProfile(null);
      setCurrentProfileBonuses(null);
      setCurrentProfileApplication(null);
      setCurrentProfileAvatar("");
      setProfileGroup([]);
      setCurrentProfileCards([]);
      setCurrentProfileDocuments([]);
      setCurrentProfileTemplates([]);
      setSessionRole(null);
      localStorage.removeItem(LS_CREDENTIALS_KEY);
   };
};

export default useLogout;