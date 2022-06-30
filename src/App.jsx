import { useState, useCallback, React } from 'react'
import Chat from './components/chat'
import Bubble from './components/bubble'
import BubbleInput from './components/bubble-input'
import useMessages from './hook/use-messages'
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

  return (
    <div className="App">
      <Chat>
        <AnimatePresence>
          {messages.map(m => (
            <Bubble key={m} id={m}>
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
