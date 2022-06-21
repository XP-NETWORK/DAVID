async function main() {
    const { ethers } = require("hardhat");
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with this account:", deployer.address);
    console.log("Account ballance:", (await deployer.getBalance()).toString());
  
    const Token = await ethers.getContractFactory("GuiltyDavid");
    const token = await Token.deploy("Guilty David" , "DAVID",  "https://image.shutterstock.com/image-photo/large-thick-industrial-black-metal-600w-1081708619.jpg",
    "https://image.shutterstock.com/image-vector/grunge-link-lines-nodes-icon-600w-2080549558.jpg");   
  
    await token.deployed();
  
    console.log("Token address:", token.address);
  }
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });