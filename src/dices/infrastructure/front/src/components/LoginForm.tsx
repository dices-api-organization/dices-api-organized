import { useState } from "react"
import { useNavigate } from "react-router-dom";

export const LoginForm = ({ setUserId }: { setUserId: React.Dispatch<React.SetStateAction<string>> }) => {
  const navigate = useNavigate();
  const routeChange = (path:string, id:string) =>{  
    navigate(path);
}
 const [name, setName] = useState<string>('')
 const [pass, setPass] = useState<string>('')
 const [error, setError] = useState<boolean>(false)
 const [success, setSuccess] = useState<boolean>(false)
 const[id, setId] = useState('')


 const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    fetch('http://localhost:3000/userLogin', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name || 'Anonim',
      password: pass
    })
  })
  .then((response) => {
    if (!response.ok){
      setError(true)
      throw new Error('Response was not ok')
    }
    return response.json()
  })
  .then((data) => {
    setId(data.id)
    setUserId(data.id)
      setSuccess(true)
      localStorage.setItem('token', data.token)
      setTimeout(() => {
       routeChange('../play', id)
      },1000)
  })
  .catch(function (error) {
    console.log("Fetch problems:" + error.message);
  })
  .finally(() => {
    setTimeout(() => {
      setError(false)
      setSuccess(false)
    }, 3000)
  })
}
 return(
    <>
        <div className="subHeader">
            <h3>LogIn</h3>
        </div>
        <section>
             <form className="loginForm" onSubmit={handleSubmit}>
                 <input type="text" className="name" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" autoFocus />
                 <input type="password" value={pass} onChange={e => setPass(e.target.value)} className="pass" required placeholder="Your password" />
                 
                 <button type="submit">Sign in</button>
             </form>
         </section>
         <div className="regLink">
             <p>
                 Haven't you an account?
                 <a href="http://localhost:5173/register" id="registerLink"> Register</a> please.
             </p>
         </div>
         <div className="resultLogin">
            {error && <p>Your name or password are wrong</p>}
            {success && <p>Hello again <span>{name}</span> !!! Let's play to dices game !</p>}

         </div>
    </>
 )
}