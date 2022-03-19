import { ethers } from 'ethers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import CollectibleABI from '@/artifacts/contracts/Collectible.sol/Collectible.json';
import { getEthereumSafety } from '@/utils';

const CONTRACT_ADDRESS = '0x9bEf0F5e44B35A08a98A239AF65De1674B05C6B2';
const CONTRACT_ABI = CollectibleABI.abi;
const PRICE = '0.01';

type Props = {
  enable: boolean;
};

type ReturnUseWaveContract = {
  mining: boolean;
  handleMintNFT: () => void;
};

export const useCollectibleContract = ({ enable }: Props): ReturnUseWaveContract => {
  const [mining, setMining] = useState<boolean>(false);
  const ethereum = getEthereumSafety();

  const collectibleContract = useMemo(() => {
    if (!ethereum) return null;
    // #TODO: 型直す
    // @ts-ignore: ethereum as ethers.providers.ExternalProvider
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  }, [ethereum]);

  const handleMintNFT = useCallback(async () => {
    if (!collectibleContract) return;
    try {
      let nftTxn = await collectibleContract.mintNFTs(1, { value: ethers.utils.parseEther(PRICE) });
      setMining(true);
      console.info('Mining... please wait');
      await nftTxn.wait();
      console.info(`Mined, see transaction: ${nftTxn.hash}`);
    } catch (err) {
      console.debug(err);
    } finally {
      setMining(false);
    }
  }, [collectibleContract]);

  useEffect(() => {
    if (!enable) return;
    console.debug('ready');
  }, [enable]);

  return {
    mining,
    handleMintNFT,
  };
};
