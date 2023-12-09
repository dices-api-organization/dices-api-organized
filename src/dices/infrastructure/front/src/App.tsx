import { useState, useEffect } from 'react'
import './App.css'
import dices from './assets/redDices.png'

function App() {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:3000')
      .then((response) => response.text())
      .then((data) => setMessage(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
         <div id="header">
            <h1> Wellcome to Dices Game!!</h1>
        </div>
        <div id="imageDices">
            <img src={dices} alt="red dices"/>
        </div>
        <div id="subHeader">
            <h3>Login</h3>
        </div>
        <section>
            <form>
                <input type="text" id="name" placeholder="Your name" required autoFocus />
                <input type="password" name="pass" id="pass"  required placeholder="Your password" />
                <input type="submit" value="submit" id="submit" name="login" />
            </form>
        </section>
        <div id="regLink">
            <p>
                Haven't you an account?  
                <a href="http://localhost:3000/userRegister" id="registerLink">Register</a> please.
            </p>
        </div>
        <div id="result">

        </div>
        <div className="App">
         <h1>{message}</h1>
        </div>
       
    </>
  )
}

export default App
