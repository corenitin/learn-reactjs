import { useState, useEffect, useRef } from 'react'
import {Chatbot} from 'supersimpledev'
import './App.css'
import RobotProfileImage from './assets/robot.png'
import UserProfileImage from './assets/user.png'

function ChatMessage({ message, sender }) {
  // Destrcutring 
  // 1. const message = props.message
  //    const sender = props.sender
  // 2. const {message, sender} = props
  // 3. function ChatMessage({message, sender}) 

  /*
  if (sender === 'robot') {
      return (
          <div>
              
              {message}
          </div>
      )
  }
  */

  return (
    <div className={
      sender === 'user'
        ? 'chat-message-user'
        : 'chat-message-robot'
    }>
      {sender === 'robot' && (
        <img src={RobotProfileImage} className="chat-message-profile" />
      )}
      <div className="chat-message-text">
        {message}
      </div>
      {sender === 'user' && (
        <img src={UserProfileImage} className="chat-message-profile" />
      )}
    </div>
  )
}

// To use a function as a hook, the function name must
// start with "use".
function useAutoScroll(dependencies) {
  // It's highly recommend to rename this to something
  // more generic like containerRef. This will make the
  // code make more sense if we ever reuse this code in
  // other components.
  const containerRef = useRef(null);


  useEffect(() => {
    const containerElem = containerRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }

  }, dependencies);

  return containerRef;
}

function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useAutoScroll([chatMessages]);

  return (
    <div className="chat-message-container" ref={chatMessagesRef}>
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage
            message={chatMessage.message}
            sender={chatMessage.sender}
            key={chatMessage.id}
          />
        )
      })}
    </div>
  )
}

function App() {
  // Here we did state lifting from chat component to App.
  const [chatMessages, setChatMessages] = useState([])

  // const [chatMessages, setChatMessages] = array
  // const chatMessages = array[0];
  // const setChatMessages = array[1];

  return (
    <div className="app-container">
      {chatMessages.length === 0 && (
        <p className="welcome-message">
          Welcome to the chatbot project! Send a message using the textbox below.
        </p>
      )}
      <ChatMessages
        chatMessages={chatMessages}
      />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  )
}

export default App
