import { useParams } from 'react-router-dom';

import './styles.scss';
import emptyContactsIcon from '../../../assets/emptyContacts.svg';
import { useEffect, useState } from 'react';
import {ProfileItem} from "../../Profile/ProfileItem.tsx";
import type {IUser} from "../../../types/Auth_Response.ts";
import ContactsService from "../../../services/ContactsService.tsx";

export const ContactBox = () => {
    const { contactId } = useParams();
    const [currentProfile, setCurrentProfile] = useState<IUser | null>(null);

    const handleFindContact = async (contactId: string) => {
        const res = await ContactsService.getContact(contactId)
        setCurrentProfile(res.data)
    }

    useEffect(() => {
        if (!contactId) return;
        handleFindContact(contactId)
    }, [contactId]);

    if (!contactId || !currentProfile) {
        return (
            <div className="contactBox empty">
                <img src={emptyContactsIcon} alt="emptyChat" />
                <h4>No contacts yet</h4>
                <p>Invite your contacts or add people manually from their profiles, and they will appear here</p>
            </div>
        );
    }

    return (
        <div className="contactBox">
            <ProfileItem user={currentProfile}/>
        </div>
    )
};
