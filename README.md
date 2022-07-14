# DAVID


Collection Name: Guilty David
Symbol: DAVID
Total supply: 5000
Price Per Mint: 0.001 ETH (changeable)
Token Protocol: ERC721A

contract on Ropsten: https://bit.ly/3n2JOPs

The contract needs to have:
Royalty payments
Pre reveal NFT URI capabilities 
One Base URI For all tokens
IPFS

Only Owner Functions:


Name: setReveal , 
Description: function returns a boolean that will decide if the baseUrl is visible to the public.


Name: setFreeOrNot
Description: function return a boolean that will decide if the NFT is currently free or not


Name: setCost
Description: function returns a number that the owner decides will be the new cost of the NFT.


Name: setBaseURI
Description: function returns a URI that will be the new base URI of the collection.


Name: setBaseExtention
Description: function returns an extension that will be the new extension of the URI collection.


Name: setPause
Description: function returns a boolean that will decide if Minting is still possible.


Name: setMaxMintAmount
Description: function returns  a number that is the max amount a user is able to mint per transaction , relevant only when a user is minting for free.


Name: setNotRevealedURI
Description: function returns a URI of an image that will be presented as the base URI when the owner doesn't want to reveal the real image of the tokenId.


Name: setBaseExtention
Description: function returns an extension (jpeg, png etc’) for that is used when we reveal the token id URI.


Name: Withdraw
Description: withdraw profits.







Public Non Owner Function:
All erc721A standard functions.


Name: tokenURI
Description: user Inputs a tokenId and gets the token URI  - 
needs to be the baseURI / tokenID / BaseExtension 


Name: Mint
Description: User is able to mint a new NFT and pass the conditions in the function 
and capable of bulk mint.























