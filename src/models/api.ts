export interface IPagination {
   currentPage: number,
   pageCount: number,
   pageSize: number,
   rowCount: number,
   firstRowOnPage: number,
   lastRowOnPage: number
}

export interface IResponseWithStatus {
   code?: any;
   success: boolean;
   message: string;
   failure: boolean;
   exception?: any;
}

export enum sortTypes {
   Ascending = 0,
   Descending = 1
}

export enum filesDescriptions {
   license = "doc_license",
   docFront = "doc_front_id",
   docBack = "doc_back_id",
   diploma = "doc_diplom",
}