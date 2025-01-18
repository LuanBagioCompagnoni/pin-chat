import {Message} from './Message';
import {User} from './User';

export interface ContactObject {
    contact: User;
    lastMessage: Message;
    isNotification?: boolean;
    isSelected?: boolean;
}