import React from "react";
import "./footer.scss";
import Logo from "../../assets/brand/logo.png";
import InstagramIcon from "../../assets/icons/instagram.svg";
import TelegramIcon from "../../assets/icons/telegram.svg";
import EmailIcon from "../../assets/icons/email.svg";
import ScanQrImg from "../../assets/imgs/scanQr.png";
import {mediaQueriesConstants, navigationsLanding, qomekSocialMedia} from "../../helpers/constants";
import {Link} from "react-router-dom";
import QrCode from "../../components/QrCode";
import DownloadButtons from "../../components/DownloadButtons";
import useMediaQuery from "../../hooks/useMediaQuery";

const Footer = () => {
   const isLargeTablet = useMediaQuery(mediaQueriesConstants.minLargeTablet);
   const isMediumTablet = useMediaQuery(mediaQueriesConstants.minMediumTablet);

   return (
     <footer className="footer">
        <div className="container">
           {isMediumTablet
             ? <div className="footer__row">
                <div className="footer__company">
                   <img className="footer__company_logo" src={Logo} alt="logo"/>
                   <div className="footer__company_socialMedia">
                      <a href={qomekSocialMedia.instagram} target="_blank" rel="noreferrer">
                         <img src={InstagramIcon} alt="instagram"/></a>
                      <a href={qomekSocialMedia.telegram} target="_blank" rel="noreferrer">
                         <img src={TelegramIcon} alt="telegram"/></a>
                      <a href={`mailto:${qomekSocialMedia.email}`} target="_blank" rel="noreferrer">
                         <img src={EmailIcon} alt="email"/></a>
                   </div>
                </div>
                <div className="footer__right">
                   <div className="footer__top">
                      <div className="footer__menu">
                         {navigationsLanding.filter((el, idx) => isLargeTablet ? el : idx !== 1).map((pageLink, idx) => (
                           <div className="footer__menu_column" key={idx}>
                              <Link to={pageLink.link} className="typography-subtitle1">{pageLink.title}</Link>
                              {pageLink.items.map((hashLink, index) => (
                                hashLink.disabled
                                  ? <div className="footer__menu_column-disabledItem" key={index}>
                                     <p className="typography-subtitle1">{hashLink.title}</p>
                                     <span>скоро</span>
                                  </div>
                                  : <Link to={`${pageLink.link}#${hashLink.hash}`} className="typography-subtitle1"
                                          key={index}>{hashLink.title}</Link>
                              ))}
                           </div>
                         ))}
                      </div>
                      <div className="footer__download">
                         <div className="footer__download_actions">
                            <QrCode/>
                            <DownloadButtons/>
                         </div>
                         <img className="footer__download_scan" src={ScanQrImg} alt="scan"/>
                         <div className="footer__download_text">
                            <p className="typography-h4">Отсканируйте <br/> QR code</p>
                            <p className="typography-h4">Cкачайте <br/> приложение</p>
                         </div>
                      </div>
                   </div>
                   <div className="footer__bot">
                      <div className="footer__bot_left">
                         <Link to={"/"} className="typography-body1">Публичная оферта</Link>
                         <Link to={"/"} className="typography-body1">Правила пользования</Link>
                         <Link to={"/"} className="typography-body1">Политика конфиденциальности</Link>
                         <Link to={"/"} className="typography-body1">Свяжитесь с нами</Link>
                      </div>
                      <p className="typography-body1">Qomek {new Date().getFullYear()}. All rights reserved</p>
                   </div>
                </div>
             </div>
             : <>
                <h2 className="typography-h2">Удобнее в приложении</h2>
                <DownloadButtons/>
                <div className="footer__menu">
                   {navigationsLanding.filter((el, idx) => isLargeTablet ? el : idx !== 1).map((pageLink, idx) => (
                     <div className="footer__menu_column" key={idx}>
                        <Link to={pageLink.link} className="typography-subtitle1">{pageLink.title}</Link>
                        {pageLink.items.map((hashLink, index) => (
                          hashLink.disabled
                            ? <div className="footer__menu_column-disabledItem" key={index}>
                               <p className="typography-subtitle1">{hashLink.title}</p>
                               <span>скоро</span>
                            </div>
                            : <Link to={`${pageLink.link}#${hashLink.hash}`} className="typography-subtitle1"
                                    key={index}>{hashLink.title}</Link>
                        ))}
                     </div>
                   ))}
                </div>

                <div className="footer__bot">
                   <div className="footer__bot_left">
                      <Link to={"/"} className="typography-body1">Публичная оферта</Link>
                      <Link to={"/"} className="typography-body1">Правила пользования</Link>
                      <Link to={"/"} className="typography-body1">Политика конфиденциальности</Link>
                      <Link to={"/"} className="typography-body1">Свяжитесь с нами</Link>
                   </div>
                   <p className="typography-body1">Qomek {new Date().getFullYear()}. All rights reserved</p>
                </div>
             </>
           }
        </div>
     </footer>
   );
};

export default Footer;