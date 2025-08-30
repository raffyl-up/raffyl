// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


interface IEventFactory {
   
    event EventCreated(
        address indexed organizer,
        address indexed eventAddress,
        string name,
        address tokenAddress,
        uint256 prizeAmount,
        uint256 winnerCount
    );

    function createEvent(
        string memory name,
        address tokenAddress,
        uint256 prizeAmount,
        uint256 winnerCount
    ) external returns (address eventAddress);
    function getEventCount() external view returns (uint256 count);
    function getEvent(uint256 index) external view returns (address eventAddress);
    function getAllEvents() external view returns (address[] memory events);
    function getEventsByOrganizer(address organizer) external view returns (address[] memory events);
}
