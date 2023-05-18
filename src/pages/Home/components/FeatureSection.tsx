import React from "react";
import AnalysesIcon from "../../../assets/icons/analyses.svg";
import AnalysesImg from "../../../assets/imgs/analysesSection.webp";
import SearchIcon from "../../../assets/icons/search.svg";
import SearchImg from "../../../assets/imgs/searchSection.webp";
import NurseIcon from "../../../assets/icons/nurse.svg";
import NurseImg from "../../../assets/imgs/nurseSection.webp";
import PharmacyIcon from "../../../assets/icons/pharmacy.svg";
import PharmacyImg from "../../../assets/imgs/pharmacySection.webp";
import BonusesIcon from "../../../assets/icons/bonuses.svg";
import BonusesImg from "../../../assets/imgs/bonusesSection.webp";
import QrIcon from "../../../assets/icons/qr.svg";
import QrImg from "../../../assets/imgs/qrSection.webp";
import Button from "../../../components/Button";
import Loader from "../../../components/Loader";
import useMediaQuery from "../../../hooks/useMediaQuery";
import {mediaQueriesConstants} from "../../../helpers/constants";

export interface IFeatureSection {
   title: string,
   id: string,
   subtitle: string,
   icon: any,
   color: string,
   button: { active: boolean, text: string },
   img: any,
   list: string[]
}

const FeatureSection = () => {
   const featuresSectionsData: IFeatureSection[] = [
      {
         title: "Анализы",
         subtitle: "Оформи заказ или вызови лабораторию на дом не выходя из дома в удобное для тебя время",
         list: ["Результаты в приложении", "Возможность отправить результаты врачу в онлайн консультации"],
         icon: AnalysesIcon,
         color: "#115AFB",
         button: {active: true, text: "Оформить заказ"},
         img: AnalysesImg,
         id: "analysesSection"
      },
      {
         title: "Найти врача",
         subtitle: "Пройди онлайн консультацию со специалистом и в удобное для тебя время не выходя из дома",
         list: ["Быстро удобно", "Не выходя из дома"],
         icon: SearchIcon,
         color: "#FD385B",
         button: {active: true, text: "Найти врача"},
         img: SearchImg,
         id: "findSection"
      },
      {
         title: "Qomek QR",
         subtitle: "Оплати услуги с помощью Qomek QR и получи гарантированную скидку в размере 10% и повышенный кэшбэк в виде бонусов",
         list: ["Копи бонусы", "Используй при следующих записях"],
         icon: QrIcon,
         color: "#AF3DCB",
         button: {active: true, text: "Скачать приложение"},
         img: QrImg,
         id: "qomekSection"
      },
      {
         title: "Бонусы",
         subtitle: "Оплачивайте с Qomek QR и накапливайте бонусы",
         list: ["Используй при следующих записях"],
         icon: BonusesIcon,
         color: "#FBC815",
         button: {active: true, text: "Скачать приложение"},
         img: BonusesImg,
         id: "bonusesSection"
      },
      {
         title: "Медсестра",
         subtitle: "Оплати услуги с помощью Qomek QR и получи гарантированную скидку в размере 10% и повышенный кэшбэк в виде бонусов",
         list: ["Копи бонусы", "Используй при следующих записях"],
         icon: NurseIcon,
         color: "#15C4FB",
         button: {active: false, text: "Скоро"},
         img: NurseImg,
         id: "nurseSection"
      },
      {
         title: "Аптека",
         subtitle: "Оплати услуги с помощью Qomek QR и получи гарантированную скидку в размере 10% и повышенный кэшбэк в виде бонусов",
         list: ["Копи бонусы", "Используй при следующих записях"],
         icon: PharmacyIcon,
         color: "#5ACB3D",
         button: {active: false, text: "Скоро"},
         img: PharmacyImg,
         id: "pharmacySection"
      }
   ];

   const isMobile = useMediaQuery(mediaQueriesConstants.mobile);

   return (
     <>
        {featuresSectionsData.map((el, idx) => (
          <section className="home__feature" key={idx}>
             <div className="container">
                <div className="home__feature_row">
                   <div className="home__feature_top">
                      <div style={{background: el.color}} className="home__feature_icon">
                         <img src={el.icon} alt={el.title}/>
                      </div>
                      {isMobile && <h2 className="typography-h2">{el.title}</h2>}
                   </div>

                   <div className="home__feature_info">
                      {!isMobile && <h2 className="typography-h2">{el.title}</h2>}
                      <p className="typography-h3">{el.subtitle}</p>

                      <ul>{el.list.map((el, idx) => <li className="typography-h3" key={idx}>{el}</li>)}</ul>

                      {el.button.active
                        ? <Button text={el.button.text} action={() => null} size={isMobile ? "medium" : "large"}/>
                        : <button className="home__feature_info-notActiveButton">
                           <Loader window={false} size={"small"}/>
                           Скоро
                        </button>
                      }
                   </div>
                </div>

                <div className="home__feature_img">
                   <img src={el.img} alt={el.title}/>
                </div>
             </div>
          </section>
        ))}
     </>
   );
};

export default FeatureSection;