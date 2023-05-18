import {instance} from "./index";
import {CardsEnum, IBankCard} from "../models/payment";
import {IResponseWithStatus} from "../models/api";
import {CLAUDPAYMENT_KEY} from "../helpers/enviroment";

const serviceEndpoint = "payment/api";

export interface IAddCardBody {
   cardType: CardsEnum,
   cardNumber: string,
   expireDate: string,
   name: string,
   cryptoCard: string,
   paymentSystem: "CloudPayment"
}

interface IAddCardResponseValue {
   isSuccess: boolean;
   status: number;
   messageError: any;
   returnUrl: string;
   transactionId: string;
   paReq: string;
   url: string;
}

interface IAddCardServerResponse extends IResponseWithStatus {
   value: IAddCardResponseValue;
}

export const getCurrentProfileCards = async (): Promise<IBankCard[]> => {
   const response = await instance.get(`${serviceEndpoint}/CloudPayment/getCards`);
   return response.data.value;
};

export const addCard = async (body: IAddCardBody): Promise<IAddCardServerResponse> => {
   const response = await instance.post(`${serviceEndpoint}/CloudPayment/add`, body);
   return response.data.value;
};

export const deleteCard = async (cardId: number): Promise<IAddCardServerResponse> => {
   const response = await instance.get(`${serviceEndpoint}/CloudPayment/deletecard?cardId=${cardId}`);
   return response.data.value;
};

declare const cp: any;
export const toCryptoCard = async (cvv: string, cardNumber: string, expDateMonth: string, expDateYear: string) => {
   try {
      const checkout = new cp.Checkout({publicId: CLAUDPAYMENT_KEY});

      const fieldValues = {
         cardNumber: cardNumber.replace(/(\d{4})(?=\d)/g, "$1 "),
         cvv: cvv,
         expDateMonth,
         expDateYear
      };

      return await checkout.createPaymentCryptogram(fieldValues);
   } catch (e) {
      return "";
   }
};