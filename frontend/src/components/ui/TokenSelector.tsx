import React from 'react';
import { FaLightbulb, FaCheck } from 'react-icons/fa';
import { FiAlertTriangle } from 'react-icons/fi';
import { SUPPORTED_TOKENS, getTokenDisplayName, getTokenBySymbol, isNativeToken, type TokenConfig } from '../../lib/constants';

interface TokenSelectorProps {
  value: string;
  onChange: (tokenSymbol: string) => void;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  showInfo?: boolean;
}

const TokenSelector: React.FC<TokenSelectorProps> = ({
  value,
  onChange,
  label = "Prize Token",
  required = false,
  disabled = false,  
}) => {
  const selectedToken = value ? getTokenBySymbol(value) : null;

  return (
    <div className="space-y-2">
      <label className="block text-sm sm:text-base font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          disabled={disabled}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base appearance-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <option value="">🔽 Select a token for prizes</option>
          {SUPPORTED_TOKENS.map((token) => (
              <option key={token.symbol} value={token.symbol}>
                {getTokenDisplayName(token)}
              </option>
            ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {false && (
        <div className="text-xs sm:text-sm text-gray-500 space-y-1">
          <p className="flex items-center gap-2">
            <FaLightbulb className="text-yellow-500" />
            Choose the token for prize distribution
          </p>
          {selectedToken && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
              <p className="text-blue-700 font-medium">
                Selected: {getTokenDisplayName(selectedToken as TokenConfig)}
              </p>
              <p className="text-blue-600 text-xs">
                {isNativeToken((selectedToken as TokenConfig).address)
                  ? (
                    <span className="flex items-center gap-1">
                      <FaCheck className="text-green-500" />
                      Native token - no approval needed
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <FiAlertTriangle className="text-yellow-500" />
                      ERC20 token - approval required for funding
                    </span>
                  )}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TokenSelector;