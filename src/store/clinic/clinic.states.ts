import {atom} from "recoil";
import {IReferralTemplate} from "../../models/clinic";

export const currentProfileTemplatesState = atom({
   key: "currentProfileTemplates",
   default: [] as IReferralTemplate[],
});