import { useState } from "react"

export const Play = () => {
    const [dice, setDice] = useState(0)
    const handlePlay = () => {
        let i = 0;
        setDice(0);
        
        while(i < 2){
            let rand = 0;
            rand = Math.floor((Math.random() * 6) + 1)
            setDice(dice + rand)
            console.log(dice)
            i++;
        }
        return dice
    }

    return(
        <>
            {dice}
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