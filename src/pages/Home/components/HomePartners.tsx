import React, {useEffect} from "react";
import {getPartnersWithImages} from "../../../api/content.api";
import {useRecoilState} from "recoil";
import {partnersState} from "../../../store/content/content.states";
import {cutStringForReading} from "../../../helpers/utils";
import useMediaQuery from "../../../hooks/useMediaQuery";
import {mediaQueriesConstants} from "../../../helpers/constants";

const HomePartners = () => {
   const isMediumTablet = useMediaQuery(mediaQueriesConstants.minMediumTablet);

   const [partners, setPartners] = useRecoilState(partnersState);

   useEffect(() => {
      if (partners.length === 0) {
         getPartnersWithImages()
           .then(partners => setPartners(partners));
      }
   }, [partners]);

   if (partners.length === 0) return null;

   return (
     <div className="home__promo_partners">
        <h3 className="typography-h3">Партнеры</h3>

        <div className="home__promo_partners-row">
           {partners.map(el => (
             <div key={el.id} className="home__promo_partners-item">
                <div className="home__promo_partners-item-img">
                   <img src={el.body.Image} alt={el.title}/>
                </div>
                <div className="home__promo_partners-item-bot">
                   <h4>{cutStringForReading(el.body.shortTitle || "", 17)}</h4>
                   <p className="typography-body1">
                      {cutStringForReading(el.body.shortNote || "", isMediumTablet ? 50 : 30)}</p>
                </div>
             </div>
           ))}
        </div>
     </div>
   );
};

export default HomePartners;