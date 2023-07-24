import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';

const Chat = () => {
  const [username, setUsername] = useState('username');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/chat')
      .then(data => {
        setMessages(data.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  {/*useEffect(() => {
    Pusher.logToConsole = true;
    const pusher = new Pusher('b7c88a1687c1bcd85fda', {
      cluster: 'ap2',
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', function (data) {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      pusher.unsubscribe('chat');
      pusher.disconnect();
    };
  }, []);*/}

  const submit =  (e) => {

     axios.post('http://localhost:3001/chat', {
      name: username,
      message: message,
    })
    .then(data => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    })
    {/*await fetch('http://localhost:3001/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
      }),
    });*/}

    setMessage('');
  };

  return (
    <>
      <title>E-Tutor Chat</title>
      <div className={'min-h-screen flex flex-col justify-center items-center bg-indigo-300'}>
        <div className={'w-[500px] md:w-[600px] lg:w-[600px] h-[500px] bg-[#3e3c61] shadow-lg rounded-3xl flex flex-col justify-between'}>
          <div>
            <h1 className={'text-4xl mt-6 text-white font-semibold flex justify-center items-center'}>E-Tutor Chat</h1>
          </div>
          <div className={'text-white p-4 overflow-y-auto text-3xl'}>
            {messages.map((message, index) => (
              <div key={index} className="text-white font-semibold">
                {message.message}
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between items-center w-full bg-gray-300 rounded-b-2xl rounded-t-sm">
            <input
              className="p-3 ml-2 w-full resize-none bg-transparent focus:outline-none"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="bg-blue-500 border-blue-500 text-white p-2 mr-4 rounded focus:outline-none" onClick={submit}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                   stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
