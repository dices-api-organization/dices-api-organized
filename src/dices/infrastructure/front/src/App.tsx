import './App.css'
import { Header } from './components/Header'
import { LoginForm } from './components/LoginForm'
import {Routes, Route} from 'react-router-dom'
import { RegisterForm } from './components/RegisterForm'
import { SelectBD } from './components/SelectBD'
import { Play } from './components/Play'
import { useState } from 'react'


function App(): JSX.Element {
  const [userId, setUserId] = useState('')
  //const [userName, setUserName] = useState('')
  //const setUserData = (userId: string, )

  return (
    <>
        <Header />
       <Routes>
        <Route path='/' element={<SelectBD />} />
        <Route path='/login' element={<LoginForm setUserId={setUserId}/>} />
        <Route path='/register' element={<RegisterForm setUserId={setUserId}/>} />
        <Route path='/play'  element={<Play id={userId} />} />

        </Routes>
    </>
  )
}

export default App
