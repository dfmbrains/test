import React, {FC} from 'react';
import './GroupCard.scss';
import {IProfile} from "../../../../models/profiles";
import Button from "../../../../components/Button";
import EditIcon from '../../../../assets/icons/edit.svg'
import DeleteIcon from '../../../../assets/icons/deleteIcon.svg'

interface IGroupCard {
    card: IProfile
}

const GroupCard: FC<IGroupCard> = ({card}) => {
    return (
        <div className="GroupCard">
           <span className="typography-h6">
                {`${card?.firstName} ${card?.lastName} ${card?.midName}`}
           </span>
            <div className="GroupCard__buttons">
                <Button variant={'outlined'} startIcon={<img src={EditIcon} alt=""/>} text={""}/>
                <Button variant={'outlined'} startIcon={<img src={DeleteIcon} alt=""/>} text={""}/>
            </div>
        </div>
    );
};

export default GroupCard;