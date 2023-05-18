import React, {FC} from "react";
import "./loader.scss";

interface ILoader {
   window: "full" | "visible-header" | false;
   size: "small" | "medium" | "large";
}

const Loader: FC<ILoader> = ({window, size}) => {
   return (
     window === "full"
       ? <div className="loader__full loader__full_window">
          <div className={`loader loader__${size}`}/>
       </div>
       : window === "visible-header"
         ? <div className="loader__full loader__full_visibleHeader">
            <div className={`loader loader__${size}`}/>
         </div>
         : <div className={`loader loader__${size}`}/>
   );
};

export default Loader;