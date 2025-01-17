export interface Message {
    _id: string;
    originUserId: string;
    destinationUserId: string;
    content: string;
    type: string;
    date: string;
    seen: boolean;
}