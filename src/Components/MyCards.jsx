import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import ContractABI from "./ABI.json";

const CONTRACT_ADDRESS = "0x59531a3d99Ca0EeCE9087d3d934e72B1350De86f";

const MyCards = () => {
  const [cards, setCards] = useState([]);
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          let signer = null;
          let provider = null;

          if (window.ethereum == null) {
            console.log("MetaMask not installed; using read-only defaults");
            provider = ethers.getDefaultProvider();
          } else {
            provider = new ethers.BrowserProvider(window.ethereum);
            signer = await provider.getSigner();
          }

          const address = await signer.getAddress();
          setUserAddress(address);
          console.log("MyCards : " + address);
          const contract = new ethers.Contract(
            CONTRACT_ADDRESS,
            ContractABI,
            signer
          );
          const userCards = await contract.getUserCards(address);
          setCards(userCards);
          console.log(cards);
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        console.error("Ethereum object not found, install MetaMask.");
      }
    };

    init();
  }, []);

  return (
    <div className="subContainer">
      {cards.length === 0 ? (
        <div className="noCards">
          <h1
            className="fancy-font1"
            style={{ fontSize: "4rem", textAlign: "center" }}
          >
            You have 0 cards, Go to Draw Cards sections and Build your team to
            fight the <b>Ashardalon</b>
          </h1>
        </div>
      ) : (
        <div>
          <div className="cards-container ">
            {cards.map((cardUri, index) => (
              <div key={index} className="card">
                {/* Assuming the URI is a direct link to the image */}
                <img src={cardUri} alt={`Card ${index}`} />
                {/* If the URI is a link to a page with more info, you can use an anchor tag instead */}
                {/* <a href={cardUri} target="_blank" rel="noopener noreferrer">Card {index + 1}</a> */}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCards;
