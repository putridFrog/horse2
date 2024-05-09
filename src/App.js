import React, { useState } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import SmallRace from "./pages/SmallRace";
import Settings from './pages/settings';

function App() {
  const [data,changeData] = useState(() => {
    var saved = localStorage.getItem("data");
    saved = JSON.parse(saved);
    return saved || {money: 1000, horses:3, wins: 0, loss: 0, pos: 0, neg: 0}
  })
  localStorage.setItem("data",JSON.stringify(data));
  function handleData(newMoney, newWin = 0, newLoss = 0, netPos = 0, netNeg = 0)
  {
    changeData(prevState => ({
      ...prevState,
      money: newMoney,
      wins: data.wins + newWin,
      loss: data.loss + newLoss,
      pos: data.pos + netPos,
      neg: data.neg + netNeg
    }))
  }
  function handleMoney(newMoney)
  {
    changeData(prevState => ({
      ...prevState,
      money: newMoney
    }))
  }
  function settingsData(newMoney = 0, newHorses = 3)
  {
    changeData(prevState => ({
      ...prevState,
      money: Number(newMoney) + data.money,
      horses: newHorses
    }))
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout money={data.money}/>}>
          <Route index element={<Home wins={data.wins} loss={data.loss} net={{pos: data.pos, neg: data.neg}}/>} />
          <Route path="settings" element={<Settings sendData={settingsData}/>} />
          <Route path="SmallRace" element={<SmallRace money={data.money} horseNum={data.horses} sendData={handleData} handleMoney={handleMoney}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
export default App;