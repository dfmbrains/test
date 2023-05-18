import React from "react";
import "./notFound.scss";
import Qpng from "../../assets/brand/q.png";
import Button from "../../components/Button";
import {useNavigate} from "react-router-dom";

const NotFound = () => {
   const navigate = useNavigate();

   return (
     <section className="notFound">
        <div>
           <img src={Qpng} alt="q"/>
           <h5>Страница не найдена</h5>
           <Button text={"Вернуться назад"} action={() => navigate(-1)}/>
        </div>

     </section>
   );
};

export default NotFound;