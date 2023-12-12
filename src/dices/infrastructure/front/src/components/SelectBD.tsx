import { useNavigate } from "react-router-dom"

export const SelectBD = () => {
    
    const navigate = useNavigate();
    const routeChange = () =>{ 
        let path = `Login`; 
        navigate(path);
    }

    const handleButtonMongoDB = () => {

        routeChange()
    }
    const handleButtonMySQL = () => {

        routeChange()
    }
    
    return(
        <>
            <button type="button" onClick={handleButtonMongoDB} >MongoDB</button>
            <button type="button" onClick={handleButtonMySQL} >MySQL</button>
        </>
    )
}