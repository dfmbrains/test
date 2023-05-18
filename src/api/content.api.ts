import {instance} from "./index";
import {IContent, IPartnerBody, IStoriesBody, TContentQueryTypes} from "../models/content";
import {TProviderTypes} from "../models/Dictionaries";
import {IPagination} from "../models/api";
import {AxiosResponse} from "axios";
import {getFileById} from "./files.api";

interface IContentResponse<B> extends IPagination {
   results: IContent<B>[];
}

interface IContentFilters {
   QueryType: TContentQueryTypes,
   ProviderType?: TProviderTypes,
   Provider?: string,
   Title?: string,
   Page?: number,
   PageSize?: number
}

const serviceEndpoint = "content/api/Content";

export const getContent = async (params: IContentFilters) => {
   const searchParams = new URLSearchParams(Object.entries(params));

   const response: AxiosResponse<IContentResponse<string>> = await instance.get(`${serviceEndpoint}/getContentByFilters?${searchParams}`);
   return response.data.results.map(el => ({...el, body: JSON.parse(el.body)}));
};

export const getStoriesWithImages = async (PageSize: number): Promise<IContent<IStoriesBody>[]> => {
   const stories: IContent<IStoriesBody>[] = await getContent({QueryType: "stories", PageSize});

   const promises = stories.map(async (el) => {
      let mainImage, secondaryImage: string;

      try {
         mainImage = await getFileById(el.body.image);
      } catch {
         mainImage = el.body.image;
      }
      try {
         secondaryImage = await getFileById(el.body.imageStorie);
      } catch {
         secondaryImage = el.body.imageStorie;
      }

      const newBody: IStoriesBody = {...el.body, image: secondaryImage, imageStorie: mainImage};
      return {...el, body: newBody};
   });

   return await Promise.all(promises);
};

export const getPartnersWithImages = async (): Promise<IContent<IPartnerBody>[]> => {
   const partners: IContent<IPartnerBody>[] = await getContent({QueryType: "partner"});

   const promises = partners.map(async (el) => {
      let mainImage, secondaryImage: string;

      try {
         mainImage = await getFileById(el.body.Image);
      } catch {
         mainImage = el.body.Image;
      }
      try {
         secondaryImage = await getFileById(el.body.image);
      } catch {
         secondaryImage = el.body.image;
      }

      const newBody: IPartnerBody = {...el.body, image: secondaryImage, Image: mainImage};
      return {...el, body: newBody};
   });

   return await Promise.all(promises);
};