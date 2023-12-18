import './App.css'
import { Header } from './components/Header'
import { LoginForm } from './components/LoginForm'
import {Routes, Route} from 'react-router-dom'
import { RegisterForm } from './components/RegisterForm'
import { SelectBD } from './components/SelectBD'
import { Play } from './components/Play'


function App(): JSX.Element {
  
  return (
    <>
        <Header />
       <Routes>
        <Route path='/' element={<SelectBD />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/play'  element={<Play />} />

        </Routes>
    </>
  )
}

export default App
