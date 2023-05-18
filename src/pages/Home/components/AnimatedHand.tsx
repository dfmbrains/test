import React from "react";
import QrCode from "../../../components/QrCode";
import PromoHandImg from "../../../assets/imgs/promo-hand.webp";
import Promo1Img from "../../../assets/imgs/promo-1.webp";
// import Promo2Img from "../../../assets/imgs/promo-2.webp";
// import Promo3Img from "../../../assets/imgs/promo-3.webp";

const AnimatedHand = () => {
   return (
     <div className="animatedHand">
        <div className="animatedHand__box">
           <img className="animatedHand__box_hand" src={PromoHandImg} alt="promo-hand"/>
           <img className="animatedHand__box_slide" src={Promo1Img} alt="promo1"/>
           {/*<img className="animatedHand__box_slide" src={Promo2Img} alt="promo2"/>*/}
           {/*<img className="animatedHand__box_slide" src={Promo3Img} alt="promo3"/>*/}
        </div>
        <QrCode/>
     </div>
   );
};

export default AnimatedHand;