import { useNavigate } from "react-router-dom";

 

export const SelectBD = () => {
   const navigate = useNavigate();

    const routeChange = (path:string) =>{  
        navigate(path);
}
    const handleButtonMongoDB = () => {

        routeChange(`login`)
    }
    const handleButtonMySQL = () => {

        routeChange(`login`)
    }
    
    return(
        <>
            <button type="button" onClick={handleButtonMongoDB} >MongoDB</button>
            <button type="button" onClick={handleButtonMySQL} >MySQL</button>
        </>
    )
}