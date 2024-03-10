import React from "react";
import appLogo from "../assets/app-logo.png";
import { useNavigate } from "react-router-dom";

function Connect() {
  const connect = async () => {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask Present");
      try {
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("ConnectComp : " + account);
        navigate("/app", { state: account }); // Redirect to new URL on successful connection
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const navigate = useNavigate();
  return (
    <div className="container">
      <img src={appLogo} />
      <div className="connect-div">
        <h1 className="fancy-font1 bigFont">Meta Saga : Heroes of the Realm</h1>
        <h1 className="fancy-font1 medFont">
          Draw Your Fate, Shape Your Legend!
        </h1>
        <p
          className="fancy-btn smFont"
          onClick={() => {
            connect();
          }}
        >
          Connect your MetaMask Wallet to get started
        </p>
      </div>
    </div>
  );
}

export default Connect;
