import { useState } from "react"
import { useNavigate } from "react-router-dom";


export const RegisterForm = () => {
  const navigate = useNavigate();
  const routeChange = (path:string) =>{  
    navigate(path);
}
 const [name, setName] = useState<string>('')
 const [pass, setPass] = useState<string>('')
 const [error, setError] = useState<boolean>(false)
 const [success, setSuccess] = useState<boolean>(false)


 const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   fetch('http://localhost:3000/userRegister', {
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
    console.log(response);
    
    if (response.ok) {
      setSuccess(true)
      setTimeout(() => {
       routeChange('../play')
      },1000)
    } else {
      setError(true)
    }
  })
  .catch(function (error) {
    console.log("Fetch problems:" + error.message);
  })
  setTimeout(() => {
    setError(false)
    setSuccess(false)
  }, 3000)
}
 return(
    <>
        <div className="subHeader">
            <h3>Register</h3>
        </div>
        <section>
             <form className="loginForm" onSubmit={handleSubmit}>
                 <input type="text" className="name" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" autoFocus />
                 <input type="password" value={pass} onChange={e => setPass(e.target.value)} className="pass" required placeholder="Your password" />
                 
                 <button type="submit">Sign up</button>
             </form>
         </section>
         <div className="resultLogin">
            {error && <p>Change your name or password!</p>}
            {success && <p>Wellcome <span>{name}</span> !!! to the best dices game !</p>}
           
         </div>
    </>
 )
}