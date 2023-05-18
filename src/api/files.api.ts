import {instance} from "./index";
import {filesDescriptions, IPagination, IResponseWithStatus, sortTypes} from "../models/api";

const serviceEndpoint = "fileapi/api/FileApi";

export enum FileTypes {
   icon = "Icon",
   document = "Document",
   avatar = "Avatar"
}

export enum StorageTypes {
   directory = "Directory",
   dataBase = "DataBase"
}

interface IGetFilesParams {
   FileType?: FileTypes
   SortType?: sortTypes
   SortBy?: string,
   UserId?: string,
   Page?: string,
   PageSize?: string,
}

interface IFileData {
   id: string;
   userId: string;
   isPrivate: boolean;
   storageType: StorageTypes;
   fileType: FileTypes;
   fileId: any;
   description: filesDescriptions;
   fileExtension: string;
}

export interface IFileDataWithBlob extends IFileData {
   file: string;
}

interface IGetFilesByFilersData extends IPagination {
   results: IFileData[];
}

interface IGetFilesByFilersRoot extends IResponseWithStatus {
   value: IGetFilesByFilersData;
}

interface IUploadFileParams {
   fileType?: FileTypes
   storageType?: StorageTypes,
   subDir?: string
   description?: string
}

interface IUploadFileResponse extends IResponseWithStatus {
   value: IFileData;
}

export const getFileById = async (fileId: string): Promise<string> => {
   const response = await instance.get(`${serviceEndpoint}?id=${fileId}`, {responseType: "blob"});
   return URL.createObjectURL(response.data);
};

export const getFilesByFilters = async (params: IGetFilesParams): Promise<IGetFilesByFilersRoot> => {
   const searchParams = new URLSearchParams(Object.entries(params));

   const response = await instance.get(`${serviceEndpoint}/pagin?${searchParams}`);
   return response.data;
};

export const getFilesWithBlobByFilters = async (params: IGetFilesParams): Promise<IFileDataWithBlob[]> => {
   const filesData = await getFilesByFilters(params);
   const filesRequests = filesData.value.results.map(async (result) => {
      let file: string;
      try {
         file = await getFileById(result.id);
      } catch (e) {
         file = "";
      }
      return {...result, file};
   });

   const res = await Promise.all(filesRequests);
   return res.filter(el => el.file);
};

export const uploadFile = async (file: FormData, params: IUploadFileParams): Promise<IUploadFileResponse> => {
   const searchParams = new URLSearchParams(Object.entries(params));

   const response = await instance.post(`${serviceEndpoint}?${searchParams}`, file, {headers: {"Content-Type": "multipart/form-data"}});
   return response.data;
};

export const deleteFileById = (fileId: string): void => {
   instance.delete(`${serviceEndpoint}/delete?id=${fileId}`);
};