import {IGroup, IUpdateProfile, ProfileRoles} from "../models/profiles";
import {ICoordinates} from "../models/geo";
import {orderTypes} from "../models/order";
import {enviromentTypes, GendersEnum} from "../models";
import {IConnectTokenRootResponse} from "../models/auth";
import {LS_CREDENTIALS_KEY, mimeFilesTypes, Regex_OnlyLettersAndSpaces} from "./constants";
import imageCompression from "browser-image-compression";
import {CardsEnum} from "../models/payment";
import MirCard from "../assets/icons/mir.svg";
import MasterCard from "../assets/icons/mastercard.svg";
import VisaCard from "../assets/icons/visa.svg";
import {IProfileEditErrors} from "../components/ProfileEditForm";
import {ICreateApplicationBody} from "../api/applications.api";
import {IApplicationCreateErrors} from "../pages/Applications/components/ApplicationDataForm";
import {IAddCardForm, IAddCardFormErrors} from "../components/Modals/PaymentMethods/components/AddPaymentMethod";

//app utils
export const getLocalStorageCredentials = () => {
   try {
      return JSON.parse(localStorage.getItem(LS_CREDENTIALS_KEY) || "null") as IConnectTokenRootResponse || null;
   } catch {
      return null;
   }
};
export const isEnviromentProd = () => {
   const env = process.env.REACT_APP_ENV as enviromentTypes;
   return env === "prod";
};
export const getUserGeolocation = () => {
   return new Promise<ICoordinates<number>>((resolve) => {
      if ("geolocation" in navigator) {
         navigator.geolocation.getCurrentPosition(
           (position) => {
              resolve({Lat: position.coords.latitude, Lon: position.coords.longitude});
           },
           (error) => {
              console.error("Error getting geolocation:", error.message);
              resolve({Lat: 0, Lon: 0});
           }
         );
      } else {
         console.error("Geolocation is not available");
         resolve({Lat: 0, Lon: 0});
      }
   });
};

//working with files
export const createFileFromURL = async (url: string, filename: string, type: mimeFilesTypes): Promise<File> => {
   const response = await fetch(url);
   const blob = await response.blob();
   return new File([blob], filename, {type});
};
export const createMimeType = (type: string): mimeFilesTypes => {
   switch (true) {
      case type.includes("png"):
         return "image/png";
      case type.includes("jpg"):
         return "image/jpg";
      case type.includes("jpeg"):
         return "image/jpeg";
      case type.includes("docx"):
         return ".docx";
      case type.includes("pdf"):
         return "application/pdf";
      default:
         return ".doc";
   }
};
export const fileCompressor = async (image: File) => {
   const options = {
      maxSizeMB: 0.6,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
   };
   try {
      return await imageCompression(image, options);
   } catch (error) {
      return image;
   }
};

//generating data
export const roleGenerator = (role: ProfileRoles) => {
   switch (role) {
      case "client":
         return "Клиент";
      case "doctor":
         return "Доктор";
      case "nurse":
         return "Медсестра";
      default:
         return "Неизвестно";
   }
};
export const genderGenerator = (gender: GendersEnum) => {
   switch (gender) {
      case 0:
         return "Мужской";
      case 1:
         return "Женский";
      default:
         return "Неизвестно";
   }
};
export const orderTypeGenerator = (type: orderTypes) => {
   switch (type) {
      case "laboratory":
         return "Лаборатория";
      case "consultation":
         return "Консультация";
      default:
         return "Неизвестно";
   }
};
export const cardTypesGenerator = (type: CardsEnum) => {
   switch (type) {
      case 0:
         return "Visa";
      case 1:
         return "Mastercard";
      case 2:
         return "Mir";
      default:
         return "Неизвестно";
   }
};
export const cardIconGenerator = (type: CardsEnum) => {
   switch (type) {
      case 0:
         return VisaCard;
      case 1:
         return MasterCard;
      case 2:
         return MirCard;
      default:
         return VisaCard;
   }
};

//formatting data
export const formatNewDate = (date: Date) => {
   //returns 2002-05-24
   return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};
