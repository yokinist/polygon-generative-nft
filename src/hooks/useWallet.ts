import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MUMBAI_TESTNET_CHAIN_ID } from '@/constants';
import { getEthereumSafety } from '@/utils';

type ReturnUseWallet = {
  isMumbaiTestnet: boolean;
  currentAccount: string | undefined;
  connectWallet: () => void;
  checkIfWalletIsConnected: () => void;
};

export const useWallet = (): ReturnUseWallet => {
  const [currentAccount, setCurrentAccount] = useState<string>();
  const [currentChainId, setCurrentChainId] = useState<string>();
  const [isMumbaiTestnet, setIsMumbaiTestnet] = useState<boolean>(false);
  const ethereum = getEthereumSafety();

  const handleSetAccount = useCallback((accounts: unknown) => {
    if (!Array.isArray(accounts)) return;
    if (!accounts || accounts.length !== 0) {
      const account = accounts[0];
      setCurrentAccount(account);
    }
  }, []);

  const checkIfWalletIsConnected = useCallback(async () => {
    if (!ethereum) return;
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    const chainId = await ethereum.request({ method: 'eth_chainId' });
    if (typeof chainId === 'string') {
      setCurrentChainId(chainId);
    }
    handleSetAccount(accounts);
  }, [ethereum, handleSetAccount]);

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        toast('Get MetaMask!', { icon: '🦊' });
        return;
      }
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      handleSetAccount(accounts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChainChanged = (chainId: unknown) => {
    if (typeof chainId === 'string') {
      setCurrentChainId(chainId);
    }
  };

  useEffect(() => {
    if (!currentChainId) return;
    const currentIsMumbaiTestnet = currentChainId === MUMBAI_TESTNET_CHAIN_ID;
    setIsMumbaiTestnet(currentIsMumbaiTestnet);
  }, [currentChainId]);

  useEffect(() => {
    if (!ethereum) return;
    checkIfWalletIsConnected();
    ethereum.on('chainChanged', handleChainChanged);
    return () => {
      if (ethereum?.off) {
        ethereum.off('chainChanged', handleChainChanged);
      }
    };
  }, [checkIfWalletIsConnected, ethereum]);

  return {
    isMumbaiTestnet,
    currentAccount,
    connectWallet,
    checkIfWalletIsConnected,
  };
};
