import { useState } from "react"
import { useNavigate } from "react-router-dom";

export const Play = ({ id }: { id: string }) => {

 
    const navigate = useNavigate();
    
    const routeChange = (path:string, id:string) =>{  
            navigate(path);
    }
    
    const [dice1, setDice1] = useState(0)
    const [dice2, setDice2] = useState(0)
    const [err, setErr] = useState('')

    const [success, setSuccess] = useState('')
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
                  throw new Error('The user wasn\'t deleted. An error occurred')
                }
                return response.json()
              })
              .then((data) => {
                console.log(data.ok)
                setSuccess('The user was deleted succesfully!')
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
            {id != '' && <h4>id: {id} </h4>}
            {savedToken && <h4 className="token">token: {savedToken} </h4>}
            {dice1 !== 0 && <h3>Dice 1: <span>{dice1} </span></h3>}
            {dice2 !== 0 && <h3>Dice 2: <span>{dice2}</span></h3>}
            {dice1 + dice2 == 7 && <h1><span>You win!!</span></h1>}
            {dice1 + dice2 > 0 && dice1 + dice2 !== 7 && <h1><span>You lose!!</span></h1>}
            
            {successArrThrows.length > 0 && successArrThrows.map((value) => (
               <p ><span>DICE 1:</span> {value.dice_1} <span>DICE 2:</span> {value.dice_2} <span>WIN OR LOSE?</span> {value.winOrLose ? 'WIN!' : 'LOSE!'}</p>
             ))}

              {successWin && <p>The max winner is <span>{winnerName}</span> with a success rate of <span>{winnerRate}</span></p>}

              {successLose && <p>The min loser is <span>{loserName}</span> with a success rate of <span>{loserRate}</span></p>}
           
            <nav>
                <button onClick={handlePlay}>Play</button>
                <button onClick={handleUpdate}>Update</button>
                <button>Get players</button>
                <button onClick={handleDelete}>Delete throw</button>
                <button onClick={handleListThrows}>Get lis of throws</button>
                <button onClick={handleMaxWinner}>Get max winner</button>
                <button onClick={handleMinLoser}>Get min loser</button>
                <button>Get the best average player</button>
            </nav>
            {success != '' && <p> <span>{success}</span>!</p>}
            {err}
        </>
    )
}