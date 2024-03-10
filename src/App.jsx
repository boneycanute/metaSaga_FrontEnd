import React, { createContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Connect from "./Components/Connect";
import Arena from "./Components/Arena";
import LazyLoad from "./Components/LazyLoad";
import Logo from "./assets/a.webp";
import DrawCards from "./Components/DrawCards";
import MyCards from "./Components/MyCards";
import TradeCards from "./Components/TradeCards";

function App() {
  return (
    <div className="mainContainer">
      <Routes>
        <Route path="/" element={<Connect />} />
        <Route path="/app" element={<Arena />}>
          <Route path="draw" element={<DrawCards />} />
          <Route path="mycards" element={<MyCards />} />
          <Route path="trade" element={<TradeCards />} />
        </Route>
      </Routes>
      <div className="footer">
        <img className="logo" src={Logo} />
        Powered by MetaSchool
      </div>
    </div>
  );
}

export default App;
