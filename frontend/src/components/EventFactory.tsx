import React, { useState } from 'react';
import { Contract } from 'ethers';
import { GiWheelbarrow } from 'react-icons/gi';
import { CONTRACT_ADDRESSES, EVENT_FACTORY_ABI, parseTokenAmount, isContractDeployed } from '../contracts.ts';
import { SUPPORTED_TOKENS } from '../lib/constants';
import { toastService } from '../services/toast';
import TokenSelector from './ui/TokenSelector';
import Button from './ui/Button';
import Card from './ui/Card';
import { useWeb3 } from '../Web3Context';

const EventFactory: React.FC = () => {
  const { signer, isConnected } = useWeb3();
  const [formData, setFormData] = useState({
    name: '',
    selectedToken: '',
    prizeAmount: '',
    winnerCount: '3'
  });
  const [isCreating, setIsCreating] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!signer || !isConnected) {
      setError('Please connect your wallet first');
      return;
    }

    if (!isContractDeployed(CONTRACT_ADDRESSES.EVENT_FACTORY)) {
      setError('Contract not deployed yet. Please deploy contracts first.');
      return;
    }

    setIsCreating(true);
    setError(null);
    setTxHash(null);

    try {
      // Validate inputs
      if (!formData.name.trim()) {
        throw new Error('Event name is required');
      }

      if (!formData.selectedToken) {
        throw new Error('Please select a token');
      }

      if (!formData.prizeAmount || parseFloat(formData.prizeAmount) <= 0) {
        throw new Error('Prize amount must be greater than 0');
      }

      if (!formData.winnerCount || parseInt(formData.winnerCount) <= 0) {
        throw new Error('Winner count must be greater than 0');
      }

      // Get selected token details
      const selectedToken = SUPPORTED_TOKENS.find(token => token.symbol === formData.selectedToken);
      if (!selectedToken) {
        throw new Error('Invalid token selected');
      }

      // Create contract instance
      const eventFactory = new Contract(
        CONTRACT_ADDRESSES.EVENT_FACTORY,
        EVENT_FACTORY_ABI,
        signer
      );

      // Convert inputs
      const prizeAmountWei = parseTokenAmount(formData.prizeAmount, selectedToken.decimals);
      const winnerCount = parseInt(formData.winnerCount);

      // Create event using the new ABI structure
      const tx = await eventFactory.createEvent(
        formData.name.trim(),
        selectedToken.address,
        prizeAmountWei,
        winnerCount
      );

      setTxHash(tx.hash);

      // Wait for confirmation
      const receipt = await tx.wait();

      if (receipt.status === 1) {
        // Reset form
        setFormData({
          name: '',
          selectedToken: '',
          prizeAmount: '',
          winnerCount: '3'
        });

        toastService.success('Event created successfully!');
      } else {
        throw new Error('Transaction failed');
      }

    } catch (error: any) {
      console.error('Error creating event:', error);
      setError(error.message || 'Failed to create event');
    } finally {
      setIsCreating(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Create New Raffyl
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Please connect your wallet to create events.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 sm:space-y-8">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          Create New Raffyl
        </h2>
      </div>

      {!isContractDeployed(CONTRACT_ADDRESSES.EVENT_FACTORY) && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 text-sm sm:text-base text-center">
            ⚠️ Contracts not deployed yet. Please deploy contracts first.
          </p>
        </div>
      )}

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm sm:text-base font-medium text-gray-700">
            Event Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter event name"
            required
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
          />
        </div>

        <TokenSelector
          value={formData.selectedToken}
          onChange={(tokenSymbol : any) => setFormData(prev => ({ ...prev, selectedToken: tokenSymbol }))}
          required
        />

        <div className="space-y-2">
          <label htmlFor="prizeAmount" className="block text-sm sm:text-base font-medium text-gray-700">
            Total Prize Amount
          </label>
          <input
            type="number"
            id="prizeAmount"
            name="prizeAmount"
            value={formData.prizeAmount}
            onChange={handleInputChange}
            placeholder="100"
            step="0.000000000000000001"
            min="0"
            required
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
          />
          <p className="text-xs sm:text-sm text-gray-500">Total amount to be distributed among winners</p>
        </div>

        <div className="space-y-2">
          <label htmlFor="winnerCount" className="block text-sm sm:text-base font-medium text-gray-700">
            Number of Winners
          </label>
          <input
            type="number"
            id="winnerCount"
            name="winnerCount"
            value={formData.winnerCount}
            onChange={handleInputChange}
            placeholder="3"
            min="1"
            max="100"
            required
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
          />
          <p className="text-xs sm:text-sm text-gray-500">How many winners will be selected (1-100)</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <span className="text-red-800 text-sm sm:text-base">❌ {error}</span>
          </div>
        )}

        {txHash && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 text-sm sm:text-base">
              Transaction Hash:
              <a
                href={`https://sepolia-blockscout.lisk.com/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-blue-600 hover:text-blue-800 underline font-mono"
              >
                {txHash.slice(0, 10)}...{txHash.slice(-8)}
              </a>
            </p>
          </div>
        )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isCreating}
            disabled={!isContractDeployed(CONTRACT_ADDRESSES.EVENT_FACTORY)}
            icon={<GiWheelbarrow className="text-lg" />}
          >
            {isCreating ? 'Creating Event...' : 'Create Event'}
          </Button>
        </form>
      </Card>

      <div className="bg-blue-50 rounded-xl p-6 sm:p-8">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
          How it works:
        </h3>
        <ol className="space-y-2 text-sm sm:text-base text-gray-700">
          <li className="flex items-start">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">1</span>
            Create an event with prize details
          </li>
          <li className="flex items-start">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">2</span>
            Fund the event with tokens
          </li>
          <li className="flex items-start">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">3</span>
            Users register for the event
          </li>
          <li className="flex items-start">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">4</span>
            Select random winners (customizable count)
          </li>
          <li className="flex items-start">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">5</span>
            Prizes are automatically distributed
          </li>
        </ol>
      </div>
    </div>
  );
};

export default EventFactory;
