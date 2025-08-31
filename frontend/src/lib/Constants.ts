// Contract addresses - update these with your deployed contract addresses
const FACTORY_CA = "0x82a88dECbAeE6953d5349513466D084fb4E35031"; 


export const NETWORK_CONFIG = {
  chainId: 4202,
  name: "Lisk Sepolia",
  rpcUrl: "https://rpc.sepolia-api.lisk.com",
  blockExplorer: "https://sepolia-blockscout.lisk.com"
} as const;


export const EventState = {
  REGISTRATION_OPEN: 0,
  REGISTRATION_CLOSED: 1,
  WINNERS_SELECTED: 2,
  COMPLETED: 3
} as const;

export type EventStateType = typeof EventState[keyof typeof EventState];


export interface TokenConfig {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  icon?: string;
}

export const SUPPORTED_TOKENS: TokenConfig[] = [
  {
    symbol: "ETH",
    name: "Ethereum",
    address: "0x0000000000000000000000000000000000000000", // Native ETH (zero address for native token)
    decimals: 18,
    icon: "⟠"
  },
  {
    symbol: "LSK",
    name: "Lisk Token",
    address: "0x8a21CF9Ba08Ae709D64Cb25AfAA951183EC9FF6D", // LSK token placeholder
    decimals: 18,
    icon: "🔗"
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    address: "0x72db95F0716cF79C0efe160F23fB17bF1c161317", // USDC placeholder
    decimals: 6,
    icon: "💵"
  },
  {
    symbol: "USDT",
    name: "Tether USD",
    address: "0x2728DD8B45B788e26d12B13Db5A244e5403e7eda", // USDT placeholder
    decimals: 6,
    icon: "💰"
  },
  {
    symbol: "DAI",
    name: "Dai Stablecoin",
    address: "0x0DB2a8Aa2E2C023Cfb61c617d40162cc9F4c27aB", // DAI placeholder
    decimals: 18,
    icon: "🏛️"
  },
  
];
export const getTokenByAddress = (address: string): TokenConfig | undefined => {
  return SUPPORTED_TOKENS.find(token => token.address.toLowerCase() === address.toLowerCase());
};

export const getTokenBySymbol = (symbol: string): TokenConfig | undefined => {
  return SUPPORTED_TOKENS.find(token => token.symbol.toLowerCase() === symbol.toLowerCase());
};


export const isNativeToken = (address: string): boolean => {
  return address === "0x0000000000000000000000000000000000000000";
};


export const getTokenDisplayName = (token: TokenConfig): string => {
  return `${token.icon} ${token.name} (${token.symbol})`;
};


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


export { FACTORY_CA };
