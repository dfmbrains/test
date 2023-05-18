import React from "react";

const Backdrop = ({action}: { action?: () => void }) => {
   return (
     <div onClick={() => action ? action() : null}
          style={{
             background: "#000000",
             opacity: "0.2",
             position: "fixed",
             width: "100vw",
             height: "100vh",
             zIndex: "100",
             top: 0,
             left: 0
          }}
     />
   );
};

export default Backdrop;