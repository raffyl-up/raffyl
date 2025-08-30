// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./interfaces/IEvent.sol";

contract Event is IEvent, Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    string public name;
    address public organizer;
    IERC20 public immutable prizeToken;
    uint256 public immutable prizeAmount;
    uint256 public immutable winnerCount;
    
    EventState public currentState;
    bool public isFunded;
    
    address[] public participants;
    address[] public winners;
    mapping(address => bool) public isRegistered;
    mapping(address => bool) public isWinner;
    
    bool private winnersSelected;
    bool private prizesDisbursed;
    
    constructor(
        address _organizer,
        string memory _name,
        address _tokenAddress,
        uint256 _prizeAmount,
        uint256 _winnerCount
    ) Ownable(_organizer) {
        require(_organizer != address(0), "Event: Invalid organizer address");
        require(bytes(_name).length > 0, "Event: Event name cannot be empty");
        require(_prizeAmount > 0, "Event: Prize amount must be greater than 0");
        require(_winnerCount > 0, "Event: Winner count must be greater than 0");

        organizer = _organizer;
        name = _name;
        prizeToken = _tokenAddress != address(0) ? IERC20(_tokenAddress) : IERC20(address(0));
        prizeAmount = _prizeAmount;
        winnerCount = _winnerCount;
        currentState = EventState.OPEN;
    }


    function register() external override {
        require(currentState == EventState.OPEN, "Event: Registration is not open");
        require(!isRegistered[msg.sender], "Event: User already registered");

        participants.push(msg.sender);
        isRegistered[msg.sender] = true;

        emit UserRegistered(msg.sender, block.timestamp, participants.length);
    }

    function fundEvent(uint256 amount) external payable override onlyOwner {
        require(amount >= prizeAmount, "Event: Amount must be greater than or equal to prize amount");
        require(!isFunded, "Event: Event already funded");

        if (address(prizeToken) == address(0)) {
            require(msg.value == amount, "Event: ETH amount must match specified amount");
        } else {
            require(msg.value == 0, "Event: Cannot send ETH when funding with ERC20");
            prizeToken.safeTransferFrom(msg.sender, address(this), amount);
        }

        isFunded = true;
        emit EventFunded(msg.sender, amount);
    }
    
    function selectWinners() external override onlyOwner nonReentrant {
        require(isFunded, "Event: Event must be funded first");
        require(participants.length >= winnerCount, "Event: Not enough participants");
        require(currentState == EventState.OPEN, "Event: Winners already selected");
        require(!winnersSelected, "Event: Winners already selected");

        winnersSelected = true;
        currentState = EventState.WINNERS_SELECTED;

        _selectWinnersWithHash();
    }


    function _selectWinnersWithHash() internal {
        bytes32 seed = keccak256(abi.encodePacked(
            block.timestamp,
            block.prevrandao,
            block.number,
            participants.length,
            address(this)
        ));

        address[] memory selectedWinners = new address[](winnerCount);
        bool[] memory used = new bool[](participants.length);

        for (uint256 i = 0; i < winnerCount; i++) {
            bytes32 winnerHash = keccak256(abi.encodePacked(seed, i));
            uint256 randomIndex;

            do {
                randomIndex = uint256(winnerHash) % participants.length;
                if (used[randomIndex]) {
                    winnerHash = keccak256(abi.encodePacked(winnerHash, block.timestamp, i));
                }
            } while (used[randomIndex]);

            used[randomIndex] = true;
            selectedWinners[i] = participants[randomIndex];
            winners.push(participants[randomIndex]);
            isWinner[participants[randomIndex]] = true;
        }

        emit WinnersSelected(selectedWinners, block.timestamp);
    }
  
    function disbursePrizes() external override onlyOwner nonReentrant {
        require(currentState == EventState.WINNERS_SELECTED, "Event: Winners not selected yet");
        require(!prizesDisbursed, "Event: Prizes already disbursed");

        prizesDisbursed = true;
        currentState = EventState.COMPLETED;

        uint256 prizePerWinner = prizeAmount / winnerCount;

        for (uint256 i = 0; i < winners.length; i++) {
            if (address(prizeToken) == address(0)) {
                (bool success, ) = winners[i].call{value: prizePerWinner}("");
                require(success, "Event: ETH transfer failed");
            } else {
                prizeToken.safeTransfer(winners[i], prizePerWinner);
            }
        }

        emit PrizesDisbursed(winners, prizePerWinner, block.timestamp);
    }

   
    function withdrawBalance() external override onlyOwner nonReentrant {
        require(currentState == EventState.COMPLETED, "Event: Winners not selected yet");

        if (address(prizeToken) == address(0)) {
            uint256 balance = address(this).balance;
            require(balance > 0, "Event: No balance to withdraw");

            (bool success, ) = organizer.call{value: balance}("");
            require(success, "Event: ETH transfer failed");

            emit BalanceWithdrawn(organizer, balance);
        } else {
            uint256 balance = prizeToken.balanceOf(address(this));
            require(balance > 0, "Event: No balance to withdraw");

            prizeToken.safeTransfer(organizer, balance);
            emit BalanceWithdrawn(organizer, balance);
        }
    }



    function emergencyRecoverTokens(address tokenAddress, uint256 amount) external onlyOwner {
        require(currentState != EventState.COMPLETED, "Event: Cannot recover from completed event");
        require(tokenAddress != address(prizeToken) || !isFunded, "Event: Cannot recover prize tokens from funded event");
        require(tokenAddress != address(0), "Event: Use withdrawBalance to recover ETH");

        IERC20(tokenAddress).safeTransfer(organizer, amount);
    }
}
