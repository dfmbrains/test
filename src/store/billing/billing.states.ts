import {atom} from "recoil";

export const currentProfileBonusesState = atom({
   key: "profileBonuses",
   default: null as number | null,
});