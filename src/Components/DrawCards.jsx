import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import ContractABI from "./ABI.json";
import appLogo from "../assets/app-logo.png";
import { useNavigate } from "react-router-dom";

const CONTRACT_ADDRESS = "0x59531a3d99Ca0EeCE9087d3d934e72B1350De86f";

function DrawCards() {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const drawCards = async () => {
    setLoading(true);
    let signer = null;

    let provider;
    if (window.ethereum == null) {
      // If MetaMask is not installed, we use the default provider,
      // which is backed by a variety of third-party services (such
      // as INFURA). They do not have private keys installed,
      // so they only have read-only access
      console.log("MetaMask not installed; using read-only defaults");
      provider = ethers.getDefaultProvider();
    } else {
      // Connect to the MetaMask EIP-1193 object. This is a standard
      // protocol that allows Ethers access to make all read-only
      // requests through MetaMask.
      provider = new ethers.BrowserProvider(window.ethereum);

      // It also provides an opportunity to request access to write
      // operations, which will be performed by the private key
      // that MetaMask manages for the user.
      signer = await provider.getSigner();
    }
    console.log("Yeeticus");
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ContractABI, signer);
    try {
      const drawPrice = ethers.parseEther("0.0001");
      const transaction = await contract.drawCard({ value: drawPrice });

      await transaction.wait(); // Wait for the transaction to be mined
      console.log("Card drawn successfully");
      setLoading(false);
      nav("/app/mycards");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) {
    return (
      <div className="container2">
        <img className="image-wiggle" src={appLogo} />
      </div>
    );
  } else {
    return (
      <div className="subContainer center">
        <button
          className="drawBtn"
          role="button"
          onClick={() => {
            drawCards();
          }}
        >
          Draw Cards
        </button>
      </div>
    );
  }
}

export default DrawCards;
