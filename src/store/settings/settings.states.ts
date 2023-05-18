import {atom} from "recoil";
import {ProfileRoles} from "../../models/profiles";

type authModalSteps = "closed" | "login" | "verification"
type paymentMethodsModalSteps = "closed" | "view" | "add"
type applicationModal = "closed" | "nurse" | "rejectedApplication"

export const authModalStepState = atom({
   key: "authModalStep",
   default: "closed" as authModalSteps,
});
export const paymentMethodsModalStepState = atom({
   key: "paymentMethodsModalStep",
   default: "closed" as paymentMethodsModalSteps,
});
export const applicationModalState = atom({
   key: "applicationModal",
   default: "closed" as applicationModal,
});
export const sessionRoleState = atom({
   key: "sessionRole",
   default: null as ProfileRoles | null,
});