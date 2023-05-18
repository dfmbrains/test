import React from "react";
import "./profile.scss";
import ProfileBar from "../../components/ProfileBar";
import ServiceCard from "../../components/ServiceCard";
import SettingsIcon from "../../assets/icons/settings.svg";
import GroupIcon from "../../assets/icons/group.svg";
import InfoIcon from "../../assets/icons/info.svg";
import PatternIcon from "../../assets/icons/pattern.svg";
import BankCardIcon from "../../assets/icons/bank-card.svg";
import MessageIcon from "../../assets/icons/message.svg";
import AddUserIcon from "../../assets/icons/add-user.svg";
import FaqIcon from "../../assets/icons/faq.svg";
import DoctorItemIcon from "../../assets/icons/doctor-item.svg";
import ExitImgIcon from "../../assets/icons/exit.svg";
import KaspiIcon from "../../assets/icons/kaspi.svg";
import {Link, useNavigate} from "react-router-dom";
import {
   AddIcon,
   CloseIcon,
   EntryIcon,
   ExitIcon,
   OkIcon,
   TelegramIcon,
   WhatsappIcon
} from "../../assets/icons/html-icons";
import {mediaQueriesConstants, qomekSocialMedia} from "../../helpers/constants";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {currentProfileGroupState} from "../../store/profiles/profiles.states";
import useMediaQuery from "../../hooks/useMediaQuery";
import {cardIconGenerator, cardTypesGenerator, firstNameLastNameHandler} from "../../helpers/utils";
import useLogout from "../../hooks/useLogout";
import {currentProfileCardsState} from "../../store/payment/payment.states";
import {ProfileRoles} from "../../models/profiles";
import {currentProfileApplicationState} from "../../store/applications/application.states";
import {applicationsStatuses} from "../../models/clinic";
import Loader from "../../components/Loader";
import {
   applicationModalState,
   paymentMethodsModalStepState,
   sessionRoleState
} from "../../store/settings/settings.states";
import {currentProfileTemplatesState} from "../../store/clinic/clinic.states";

const ActionButton = ({title, icon, action, selected, disabled = false}: {
   title: string,
   icon?: React.ReactNode,
   action?: () => void,
   selected?: boolean,
   disabled?: boolean
}) => {
   const isLargeTablet = useMediaQuery(mediaQueriesConstants.minLargeTablet);

   return (
     isLargeTablet
       ? <button onClick={(e) => {
          e.stopPropagation();
          if (action) action();
       }}
                 className={`profile__actionButton ${!disabled ? "profile__actionButton_active" : ""} ${selected ? "profile__actionButton_selected" : ""}`}
                 disabled={disabled}>
          {icon && icon}
          {title}
       </button>
       : <i className="ri-arrow-right-s-line"/>
   );
};

const ProfileSocialMedia = () => {
   const isLargeTablet = useMediaQuery(mediaQueriesConstants.minLargeTablet);

   return (
     isLargeTablet
       ? <div className="profile__socialMedia">
          <a href={qomekSocialMedia.telegram} target="_blank" rel="noreferrer"><TelegramIcon/></a>
          <a href={`mailto:${qomekSocialMedia.email}`} target="_blank" rel="noreferrer"><WhatsappIcon/></a>
       </div>
       : <i className="ri-arrow-right-s-line"/>
   );
};

