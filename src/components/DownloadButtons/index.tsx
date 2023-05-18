import React from "react";
import "./downloadButtons.scss";
import GooglePlayIcon from "../../assets/icons/googlePlay.svg";
import AppStoreIcon from "../../assets/icons/appStore.svg";

const DownloadButtons = () => {
   // const imgLangGenerator = () => {
   //    switch (appLanguage.value) {
   //       case 'ru':
   //          return [IStorePNG, GooglePlayPNG]
   //       case 'kz':
   //          return [IStoreKzPNG, GooglePlayKzPNG]
   //       default:
   //          return [IStorePNG, GooglePlayPNG]
   //    }
   // }

   return (
     <div className="downloadButtons">
        <a href="https://apps.apple.com/ru/app/qomek/id1606324169"
           target="_blank" rel="noreferrer"
        >
           <img src={GooglePlayIcon} alt="i-store"/>
        </a>
        <a href="https://play.google.com/store/apps/details?id=kz.imed"
           target="_blank" rel="noreferrer"
        >
           <img src={AppStoreIcon} alt="google-play"/>
        </a>
     </div>
   );
};

export default DownloadButtons;