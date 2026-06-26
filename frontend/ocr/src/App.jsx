import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import AllPages from './Allpages.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AllPages/>
    </>
  )
}

export default App
