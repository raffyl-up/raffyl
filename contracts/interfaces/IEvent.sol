// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IEvent {
    enum EventState {
        OPEN,
        WINNERS_SELECTED,
        COMPLETED
    }

    event UserRegistered(address indexed user, uint256 timestamp, uint256 participantCount);
    event EventFunded(address indexed organizer, uint256 amount);
    event WinnersSelected(address[] winners, uint256 timestamp);
    event PrizesDisbursed(address[] winners, uint256 prizePerWinner, uint256 timestamp);
    event BalanceWithdrawn(address indexed organizer, uint256 amount);


    function register() external;
    function fundEvent(uint256 amount) external payable;
    function selectWinners() external;
    function disbursePrizes() external;
    function withdrawBalance() external;
    function getEventInfo() external view returns (
        string memory name,
        address organizer,
        address tokenAddress,
        uint256 prizeAmount,
        uint256 winnerCount,
        EventState state,
        uint256 participantCount,
        bool isFunded
    );
    function getParticipants() external view returns (address[] memory participants);
    function getWinners() external view returns (address[] memory winners);
    function isRegistered(address user) external view returns (bool isRegistered);
    function isWinner(address user) external view returns (bool isWinner);
}