const Profile = () => {
   const navigate = useNavigate();
   const handleLogout = useLogout();

   const isDesktop = useMediaQuery(mediaQueriesConstants.minDesktop);
   const isLargeTablet = useMediaQuery(mediaQueriesConstants.minLargeTablet);

   const [sessionRole, setSessionRole] = useRecoilState(sessionRoleState);

   const currentProfileTemplates = useRecoilValue(currentProfileTemplatesState);
   const profileGroup = useRecoilValue(currentProfileGroupState);
   const profileCards = useRecoilValue(currentProfileCardsState);
   const profileApplication = useRecoilValue(currentProfileApplicationState);

   const setPaymentMethodsModal = useSetRecoilState(paymentMethodsModalStepState);
   const setApplicationModal = useSetRecoilState(applicationModalState);

   const handleSessionRoleContent = () => {
      switch (sessionRole) {
         case "client":
            return (
              <>
                 <ServiceCard action={() => navigate("my-group")} title={"Моя группа"} type={"profile"}
                              icon={GroupIcon} color={"#FBC815"}
                              subtitle={profileGroup.length > 0 ? "" : "Группа не создана"}
                              actionButtons={<ActionButton title={"Добавить"} icon={<AddIcon/>}/>}>

                    <div className="profile__buttonsScroll">
                       {profileGroup.map(member => (
                         <ActionButton title={firstNameLastNameHandler(member.firstName, member.lastName)}
                                       key={member.userId}/>
                       ))}
                    </div>
                 </ServiceCard>

                 <ServiceCard title={"Способы оплаты"} type={"profile"} icon={BankCardIcon} color={"#FD385B"}
                              action={isLargeTablet ? undefined : () => navigate("payment-methods")}
                              actionButtons={<ActionButton action={() => setPaymentMethodsModal("view")}
                                                           title={"Добавить"} icon={<AddIcon/>}/>}>
                    <div className="profile__buttonsScroll">
                       {profileCards.map(card => (
                         <ActionButton key={card.id} title={`****${card.number}`} selected={card.isDefault}
                                       icon={<img src={cardIconGenerator(card.type)}
                                                  alt={cardTypesGenerator(card.type)}/>}/>
                       ))}
                       <ActionButton title={`Kaspi`} selected={profileCards.length === 0}
                                     icon={<img src={KaspiIcon} alt="kaspi"/>}/>
                    </div>
                 </ServiceCard>

                 <ServiceCard title={"Связь с нами"} type={"profile"} icon={MessageIcon} color={"#C032F2"}
                              subtitle={"Наши операторы работают с 8:00 до 20:00 каждый день"}
                              actionButtons={<ProfileSocialMedia/>}/>

                 <ServiceCard title={"FAQ"} type={"profile"} icon={FaqIcon} color={"#1BC4E9"}
                              subtitle={"Ответы на популярные вопросы"}
                              actionButtons={!isLargeTablet && <i className="ri-arrow-right-s-line"/>}/>

                 <ServiceCard title={"Для специалистов"} type={"profile"} icon={DoctorItemIcon} color={"#9D21FF"}
                              action={profileApplication?.status === applicationsStatuses.accepted ? () => setSessionRole(ProfileRoles.doctor) : !isLargeTablet ? () => navigate("/create-application") : undefined}
                              actionButtons={!isLargeTablet ? (
                                profileApplication
                                  ? profileApplication.status === applicationsStatuses.accepted
                                    ? <div style={{padding: "0 6px 0 0"}}><OkIcon/></div>
                                    : profileApplication.status === applicationsStatuses.created
                                      ? <Loader window={false} size={"small"}/>
                                      : <div style={{padding: "0 6px 0 0"}}><CloseIcon/></div>
                                  : <i className="ri-arrow-right-s-line"/>
                              ) : isLargeTablet && profileApplication?.status === applicationsStatuses.accepted
                                ? <ActionButton title={"Войти"} icon={<EntryIcon/>}
                                                action={() => setSessionRole(ProfileRoles.doctor)}/>
                                : undefined
                              }>
                    {profileApplication
                      ? profileApplication.status === applicationsStatuses.accepted
                        ? <ActionButton title={"Ваша заявка одобрена"} icon={<OkIcon/>} disabled={true}/>
                        : profileApplication.status === applicationsStatuses.created
                          ? <ActionButton title={"Рассмотрение вашей заявки"}
                                          icon={<Loader window={false} size={"small"}/>} disabled={true}/>
                          : <ActionButton title={"Ваша заявка не принята"} icon={<CloseIcon/>}
                                          action={() => setApplicationModal("rejectedApplication")}/>
                      : <div className="profile__buttonsScroll">
                         <ActionButton action={() => navigate(`/create-application?role=${ProfileRoles.doctor}`)}
                                       title={"Врач"} icon={<PrimaryDoctorItemIcon/>}/>
                         <ActionButton action={() => setApplicationModal("nurse")}
                                       title={"Медсестра"} icon={<PrimaryNurseIcon/>}/>
                      </div>
                    }
                 </ServiceCard>
              </>
            );
         case "doctor":
            return (
              <>
                 <ServiceCard title={"Информация о враче"} type={"profile"} icon={InfoIcon} color={"#FD385B"}/>

                 <ServiceCard title={"Мои шаблоны"} type={"profile"} icon={PatternIcon}
                              subtitle={currentProfileTemplates.length === 0 ? "Шаблоны не добавлены" : ""}
                              color={"#FBC815"} action={() => navigate("/templates")}
                              actionButtons={<ActionButton title={"Добавить"} icon={<AddIcon/>}
                                                           action={() => navigate("/templates")}/>}>
                    <div className="profile__buttonsScroll">
                       {currentProfileTemplates.map(template => (
                         <ActionButton key={template.id} title={template.name}/>
                       ))}
                    </div>
                 </ServiceCard>

                 <ServiceCard title={"Связь с нами"} type={"profile"} icon={MessageIcon} color={"#1BC4E9"}
                              subtitle={"Наши операторы работают с 8:00 до 20:00 каждый день"}
                              actionButtons={<ProfileSocialMedia/>}/>

                 <ServiceCard title={"Войти как пациент"} type={"profile"} icon={AddUserIcon} color={"#9D21FF"}
                              subtitle={"Оформляйте анализы и консультации"}
                              action={() => setSessionRole(ProfileRoles.client)}
                              actionButtons={<ActionButton title={"Войти"} icon={<EntryIcon/>}
                                                           action={() => setSessionRole(ProfileRoles.client)}/>}/>
              </>
            );
      }
   };

   return (
     <>
        <ProfileBar/>
        <section className="profile">
           <div className="container">
              <div className="profile__row">
                 <ServiceCard title={"Настройки профиля"} type={"profile"} subtitle={"Фото и информация профиля"}
                              icon={SettingsIcon} color={"#115AFB"} action={() => navigate("edit")}
                              actionButtons={<ActionButton title={"Выйти"} icon={<ExitIcon/>}
                                                           action={handleLogout}/>}/>

                 {handleSessionRoleContent()}

                 {!isLargeTablet && (
                   <ServiceCard title={"Выйти"} type={"profile"} icon={ExitImgIcon} color={"#FF2171"}
                                actionButtons={<i className="ri-arrow-right-s-line"/>} action={handleLogout}/>
                 )}
              </div>
              {isDesktop && (
                <div className="profile__terms">
                   <Link className="typography-body1" to={"/"}>Публичная оферта</Link>
                   <Link className="typography-body1" to={"/"}>Правила пользования</Link>
                   <Link className="typography-body1" to={"/"}>Политика конфиденциальности</Link>
                   <Link className="typography-body1" to={"/"}>Свяжитесь с нами</Link>
                </div>
              )}
           </div>
        </section>
     </>
   );
};

