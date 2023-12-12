import dices from '../assets/redDices.png'

export const Header:React.FC<{title: string, player: string}> = ({title, player} ) => {
    return(
    <>
        <div id="header">
            <h2> Wellcome {player}{title} to Dices Game!!</h2>
        </div>
        <div id="imageDices">
            <img src={dices} alt="red dices"/>
        </div>
    </>
    )
}