import {ICoordinates} from "./geo";

export interface ISendVerificationRootBody extends ICoordinates<string> {
    PhoneNumber: string,
}

export interface IPutResendVerificationBody extends ISendVerificationRootBody {
    ResendToken: string
}

export interface IPostVerificationBody extends ISendVerificationRootBody {
    CountryCode: string,
    DeviceToken: string,
    DeviceId: string,
}

export interface IPostVerificationResponseAddress {
    address: string;
    houseNumber?: any;
    road?: any;
    cityDistrict?: any;
    city: string;
    postCode?: any;
    country: string;
    countryCode: string;
    regionCode: string;
    street?: any;
    description?: any;
}

export interface IVerificationRootResponse {
    verificationToken?: any;
    resendToken: string;
    address: IPostVerificationResponseAddress;
}

export interface IConnectTokenRootResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
    refresh_token: string;
}