export default Profile;

const PrimaryDoctorItemIcon = () => {
   return (
     <svg width="23" height="24" viewBox="0 0 23 24" fill="none"
          xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_901_4573)">
           <path fill="#FD385B"
                 d="M18.3163 11.9484C17.0182 12.6979 15.3231 12.2194 14.5533 10.8861C13.7835 9.55279 14.2167 7.84562 15.5149 7.09609C16.8131 6.34657 18.5081 6.82506 19.2779 8.15836C20.0477 9.49166 19.6145 11.1989 18.3163 11.9484ZM16.272 8.40751C15.6761 8.75156 15.4769 9.53685 15.8302 10.1489C16.1836 10.7609 16.9633 10.981 17.5592 10.6369C18.1551 10.2929 18.3543 9.50759 18.001 8.89558C17.6476 8.28357 16.8679 8.06349 16.272 8.40751Z"/>
           <path fill="#FD385B"
                 d="M17.3247 11.7045L19.1166 14.8082C20.164 16.6223 19.5836 18.9099 17.8172 19.9298C16.0508 20.9496 13.7795 20.3084 12.7321 18.4943L10.5994 14.8004C12.9892 13.0418 13.6813 9.66972 12.1291 6.98132L10.3246 3.85578C10.11 3.48419 9.66935 3.35982 9.30759 3.56869L7.92428 4.36734L7.89903 4.32363C7.68442 3.95209 7.24374 3.82765 6.88193 4.03654C6.52013 4.24543 6.40755 4.68929 6.62206 5.06083L7.42969 6.45969C7.64422 6.83128 8.08492 6.95565 8.44669 6.74678C8.80845 6.53792 8.92107 6.09403 8.70656 5.72249L8.68132 5.67877L9.4262 5.24872L10.8522 7.71857C12.1014 9.88239 11.3998 12.6481 9.29288 13.8645C7.18596 15.0809 4.44001 14.3058 3.1907 12.1419L1.76473 9.67207L2.46704 9.26659L2.49228 9.31031C2.70681 9.68189 3.14751 9.80626 3.50927 9.5974C3.87104 9.38853 3.98366 8.94465 3.76915 8.57311L2.96152 7.17425C2.74705 6.80268 2.30632 6.67827 1.94456 6.88713C1.58279 7.096 1.47013 7.53991 1.68464 7.91145L1.70989 7.95517L0.369143 8.72925C0.00733744 8.93813 -0.105239 9.38199 0.109271 9.75354L1.9138 12.8791C3.44071 15.5238 6.63061 16.6255 9.3225 15.5376L11.4551 19.2315C12.919 21.7669 16.1056 22.6664 18.5743 21.2411C21.043 19.8159 21.8573 16.6063 20.3935 14.0709L18.6016 10.9672L17.3247 11.7045Z"/>
        </g>
        <defs>
           <clipPath id="clip0_901_4573">
              <rect width="20.1999" height="20.7459" fill="white"
                    transform="translate(-1.88672 9.09961) rotate(-30)"/>
           </clipPath>
        </defs>
     </svg>
   );
};

