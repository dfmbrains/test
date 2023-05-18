import React, {useEffect} from "react";
import Backdrop from "../Backdrop";
import useMediaQuery from "../../hooks/useMediaQuery";
import {mediaQueriesConstants} from "../../helpers/constants";

const ModalLayout = ({children, closeModal, clx, type = "normal"}: {
   children: React.ReactNode,
   closeModal: () => void,
   clx?: string,
   type?: "normal" | "confirmation"
}) => {

   const isLargeTablet = useMediaQuery(mediaQueriesConstants.minLargeTablet);

   useEffect((): () => void => {
      if (isLargeTablet) {
         document.body.style.overflow = "hidden";
      }

      return () => document.body.style.overflow = "auto";
   }, [isLargeTablet]);

   if (!isLargeTablet && type !== "confirmation") return null;

   return (
     <>
        <div className={`modal modal__${type} ${clx || ""}`}>
           {type !== "confirmation" && (
             <button onClick={closeModal} className="modal__close">
                <i className="ri-close-fill"/>
             </button>
           )}

           {children}
        </div>
        <Backdrop action={closeModal}/>
     </>
   );
};

export default ModalLayout;