import {TProviderTypes} from "./Dictionaries";

export type TContentQueryTypes = 'stories' | 'banner' | 'news' | 'push' | "partner"

export interface IContent<B> {
    id: string
    created: string
    country: any
    language: any
    providerType: TProviderTypes
    provider: string
    queryType: TContentQueryTypes
    contentType: string
    title: string
    body: B
    userId: string
    backlink: string
    topicId: string
    status: number
}

export interface IStoriesBody {
    image: string
    imageStorie: string
    name: string
    note: string
    action: string
    url: string
}

export interface IPartnerBody {
    title: string
    shortTitle: string
    note: string
    shortNote: string
    image: string
    url: string
    Image: string
}