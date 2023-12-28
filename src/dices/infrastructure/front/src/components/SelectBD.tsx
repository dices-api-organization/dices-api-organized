import { useState } from "react";
import { useNavigate } from "react-router-dom";

 

export const SelectBD = () => {
    const [err, setErr] = useState('')

   const navigate = useNavigate();

    const routeChange = (path:string) =>{  
        navigate(path);
}
    const handleButtonMongoDB = () => {
        fetch('http://localhost:3000/mongodb', 
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then((response) => {
                if (!response.ok){
                  throw new Error('Response was not ok')
                }
                setErr('Switching to MongoDB..')
                return response.json()
              })
              .catch(function (error) {
                setErr("Fetch problems:" + error.message)
                console.log("Fetch problems: " + error.message);
              })
        routeChange(`login`)
    }
    const handleButtonMySQL = () => {
        fetch('http://localhost:3000/mysql', 
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then((response) => {
                if (!response.ok){
                  throw new Error('Response was not ok')
                }
                setErr('Switching to MongoDB..')
                return response.json()
              })
              .catch(function (error) {
                setErr("Fetch problems:" + error.message)
                console.log("Fetch problems: " + error.message);
              })
        routeChange(`login`)
    }
    setTimeout(() => {
        setErr('')
      }, 2000)
    return(
        <>
            <button type="button" onClick={handleButtonMongoDB} >MongoDB</button>
            <button type="button" onClick={handleButtonMySQL} >MySQL</button>
            {err}
        </>
    )
}