const PrimaryNurseIcon = () => {
   return (
     <svg width="15" height="21" viewBox="0 0 15 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="#FD385B"
              d="M1.67623 14.234C2.67257 14.8093 3.43412 15.249 4.43047 15.8242L3.23785 17.8899L1.86073 17.0948C1.47995 16.875 0.994066 17.0057 0.774624 17.3858C0.555181 17.7659 0.68487 18.2521 1.06564 18.4719L5.19701 20.8572C5.57779 21.077 6.06367 20.9462 6.28311 20.5662C6.50256 20.1861 6.37287 19.6999 5.99209 19.4801L4.61497 18.685L5.80759 16.6193C6.80394 17.1945 7.56549 17.6342 8.56184 18.2095C8.94261 18.4293 9.4285 18.2985 9.64794 17.9184C9.86738 17.5384 9.73769 17.0522 9.35692 16.8323L8.66836 16.4348L13.4389 8.17206C14.1775 6.89271 13.9142 5.31492 12.9069 4.32297L14.5535 1.47095C14.7729 1.09086 14.6432 0.604687 14.2625 0.384847C13.8817 0.165007 13.3958 0.29578 13.1764 0.675867L11.5298 3.52789C10.167 3.15151 8.66899 3.71239 7.93036 4.99173L3.15987 13.2545L2.47131 12.8569C2.09053 12.6371 1.60465 12.7679 1.38521 13.1479C1.16576 13.528 1.29545 14.0142 1.67623 14.234ZM9.30748 5.78681C9.74597 5.02733 10.7202 4.76629 11.4797 5.20477C12.2392 5.64326 12.5002 6.6175 12.0617 7.37698L11.3732 6.97944C10.9924 6.7596 10.5065 6.89037 10.2871 7.27046C10.0676 7.65054 10.1973 8.13672 10.5781 8.35656L11.2666 8.7541L10.4716 10.1312L9.783 9.73368C9.40223 9.51384 8.91634 9.64462 8.6969 10.0247C8.47746 10.4048 8.60715 10.891 8.98792 11.1108L9.67648 11.5083L8.8814 12.8855L8.19284 12.4879C7.81207 12.2681 7.32618 12.3989 7.10674 12.7789C6.88729 13.159 7.01698 13.6452 7.39776 13.865L8.08632 14.2626L7.29124 15.6397L4.53699 14.0495L9.30748 5.78681Z"/>
     </svg>
   );
};