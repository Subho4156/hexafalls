// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract FarmToken is ERC721URIStorage {
    struct Params {
        uint investmentAmount;
        address investor;
        uint returnAmount;
        uint returnDate;
        uint insuranceAmount;
        bool isInsured;
    }

    struct Reputation {
        uint successfulReturns;
        uint totalInvestments;
        uint256 averageReturnTime;
        bool isBlacklisted;
    }

    uint private _nextTokenId;
    mapping(uint tokenId => Params params) private _params;
    mapping(address => Reputation) private _reputation;
    uint256 private constant INSURANCE_RATE = 5; // 5% of investment amount
    uint256 private constant MINIMUM_REPUTATION_SCORE = 70;

    event ReputationUpdated(address farmer, uint newScore);
    event InsuranceClaimed(uint tokenId, address investor, uint amount);

    constructor() ERC721("Farm Token", "FRMT") {}

// Here a farmer tokenizes a product and requests for investment
    function create(
        uint investmentAmount,
        string memory uri,
        bool withInsurance
    ) public payable {
        uint256 tokenId = _nextTokenId++;
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
        
        uint insuranceAmount = 0;
        if (withInsurance) {
            insuranceAmount = (msg.value * INSURANCE_RATE) / 100;
            require(msg.value >= insuranceAmount, "Insufficient insurance payment");
        }

        Params memory params;
        params.investmentAmount = investmentAmount;
        params.insuranceAmount = insuranceAmount;
        params.isInsured = withInsurance;
        _params[tokenId] = params;
    }


// Here an investor invests a certain amount
    function makeInvestment(uint tokenId) public payable {
        require(_params[tokenId].investor == address(0), "Already has investor");
        require(msg.value == _params[tokenId].investmentAmount, "Incorrect investment amount");

        // Transfer investment to farmer
        (bool sent, ) = payable(_ownerOf(tokenId)).call{value: msg.value}("");
        require(sent, "Failed to send ETH");

        _params[tokenId].investor = msg.sender;
    }

    

// Here the farmer returns the investment + interest
    function returnInvestment(uint tokenId) public payable {
        require(_ownerOf(tokenId) == msg.sender, "Not owner");
        require(_params[tokenId].investor != address(0), "No investor");
        require(msg.value > 0, "Must return some amount");

        // Transfer return amount to investor
        (bool sent, ) = payable(_params[tokenId].investor).call{value: msg.value}("");
        require(sent, "Failed to send ETH");

        _params[tokenId].returnAmount = msg.value;
        _params[tokenId].returnDate = block.timestamp;

        // Update reputation
        Reputation storage rep = _reputation[msg.sender];
        rep.successfulReturns++;
        rep.totalInvestments++;
        rep.averageReturnTime = (rep.averageReturnTime + (block.timestamp - _params[tokenId].returnDate)) / 2;

        emit ReputationUpdated(msg.sender, calculateReputationScore(msg.sender));
    }

// If farmer defaults the investor can claimInsurance as compensation.
    function claimInsurance(uint tokenId) public {
        require(_params[tokenId].investor == msg.sender, "Not investor");
        require(_params[tokenId].isInsured, "Not insured");
        require(_params[tokenId].returnDate == 0, "Already returned");
        require(block.timestamp > _params[tokenId].returnDate + 30 days, "Too early");

        uint insuranceAmount = _params[tokenId].insuranceAmount;
        _params[tokenId].insuranceAmount = 0;
        _params[tokenId].isInsured = false;

        (bool sent, ) = payable(msg.sender).call{value: insuranceAmount}("");
        require(sent, "Failed to send insurance");

        _reputation[_ownerOf(tokenId)].isBlacklisted = true;

        emit InsuranceClaimed(tokenId, msg.sender, insuranceAmount);
    }

// Check the reputationScore of a farmer to know if fundable or not
    function calculateReputationScore(address farmer) public view returns (uint) {
        Reputation memory rep = _reputation[farmer];
        if (rep.isBlacklisted) return 0;
        if (rep.totalInvestments == 0) return 50;

        uint successRate = (rep.successfulReturns * 100) / rep.totalInvestments;
        uint timeScore = rep.averageReturnTime > 30 days ? 0 : 50;
        
        return (successRate + timeScore) / 2;
    }

// Farmer update uri with new records of how the money is spent
    function setURI(uint tokenId, string memory uri) public {
        require(_ownerOf(tokenId) == msg.sender, "Not owner");
        _setTokenURI(tokenId, uri);
    }

    function getNextTokenId() public view returns (uint nextTokenId) {
        return _nextTokenId;
    }

    function getParams(uint tokenId) public view returns (Params memory) {
        return _params[tokenId];
    }

    function getReputation(address farmer) public view returns (Reputation memory) {
        return _reputation[farmer];
    }

    receive() external payable {}
    fallback() external payable {}
}