export type enviromentTypes = "dev" | "stage" | "prod"

export type fetchStatuses = "pending" | "rejected" | "fulfilled"

export enum GendersEnum {
   man = 0,
   women = 1
}

export interface IFormError {
   required: string,
   matches: string
}