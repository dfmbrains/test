import React from "react";
import "./qrCode.scss";
import QrCodeImg from "../../assets/imgs/qrCode.png";

const QrCode = () => {
   return (
     <div className="qrCode">
        <img src={QrCodeImg} alt="qr"/>
     </div>
   );
};

export default QrCode;