export const firstNameLastNameHandler = (firstName: string, lastName: string) => {
   if (firstName && lastName) {
      return lastName + " " + firstName;
   } else if (firstName && !lastName) {
      return firstName;
   } else if (!firstName && lastName) {
      return lastName;
   } else {
      return "--- --- ---";
   }
};
export const formatPhoneNumberForReading = (phoneNumber: string) => {
   return `+7 ${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 8)}-${phoneNumber.slice(8)}`;
};
export const cutStringForReading = (string: string, max: number) => {
   if (string.length > max) {
      const words = string.split(" ");
      let displayString = "";
      let lengthCount = 0;

      for (const word of words) {
         if (lengthCount + word.length <= max) {
            displayString += word + " ";
            lengthCount += word.length + 1;
         } else {
            displayString += "...";
            break;
         }
      }

      return displayString.trim();
   }

   return string;
};
export const handleCardNumberChange = (value: string) => {
   // Remove non-digit characters from the input
   const cardNumberOnlyDigits = value.replace(/\D/g, "");

   // Format the card number with spaces
   let formattedCardNumber = "";
   for (let i = 0; i < cardNumberOnlyDigits.length; i += 4) {
      const chunk = cardNumberOnlyDigits.slice(i, i + 4);
      formattedCardNumber += chunk + " ";
   }

   return formattedCardNumber.trim();
};
export const handleExpirationDateChange = (value: string) => {
   // Remove non-digit characters from the input
   const expirationDateOnlyDigits = value.replace(/\D/g, "");

   if (+expirationDateOnlyDigits.slice(0, 2) > 12) {
      return "";
   } else {
      // Format the expiration date with a slash
      if (expirationDateOnlyDigits.length > 2) {
         return `${expirationDateOnlyDigits.slice(0, 2) + "/" + expirationDateOnlyDigits.slice(2)}`.trim();
      } else {
         return value;
      }
   }
};

//creating a new data
export const createTotalByBonuses = (bonuses: number, total: number) => {
   if (bonuses >= total) {
      return 0;
   } else {
      return total - bonuses;
   }
};

//validating forms
export const birthDateValidator = (birthDate: string | number | Date) => {
   const today = new Date();
   const birthdate = new Date(birthDate);
   let age = today.getFullYear() - birthdate.getFullYear();
   const month = today.getMonth() - birthdate.getMonth();

   if (month < 0 || (month === 0 && today.getDate() < birthdate.getDate())) {
      age--;
   }
   return age >= 16;
};
export const handleValidateProfileForm = (errors: IProfileEditErrors, profileData: IUpdateProfile) => {
   const duplicate = {...errors};

   duplicate.firstName.required = profileData.firstName ? "" : "Введите имя";
   duplicate.lastName.required = profileData.lastName ? "" : "Введите фамилию";
   duplicate.birthDate.required = profileData.birthDate ? "" : "Введите дату рождения";
   duplicate.uin.required = profileData.uin || !profileData.isResident ? "" : "Введите ИИН";
   duplicate.documentNo.required = profileData.documentNo || profileData.isResident ? "" : "Введите номер документа";

   duplicate.firstName.matches = Regex_OnlyLettersAndSpaces.test(profileData.firstName) ? "" : "Можно использовать только буквы";
   duplicate.lastName.matches = Regex_OnlyLettersAndSpaces.test(profileData.lastName) ? "" : "Можно использовать только буквы";
   duplicate.midName.matches = !profileData.midName || Regex_OnlyLettersAndSpaces.test(profileData.midName || "") ? "" : "Можно использовать только буквы";
   duplicate.birthDate.matches = new Date().getTime() >= new Date(profileData.birthDate).getTime() ? (
     birthDateValidator(profileData.birthDate) ? "" : "Вам должно быть не менее 16 лет"
   ) : "Дата рождения не может быть в будущем";
   duplicate.uin.matches = profileData.uin?.length === 12 || !profileData.isResident ? "" : "Введите правильный ИИН";

   return {status: Object.values(duplicate).every(value => !value.required && !value.matches), data: duplicate};
};

