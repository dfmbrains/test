import React, {FC} from "react";
import "./serviceCard.scss";
import useMediaQuery from "../../hooks/useMediaQuery";
import {mediaQueriesConstants} from "../../helpers/constants";

interface IServiceCard {
   type: "landing" | "profile",
   title: string;
   icon: string;
   color: string;
   action?: () => void;
   subtitle?: string;
   actionButtons?: React.ReactNode;
   children?: React.ReactNode;
}

const ServiceCard: FC<IServiceCard> = ({
                                          type,
                                          action,
                                          title,
                                          subtitle,
                                          icon,
                                          color,
                                          actionButtons,
                                          children
                                       }) => {
   const isLargeTablet = useMediaQuery(mediaQueriesConstants.minLargeTablet);

   return (
     <div onClick={() => action ? action() : null}
          className={`serviceCard serviceCard__${type} ${action ? "serviceCard__active" : ""}`}>
        <div style={{background: color}} className={`serviceCard__img serviceCard__${type}_img`}>
           <img src={icon} alt={title}/>
        </div>
        <div className="serviceCard__action">
           {actionButtons}
        </div>
        <div className={`serviceCard__text serviceCard__${type}_text`}>
           <h3 className={!isLargeTablet || type === "landing" ? "typography-h3" : "typography-h5"}>{title}</h3>
           {subtitle ? (
             isLargeTablet
               ? <p className={isLargeTablet ? "typography-h6" : "typography-subtitle1"}>{subtitle}</p>
               : type === "landing" && <p className={isLargeTablet ? "typography-h6" : "typography-subtitle1"}>{subtitle}</p>
           ) : (
             <></>
           )}
           {children && isLargeTablet && children}
        </div>
     </div>
   );
};

export default ServiceCard;