import React from "react";
import "./avatar.scss";
import {useRecoilValue} from "recoil";
import {currentProfileAvatarState} from "../../store/profiles/profiles.states";
import AvatarImg from "../../assets/icons/avatar.svg";

const Avatar = ({src, clx = "", disableAvatar = false}: { clx?: string, src?: string, disableAvatar?: boolean }) => {
   const currentProfileAvatar = useRecoilValue(currentProfileAvatarState);

   return (
     <div className={`avatar ${clx}`}>
        <img src={disableAvatar ? AvatarImg : (src || currentProfileAvatar || AvatarImg)} alt="user"/>
     </div>
   );
};

export default Avatar;