import dices from '../assets/redDices.png'

export const Header = () => {

    return (
    <>
        <div id="header">
            <h1> Wellcome to Dices Game!!</h1>
        </div>
        <div id="imageDices">
            <img src={dices} alt="red dices"/>
        </div>
    </>
    )
}