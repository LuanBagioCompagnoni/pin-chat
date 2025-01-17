import { File } from '@/shared/types/file';
import { Tag } from '@/shared/types/tag';

type PhoneTypes = 'cellphone' | 'whatsapp' | 'residential' | 'commercial';
type ClassificationTypes = 'holder' | 'relative' | 'friend' | 'work' | 'other';

interface Phone {
    id: string;
    number: string;
    type: PhoneTypes;
    whatsapp: boolean;
    cellphone: boolean;
    integration: boolean;
}

export interface Contact {
    id: string;
    name: string;
    classification: ClassificationTypes;
    client?: {
        id: string;
        name: string;
    };

    email?: string;
    username?: string;
    password?: string;

    phones: Phone[];
    tags?: Tag[];

    image?: File;

    sendHistoryByEmail?: boolean;
    alwaysAuthenticateUponCustomerServiceCreation?: boolean;
    sendAlertMessage?: boolean;
    alertMessage?: string;

    contactId?: string;
    clientId?: string;
    providerId?: string;
}
