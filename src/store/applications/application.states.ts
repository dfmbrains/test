import {atom} from "recoil";
import {IProfileApplication} from "../../api/applications.api";

export const currentProfileApplicationState = atom({
   key: "currentProfileApplication",
   default: null as IProfileApplication | null,
});