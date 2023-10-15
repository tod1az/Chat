import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const ChatBox: React.FC = () => {
  const socket = io('ws.localhost:3001')
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState([])
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value)
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    socket.emit('message', inputValue)
    setInputValue('')
  }

  useEffect(() => {
    socket.on('messages', (data) => {
      setMessages(data)
    })
  }, [socket])

  return (
    <main className=' relative flex  border-2 h-[90vh] w-[80vw] md:w-[40rem] p-4 rounded-2xl'>
      <section >
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </section>
      <form
        onSubmit={submitHandler}
        className="absolute bottom-3 flex gap-2">
        <input className='border-2 rounded-2xl p-2 md:w-[32rem]' onChange={inputChangeHandler} value={inputValue} type="text" />
        <button
          className='py-2 px-5 border-2 rounded-full hover:scale-110 active:translate-y-1'
          type='submit'
        > Send
        </button>
      </form>
    </main>
  )
}

export default ChatBox
