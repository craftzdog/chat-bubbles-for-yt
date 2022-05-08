import { useState, useCallback, useEffect } from 'react'
import './App.css'
import Chat from './chat'
import Bubble from './bubble'
import BubbleInput from './bubble-input'
import useMessages from './use-messages'
import { AnimatePresence } from 'framer-motion'

function App() {
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
    <div className="App">
      <Chat>
        <AnimatePresence>
          {messages.map((m, index) => (
            <Bubble key={index} id={m}>
              {m}
            </Bubble>
          ))}
        </AnimatePresence>
        <BubbleInput
          value={newMessage}
          onChange={setNewMessage}
          onSubmit={handleSubmit}
        />
      </Chat>
    </div>
  )
}

export default App
