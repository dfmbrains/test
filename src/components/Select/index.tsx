import React, {FC, useEffect, useRef, useState} from "react";
import "./select.scss";
import Loader from "../Loader";

interface ISelect {
   placeholder: string;
   onChange: (v: any) => void;
   searchValue: string;
   setSearchValue: (v: string) => void;
   getOptionLabel: (option: any) => string;
   options: any[];
   isOptionsString: boolean;
   loading: boolean;
   disabled?: boolean;
}

const Select: FC<ISelect> = ({
                                disabled,
                                placeholder,
                                onChange,
                                searchValue,
                                setSearchValue,
                                options,
                                isOptionsString,
                                getOptionLabel,
                                loading
                             }) => {
   const selectRef = useRef<HTMLInputElement>(null);

   const [selectedOption, setSelectedOption] = useState<any>(null);
   const [focused, setFocused] = useState<boolean>(false);

   useEffect(() => {
      if (selectedOption) {
         onChange(selectedOption);
      }
   }, [selectedOption]);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
            setFocused(false);
         }
      };

      if (focused) {
         document.addEventListener("click", handleClickOutside);
      }

      return () => {
         document.removeEventListener("click", handleClickOutside);
      };
   }, [focused]);

   return (
     <div className="select">
        <input type="text" placeholder={placeholder} disabled={disabled}
               onFocus={() => setFocused(true)} ref={selectRef}
               onChange={(e) => setSearchValue(e.target.value)}
               value={!focused && selectedOption ? getOptionLabel(selectedOption) : searchValue}
        />
        <span className="select__indicators">
           {loading && <Loader window={false} size={"small"}/>}
           <i className="ri-arrow-down-s-line"/>
        </span>

        {focused && (
          <div className="select__options">
             {loading
               ? <p>Поиск...</p>
               : options.length > 0
                 ? options.map((el, idx) => (
                   <p key={idx} className={"select__options_item"}
                      onClick={(event) => {
                         event.preventDefault();
                         setSelectedOption(el);
                         setFocused(false);
                      }}
                   >
                      {isOptionsString ? el : getOptionLabel(el)}
                   </p>
                 ))
                 : searchValue
                   ? <p>Ничего не найдено</p>
                   : <p>Начните писать, чтобы начать поиск</p>
             }
          </div>
        )}
     </div>
   );
};

export default Select;