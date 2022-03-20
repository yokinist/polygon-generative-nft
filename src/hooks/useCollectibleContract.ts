import { ethers } from 'ethers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import CollectibleABI from '@/artifacts/contracts/Collectible.sol/Collectible.json';
import { PRICE } from '@/constants';
import { getEthereumSafety } from '@/utils';

const CONTRACT_ADDRESS = '0xa97B71dA6fFb26d0D5A2d49C92Cb5FB305eA1Ea5' as const;
const CONTRACT_ABI = CollectibleABI.abi;

type Props = {
  enable: boolean;
};

type ReturnUseWaveContract = {
  mining: boolean;
  minted: boolean;
  lastTokenId: number;
  handleMintNFT: (count: number) => void;
};

export const useCollectibleContract = ({ enable }: Props): ReturnUseWaveContract => {
  const [minted, setMinted] = useState<boolean>(false);
  const [mining, setMining] = useState<boolean>(false);
  const [lastTokenId, setLastTokenId] = useState(0);
  const ethereum = getEthereumSafety();

  const collectibleContract = useMemo(() => {
    if (!ethereum) return null;
    // #TODO: 型直す
    // @ts-ignore: ethereum as ethers.providers.ExternalProvider
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  }, [ethereum]);

  const handleGetLastTokenId = useCallback(async () => {
    if (!collectibleContract) return;
    const id = await collectibleContract.getLastTokenId();
    if (!id) return;
    setLastTokenId(id.toNumber());
  }, [collectibleContract]);

  const handleMintNFT = useCallback(
    async (count: number) => {
      if (!collectibleContract) return;
      if (!enable) {
        toast.error('Please Switch Polygon Test Network');
        return;
      }
      try {
        let nftTxn = await collectibleContract.mintNFTs(count, { value: ethers.utils.parseEther(`${PRICE * count}`) });
        setMining(true);
        await nftTxn.wait();
        console.info(`Mined, see transaction: ${nftTxn.hash}`);
        handleGetLastTokenId();
      } catch (err) {
        console.debug(err);
      } finally {
        setMining(false);
      }
    },
    [collectibleContract, enable, handleGetLastTokenId],
  );

  useEffect(() => {
    if (!enable || !collectibleContract) return;
    handleGetLastTokenId();
  }, [enable, collectibleContract, handleGetLastTokenId]);

  return {
    mining,
    minted,
    lastTokenId,
    handleMintNFT,
  };
};
