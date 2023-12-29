import { useNavigate } from "react-router-dom";

 
export const navigate = useNavigate();

export const routeChange = (path:string) =>{  
        navigate(path);
}
