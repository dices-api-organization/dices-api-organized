import './App.css'
import { Header } from './components/Header'
import { LoginForm } from './components/LoginForm'
import {Routes, Route} from 'react-router-dom'
import { RegisterForm } from './components/RegisterForm'


function App(): JSX.Element {
  
  return (
    <>
        <Header />
       <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/Register' element={<RegisterForm />} />
        </Routes>
        <div className="result">

        </div>
    </>
  )
}

export default App
