import { useState } from "react"

export const Play = () => {
    const [dice1, setDice1] = useState(0)
    const [dice2, setDice2] = useState(0)

    let allThrows = [{}]
    let arrDice:number[] = []
    const handlePlay = () => {
        let i = 0;
      
        while(i < 2){
            const rand = () => Math.floor((Math.random() * 6) + 1)
            arrDice[i] = rand()
            console.log(i, arrDice[i])
            i++;
        }
        const newThrow = {
            dice1: arrDice[0],
            dice2: arrDice[1]
        }
        setDice1(arrDice[0])
        setDice2(arrDice[1])
        allThrows.push(newThrow)
        console.log(allThrows)
    }

    return(
        <>
            <h3>Dice 1: <span>{dice1} </span>  </h3>
            <h3>Dice 2: <span>{dice2}</span></h3>
            {dice1 + dice2 == 7 && <h1><span>Winner</span></h1>}
            <nav>
                <button onClick={handlePlay}>Play</button>
                <button>Update</button>
                <button>Get players</button>
                <button>Delete throw</button>
                <button>Get lis of throws</button>
                <button>Winners ranking</button>
                <button>Loosers ranking</button>
                <button>Get the best average player</button>
            </nav>
        </>
    )
}