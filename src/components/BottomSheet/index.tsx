import React, {FC, useEffect, useRef, useState} from "react";
import "./bottomSheet.scss";
import Backdrop from "../Backdrop";

interface IBottomSheet {
   children: React.ReactNode;
   title: string;
   closeAction: () => void;
}

const BottomSheet: FC<IBottomSheet> = ({children, title, closeAction}) => {
   const [bottomSheetHeight, setBottomSheetHeight] = useState<number | false>(0);
   const bottomSheetRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (bottomSheetRef.current) {
         setBottomSheetHeight(bottomSheetRef.current.scrollHeight);
      }
   }, [children]);

   return (
     <>
        <div className="bottomSheet" ref={bottomSheetRef}
             style={bottomSheetHeight !== false ? {height: `${bottomSheetHeight + 20}px`} : {}}>
           <div className="bottomSheet__topBar">
              <div className="bottomSheet__topBar_line"/>
              <div onClick={closeAction} className="bottomSheet__topBar_close">
                 <i className="ri-close-fill"/>
              </div>
           </div>

           <h3 className="typography-h3">{title}</h3>
           {children}
        </div>
        <Backdrop action={closeAction}/>
     </>
   );
};

export default BottomSheet;