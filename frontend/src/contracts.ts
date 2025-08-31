// Import complete ABIs from contract artifacts
import EventFactoryABI from './lib/event-factory.json';
import EventABI from './lib/event.json';
import { FACTORY_CA, EventState, type EventStateType } from './lib/constants';

// Contract addresses - deployed on Lisk Sepolia testnet
export const CONTRACT_ADDRESSES = {
  EVENT_FACTORY: FACTORY_CA, // Use the address from constants
  MOCK_TOKEN: "0x0000000000000000000000000000000000000000", // Will be set when creating events
};

// Helper function to check if contract is deployed
export const isContractDeployed = (address: string): boolean => {
  return address !== "0x0000000000000000000000000000000000000000" && address.length === 42;
};

// Complete EventFactory ABI from contract artifacts
export const EVENT_FACTORY_ABI = EventFactoryABI;

// Complete Event ABI from contract artifacts
export const EVENT_ABI = EventABI;

// ERC20 ABI - simplified for core functions
export const ERC20_ABI = [
  "function name() external view returns (string)",
  "function symbol() external view returns (string)",
  "function decimals() external view returns (uint8)",
  "function totalSupply() external view returns (uint256)",
  "function balanceOf(address account) external view returns (uint256)",
  "function transfer(address to, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function transferFrom(address from, address to, uint256 amount) external returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)"
] as const;



// Re-export network configuration and event types from constants
export { NETWORK_CONFIG, EventState, type EventStateType } from './lib/constants';

// Utility functions
export const formatAddress = (address: string): string => {
  if (address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatTokenAmount = (amount: bigint, decimals: number = 18): string => {
  const divisor = BigInt(10 ** decimals);
  const quotient = amount / divisor;
  const remainder = amount % divisor;
  
  if (remainder === 0n) {
    return quotient.toString();
  }
  
  const remainderStr = remainder.toString().padStart(decimals, '0');
  const trimmedRemainder = remainderStr.replace(/0+$/, '');
  
  if (trimmedRemainder === '') {
    return quotient.toString();
  }
  
  return `${quotient}.${trimmedRemainder}`;
};

export const parseTokenAmount = (amount: string, decimals: number = 18): bigint => {
  const [whole, fraction = ''] = amount.split('.');
  const paddedFraction = fraction.padEnd(decimals, '0').slice(0, decimals);
  return BigInt(whole + paddedFraction);
};

export const getEventStateLabel = (state: EventStateType): string => {
  switch (Number(state)) {
    case EventState.OPEN:
      return "Open";
    case EventState.WINNERS_SELECTED:
      return "Winners Selected";
    case EventState.COMPLETED:
      return "Completed";
    default:
      return "Unknown";
  }
};

// Removed getTimeRemaining function since registration deadline is no longer used

// Additional utility functions leveraging unused contract functions

/**
 * Get events created by a specific organizer
 */
export const getEventsByOrganizer = async (
  factoryContract: any,
  organizerAddress: string
): Promise<string[]> => {
  try {
    return await factoryContract.getEventsByOrganizer(organizerAddress);
  } catch (error) {
    console.error('Error getting events by organizer:', error);
    return [];
  }
};

/**
 * Get contract balance for an event
 */
export const getEventContractBalance = async (
  eventContract: any
): Promise<bigint> => {
  try {
    return await eventContract.getContractBalance();
  } catch (error) {
    console.error('Error getting contract balance:', error);
    return 0n;
  }
};

/**
 * Get comprehensive event info using the getEventInfo function
 * Based on the actual ABI: name, organizer, tokenAddress, prizeAmount, winnerCount, state, participantCount, isFunded
 */
export const getComprehensiveEventInfo = async (
  eventContract: any
): Promise<{
  name: string;
  organizer: string;
  tokenAddress: string;
  prizeAmount: bigint;
  winnerCount: bigint;
  state: number;
  participantCount: bigint;
  isFunded: boolean;
} | null> => {
  try {
    const [
      name,
      organizer,
      tokenAddress,
      prizeAmount,
      winnerCount,
      state,
      participantCount,
      isFunded
    ] = await eventContract.getEventInfo();

    return {
      name,
      organizer,
      tokenAddress,
      prizeAmount,
      winnerCount,
      state: Number(state),
      participantCount,
      isFunded
    };
  } catch (error) {
    console.error('Error getting comprehensive event info:', error);
    return null;
  }
};