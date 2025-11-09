import './styles.scss';
import emptyChatListIcon from '../../../../assets/emptyChatList.svg';
import { useScrollbar } from '../../../../hooks/useScrollbar';
import {useRef} from 'react';
import {ContactBlock} from "./ContactBlock/ContactBlock.tsx";
import type {IUser} from "../../../../types/Auth_Response.ts";

interface ContactsListProps {
    friendsList: IUser[]
}

export const ContactsList = ({ friendsList }: ContactsListProps) => {
    const contactsListRef = useRef<HTMLDivElement>(null);
    const hasScrollbar = useScrollbar(contactsListRef, friendsList);

    return (
        <div ref={contactsListRef} className={`contactsList ${friendsList.length <= 0 ? 'empty' : ''} ${hasScrollbar ? 'has-scrollbar' : ''}`}>
            {friendsList.length <= 0 && (
                <>
                    <img src={emptyChatListIcon} alt="emptyChat" />
                    <h4>No Conversations Yet</h4>
                    <p>Start a new chat or invite others to join the conversation.</p>
                </>
            )}

            {friendsList.map((friend:IUser) => (
                <ContactBlock key={friend.id} {...friend} />
            ))}
        </div>
    );
};
