import React, { useState, useEffect } from 'react';
import { Contract } from 'ethers';
import { FiAlertTriangle, FiX } from 'react-icons/fi';
import { useWeb3 } from '../Web3Context';
import {
  CONTRACT_ADDRESSES,
  EVENT_FACTORY_ABI,
  EVENT_ABI,
  ERC20_ABI,
  isContractDeployed,
  getEventsByOrganizer
} from '../contracts';
import type { EventStateType } from '../contracts';
import EventCard from './EventCard';

interface EventData {
  address: string;
  name: string;
  organizer: string;
  tokenAddress: string;
  prizeAmount: bigint;
  state: EventStateType;
  participantCount: bigint;
  participants: string[];
  winners: string[];
  isUserRegistered: boolean;
  isUserWinner: boolean;
  tokenSymbol: string;
  isFunded: boolean;
  winnerCount: bigint;
}

const EventList: React.FC = () => {
  const { provider, account, isConnected } = useWeb3();
  const [events, setEvents] = useState<EventData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showMyEventsOnly, setShowMyEventsOnly] = useState(false);

  useEffect(() => {
    if (isConnected && provider) {
      loadEvents();
    }
  }, [isConnected, provider, account, showMyEventsOnly]);

  const loadEvents = async () => {
    if (!provider) return;

    if (!isContractDeployed(CONTRACT_ADDRESSES.EVENT_FACTORY)) {
      setError('Contracts not deployed yet');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const eventFactory = new Contract(
        CONTRACT_ADDRESSES.EVENT_FACTORY,
        EVENT_FACTORY_ABI,
        provider
      );

      
      let eventAddresses: string[];
      if (showMyEventsOnly && account) {
        eventAddresses = await getEventsByOrganizer(eventFactory, account);
      } else {
        eventAddresses = await eventFactory.getAllEvents();
      }
      
      if (eventAddresses.length === 0) {
        setEvents([]);
        return;
      }

      
      const eventDataPromises = eventAddresses.map(async (address: string) => {
        try {
          const eventContract = new Contract(address, EVENT_ABI, provider);
          
          
          const [
            name,
            organizer,
            tokenAddress,
            prizeAmount,
            state,
            isFunded,
            winnerCount
          ] = await Promise.all([
            eventContract.name(),
            eventContract.organizer(),
            eventContract.prizeToken(),
            eventContract.prizeAmount(),
            eventContract.currentState(),
            eventContract.isFunded(),
            eventContract.winnerCount()
          ]);

          // Get participants and winners
          const [participants, winners] = await Promise.all([
            eventContract.getParticipants(),
            eventContract.getWinners()
          ]);

          
          const participantCount = BigInt(participants.length);

        
          let isUserRegistered = false;
          let isUserWinner = false;
          
          if (account) {
            [isUserRegistered, isUserWinner] = await Promise.all([
              eventContract.isRegistered(account),
              eventContract.isWinner(account)
            ]);
          }

          
          let tokenSymbol = 'ETH';
          try {
            const tokenContract = new Contract(tokenAddress, ERC20_ABI, provider);
            tokenSymbol = await tokenContract.symbol();
          } catch (error) {
            console.warn('Could not load token symbol for', tokenAddress);
          }

          return {
            address,
            name,
            organizer,
            tokenAddress,
            prizeAmount,            
            state: Number(state) as EventStateType,
            participantCount,
            participants,
            winners,
            isUserRegistered,
            isUserWinner,
            tokenSymbol,
            isFunded,
            winnerCount
          };
        } catch (error) {
          console.error('Error loading event data for', address, error);
          return null;
        }
      });

      const eventData = await Promise.all(eventDataPromises);
      const validEvents = eventData.filter((event): event is EventData => event !== null);

      // Sort events by state (registration open first, then by name)
      validEvents.sort((a, b) => {
        if (a.state !== b.state) {
          return a.state - b.state;
        }
        return a.name.localeCompare(b.name);
      });

      setEvents(validEvents);

    } catch (error: any) {
      console.error('Error loading events:', error);
      setError(error.message || 'Failed to load events');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Browse Events
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Please connect your wallet to view events.
          </p>
        </div>
      </div>
    );
  }

  if (!isContractDeployed(CONTRACT_ADDRESSES.EVENT_FACTORY)) {
    return (
      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Browse Events
          </h2>
          <p className="text-yellow-600 text-base sm:text-lg flex items-center justify-center gap-2">
            <FiAlertTriangle className="text-yellow-500" />
            Contracts not deployed yet. Please deploy contracts first.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
          Browse Events
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-3">
        
          <label className="flex items-center gap-2 text-sm sm:text-base text-gray-700">
            <input
              type="checkbox"
              checked={showMyEventsOnly}
              onChange={(e) => setShowMyEventsOnly(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            My Events Only
          </label>

          
          <button
            onClick={loadEvents}
            disabled={isLoading}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg'
            }`}
          >
            {isLoading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
      </div>

    
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <span className="text-red-800 text-sm sm:text-base flex items-center gap-2">
            <FiX className="text-red-600" />
            {error}
          </span>
        </div>
      )}

      
      {isLoading && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-800 text-base sm:text-lg">Loading events...</p>
        </div>
      )}

   
      {!isLoading && events.length === 0 && !error && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-600 text-base sm:text-lg">
            No events found. Create the first event!
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {events.map((event) => (
          <EventCard
            key={event.address}
            event={event}
          />
        ))}
      </div>
    </div>
  );
};

export default EventList;