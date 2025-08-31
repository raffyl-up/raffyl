import { useNavigate } from "react-router-dom";
import {
  EventState,
  formatAddress,
  formatTokenAmount,
  getEventStateLabel,
} from "../contracts.ts";
import type { EventStateType } from "../contracts.ts";

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

interface EventCardProps {
  event: EventData;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const navigate = useNavigate();

  const getStateClasses = (state: EventStateType): string => {
    switch (state) {
      case EventState.OPEN:
        return "bg-green-100 text-green-800 border-green-200";
      case EventState.WINNERS_SELECTED:
        return "bg-blue-100 text-blue-800 border-blue-200";
      case EventState.COMPLETED:
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 hover:shadow-xl transition-shadow duration-200">
      
      <div className="flex flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
          {event.name}
        </h3>
        <span
          className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${getStateClasses(
            event.state
          )} whitespace-nowrap`}
        >
          {getEventStateLabel(event.state)}
        </span>
      </div>

    
      <div className="space-y-3 mb-4 sm:mb-6">
        <div className="flex justify-between items-center text-sm sm:text-base">
          <span className="text-gray-600 font-medium">Organizer:</span>
          <span className="text-gray-900 font-mono">
            {formatAddress(event.organizer)}
          </span>
        </div>

        <div className="flex justify-between items-center text-sm sm:text-base">
          <span className="text-gray-600 font-medium">Prize:</span>
          <span className="text-gray-900 font-semibold">
            {formatTokenAmount(event.prizeAmount)} {event.tokenSymbol}
          </span>
        </div>

        <div className="flex justify-between items-center text-sm sm:text-base">
          <span className="text-gray-600 font-medium">Participants:</span>
          <span className="text-gray-900 font-semibold">
            {event.participantCount.toString()}
          </span>
        </div>

        <div className="flex justify-between items-center text-sm sm:text-base">
          <span className="text-gray-600 font-medium">Winners:</span>
          <span className="text-gray-900 font-semibold">
            {event.winners.length} / {event.winnerCount.toString()}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4">
        <button
          onClick={() => navigate(`/event/${event.address}`)}
          className="w-full py-2 sm:py-3 px-4 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
        >
          View Details
        </button>
      </div>

      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs sm:text-sm text-gray-500 text-center">
          Contract:{" "}
          <span className="font-mono">{formatAddress(event.address)}</span>
        </p>
      </div>
    </div>
  );
};

export default EventCard;