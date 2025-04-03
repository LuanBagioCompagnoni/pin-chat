import Chat from '@/pages/chat/components/chat';
import ChatContactInfos from '@/pages/chat/components/chat/components/header';

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
