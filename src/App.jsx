import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'
import Chat from './chat'
import Bubble from './bubble'
import BubbleInput from './bubble-input'
import useMessages from './use-messages'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const i1 = useRef(null);

  const handleClick = () => {
    window.document.querySelector('.bubble.input > div').focus()
  };

  const [messages, addMessage] = useMessages([])
  const [newMessage, setNewMessage] = useState('')

  const handleSubmit = useCallback(() => {
    if (newMessage.length > 0) {
      addMessage(newMessage)
      setNewMessage('')
    }
  }, [newMessage, messages])

  useEffect(() => {
    const el = document.querySelector('.bubble.input > div')
    if (el) {
      el.focus()
    }
  }, [])

  return (
    <div className="App" onClick={handleClick}>
      <Chat>
        <AnimatePresence>
          {messages.map(m => (
            <Bubble key={m} id={m} >
              {m}
            </Bubble>
          ))}
        </AnimatePresence>
        <BubbleInput
          ref={i1}
          value={newMessage}
          onChange={setNewMessage}
          onSubmit={handleSubmit}
        />
      </Chat>
    </div>
  )
}

export default App
