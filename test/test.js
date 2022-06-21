const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Basic Deploy Conditions - Public Functions", function () {
  before(async function () {
    this.CONTRACT_FACTORY = await ethers.getContractFactory("GuiltyDavid");
  });

  beforeEach(async function () {
    this.contract = await this.CONTRACT_FACTORY.deploy(
      "Guilty David",
      "DAVID",
      "https://image.shutterstock.com/image-photo/large-thick-industrial-black-metal-600w-1081708619/",
      "https://image.shutterstock.com/image-vector/grunge-link-lines-nodes-icon-600w-2080549558/"
    );
    await this.contract.deployed();
  });

  it("Should Mint successfully", async function () {
    await this.contract.mint(1);
    expect((await this.contract.totalSupply()).toString()).to.equal("1");
  });

  it("Should get the base token uri / token id / extension", async function () {
    await this.contract.mint(1);
    expect((await this.contract.totalSupply()).toString()).to.equal("1");

    const res = await this.contract.tokenURI(0);
    expect(res.toString()).to.equal(
      "https://image.shutterstock.com/image-photo/large-thick-industrial-black-metal-600w-1081708619/0.png"
    );
  });
});

describe("Basic Deploy Conditions And Changes From Owner - Owner Functions", function () {
  before(async function () {
    this.CONTRACT_FACTORY = await ethers.getContractFactory("GuiltyDavid");
  });

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    this.contract = await this.CONTRACT_FACTORY.deploy(
      "Guilty David",
      "DAVID",
      "https://image.shutterstock.com/image-photo/large-thick-industrial-black-metal-600w-1081708619/",
      "https://image.shutterstock.com/image-vector/grunge-link-lines-nodes-icon-600w-2080549558/"
    );
    await this.contract.deployed();
  });

  it("Owner reveal change", async function () {
    await this.contract.connect(owner).setReveal(false);
    expect(await this.contract.revealed()).to.equal(false);
  });

  it("Owner setFreeOrNot change", async function () {
    await this.contract.connect(owner).setFreeOrNot(false);
    expect(await this.contract.free()).to.equal(false);
  });

  it("Owner setCost change", async function () {
    await this.contract.connect(owner).setCost(5);
    expect(await this.contract.cost()).to.equal(5);
  });

  it("Owner setmaxMintAmount change", async function () {
    await this.contract.connect(owner).setmaxMintAmount(200);
    expect(await this.contract.maxMintAmount()).to.equal(200);
  });

  it("Owner setNotRevealedURI change", async function () {
    await this.contract.connect(owner).setNotRevealedURI("whatever");
    expect(await this.contract.notRevealedUri()).to.equal("whatever");
  });

  it("Owner setBaseExtension change", async function () {
    await this.contract.connect(owner).setBaseExtension("whatever");
    expect(await this.contract.baseExtension()).to.equal("whatever");
  });

  it("Owner setPause change", async function () {
    await this.contract.connect(owner).setPause(true);
    expect(await this.contract.paused()).to.equal(true);
  });

  it('throws an error when it NOT a owner',async function () {
      try{
        await this.contract.connect(addr1).setPause(true);
      }catch(err){
        expect(err.message).to.equal("VM Exception while processing transaction: reverted with reason string 'Ownable: caller is not the owner'");
      }
  });

});
