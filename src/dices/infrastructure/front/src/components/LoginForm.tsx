import { useState } from "react"
import { useFetch } from "../assets/useFetch"

export const LoginForm = () => {
 const [name, setName] = useState<string>('')
 const [pass, setPass] = useState<string>('')
 const [error, setError] = useState<boolean>(false)


 const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (name === '' || pass === '') {
        setError(true)
        return
    } else {
        setError(false)
        const {message, loading} = useFetch('https://localhost:3000/userLogin')
        if (message) {
            s
        }
    }
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
                 <button>Sign in</button>
             </form>
         </section>
         <div className="regLink">
             <p>
                 Haven't you an account?
                 <a href="http://localhost:3000/userRegister" id="registerLink">Register</a> please.
             </p>
         </div>
         <div className="resultLogin">
            {error && <p>You need to fill all fields</p>}
            {loading && <p>Loading...</p>}
            {}
         </div>
    </>
 )
}