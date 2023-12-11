import { useState } from "react"

export const LoginForm = () => {
 const [name, setName] = useState<string>('')
 const [pass, setPass] = useState<string>('')
 const [error, setError] = useState<boolean>(false)


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
    if (response.ok) {
      setError(false)

    } else {
      setError(true)
    }
  })
  .catch(function (error) {
    console.log("Fetch problems:" + error.message);
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
                 <a href="http://localhost:5173/Register" id="registerLink"> Register</a> please.
             </p>
         </div>
         <div className="resultLogin">
            {error && <p>Your name or password are wrong</p>}
           
         </div>
    </>
 )
}