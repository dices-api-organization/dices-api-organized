import { useState, useEffect, SetStateAction } from "react";

export const useFetch = (url:string, data) => {
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() =>  {
        setLoading(true);
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: user.value,
          password: pass.value
        })
      )
        .then((response) => response.json())
        .then((data: SetStateAction<string>) => setMessage(data))
        .finally(() => setLoading(false))
        .catch((error: any) => console.error('Error fetching data:', error));
    }, []);
    return {message, loading};
}