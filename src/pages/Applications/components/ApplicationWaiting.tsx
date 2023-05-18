import React from "react";
import WaitingIcon from "../../../assets/imgs/waiting.png";
import {useNavigate} from "react-router-dom";
import ScanImg from "../../../assets/imgs/scanQr.png";
import DownloadButtons from "../../../components/DownloadButtons";
import QrCode from "../../../components/QrCode";
import Button from "../../../components/Button";

const ApplicationWaiting = () => {
   const navigate = useNavigate();

   return (
     <div className="container">
        <div className="createApplication__waiting">
           <img className="createApplication__waiting_img" src={WaitingIcon} alt="wait"/>
           <h3 className="typography-h3">Мы рассматриваем вашу заявку</h3>
           <h4 className="typography-h4">Это займет какое-то время</h4>

           <Button action={() => navigate("/profile")} text={"Отлично, перейти в профиль"}
                   clx={"createApplication__waiting_link"}/>

           <DownloadButtons/>

           <div className="createApplication__waiting_qr">
              <QrCode/>
              <img className="createApplication__waiting_qr-scan" src={ScanImg} alt="scan"/>
              <div className="createApplication__waiting_qr-text">
                 <h5>Отсканируйте <br/> QR code</h5>
                 <p>Cкачайте <br/> приложение</p>
              </div>
           </div>
        </div>
     </div>
   );
};

export default ApplicationWaiting;