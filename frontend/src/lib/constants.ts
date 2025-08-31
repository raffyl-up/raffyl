import React from 'react';
import {
  SiEthereum
} from 'react-icons/si';
import {
  FaDollarSign,
  FaUniversity,
  FaCoins
} from 'react-icons/fa';
import { TbDiamond } from "react-icons/tb";

// Contract addresses - update these with your deployed contract addresses
const FACTORY_CA = "0x82a88dECbAeE6953d5349513466D084fb4E35031"; // Deployed EventFactory

// Network configuration for Lisk Sepolia
export const NETWORK_CONFIG = {
  chainId: 4202,
  name: "Lisk Sepolia",
  rpcUrl: "https://rpc.sepolia-api.lisk.com",
  blockExplorer: "https://sepolia-blockscout.lisk.com"
} as const;

// Event states enum to match contract interface (IEvent.sol)
export const EventState = {
  OPEN: 0,
  WINNERS_SELECTED: 1,
  COMPLETED: 2
} as const;

export type EventStateType = typeof EventState[keyof typeof EventState];

// Token configuration for supported tokens
export interface TokenConfig {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  icon?: React.ReactNode;
}

export const SUPPORTED_TOKENS: TokenConfig[] = [
  {
    symbol: "ETH",
    name: "Ethereum",
    address: "0x0000000000000000000000000000000000000000", // Native ETH (zero address for native token)
    decimals: 18,
    icon: React.createElement(SiEthereum, { className: "text-blue-500" })
  },
  {
    symbol: "LSK",
    name: "Lisk Token",
    address: "0x8a21CF9Ba08Ae709D64Cb25AfAA951183EC9FF6D", // LSK token placeholder
    decimals: 18,
    icon: React.createElement(TbDiamond, { className: "text-blue-600" })
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    address: "0x72db95F0716cF79C0efe160F23fB17bF1c161317", // USDC placeholder
    decimals: 6,
    icon: React.createElement(FaDollarSign, { className: "text-green-500" })
  },
  {
    symbol: "USDT",
    name: "Tether USD",
    address: "0x2728DD8B45B788e26d12B13Db5A244e5403e7eda", // USDT placeholder
    decimals: 6,
    icon: React.createElement(FaCoins, { className: "text-green-600" })
  },
  {
    symbol: "DAI",
    name: "Dai Stablecoin",
    address: "0x0DB2a8Aa2E2C023Cfb61c617d40162cc9F4c27aB", // DAI placeholder
    decimals: 18,
    icon: React.createElement(FaUniversity, { className: "text-yellow-500" })
  },
  // {
  //   symbol: "BUSD",
  //   name: "Binance USD",
  //   address: "0x0000000000000000000000000000000000000005", // BUSD placeholder
  //   decimals: 18,
  //   icon: React.createElement(FaCoins, { className: "text-yellow-400" })
  // }
];

// Helper function to get token by address
export const getTokenByAddress = (address: string): TokenConfig | undefined => {
  return SUPPORTED_TOKENS.find(token => token.address.toLowerCase() === address.toLowerCase());
};

// Helper function to get token by symbol
export const getTokenBySymbol = (symbol: string): TokenConfig | undefined => {
  return SUPPORTED_TOKENS.find(token => token.symbol.toLowerCase() === symbol.toLowerCase());
};

// Helper function to check if token is native ETH
export const isNativeToken = (address: string): boolean => {
  return address === "0x0000000000000000000000000000000000000000";
};

// Helper function to get token display name (without icon for string contexts)
export const getTokenDisplayName = (token: TokenConfig): string => {
  return `${token.name} (${token.symbol})`;
};

// Helper function to get token display name with icon for React contexts
export const getTokenDisplayNameWithIcon = (token: TokenConfig): React.ReactNode => {
  return React.createElement(
    'span',
    { className: 'flex items-center gap-2' },
    token.icon,
    React.createElement('span', null, `${token.name} (${token.symbol})`)
  );
};

// Helper function to format token amount with proper decimals
export const formatTokenAmountWithSymbol = (amount: bigint, token: TokenConfig): string => {
  const divisor = BigInt(10 ** token.decimals);
  const quotient = amount / divisor;
  const remainder = amount % divisor;

  if (remainder === 0n) {
    return `${quotient} ${token.symbol}`;
  }

  const remainderStr = remainder.toString().padStart(token.decimals, '0');
  const trimmedRemainder = remainderStr.replace(/0+$/, '');

  if (trimmedRemainder === '') {
    return `${quotient} ${token.symbol}`;
  }

  return `${quotient}.${trimmedRemainder} ${token.symbol}`;
};

// Export the factory contract address
export { FACTORY_CA };