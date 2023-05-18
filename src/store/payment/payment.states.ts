import {atom} from "recoil";
import {IBankCard} from "../../models/payment";

export const currentProfileCardsState = atom({
   key: "currentProfileCards",
   default: [] as IBankCard[],
});