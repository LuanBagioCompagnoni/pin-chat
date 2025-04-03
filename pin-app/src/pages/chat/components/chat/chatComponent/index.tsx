import Chat from '@/components/chat/index';
import ChatContactInfos from '@/components/chatContactInfos/index';

interface chatComponentProps {
    className: string,
    selectedContact: any,
    clearContact: any
}

export default function ChatComponent({ className, selectedContact, clearContact }: chatComponentProps) {

  return(
    <div className="flex flex-col">
      <ChatContactInfos contact={selectedContact} className={className} clearContact={clearContact} />
      <Chat selectedContact={selectedContact} className={className} />
    </div>

  );
}
