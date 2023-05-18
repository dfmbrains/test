import {atom} from "recoil";
import {IContent, IPartnerBody, IStoriesBody} from "../../models/content";

export const storiesState = atom({
   key: "stories",
   default: [] as IContent<IStoriesBody>[],
});

export const partnersState = atom({
   key: "partners",
   default: [] as IContent<IPartnerBody>[],
});