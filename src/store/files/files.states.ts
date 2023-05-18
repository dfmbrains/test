import {atom} from "recoil";
import {IFileDataWithBlob} from "../../api/files.api";


export const currentProfileDocumentsState = atom({
   key: "currentProfileDocuments",
   default: [] as IFileDataWithBlob[],
});