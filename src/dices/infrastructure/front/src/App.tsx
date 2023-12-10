import './App.css'
import { useFetch } from './assets/useFetch'
import { Header } from './components/Header'
import { LoginForm } from './components/LoginForm'
import {Routes, Route} from 'react-router-dom'

function App(): JSX.Element {
  
  return (
    <>
        <Header />
       <Routes>
        <Route path='/' element={<LoginForm />} />

        </Routes>
        <div className="result">

        </div>
    </>
  )
}

export default App
