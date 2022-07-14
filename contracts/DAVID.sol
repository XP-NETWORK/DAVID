// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

//Ownable is needed to setup sales royalties on Open Sea
//if you are the owner of the contract you can configure sales Royalties in the Open Sea website
import "@openzeppelin/contracts/access/Ownable.sol";
//the rarible dependency files are needed to setup sales royalties on Rarible
import "../rarible/royalties/contracts/impl/RoyaltiesV2Impl.sol";
import "../rarible/royalties/contracts/LibPart.sol";
import "../rarible/royalties/contracts/LibRoyaltiesV2.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "erc721a/contracts/ERC721A.sol";

//give your contract a name
contract GuiltyDavid is ERC721A, Ownable, RoyaltiesV2Impl {
    using Strings for uint256;

    //configuration
    string baseURI;
    string public baseExtension = ".png";

    //set the cost to mint each NFT
    uint256 public cost = 0.001 ether;

    //set the max supply of NFT's
    uint256 public maxSupply = 1000;

    //set the maximum number an address can mint at a time
    uint256 public maxMintAmount = 1;

    //is the contract paused from minting an NFT
    bool public paused = false;

    //are the NFT's revealed (viewable)? If true users can see the NFTs.
    //if false everyone sees a reveal picture
    bool public revealed = true;
    bool public free = true;

    //the uri of the not revealed picture
    string public notRevealedUri;

    bytes4 private constant _INTERFACE_ID_ERC2981 = 0x2a55205a;

   constructor(
    string memory _name,
    string memory _symbol,
    string memory _initBaseURI,
    string memory _initNotRevealedUri
  ) ERC721A(_name, _symbol) {
    setBaseURI(_initBaseURI);
    setNotRevealedURI(_initNotRevealedUri);
  }

    //internal function for base uri
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    //function allows you to mint an NFT token
    function publicMint(uint256 _mintAmount) public payable {
        uint256 supply = totalSupply();
        require(!paused);
        require(_mintAmount > 0);
        require(supply + _mintAmount <= maxSupply);
        if(msg.sender != owner() &&  msg.value == 0 ){
          require(_mintAmount <= maxMintAmount);
        }
        if(msg.sender != owner() && !free) {
            require(msg.value >= cost * _mintAmount);
        }
        _mint(msg.sender, _mintAmount);
    }

   //function that mints with an input address || available only from the validator
	function mint(address to, uint256 id, bytes calldata) external {
		_safeMint(to, id);
	}

	function burnFor(address from, uint256 id) external  {
        require(ownerOf(id) == from, "You don't own this nft!");
		_burn(id);
	}

    //input a NFT token ID and get the IPFS URI
    function tokenURI(uint256 tokenId) public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        if (revealed == false) {
            return notRevealedUri;
        }

        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        tokenId.toString(),
                        baseExtension
                    )
                )
                : "";
    }

    //only owner
    function setReveal(bool _bool) public onlyOwner {
        revealed = _bool;
    }

    //only owner
    function setFreeOrNot(bool _bool) public onlyOwner {
        free = _bool;
    }

    //set the cost of an NFT
    function setCost(uint256 _newCost) public onlyOwner {
        cost = _newCost;
    }

    //set the max amount an address can mint
    function setmaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner {
        maxMintAmount = _newmaxMintAmount;
    }

    //set the not revealed URI on IPFS
    function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
        notRevealedUri = _notRevealedURI;
    }

    //set the base URI on IPFS
    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function setBaseExtension(string memory _newBaseExtension)public onlyOwner{
        baseExtension = _newBaseExtension;
    }

    //pause the contract and do not allow any more minting
    function setPause(bool _state) public onlyOwner {
        paused = _state;
    }

    function withdraw() public payable onlyOwner {
        (bool success, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(success);
    }

    //configure royalties for Rariable
    function setRoyalties(
        uint256 _tokenId,
        address payable _royaltiesRecipientAddress,
        uint96 _percentageBasisPoints
    ) public onlyOwner {
        LibPart.Part[] memory _royalties = new LibPart.Part[](1);
        _royalties[0].value = _percentageBasisPoints;
        _royalties[0].account = _royaltiesRecipientAddress;
        _saveRoyalties(_tokenId, _royalties);
    }

    //configure royalties for Mintable using the ERC2981 standard
    function royaltyInfo(uint256 _tokenId, uint256 _salePrice)
        external
        view
        returns (address receiver, uint256 royaltyAmount)
    {
        //use the same royalties that were saved for Rariable
        LibPart.Part[] memory _royalties = royalties[_tokenId];
        if (_royalties.length > 0) {
            return (
                _royalties[0].account,
                (_salePrice * _royalties[0].value) / 10000
            );
        }
        return (address(0), 0);
    }
}
