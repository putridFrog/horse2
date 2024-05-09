import { useEffect, useState } from 'react';
import horse from './items/horse.png';
function SmallRace({money, horseNum, sendData, handleMoney})
{
    //items having to do with controlling the race
    const[race, changeRace] = useState({
        winner: 0,
        finishers: 0,
        id: 0,
        raceStart: false
    })
    //items having to do with bets
    const[bets, changeBets]=useState({
        currentMoney: money,
        betAmount: 0,
        horseBet: 0,
        win: 0,
        loss: 0,
        pos: 0,
        neg: 0,
        betPlaced: false
    })
    //horses
    const [horses, setHorses] = useState(
        Array.from({length: horseNum}, (_, i) => ({
            //delay in starting
            delay: getRan(1.2, 0),
            //how long they will take to get to the finish line
            duration: getRan(5, 2)
        }))
    );
    useEffect(() =>
    {
        //once all horses get to the finish line run whoWon
        if (race.finishers == horseNum) {
            whoWon();
        }
    }, [race.finishers]);
    useEffect(() =>
    {
        if (bets.betPlaced) processBet();
    },[race.winner]);
    //send data back to app.js with updated stats
    useEffect(()=> sendData(bets.currentMoney, bets.win, bets.loss, bets.pos, bets.neg),[bets.win, bets.loss] );
    //updating your money based off what you bet
    useEffect(() => handleMoney(bets.currentMoney,[bets.currentMoney]));
    function finished()
    {
        changeRace(prevState => ({
            ...prevState,
            finishers: race.finishers + 1
        }));
    }
    //get the fastest time from all 3 horses, fastest is determined winner
    function whoWon()
    {
        let totalTimes = horses.map((horse) => horse.delay + horse.duration);
        let fastest = totalTimes.indexOf(Math.min(...totalTimes));
        changeRace(prevState => ({
            ...prevState,
            winner: fastest + 1
        }));
        changeBets(prevState => ({
            ...prevState,
            betPlaced: true
        }))
    }
    //if your bet won you get your money back * the amount of horses
    function processBet()
    {
        if(bets.horseBet == race.winner)
            {
                changeBets(prevState => ({
                    ...prevState,
                    currentMoney: money + (Number(bets.betAmount) * horseNum),
                    win: 1,
                    pos: (Number(bets.betAmount) * horseNum) - bets.betAmount
                }));
            }
        else
        {
            changeBets(prevState => ({
                ...prevState,
                loss: 1,
                neg: bets.neg + Number(bets.betAmount)
            }));
        }
    }
    return (
        <div className='container'>
            {horses.map((horse,i) => (
                <Horses delay={horse.delay} duration={horse.duration} getData={finished} start={race.raceStart} index={i}/>
            ))}
            <div className='bet'>
                <form onSubmit={(event => {event.preventDefault(); changeRace(prevState => ({...prevState, raceStart: true})); changeBets(prevState => ({...prevState, currentMoney: bets.currentMoney - bets.betAmount}))})}>
                    <label htmlFor="horseNum"> Horse's Number:</label>
                    <input type="number" id="horseNum" max={horseNum} min={1} onChange={e => changeBets(prevState => ({...prevState, horseBet: e.target.value}))}/>
                    <label htmlFor="betAmount"> Your Bet:</label>
                    <input type="number" id="betAmount" max={bets.currentMoney} min={0} onChange={e => changeBets(prevState => ({...prevState, betAmount: e.target.value}))}/>
                    <button type="submit" disabled={race.raceStart}>Submit Bet</button>
                </form>
                the winner is {race.winner}
            </div>
        </div>
    );
}

function Horses({delay, duration, getData, start, index})
{
    return (
        <div>
            Horse: {index + 1} <br/>
            <a key={index} className='horse' style={ start ? {animation: 'move ' + duration + 's forwards ' + delay + 's', animationTimingFunction: "cubic-bezier(.31,.96,.66,-0.28)"} : {}} onAnimationEnd={() => getData()}>
                <img src={horse}/>
            </a>
        </div>
    );
}

function getRan(max,min)
{
  return Math.random() * max + parseInt(min)
}

export default SmallRace;