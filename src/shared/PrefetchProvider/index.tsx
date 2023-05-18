import React, {useEffect, useState} from "react";
import {useSetRecoilState} from "recoil";
import {
   currentProfileAvatarState,
   currentProfileGroupState,
   currentProfileState
} from "../../store/profiles/profiles.states";
import {currentProfileBonusesState} from "../../store/billing/billing.states";
import {coordinatesState} from "../../store/geo/geo.states";
import {getLocalStorageCredentials, getUserGeolocation} from "../../helpers/utils";
import {getCurrentProfile, getCurrentProfileGroup} from "../../api/profile.api";
import {getFileById} from "../../api/files.api";
import {getCurrentProfileBonuses} from "../../api/billing.api";
import {currentProfileCardsState} from "../../store/payment/payment.states";
import {getCurrentProfileCards} from "../../api/payment.api";
import {getProfileApplication} from "../../api/applications.api";
import {currentProfileApplicationState} from "../../store/applications/application.states";
import {sessionRoleState} from "../../store/settings/settings.states";
import Loader from "../../components/Loader";
import {getReferralTemplates} from "../../api/clinic.api";
import {currentProfileTemplatesState} from "../../store/clinic/clinic.states";


//prefetch
const profilePromise = getLocalStorageCredentials() ? getCurrentProfile() : null;

const PrefetchProvider = ({children}: { children: React.ReactNode }) => {
   const [loading, setLoading] = useState<boolean>(true);

   const setCurrentProfile = useSetRecoilState(currentProfileState);
   const setCurrentProfileCards = useSetRecoilState(currentProfileCardsState);
   const setCurrentProfileAvatar = useSetRecoilState(currentProfileAvatarState);
   const setCurrentProfileGroup = useSetRecoilState(currentProfileGroupState);
   const setCurrentProfileBonuses = useSetRecoilState(currentProfileBonusesState);
   const setCurrentProfileApplication = useSetRecoilState(currentProfileApplicationState);
   const setCoordinates = useSetRecoilState(coordinatesState);
   const setSessionRole = useSetRecoilState(sessionRoleState);
   const setCurrentProfileTemplates = useSetRecoilState(currentProfileTemplatesState);

   const handleData = async () => {
      const profile = await (await profilePromise);
      if (profile) {
         if (profile.avatarPath) {
            const avatar = await getFileById(profile.avatarPath);
            setCurrentProfileAvatar(avatar);
         }
         getCurrentProfileBonuses().then(bonuses => setCurrentProfileBonuses(bonuses));
         getCurrentProfileGroup().then(group => setCurrentProfileGroup(group));
         getCurrentProfileCards().then(cards => setCurrentProfileCards(cards));
         getProfileApplication().then(application => setCurrentProfileApplication(application));
         getReferralTemplates(1, 10)
           .then(templates => setCurrentProfileTemplates(templates.results));

         setCurrentProfile(profile);
         setSessionRole(profile.role);
      }
   };

   useEffect(() => {
      getUserGeolocation().then(res => setCoordinates(res));
      handleData().finally(() => setLoading(false));
   }, []);

   return (
     loading
       ? <Loader window={"full"} size={"large"}/>
       : <>{children}</>
   );
};

export default PrefetchProvider;