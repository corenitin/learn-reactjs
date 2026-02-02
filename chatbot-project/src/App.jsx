import { useState, useEffect } from 'react'
import { Chatbot } from 'supersimpledev'
import { ChatInput } from './components/ChatInput'
import ChatMessages from './components/ChatMessages'
import './App.css'



function App() {
  // Here we did state lifting from chat component to App.
  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('messages')) || [])

  // const [chatMessages, setChatMessages] = array
  // const chatMessages = array[0];
  // const setChatMessages = array[1];

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages));
  }, [chatMessages]);

    // [] tells useEffect to only run once. We only want to run
    // this setup code once because we only want to add these
    // extra responses once.
  

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
