import { useState } from "react"
import { useFetch } from "../assets/useFetch"

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
      name: name,
      password: pass
    })
  })
  .then(function (response) {
    if (response.ok) {
        console.log('Ok!!');
    } else {
      console.log("Respuesta de red OK pero respuesta HTTP no OK");
    }
  })
  .catch(function (error) {
    console.log("Hubo un problema con la petición Fetch:" + error.message);
  })
}
 return(
    <>
        <div className="subHeader">
            <h3>LogIn</h3>
        </div>
        <section>
             <form className="loginForm" onSubmit={handleSubmit}>
                 <input type="text" className="name" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required autoFocus />
                 <input type="password" value={pass} onChange={e => setPass(e.target.value)} className="pass" required placeholder="Your password" />
                 
                 <button type="submit">Sign in</button>
             </form>
         </section>
         <div className="regLink">
             <p>
                 Haven't you an account?
                 <a href="http://localhost:3000/userRegister" id="registerLink">Register</a> please.
             </p>
         </div>
         <div className="resultLogin">
            {/* {error && <p>You need to fill all fields</p>} */}
           
         </div>
    </>
 )
}