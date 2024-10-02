import Chat from '@/components/chat/index.js';
import RightAside from '@/components/rigthAside/index.js';

export default function chatGroup({ selectedContact }) {
  return(
    <div className="flex">
      <Chat selectedContact={selectedContact} />
      <RightAside contact={selectedContact} />
    </div>

  );
}
