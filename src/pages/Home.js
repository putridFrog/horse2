function Home({wins, loss, net})
{
    let average = winAverage();
    let netGain = getNet();
    let avClass = average >= 50 ? 'green' : 'red';
    let nClass = netGain >= 0 ? 'green' : 'red';
    function winAverage()
    {
        let totalGames = wins+loss;
        let average = ((wins/totalGames) * 100).toFixed(2);
        if (isNaN(average)) average = 0;
        return average;
    }
    function getNet()
    {
        return net.pos - net.neg;
    }
    return(<div className="container center">
        <div className="box">
            <div className="group">
                <div className="itemBoxs">Win Average: <span className={avClass}>{average}%</span></div>
                <div className="itemBoxs">Net Gain: <span className={nClass}>${netGain}</span></div>
            </div>
            <div className="group">
                <div className="itemBoxs">
                    <div><span className="green">Wins: {wins}</span></div>
                    <div><span className="red">Losses: {loss}</span></div>
                </div>
            </div>
        </div>
    </div>);
}

export default Home;