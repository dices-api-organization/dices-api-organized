import './App.css'
import { Header } from './components/Header'
import { LoginForm } from './components/LoginForm'
import {Routes, Route} from 'react-router-dom'
import { RegisterForm } from './components/RegisterForm'
import { Play } from './components/Play'
import { useState } from 'react'
import { UpdateForm } from './components/UpdateForm'


function App(): JSX.Element {
  const [userId, setUserId] = useState('')

  return (
    <>
        <Header />
       <Routes>
        <Route path='/' element={<LoginForm setUserId={setUserId}/>} />
        <Route path='/register' element={<RegisterForm setUserId={setUserId}/>} />
        <Route path='/play'  element={<Play id={userId} />} />
        <Route path='/play/update'  element={<UpdateForm userId={userId} />} />

        </Routes>
    </>
  )
}

export default App
