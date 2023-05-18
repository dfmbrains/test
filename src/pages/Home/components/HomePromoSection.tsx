import React, {useEffect} from "react";
import DownloadButtons from "../../../components/DownloadButtons";
import AnimatedHand from "./AnimatedHand";
import HomePromoBot from "./HomePromoBot";
import useMediaQuery from "../../../hooks/useMediaQuery";
import SearchInput from "../../../components/SearchInput";
import {mediaQueriesConstants} from "../../../helpers/constants";
import {useRecoilState, useRecoilValue} from "recoil";
import {currentProfileState} from "../../../store/profiles/profiles.states";
import {storiesState} from "../../../store/content/content.states";
import Loader from "../../../components/Loader";
import {getStoriesWithImages} from "../../../api/content.api";

const HomePromoSection = () => {
   const isLargeTablet = useMediaQuery(mediaQueriesConstants.minLargeTablet);
   const isMobile = useMediaQuery(mediaQueriesConstants.mobile);

   const currentProfile = useRecoilValue(currentProfileState);
   const [stories, setStories] = useRecoilState(storiesState);

   useEffect(() => {
      if (stories.length === 0 && !isLargeTablet) {
         getStoriesWithImages(5)
           .then(stories => setStories(stories));
      }
   }, [stories]);

   return (
     <section className="home__promo">
        <div className={`home__promo_top home__promo_top-${currentProfile ? "authed" : "guest"}`}>
           <div className="container">
              <div className="home__promo_left">
                 {currentProfile && !isLargeTablet
                   ? <div className="home__promo_stories">
                      {stories.length > 0
                        ? stories.map(el => (
                          <div className="home__promo_stories-item" key={el.id}>
                             <img src={el.body.image} alt={el.title}/>
                          </div>
                        ))
                        : <>
                           <div className="home__promo_stories-item home__promo_stories-loading">
                              <Loader window={false} size={isMobile ? "small" : "medium"}/>
                           </div>
                           <div className="home__promo_stories-item home__promo_stories-loading">
                              <Loader window={false} size={isMobile ? "small" : "medium"}/>
                           </div>
                           <div className="home__promo_stories-item home__promo_stories-loading">
                              <Loader window={false} size={isMobile ? "small" : "medium"}/>
                           </div>
                        </>
                      }
                   </div>
                   : <>
                      <h1 className={isLargeTablet ? "typography-h1" : "typography-h2"}>Удобная запись</h1>
                      <DownloadButtons/>
                   </>
                 }

                 {!isLargeTablet && (
                   <div className="home__promo_search">
                      <SearchInput/>
                      <div className="home__promo_recommends">
                         <p className="typography-body2">Детские специалисты</p>
                         <p className="typography-body2">ТОП клиник</p>
                         <p className="typography-body2">ТОП Врачей</p>
                         <p className="typography-body2">ТОП Врачей</p>
                         <p className="typography-body2">ТОП Врачей</p>
                         <p className="typography-body2">ТОП Врачей</p>
                         <p className="typography-body2">ТОП Врачей</p>
                         <p className="typography-body2">ТОП Врачей</p>
                         <p className="typography-body2">ТОП Врачей</p>
                      </div>
                   </div>
                 )}
              </div>
              {isLargeTablet && <AnimatedHand/>}
           </div>
        </div>

        <HomePromoBot/>
     </section>
   );
};

export default HomePromoSection;