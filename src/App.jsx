import { useState } from "react";
import { ethers } from "ethers";

import "./App.css";

function App() {
  let [Owner, setOwner] = useState("");
  let [TokenName, setTokenName] = useState("");
  let [TokenSymbol, setTokenSymbol] = useState("");
  let [InitialSupply, setInitialSupply] = useState();
  let [TokenAddress, setTokenAddress] = useState("");
  let ContractAbi = [
    {
      inputs: [
        {
          internalType: "address",
          name: "initialOwner",
          type: "address",
        },
        {
          internalType: "string",
          name: "_tokenName",
          type: "string",
        },
        {
          internalType: "string",
          name: "_tokenSymbol",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "initialSupply",
          type: "uint256",
        },
      ],
      name: "createToken",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "newToken",
          type: "address",
        },
      ],
      name: "NewToken",
      type: "event",
    },
  ];

  const Generate = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0xcd411dA08D3b1647ccB41DE081E0E165834f1D72",
      ContractAbi,
      signer
    );
    let tx = await contract.createToken(
      Owner,
      TokenName,
      TokenSymbol,
      InitialSupply
    );
    let receipt = await tx.wait();
    const event = receipt.events.find((event) => event.event === "NewToken");
    const newTokenContractAddress = event.args.newToken;

    console.log(newTokenContractAddress);
    setTokenAddress(newTokenContractAddress);
    console.log("Token Successfully Generated!!");
  };

  const handleInputOwner = (event) => {
    setOwner(event.target.value);
  };

  const handleInputName = (event) => {
    setTokenName(event.target.value);
  };
  const handleInputSymbol = (event) => {
    setTokenSymbol(event.target.value);
  };
  const handleInputSupply = (event) => {
    setInitialSupply(event.target.value);
  };

  return (
    <div className="main-container">
      <div className="container">
        <h1>ERC20 Token Generator</h1>
        <div className="inputs">
          <div className="record">
            <span>Token Name :</span>
            <span>
              <input type="text" value={TokenName} onChange={handleInputName} />
            </span>
          </div>
          <div className="record">
            <span>Token Symbol :</span>
            <span>
              <input
                type="text"
                value={TokenSymbol}
                onChange={handleInputSymbol}
              />
            </span>
          </div>
          <div className="record">
            <span>Owner :</span>
            <span>
              <input type="text" value={Owner} onChange={handleInputOwner} />
            </span>
          </div>
          <div className="record">
            <span>Initial Supply :</span>
            <span>
              <input
                type="text"
                value={InitialSupply}
                onChange={handleInputSupply}
              />
            </span>
          </div>
          <div className="record">
            <span>Token Address :</span>
            <span>
              <input type="text" value={TokenAddress} disabled />
            </span>
          </div>
          <button className="generateBtn" onClick={Generate}>
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}
export default App;
