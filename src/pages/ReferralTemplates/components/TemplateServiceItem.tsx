import React from "react";

const TemplateServiceItem = ({action, title}: { action: () => void, title: string }) => {
   return (
     <div className="templateServiceItem">
        <p className="typography-subtitle1">{title}</p>

        <span onClick={action}
              className="templateServiceItem__delete">
           <i className="ri-close-fill"/>
        </span>
     </div>
   );
};

export default TemplateServiceItem;