import {GendersEnum} from "./index";

interface IProfileRootObj {
   id: string;
   userId: string;
   phoneNumber: string;
   firstName: string;
   midName: string;
   lastName: string;
   uin: string;
   documentNo: string;
   birthDate: Date;
   type: 0 | 1;
   description: string;
   role: ProfileRoles;
   sex: GendersEnum;
   isResident: boolean;
   isSmsSubscribed: boolean;
   isPushSubscribed: boolean;
   isEmailSubscribed: boolean;
   isVirtualUser: boolean;
   avatarPath: string | null;
   updated: Date;
}

export interface IProfile extends IProfileRootObj {
   created: Date;
   deviceToken: string;
}

export interface IUpdateProfile extends IProfileRootObj {
   name: string;
}

export interface IGroup {
   firstName: string;
   midName: string;
   lastName: string;
   uin: string;
   documentNo: string;
   birthDate: Date;
   sex: GendersEnum;
   isResident: boolean;
   phoneNumber?: number;
}

export enum ProfileRoles {
   client = "client",
   doctor = "doctor",
   nurse = "nurse"
}