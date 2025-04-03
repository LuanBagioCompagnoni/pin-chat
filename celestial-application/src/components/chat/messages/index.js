import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/context/AuthContext.js';
import { useSocket } from '@/services/socket.js';
import { useNotification } from '@/hooks/notification.js';
import LoadingIcon from '@/components/basics/loading/loadingIcon.js';

const formatDate = (date) => {
  const d = new Date(date);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};

const formatTime = (date) => {
  const d = new Date(date);
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export default function Messages({ selectedContact }) {
  const listRef = useRef(null);
  const { user, token } = useAuth();
  const { socket } = useSocket(token);
  const [messages, setMessages] = useState([]);
  const { emitNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (socket) {
      socket.on('receiveMessage', (newMessage) => {
        const dUser = newMessage?.destinationUserId;
        const oUser = newMessage?.originUserId;
        if ((oUser === selectedContact._id && dUser === user._id) || (oUser === user._id && dUser === selectedContact._id)) {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      });

      socket.on('seenMessages', (destinationUserId) => {
        console.log('SeenMessages', destinationUserId, selectedContact);
        if (selectedContact._id === destinationUserId) {
          setMessages(prevMessages =>
            prevMessages.map(message => {
              console.log(message);
              if (!message?.seen) {
                return { ...message, seen: true };
              }
              return message;
            })
          );
        }
      });


      socket.on('listMessages', (messagesToChat) => {
        setIsLoading(false);
        setMessages(messagesToChat);
      });

      return () => {
        socket.off('receiveMessage');
        socket.off('listMessages');
        socket.off('seenMessages');
      };
    }
  }, [socket, user, selectedContact, emitNotification]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ul ref={listRef} className="overflow-y-auto w-full h-full p-4 flex flex-col space-y-2 text-gray-900 items-center scrollbar-custom relative">
      {isLoading ? ( <div className='w-full h-full flex items-center justify-center'><LoadingIcon/></div> ) : ( messages.length > 0 ? (
        user && messages.map((message, index) => {
          const isOrigin = message?.originUserId === user?._id;
          const showDate = index === 0 || formatDate(messages[index - 1].date) !== formatDate(message.date);
          return (
            <React.Fragment key={message.id}>
              {showDate && (
                <span className="px-4 bg-[#e8e8e8] rounded-full py-2 text-sm font-normal text-[#2E2E2E]">
                  {formatDate(message.date)}
                </span>
              )}

              <li className={`flex flex-row space-x-2 items-end w-full ${isOrigin ? 'self-end flex-row-reverse' : 'self-start'}`}>
                <img className={' rounded-full w-[40px] h-[40px] ml-2 '}
                  src='https://cdn-icons-png.flaticon.com/512/4645/4645949.png' alt='UserImage'/>
                <div className={`flex flex-col rounded-3xl px-4 py-2 max-w-[70%] break-words shadow-md shadow-gray-300 space-y-0.5 ${isOrigin ? 'bg-[#562490] text-gray-50 rounded-br-sm' : 'rounded-bl-sm bg-[#EDEDED]'}`}>
                  <h1 className={`${isOrigin ? 'text-end' : ''} text-xs font-bold`}>{isOrigin ? user.name : selectedContact.name}</h1>
                  <h1 className={`font-light ${isOrigin ? 'text-right mr-0.5' : 'text-left ml-0.5'}`}>{message.content}</h1>
                  <div
                    className={`flex flex-row ${isOrigin ? 'justify-end' : 'justify-start'}`}>

                    <div
                      className={`text-xs font-extralight mt-2 ${message.originUserId === user._id ? 'self-end' : 'self-start'}`}>
                      {formatTime(message?.date)}
                    </div>
                    <div className='ml-2 mt-2'>
                      {isOrigin ? (message?.seen ?
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="#3ab7ff"
                          class="bi bi-check2-all" viewBox="0 0 16 16">
                          <path
                            d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0"/>
                          <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708"/>
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor"
                          class="bi bi-check2-all" viewBox="0 0 16 16">
                          <path
                            d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0"/>
                          <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708"/>
                        </svg>) : ''}
                    </div>


                  </div>
                </div>


              </li>
            </React.Fragment>
          );
        })
      ) : (
        <div className="flex mt-10 justify-center h-full">
          <h1 className="text-gray-700">Envie a primeira mensagem!</h1>
        </div>
      ))}
    </ul>
  );
}
