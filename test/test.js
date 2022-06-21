const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Minting", function () {
  before(async function () {
    this.CONTRACT_FACTORY = await ethers.getContractFactory("GuiltyDavid");
  });

  beforeEach(async function () {
    this.contract = await this.CONTRACT_FACTORY.deploy(
      "Guilty David",
      "DAVID",
      "https://image.shutterstock.com/image-photo/large-thick-industrial-black-metal-600w-1081708619",
      "https://image.shutterstock.com/image-vector/grunge-link-lines-nodes-icon-600w-2080549558"
    );
    await this.contract.deployed();
  });

  it("Should Mint successfully", async function () {
    await this.contract.mint(1);
  });
  
});
