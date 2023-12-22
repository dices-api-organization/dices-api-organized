import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { rateOfPlayers } from "./rateOfPlayers";

export const Play = ({ id }: { id: string }) => {

 
    const navigate = useNavigate();
    
    const routeChange = (path:string, id:string) =>{  
            navigate(path);
    }
    
    const [dice1, setDice1] = useState(0)
    const [dice2, setDice2] = useState(0)
    const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')
    const [successArr, setSuccessArr] = useState([])
    const [rank, setRank] = useState([])
   const userId = id
    const savedToken = localStorage.getItem('token')
    const handlePlay = async () => {
            setErr('')
        fetch('http://localhost:3000/play/throw', 
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Authorization': `Bearer ${savedToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id:userId,
                })
            })
            .then((response) => {
                if (!response.ok){
                  setErr('Response throw dices was not ok')
                  throw new Error('Response throw dices was not ok')
                }
                return response.json()
              })
              .then((data) => {
                console.log(data.ok)
                setDice1(data.diceThrow1)
                setDice2(data.diceThrow2)
              })
              .catch(function (error) {
                setErr("Fetch problems:" + error.message)
                console.log("Fetch problems: " + error.message);
              })
    }
    const handleUpdate = () => {
        setErr('')
        setSuccess('')
        setRank([])
        setDice1(0)
        setDice2(0)
        routeChange('../play/update', id)
    }
    const handleDelete = () => {
        setErr('')
        setSuccess('')
        setRank([])
        setDice1(0)
        setDice2(0)
        fetch('http://localhost:3000/play/delete', 
            {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Authorization': `Bearer ${savedToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id:id,
                })
            })
            .then((response) => {
                if (!response.ok){
                  throw new Error('The user wasn\'t deleted. An error occurred')
                }
                return response.json()
              })
              .then((data) => {
                console.log(data.ok)
                setSuccess(`Now ${data.name} has: ${data.num_of_games} games, 
                ${data.num_of_wins} wins, 
                ${data.success_rate} success rate.`)
              })
              .catch(function (error) {
                setErr("Fetch problems:" + error.message)
                console.log("Fetch problems: " + error.message);
              })
    }
    const handlePlayers = () => {
      setErr('')
      setSuccess('')
      setSuccessArr([])
      setRank([])
      setDice1(0)
      setDice2(0)
      fetch('http://localhost:3000/play/players', 
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Authorization': `Bearer ${savedToken}`,
                    'Content-Type': 'application/json'
                },
              
            })
            .then((response) => {
                if (!response.ok){
                  throw new Error('Response list of players were not ok')
                }
                return response.json()
              })
              .then((data) => {
                setSuccessArr(data)                
              })
              .catch(function (error) {
                setErr("Fetch problems:" + error.message)
                console.log("Fetch problems: " + error.message);
              })
    }
    const handleRates = () =>{
      setErr('')
      setSuccess('')
      setSuccessArr([])
      setRank([])
      setDice1(0)
      setDice2(0)
      fetch(`http://localhost:3000/play/rates`, 
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Authorization': `Bearer ${savedToken}`,
                    'Content-Type': 'application/json'
                },
              
            })
            .then((response) => {
                if (!response.ok){
                  throw new Error('Response list of players were not ok')
                }
                return response.json()
              })
              .then((data) => {
                setRank(data)      
                setSuccess(`The total average of all players are  ${rateOfPlayers(data)}`)
              })
              .catch(function (error) {
                setErr("Fetch problems:" + error.message)
                console.log("Fetch problems: " + error.message);
              })
    }
    return(
        <>
            {id != '' && <h4>id: {id} </h4>}
            {savedToken && <h4 className="token">token: {savedToken} </h4>}
            {dice1 !== 0 && <h3>Dice 1: <span>{dice1} </span></h3>}
            {dice2 !== 0 && <h3>Dice 2: <span>{dice2}</span></h3>}
            {dice1 + dice2 == 7 && <h1><span>You win!!</span></h1>}
            {dice1 + dice2 > 0 && dice1 + dice2 !== 7 && <h1><span>You lose!!</span></h1>}
            <nav>
                <button onClick={handlePlay}>Play</button>
                <button onClick={handleUpdate}>Update</button>
                <button onClick={handlePlayers}>Get players</button>
                <button onClick={handleDelete}>Delete throw</button>
                <button>Get list of throws</button>
                <button>Winners ranking</button>
                <button>Loosers ranking</button>
                <button onClick={handleRates}>Get the best average player</button>
            </nav>
            {err}
            {success != '' && <p><span>{success}</span></p>}
            {successArr.length > 0 && successArr.map((value) => (
               <p > {`User`} <span>{value.name}</span> has a success rate of  <span>{value.success_rate}</span></p>
             ))}
            {rank.length > 0 && rank.map((value, index) => (
               <p > {index + 1}º   <span>{value.name}</span>    has a success rate of    <span>{Math.round(value.success_rate)}</span></p>
             ))}
        </>
    )
}