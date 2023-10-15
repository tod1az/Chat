import ChatBox from './components/ChatBox'

export const App: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center">
      <h1>Live Chat!</h1>
      <ChatBox />
    </main>
  )
}

export default App
