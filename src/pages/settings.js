import { useState } from "react";
function Settings({sendData})
{
    const [data,setData] = useState({
        horseAmount: 0,
        money: 0
    })
    return(
        <div className="container top">
            <form className="bet" onSubmit={(event) => {event.preventDefault(); sendData(data.money, data.horseAmount)}}>
                <label htmlFor="horses">Horse Amount</label>
                <input type="number" key="horses" min="2" max="6" onChange={e => setData(prevState => ({...prevState, horseAmount: e.target.value}))}></input>
                <label htmlFor="money">Add Money</label>
                <input type="number" min="0" onChange={e => setData(prevState => ({...prevState, money: e.target.value}))}></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Settings;