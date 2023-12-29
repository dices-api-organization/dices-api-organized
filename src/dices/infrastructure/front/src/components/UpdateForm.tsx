import { useState } from "react"
import { useNavigate } from "react-router-dom";

export const UpdateForm = ({ userId }: { userId: string }) => {
  const navigate = useNavigate();
  const routeChange = (path:string, id:string) =>{  
    navigate(path);
}
 const [name, setName] = useState<string>('')
 const [error, setError] = useState<boolean>(false)
 const [success, setSuccess] = useState<boolean>(false)
 const[id, setId] = useState(userId)
 const savedToken = localStorage.getItem('token')
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch('http://localhost:3000/play/update', {
    method: 'PUT',
    mode: 'cors',
    headers: {
        'Authorization': `Bearer ${savedToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        id:id,
      name: name || 'Anonim'
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
      setSuccess(true)
    
      setTimeout(() => {
       routeChange('../play', id)
      },4000)
  })
  .catch(function (error) {
    console.log("Fetch problems:" + error.message);
  })
  .finally(() => {
    setTimeout(() => {
      setError(false)
      setSuccess(false)
    }, 4000)
  })
}
 return(
    <>
        
        <div className="subHeader">
            <h3>Change yor name</h3>
        </div>
        <section>
             <form className="updateForm" onSubmit={handleSubmit}>
                 <input type="text" className="name" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" autoFocus />

                 <button type="submit">Sign in</button>
             </form>
         </section>
         <div>
            {error && <p>This name already exists</p>}
            {success && <p>Your new name is  <span><h3>{name}</h3></span> Let's play to dices game !</p>}

         </div>
    </>
 )
}