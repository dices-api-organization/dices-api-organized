import './App.css'
import { Header } from './components/Header'
import { LoginForm } from './components/LoginForm'
import {Routes, Route} from 'react-router-dom'
import { RegisterForm } from './components/RegisterForm'
import { SelectBD } from './components/SelectBD'


function App(): JSX.Element {
  
  return (
    <>
        <Header player='hola' title='pepe'/>
       <Routes>
        <Route path='/' element={<SelectBD/>}/>
        <Route path='/Login' element={<LoginForm />} />
        <Route path='/Register' element={<RegisterForm />} />
        </Routes>
        <div className="result">

        </div>
    </>
  )
}

export default App
