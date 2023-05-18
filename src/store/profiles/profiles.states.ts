import {atom} from "recoil";
import {IProfile} from "../../models/profiles";

export const currentProfileState = atom({
   key: "currentProfile",
   default: null as IProfile | null,
});

export const currentProfileAvatarState = atom({
   key: "currentProfileAvatar",
   default: "" as string,
});

export const currentProfileGroupState = atom({
   key: "currentProfileGroup",
   default: [] as IProfile[],
});