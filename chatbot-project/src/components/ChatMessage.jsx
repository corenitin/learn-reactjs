import dayjs from 'dayjs'
import RobotProfileImage from '../assets/robot.png'
import UserProfileImage from '../assets/me.png'
import './ChatMessage.css'

export function ChatMessage({ message, sender, time }) {
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
        {/* The "time && (" check is optional. I added it just to be safe. */}
        {time && (<div className='chat-message-time'> {dayjs(time).format('h:mma')} </div>)}
      </div>
      {sender === 'user' && (
        <img src={UserProfileImage} className="chat-message-profile" />
      )}
    </div>
  )
}