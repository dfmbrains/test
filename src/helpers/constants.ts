import {ILanguage} from "../models/settings";

//auth
export const connectTokenConstants = {
   client_id: "mobile-client",
   client_secret: "de4c3427-9c00-4d28-aa1b-a5ac1d8bd3f2",
   grant_type: "verification_token"
};
export const refreshTokenConstants = {
   client_id: "admin-client",
   client_secret: "b2c3a486-7ff2-464f-8a13-8a414573139f",
   grant_type: "refresh_token"
};

//regexes
export const Regex_OnlyLettersAndSpaces = /^[\p{L}\s]+$/u;

//local storage keys
export const LS_CREDENTIALS_KEY = "lck";

//others
export const mediaQueriesConstants = {
   minDesktop: "(min-width: 1261px)",
   minLargeTablet: "(min-width: 997px)",
   minMediumTablet: "(min-width: 769px)",
   minSmallTablet: "(min-width: 577px)",
   mobile: "(max-width: 576px)"
};
export const languages: ILanguage[] = [
   {title: "РУС", value: "ru"},
   {title: "KAZ", value: "kz"},
   {title: "ENG", value: "en"}
];

//menus
export const navigationsLanding = [
   {
      title: "О приложении",
      link: "/",
      items: [
         {title: "Главная", hash: "promoSection", disabled: false},
         {title: "Анализы", hash: "analysesSection", disabled: false},
         {title: "Найти врача", hash: "findSection", disabled: false},
         {title: "Qomek QR", hash: "qomekSection", disabled: false},
         {title: "Бонусы", hash: "bonusesSection", disabled: false},
         {title: "Медсестра", hash: "nurseSection", disabled: false},
         {title: "Аптека", hash: "pharmacySection", disabled: false}
      ]
   },
   {
      title: "Услуги",
      link: "/services",
      items: [
         {title: "Анализы", hash: "", disabled: false},
         {title: "Найти врача", hash: "", disabled: true},
         {title: "Медсестра", hash: "", disabled: true},
         {title: "Аптека", hash: "", disabled: true}
      ]
   },
   {
      title: "Сотрудничество",
      link: "/work",
      items: [
         {title: "Корпоративным клиентам", hash: "", disabled: false},
         {title: "Стать нашим партнером", hash: "", disabled: false}
      ]
   }
];

//qomek constants
export const qomekSocialMedia = {
   instagram: "https://instagram.com/qomek.app?igshid=YmMyMTA2M2Y=",
   email: "office@qomek.net",
   telegram: "https://t.me/QomekApp"
};

//others
export type mimeFilesTypes = "image/png" | "image/jpeg" | "image/jpg" | ".doc" | ".docx" | "application/pdf"