export enum CardsEnum {
   visa = 0,
   mastercard = 1,
   mir = 2
}

export interface IBankCard {
   id: number;
   number: string;
   dateExp: string;
   type: number;
   isDefault: boolean;
   paySystem: string;
}