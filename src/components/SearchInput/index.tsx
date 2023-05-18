import React, {FC} from "react";
import "./searchInput.scss";
import {useRecoilValue} from "recoil";
import {currentProfileState} from "../../store/profiles/profiles.states";

interface ISearchInput {
}

const SearchInput: FC<ISearchInput> = () => {
   const currentProfile = useRecoilValue(currentProfileState);

   return (
     <label className={`searchInput ${currentProfile ? "searchInput__large" : ""}`}>
        <button>
           <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path stroke="#FD385B" strokeWidth="1.5" strokeMiterlimit="10"
                    d="M12.0909 3.5C10.3918 3.5 8.7308 4.00385 7.31804 4.94782C5.90528 5.8918 4.80417 7.23351 4.15394 8.80328C3.50372 10.3731 3.33359 12.1004 3.66507 13.7669C3.99655 15.4333 4.81476 16.9641 6.01621 18.1655C7.21766 19.367 8.74841 20.1852 10.4149 20.5166C12.0813 20.8481 13.8087 20.678 15.3784 20.0278C16.9482 19.3776 18.2899 18.2764 19.2339 16.8637C20.1779 15.4509 20.6817 13.79 20.6817 12.0909C20.6816 9.81247 19.7764 7.62743 18.1654 6.01636C16.5543 4.4053 14.3693 3.50015 12.0909 3.5Z"/>
              <path d="M18.5 18.5L24.4998 24.4998" stroke="#FD385B" strokeWidth="1.5" strokeMiterlimit="10"
                    strokeLinecap="round"/>
           </svg>
        </button>
        <input type="text" placeholder={"Поиск"}/>
     </label>
   );
};

export default SearchInput;