export const handleValidateGroupUser = (errors: IProfileEditErrors, profileData: IGroup) => {
   const duplicate = {...errors};

   duplicate.firstName.required = profileData.firstName ? "" : "Введите имя";
   duplicate.lastName.required = profileData.lastName ? "" : "Введите фамилию";
   duplicate.birthDate.required = profileData.birthDate ? "" : "Введите дату рождения";
   duplicate.uin.required = profileData.uin || !profileData.isResident ? "" : "Введите ИИН";
   duplicate.documentNo.required = profileData.documentNo || profileData.isResident ? "" : "Введите номер документа";

   duplicate.firstName.matches = Regex_OnlyLettersAndSpaces.test(profileData.firstName || "") ? "" : "Можно использовать только буквы";
   duplicate.lastName.matches = Regex_OnlyLettersAndSpaces.test(profileData.lastName || "") ? "" : "Можно использовать только буквы";
   duplicate.midName.matches = !profileData.midName || Regex_OnlyLettersAndSpaces.test(profileData.midName || "") ? "" : "Можно использовать только буквы";
   duplicate.birthDate.matches = new Date().getTime() >= new Date(profileData.birthDate || new Date()).getTime() ? "" : "Дата рождения не может быть в будущем";
   duplicate.uin.matches = profileData.uin.length === 12 || !profileData.isResident ? "" : "Введите правильный ИИН";

   return {status: Object.values(duplicate).every(value => !value.required && !value.matches), data: duplicate};
};
export const handleValidateApplicationForm = (errors: IApplicationCreateErrors, data: ICreateApplicationBody) => {
   const duplicate = {...errors};

   duplicate.specializationId.required = data.specializationId ? "" : "Выберите специализацию";
   duplicate.clinicId.required = data.clinicId ? "" : "Выберите клинику";
   duplicate.experience.required = data.experience ? "" : "Напишите свой стаж в годах";

   duplicate.experience.matches = +data.experience > 0 ? "" : +data.experience === 0 ? "У вас должен быть стаж" : "Введите корректное число";

   return {status: Object.values(duplicate).every(value => !value.required && !value.matches), data: duplicate};
};
export const handleValidateAddCardForm = (errors: IAddCardFormErrors, data: IAddCardForm) => {
   const duplicate = {...errors};

   duplicate.name.required = data.name ? "" : "Напишите имя";
   duplicate.cardNumber.required = data.cardNumber ? "" : "Напишите номер карты";
   duplicate.expireDate.required = data.expireDate ? "" : "Напишите дату";
   duplicate.cvv.required = data.cvv ? "" : "Напишите код";

   duplicate.cardNumber.matches = +data.cardNumber.length === 19 ? "" : "Введите корректный номер карты";
   duplicate.expireDate.matches = +data.expireDate.length < 5 ? "Введите корректную дату" : isCardExpired(data.expireDate) ? "Срок вашей карты истёк" : "";
   duplicate.cvv.matches = +data.cvv.length === 3 ? "" : "Введите корректный код";

   return {status: Object.values(duplicate).every(value => !value.required && !value.matches), data: duplicate};
};

//others
export const openNewWindowWithData = (data: any, url: string) => {
   const form = document.createElement("form");
   form.action = url;
   form.method = "POST";
   form.target = "_blank";

   for (const key in data) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = data[key];
      form.appendChild(input);
   }

   document.body.appendChild(form);
   form.submit();
};
export const isOrderPayed = (status: number): boolean => {
   return status === 2 || status === 3 || status === 4 || status === 5;
};
export const detectCardType = (cardNumber: string): CardsEnum => {
   // Visa: Starts with 4 and has 13-16 digits
   if (/^4\d{12}(?:\d{3})?$/.test(cardNumber)) {
      return CardsEnum.visa;
   } else if (/^5[1-5]\d{14}$|^2(?:2(?:[2-9][2-9]|[3-6]\d|7[0-1])|3(?:[0-3]\d|4[0-8]))\d{12}$/.test(cardNumber)) {
      return CardsEnum.mastercard;
   } else if (/^220(?:0[0-4]|[1-4]\d)\d{11}$|^2200(?:0[0-4])\d{10}$/.test(cardNumber)) {
      return CardsEnum.mir;
   } else {
      return CardsEnum.visa;
   }
};
export const isCardExpired = (expirationDate: string) => {
   //expirationDate format should be: 12/12
   const [expirationMonth, expirationYear] = expirationDate.split("/");
   const currentYear = new Date().getFullYear() % 100; // Get the last two digits of the current year
   const currentMonth = new Date().getMonth() + 1; // January is month 0, so add 1 to get the current month

   if (Number(expirationYear) < currentYear) {
      return true; // The card has expired if the year is in the past
   } else if (Number(expirationYear) === currentYear && Number(expirationMonth) <= currentMonth) {
      return true; // The card has expired if the year is the current year, but the month is in the past
   }

   return false; // The card is not expired
};