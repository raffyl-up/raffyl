// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/IEventFactory.sol";
import "./Event.sol";


contract EventFactory is IEventFactory {
    address[] private events;
    mapping(address => address[]) private organizerEvents;

    function createEvent(
        string memory name,
        address tokenAddress,
        uint256 prizeAmount,
        uint256 winnerCount
    ) external override returns (address eventAddress) {
        require(bytes(name).length > 0, "EventFactory: Event name cannot be empty");
        require(prizeAmount > 0, "EventFactory: Prize amount must be greater than 0");
        require(winnerCount > 0, "EventFactory: Winner count must be greater than 0");

        Event newEvent = new Event(
            msg.sender,
            name,
            tokenAddress,
            prizeAmount,
            winnerCount
        );

        eventAddress = address(newEvent);

        events.push(eventAddress);
        organizerEvents[msg.sender].push(eventAddress);

        emit EventCreated(
            msg.sender,
            eventAddress,
            name,
            tokenAddress,
            prizeAmount,
            winnerCount
        );

        return eventAddress;
    }
    
    function getEventCount() external view override returns (uint256 count) {
        return events.length;
    }

    function getEvent(uint256 index) external view override returns (address eventAddress) {
        require(index < events.length, "EventFactory: Event index out of bounds");
        return events[index];
    }

    function getAllEvents() external view override returns (address[] memory) {
        return events;
    }

    function getEventsByOrganizer(address organizer) external view override returns (address[] memory) {
        return organizerEvents[organizer];
    }
}
