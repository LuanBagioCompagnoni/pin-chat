import Chat from '@/components/chat/index.js';
import RightAside from '@/components/rigthAside/index.js';

export default function chatGroup({ selectedContact, messagesToChat }) {
  return(
    <div className="flex">
      <Chat selectedContact={selectedContact} messagesToChat={messagesToChat} />
      <RightAside contact={selectedContact} />
    </div>

  );
}
