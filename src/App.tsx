import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      Clicked: {count} times
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </>
  )
}

export default App
