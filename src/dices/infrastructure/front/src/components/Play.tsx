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

    const [successArrThrows, setSuccessArrThrows] = useState([])
    const [winnerName, setWinnerName] = useState<string>('')
    const [winnerRate, setWinnerRate] = useState<string>('')
    const [loserName, setLoserName] = useState<string>('')
    const [loserRate, setLoserRate] = useState<string>('')
    const [successWin, setSuccessWin] = useState<boolean>(false)
    const [successLose, setSuccessLose] = useState<boolean>(false)
    

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
                setDice1(data.dice_1)
                setDice2(data.dice_2)
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
              throw new Error('The user\'s throws weren\'t deleted. An error occurred')
            }
            return response.json()
          })
          .then((data) => {
            console.log(data.ok)
            setSuccess('The user\'s throws were deleted succesfully!')
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

    const handleListThrows = () => {
      setErr('')
      fetch(`http://localhost:3000/play/games/${id}`, 
          {
              method: 'GET',
              mode: 'cors',
              headers: {
                  'Authorization': `Bearer ${savedToken}`,
                  'Content-Type': 'application/json'
              }
          })
          .then((response) => {
              if (!response.ok){
                throw new Error('Could not get list of throws')
              }
              return response.json();
            })
            .then((data) => {
              console.log(data)

              setSuccessArrThrows(data)
              
            })
            .catch(function (error) {
              setErr("Fetch problems:" + error.message)
              console.log("Fetch problems: " + error.message);
            }).finally(() => {
              setTimeout(() => {
                setErr('')
                setSuccessArrThrows([])
              }, 8000)
            })
  }

  const handleMaxWinner = () => {
    setErr('')
    fetch(`http://localhost:3000/play/max`, 
        {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${savedToken}`,
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (!response.ok){
              throw new Error('Could not get list of throws')
            }
            return response.json();
          })
          .then((data) => {
            console.log(data)

            

            setWinnerName(data.name)
            setWinnerRate(data.success_rate)
            setSuccessWin(true)
            
            
          })
          .catch(function (error) {
            setErr("Fetch problems:" + error.message)
            console.log("Fetch problems: " + error.message);
          }).finally(() => {
            setTimeout(() => {
              setErr('')
              setSuccessWin(false)
            }, 8000)
          })
}

const handleMinLoser = () => {
  setErr('')
  fetch(`http://localhost:3000/play/min`, 
      {
          method: 'GET',
          mode: 'cors',
          headers: {
              'Authorization': `Bearer ${savedToken}`,
              'Content-Type': 'application/json'
          }
      })
      .then((response) => {
          if (!response.ok){
            throw new Error('Could not get list of throws')
          }
          return response.json();
        })
        .then((data) => {
          console.log(data)

          

          setLoserName(data.name)
          setLoserRate(data.success_rate)
          setSuccessLose(true)
          
          
        })
        .catch(function (error) {
          setErr("Fetch problems:" + error.message)
          console.log("Fetch problems: " + error.message);
        }).finally(() => {
          setTimeout(() => {
            setErr('')
            setSuccessLose(false)
          }, 8000)
        })
}

    return(
        <>
            
            {dice1 !== 0 && <h3>Dice 1: <span>{dice1} </span></h3>}
            {dice2 !== 0 && <h3>Dice 2: <span>{dice2}</span></h3>}
            {dice1 + dice2 == 7 && <h1><span>You win!!</span></h1>}
            {dice1 + dice2 > 0 && dice1 + dice2 !== 7 && <h1><span>You lose!!</span></h1>}
            
            {successArrThrows.length > 0 && successArrThrows.map((value) => (
               <p ><span>DICE 1:</span> {value.dice_1} <span>DICE 2:</span> {value.dice_2} <span>WIN OR LOSE?</span> {value.winOrLose ? 'WIN!' : 'LOSE!'}</p>
             ))}

              {successWin && <p>The max winner is <span>{winnerName ? winnerName : 'Anonim'}</span> with a success rate of <span>{winnerRate}</span></p>}

              {successLose && <p>The min loser is <span>{loserName ? loserName : 'Anonim'}</span> with a success rate of <span>{loserRate}</span></p>}
           
            <nav>
                <button onClick={handlePlay}>Play</button>
                <button onClick={handleUpdate}>Update</button>
                <button onClick={handlePlayers}>Get players</button>
                <button onClick={handleDelete}>Delete throws</button>
                <button onClick={handleRates}>Get the best average players</button>
                <button onClick={handleListThrows}>Get list of throws</button>
                <button onClick={handleMaxWinner}>Get max winner</button>
                <button onClick={handleMinLoser}>Get min loser</button>
            </nav>
            {err}
            {success != '' && <p><span>{success}</span></p>}
            {successArr.length > 0 && successArr.map((value) => (
               <p > {`User`} <span>{value.name ? value.name : 'Anonim'}</span> has a success rate of  <span>{value.success_rate}</span></p>
             ))}
            {rank.length > 0 && rank.map((value, index) => (
               <p > {index + 1}º   <span>{value.name ? value.name : 'Anonim'}</span>    has a success rate of    <span>{Math.round(value.success_rate)}</span></p>
             ))}
        </>
    )
}