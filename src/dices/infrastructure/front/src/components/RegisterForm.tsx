import { useState } from "react"

export const RegisterForm = () => {
 const [name, setName] = useState<string>('')
 const [pass, setPass] = useState<string>('')
 const [error, setError] = useState<boolean>(false)


 const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name);
    
   fetch('http://localhost:3000/userRegister', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      password: pass
    })
  })
  .then(function (response) {
    if (response.ok) {
      setError(true)
      
    } else {
      setError(false)
    }
  })
  .catch(function (error) {
    console.log("Fetch problems:" + error.message);
  })
}
 return(
    <>
        <div className="subHeader">
            <h3>Register</h3>
        </div>
        <section>
             <form className="loginForm" onSubmit={handleSubmit}>
                 <input type="text" className="name" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required autoFocus />
                 <input type="password" value={pass} onChange={e => setPass(e.target.value)} className="pass" required placeholder="Your password" />
                 
                 <button type="submit">Sign up</button>
             </form>
         </section>
         <div className="resultLogin">
            {error && <p>Change your name or password!</p>}
           
         </div>
    </>
 )
}