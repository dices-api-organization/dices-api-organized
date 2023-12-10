import { useState, useEffect, SetStateAction } from "react";

export const useFetch = (url:string, data: { name: any; pass: any; }) => {
    const [message, setMessage] = useState<string>('');
    
    useEffect(() =>  {
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          password: data.pass
        })
    })
        .then((response) => response.json())
        .then((data: SetStateAction<string>) => setMessage(data))
        .catch((error: any) => console.error('Error fetching data:', error));
    }, []);
    console.log(message);
    return {data};
        
}