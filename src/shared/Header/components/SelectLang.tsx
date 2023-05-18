import React, {useEffect, useRef, useState} from "react";
import {ILanguage} from "../../../models/settings";
import {languages} from "../../../helpers/constants";

const SelectLang = () => {
   const languageSelectRef = useRef<HTMLDivElement>(null);

   const [isOpen, setIsOpen] = useState<boolean>(false);
   const [lang, setLand] = useState<ILanguage>(languages[0]);

   const handleSwitchLanguage = (language: ILanguage) => {
      setLand(language);
      setIsOpen(false);
   };

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (languageSelectRef.current && !languageSelectRef.current.contains(event.target as Node)) {
            setIsOpen(false);
         }
      };

      if (isOpen) {
         document.addEventListener("click", handleClickOutside);
      }

      return () => {
         document.removeEventListener("click", handleClickOutside);
      };
   }, [isOpen]);

   return (
     <div onClick={() => setIsOpen(!isOpen)} className="languageSelect" ref={languageSelectRef}>
        <div className={`languageSelect__item languageSelect__selected_${isOpen ? "open" : "closed"}`}>
           <p className="typography-subtitle2">{lang.title}</p>
           <i style={{transform: `rotate(${isOpen ? "-180deg" : "0"})`}} className="ri-arrow-down-s-line"/>
        </div>
        {isOpen && (
          <div className={`languageSelect__disabled languageSelect__item_${isOpen ? "open" : "closed"}`}>
             {languages.filter(el => el.value !== lang.value).map((el, idx) => (
               <div onClick={() => handleSwitchLanguage(el)} className="languageSelect__item" key={idx}>
                  <p className="typography-subtitle2">{el.title}</p>
               </div>
             ))}
          </div>
        )}
     </div>
   );
};

export default SelectLang;