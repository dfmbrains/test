import {atom} from "recoil";
import {getLocalStorageCredentials} from "../../helpers/utils";
import {IConnectTokenRootResponse} from "../../models/auth";

interface IResendCodeData {
   phoneNumber: string,
   ResendToken: string,
   verificationToken: string
}

export const resendCodeState = atom({
   key: "resendCode",
   default: null as IResendCodeData | null,
});

export const credentialsState = atom({
   key: "credentials",
   default: getLocalStorageCredentials() as IConnectTokenRootResponse | null,
});