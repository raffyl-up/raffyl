import React from 'react';
import { FiCheck, FiAlertTriangle, FiX } from 'react-icons/fi';
import { FaWallet } from 'react-icons/fa';
import { useWeb3 } from '../Web3Context';
import { formatAddress, NETWORK_CONFIG } from '../contracts';

const WalletConnection: React.FC = () => {
  const { 
    account, 
    chainId, 
    isConnected, 
    isConnecting, 
    error, 
    connectWallet, 
    disconnectWallet,
    switchNetwork 
  } = useWeb3();

  const isCorrectNetwork = chainId === NETWORK_CONFIG.chainId;

  if (isConnected && account) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 sm:p-4 h-fit">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-col items-center sm:items-start">
            <span className="text-white font-mono text-xs sm:text-sm font-medium">
              {formatAddress(account)}
            </span>
            <div className="mt-1">
              {isCorrectNetwork ? (
                <span className="text-green-300 text-xs sm:text-sm flex items-center gap-1">
                  <FiCheck className="text-green-400" />
                  {NETWORK_CONFIG.name}
                </span>
              ) : (
                <div className="flex flex-col items-center sm:items-start gap-2">
                  <span className="text-yellow-300 text-xs sm:text-sm flex items-center gap-1">
                    <FiAlertTriangle className="text-yellow-400" />
                    Wrong Network
                  </span>
                  <button
                    onClick={switchNetwork}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-2 py-1 rounded text-xs font-medium transition-colors"
                  >
                    Switch to {NETWORK_CONFIG.name}
                  </button>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={disconnectWallet}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-xs sm:text-sm font-medium transition-colors"
          >
            Disconnect
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 px-3 py-2 rounded-lg text-sm text-center w-full">
          <span className="flex items-center justify-center gap-2">
            <FiX className="text-red-600" />
            {error}
          </span>
        </div>
      )}

      <button
        onClick={connectWallet}
        disabled={isConnecting}
        className={`w-full px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 ${
          isConnecting
            ? 'bg-gray-400 cursor-not-allowed text-white'
            : 'bg-white hover:bg-gray-50 text-gray-900 shadow-md hover:shadow-lg'
        }`}
      >
        {isConnecting ? 'Connecting...' : (
          <span className="flex items-center gap-2">
            <FaWallet />
            Connect Wallet
          </span>
        )}
      </button>

      {!window.ethereum && (
        <div className="text-center mt-4">
          <p className="text-white text-sm mb-2">MetaMask not detected.</p>
          <a
            href="https://metamask.io/download/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Install MetaMask
          </a>
        </div>
      )}
    </div>
  );
};

export default WalletConnection;