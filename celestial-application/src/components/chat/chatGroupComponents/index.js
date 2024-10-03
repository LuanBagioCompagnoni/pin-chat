import Chat from '@/components/chat/index.js';
import RightAside from '@/components/rigthAside/index.js';

export default function chatGroup({ chatClassName, rigthAsideClassName, selectedContact }) {
  return(
    <div className="flex">
      <Chat selectedContact={selectedContact} chatClassName={chatClassName} />
      <RightAside contact={selectedContact} rigthAsideClassName={rigthAsideClassName} />
    </div>

  );
}
