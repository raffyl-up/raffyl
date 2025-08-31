import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Contract } from 'ethers';
import { GiWheelbarrow } from 'react-icons/gi';
import { FaTrophy } from 'react-icons/fa';
import { GiPartyPopper } from 'react-icons/gi';

import {
  EVENT_ABI,
  ERC20_ABI,
  EventState,
  formatAddress,
  formatTokenAmount,
  getEventStateLabel,
  parseTokenAmount,
} from '../contracts';
import { getTokenByAddress, isNativeToken } from '../lib/constants';
import type { EventStateType } from '../contracts';


interface EventDetailData {
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
  tokenDecimals: number;
  isFunded: boolean;
  winnerCount: bigint;
  contractBalance: bigint;
}

const EventDetail: React.FC = () => {
  const { eventAddress } = useParams<{ eventAddress: string }>();
  const navigate = useNavigate();
  const { provider, signer, account, isConnected } = useWeb3();
  
  const [event, setEvent] = useState<EventDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [fundAmount, setFundAmount] = useState('');

  useEffect(() => {
    if (eventAddress && provider) {
      loadEventData();
    }
  }, [eventAddress, provider, account]);

  const loadEventData = async () => {
    if (!eventAddress || !provider) return;

    setLoading(true);
    setError(null);

    try {
      const eventContract = new Contract(eventAddress, EVENT_ABI, provider);

      
      const [
        name,
        organizer,
        tokenAddress,
        prizeAmount,
        state,
        isFunded,
        winnerCount,
        contractBalance
      ] = await Promise.all([
        eventContract.name(),
        eventContract.organizer(),
        eventContract.prizeToken(),
        eventContract.prizeAmount(),
        eventContract.currentState(),
        eventContract.isFunded(),
        eventContract.winnerCount(),
        eventContract.getContractBalance()
      ]);

      
      const [participants, winners] = await Promise.all([
        eventContract.getParticipants(),
        eventContract.getWinners()
      ]);

      
      let tokenSymbol = 'TOKEN';
      let tokenDecimals = 18;
      
      const tokenConfig = getTokenByAddress(tokenAddress);
      if (tokenConfig) {
        tokenSymbol = tokenConfig.symbol;
        tokenDecimals = tokenConfig.decimals;
      } else {
        try {
          const tokenContract = new Contract(tokenAddress, ERC20_ABI, provider);
          [tokenSymbol, tokenDecimals] = await Promise.all([
            tokenContract.symbol(),
            tokenContract.decimals()
          ]);
        } catch (err) {
          console.warn('Could not fetch token info:', err);
        }
      }

      
      let isUserRegistered = false;
      let isUserWinner = false;
      
      if (account) {
        [isUserRegistered, isUserWinner] = await Promise.all([
          eventContract.isRegistered(account),
          eventContract.isWinner(account)
        ]);
      }

      const eventData: EventDetailData = {
        address: eventAddress,
        name,
        organizer,
        tokenAddress,
        prizeAmount,
        state,
        participantCount: BigInt(participants.length),
        participants,
        winners,
        isUserRegistered,
        isUserWinner,
        tokenSymbol,
        tokenDecimals,
        isFunded,
        winnerCount,
        contractBalance
      };

      setEvent(eventData);
    } catch (err: any) {
      console.error('Error loading event data:', err);
      setError(err.message || 'Failed to load event data');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!signer || !event) return;

    setActionLoading(true);
    setActionError(null);
    setTxHash(null);

    try {
      const eventContract = new Contract(event.address, EVENT_ABI, signer);
      const tx = await eventContract.register();
      setTxHash(tx.hash);

      await tx.wait();
      await loadEventData(); 
    } catch (error: any) {
      console.error('Error registering:', error);
      setActionError(error.message || 'Failed to register');
    } finally {
      setActionLoading(false);
    }
  };

  const handleFundEvent = async () => {
    if (!signer || !event ) return;

    setActionLoading(true);
    setActionError(null);
    setTxHash(null);

    try {
      const eventContract = new Contract(event.address, EVENT_ABI, signer);
      const raffylFundAmount = formatTokenAmount(event?.prizeAmount, event?.tokenDecimals)
      const amountWei = parseTokenAmount(raffylFundAmount, event.tokenDecimals);

      let fundTx;

      if (isNativeToken(event.tokenAddress)) {

        fundTx = await eventContract.fundEvent(amountWei, {
          value: amountWei
        });
      } else {
        
        const tokenContract = new Contract(event.tokenAddress, ERC20_ABI, signer);

        
        const currentAllowance = await tokenContract.allowance(await signer.getAddress(), event.address);

        if (currentAllowance < amountWei) {
          const approveTx = await tokenContract.approve(event.address, amountWei);
          await approveTx.wait();
        }

        
        fundTx = await eventContract.fundEvent(amountWei);
      }

      setTxHash(fundTx.hash);
      await fundTx.wait();
      setFundAmount('');
      await loadEventData(); 
    } catch (error: any) {
      console.error('Error funding event:', error);
      setActionError(error.message || 'Failed to fund event');
    } finally {
      setActionLoading(false);
    }
  };

  const handleSelectWinners = async () => {
    if (!signer || !event) return;

    setActionLoading(true);
    setActionError(null);
    setTxHash(null);

    try {
      const eventContract = new Contract(event.address, EVENT_ABI, signer);
      const tx = await eventContract.selectWinners();
      setTxHash(tx.hash);

      await tx.wait();
      await loadEventData(); 
    } catch (error: any) {
      console.error('Error selecting winners:', error);
      setActionError(error.message || 'Failed to select winners');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDisbursePrizes = async () => {
    if (!signer || !event) return;

    setActionLoading(true);
    setActionError(null);
    setTxHash(null);

    try {
      const eventContract = new Contract(event.address, EVENT_ABI, signer);
      const tx = await eventContract.disbursePrizes();
      setTxHash(tx.hash);

      await tx.wait();
      await loadEventData();
    } catch (error: any) {
      console.error('Error disbursing prizes:', error);
      setActionError(error.message || 'Failed to disburse prizes');
    } finally {
      setActionLoading(false);
    }
  };

  const handleWithdrawBalance = async () => {
    if (!signer || !event) return;

    if (
      !confirm(
        "Are you sure you want to withdraw remaining balance? This will end the event."
      )
    ) {
      return;
    }

    setActionLoading(true);
    setActionError(null);
    setTxHash(null);

    try {
      const eventContract = new Contract(event.address, EVENT_ABI, signer);

      
      if (event.contractBalance === 0n) {
        setActionError("No balance to withdraw");
        return;
      }

      const tx = await eventContract.withdrawBalance();
      setTxHash(tx.hash);
      await tx.wait();
      loadEventData(); 
    } catch (error: any) {
      console.error('Error withdrawing balance:', error);
      setActionError(error.message || 'Failed to withdraw balance');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center">
          <p className="text-red-600 mb-4">{error || 'Event not found'}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const isOrganizer = account?.toLowerCase() === event.organizer.toLowerCase();
  const canRegister = isConnected && !event.isUserRegistered && Number(event.state) === EventState.OPEN && !isOrganizer
  const canFund = isOrganizer && !event.isFunded;
  const canSelectWinners = isOrganizer && Number(event.state) === EventState.OPEN && Number(event.participantCount) >= Number(event.winnerCount);
  const canDisbursePrizes = isOrganizer && Number(event.state) === EventState.WINNERS_SELECTED && event.isFunded;
  const canWithdrawBalance = isOrganizer && Number(event.state) === EventState.COMPLETED && event.isFunded && event.contractBalance > 0n;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 sm:space-y-8">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button
          onClick={() => navigate('/app')}
          className="text-white/80 hover:text-white text-sm font-medium transition-colors flex items-center gap-2"
        >
          ← Back to Events
        </button>
        <div className="text-right">
          <p className="text-white/80 text-sm">Event Contract</p>
          <div className="flex items-center gap-2">
            <p className="text-white font-mono text-sm">{formatAddress(event.address)}</p>
            <button
              onClick={() => navigator.clipboard.writeText(event.address)}
              className="text-white/60 hover:text-white text-xs p-1 rounded"
              title="Copy address"
            >
              
            </button>
          </div>
        </div>
      </div>

      {/* hero card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 flex items-center gap-3">
                <GiWheelbarrow className="text-yellow-400" />
                {event.name}
              </h1>
              <p className="text-white/90 text-sm sm:text-base">
                Organized by {formatAddress(event.organizer)}
              </p>
            </div>
            <div className="text-right">
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                Number(event.state) === EventState.OPEN ? 'bg-green-500 text-white' :
                Number(event.state) === EventState.WINNERS_SELECTED ? 'bg-blue-500 text-white' :
                Number(event.state)=== EventState.COMPLETED ? 'bg-gray-500 text-white' :
                'bg-gray-500 text-white'
              }`}>
                {getEventStateLabel(event.state)}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center border border-blue-200">
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">{event.participantCount.toString()}</p>
              <p className="text-sm text-blue-700 font-medium">Participants</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center border border-green-200">
              <p className="text-2xl sm:text-3xl font-bold text-green-600">{event.winners.length}</p>
              <p className="text-sm text-green-700 font-medium">Winners</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 text-center border border-purple-200">
              <p className="text-lg sm:text-xl font-bold text-purple-600">
                {formatTokenAmount(event.prizeAmount, event.tokenDecimals)}
              </p>
              <p className="text-sm text-purple-700 font-medium">Prize Pool ({event.tokenSymbol})</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 text-center border border-orange-200">
              <p className="text-lg sm:text-xl font-bold text-orange-600">
                {formatTokenAmount(event.contractBalance, event.tokenDecimals)}
              </p>
              <p className="text-sm text-orange-700 font-medium">Contract Balance</p>
            </div>
          </div>

          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
             Event Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Prize Token:</span>
                  <span className="text-gray-900 font-semibold">{event.tokenSymbol}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Total Winners:</span>
                  <span className="text-gray-900 font-semibold">{event.winnerCount.toString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Prize per Winner:</span>
                  <span className="text-gray-900 font-semibold">
                    {formatTokenAmount(event.prizeAmount / event.winnerCount, event.tokenDecimals)} {event.tokenSymbol}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Funding Status:</span>
                  <span className={`font-semibold ${event.isFunded ? 'text-green-600' : 'text-red-600'}`}>
                    {event.isFunded ? "Funded" : "Not Funded"}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Contract Details
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-600 font-medium block mb-1">Event Contract:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900 font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                      {event.address}
                    </span>
                    <button
                      onClick={() => navigator.clipboard.writeText(event.address)}
                      className="text-gray-500 hover:text-gray-700 text-xs p-1"
                      title="Copy address"
                    >
                    
                    </button>
                  </div>
                </div>
                <div>
                  <span className="text-gray-600 font-medium block mb-1">Token Contract:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900 font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                      {isNativeToken(event.tokenAddress) ? "Native ETH" : formatAddress(event.tokenAddress)}
                    </span>
                    {!isNativeToken(event.tokenAddress) && (
                      <button
                        onClick={() => navigator.clipboard.writeText(event.tokenAddress)}
                        className="text-gray-500 hover:text-gray-700 text-xs p-1"
                        title="Copy address"
                      >
                        
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      {isConnected && (
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Actions</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {canRegister && (
              <button
                onClick={handleRegister}
                disabled={actionLoading}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-3 rounded-lg font-medium transition-colors"
              >
                {actionLoading ? 'Registering...' : 'Register'}
              </button>
            )}

            {canFund && (
              <div className="space-y-2">
                <input
                  type="number"
                  value={fundAmount}
                  onChange={(e) => setFundAmount(e.target.value)}
                  placeholder="Amount to fund"
                  className="w-full hidden px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={handleFundEvent}
                  disabled={actionLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {actionLoading ? 'Funding...' : 'Fund Event'}
                </button>
              </div>
            )}

            {canSelectWinners && (
              <button
                onClick={handleSelectWinners}
                disabled={actionLoading}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-4 py-3 rounded-lg font-medium transition-colors"
              >
                {actionLoading ? 'Selecting...' : 'Select Winners'}
              </button>
            )}

            {canDisbursePrizes && (
              <button
                onClick={handleDisbursePrizes}
                disabled={actionLoading}
                className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white px-4 py-3 rounded-lg font-medium transition-colors"
              >
                {actionLoading ? 'Disbursing...' : 'Disburse Prizes'}
              </button>
            )}

            {canWithdrawBalance && (
              <button
                onClick={handleWithdrawBalance}
                disabled={actionLoading}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-3 rounded-lg font-medium transition-colors"
              >
                {actionLoading ? 'Withdrawing...' : 'Withdraw Balance'}
              </button>
            )}
          </div>

          {actionError && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
              <span className="text-red-800 text-sm"> {actionError}</span>
            </div>
          )}

          {txHash && (
            <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 text-sm">
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
        </div>
      )}

      {/* Participants section */}
      {event.participants.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Participants ({event.participants.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {event.participants.map((participant, index) => (
              <div
                key={participant}
                className={`p-3 rounded-lg border ${
                  participant.toLowerCase() === account?.toLowerCase()
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm">{formatAddress(participant)}</span>
                  <span className="text-xs text-gray-500">#{index + 1}</span>
                </div>
                {participant.toLowerCase() === account?.toLowerCase() && (
                  <span className="text-xs text-blue-600 font-medium">You</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* winners selection section */}
      {event.winners.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FaTrophy className="text-yellow-500" />
            Winners ({event.winners.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {event.winners.map((winner) => (
              <div
                key={winner}
                className={`p-4 rounded-lg border-2 ${
                  winner.toLowerCase() === account?.toLowerCase()
                    ? 'bg-yellow-50 border-yellow-300'
                    : 'bg-green-50 border-green-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm">{formatAddress(winner)}</span>
                  <FaTrophy className="text-lg text-yellow-500" />
                </div>
                <div className="text-sm text-gray-600">
                  Prize: {formatTokenAmount(event.prizeAmount / event.winnerCount, event.tokenDecimals)} {event.tokenSymbol}
                </div>
                {winner.toLowerCase() === account?.toLowerCase() && (
                  <div className="mt-2">
                    <span className="text-sm text-yellow-600 font-medium flex items-center gap-1">
                      <GiPartyPopper className="text-yellow-500" />
                      Congratulations!
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* select qrcode here */}
      
    </div>
  );
};

export default EventDetail;