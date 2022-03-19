import { ethers } from 'ethers';
import { useCallback, useMemo, useState } from 'react';
import CollectibleABI from '@/artifacts/contracts/Collectible.sol/Collectible.json';
import { PRICE } from '@/constants';
import { getEthereumSafety } from '@/utils';

const CONTRACT_ADDRESS = '0xBe47A9Cc00D01757e108bAF306b70ED8C62D4752';
const CONTRACT_ABI = CollectibleABI.abi;

type Props = {
  enable: boolean;
};

type ReturnUseWaveContract = {
  mining: boolean;
  handleMintNFT: (count: number) => void;
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

  const handleMintNFT = useCallback(
    async (count: number) => {
      if (!collectibleContract) return;
      try {
        let nftTxn = await collectibleContract.mintNFTs(count, { value: ethers.utils.parseEther(`${PRICE * count}`) });
        setMining(true);
        console.info('Mining... please wait');
        await nftTxn.wait();
        console.info(`Mined, see transaction: ${nftTxn.hash}`);
      } catch (err) {
        console.debug(err);
      } finally {
        setMining(false);
      }
    },
    [collectibleContract],
  );

  return {
    mining,
    handleMintNFT,
  };
};
