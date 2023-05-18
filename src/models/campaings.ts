import {IResponseWithStatus} from "./api";

export interface ICampaign {
    id: string;
    code: string;
    name: string;
    description: string;
    isFixed: boolean;
    value: number;
    usesNumber: number;
    from: Date;
    to: Date;
    oneTime: boolean;
    isActive: boolean;
    withCoupon: boolean;
    coupon?: any;
}

export interface ICampaigns extends IResponseWithStatus {
    value: ICampaign | null;
}