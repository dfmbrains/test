import React, {FC} from "react";
import {Link, NavLink} from "react-router-dom";
import {mediaQueriesConstants, navigationsLanding} from "../../../helpers/constants";
import {useRecoilValue} from "recoil";
import {currentProfileState} from "../../../store/profiles/profiles.states";
import useMediaQuery from "../../../hooks/useMediaQuery";

interface NavigationsInterface {
   navigationsAuthed: {
      icon: React.ReactNode
      title: string,
      link: string
   }[];
}

const Navigation: FC<NavigationsInterface> = ({navigationsAuthed}) => {

   const currentProfile = useRecoilValue(currentProfileState);

   const isDesktop = useMediaQuery(mediaQueriesConstants.minDesktop);

   return (
     isDesktop ?
       currentProfile
         ? <div className="navigationAuthed">
            {navigationsAuthed.map((page, idx) => (
              <NavLink key={idx} className="navigationAuthed__item typography-h5" to={page.link}>
                 {page.icon}
                 {page.title}
              </NavLink>
            ))}
         </div>
         : <div className="navigation">
            {navigationsLanding.map((pageLink, idx) => (
              <div className="navigation__item" key={idx}>
                 <Link className="typography-h6" to={pageLink.link}>
                    {pageLink.title}
                    <i className="ri-arrow-down-s-line"/>
                 </Link>
                 <div className="navigation__item_modal">
                    {pageLink.items.map((hashLink, index) => (
                      hashLink.disabled
                        ? null
                        : <p key={index} className="typography-subtitle1">{hashLink.title}</p>
                    ))}
                 </div>
              </div>
            ))}
         </div>
       : <div className="navigationAuthed">
          {navigationsAuthed.map((page, idx) => (
            <NavLink key={idx} className="navigationAuthed__item typography-h5" to={page.link}>
               {page.icon}
               {page.title}
            </NavLink>
          ))}
       </div>
   );
};

export default Navigation;