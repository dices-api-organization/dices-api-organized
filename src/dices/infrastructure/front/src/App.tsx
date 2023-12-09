import './App.css'
import { useFetch } from './assets/useFetch'
import { Header } from './components/Header'
import { LoginForm } from './components/LoginForm'

function App() {
  
  return (
    <>
        <Header />
        <LoginForm />
            
        
        <div className="result">

        </div>
        <div className="App">
         <h1>{message}</h1>
        </div>
       
    </>
  )
}

export default App
