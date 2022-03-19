import { useState } from 'react';
import toast from 'react-hot-toast';
import { PER_MAX_SUPPLY, PRICE } from '@/constants';
import { useWallet, useCollectibleContract } from '@/hooks';
import { Button, Layout } from '@/shared';

type Props = {
  //
};

const Page: React.VFC<Props> = ({}) => {
  const { currentAccount, isMumbaiTestnet, connectWallet } = useWallet();

  const { mining, handleMintNFT } = useCollectibleContract({ enable: isMumbaiTestnet });

  const [count, setCount] = useState<number>(1);

  const handleAddCount = () => {
    if (PER_MAX_SUPPLY === count) {
      toast.error('それ以上、追加できません');
    } else {
      setCount((prevCount) => prevCount + 1);
    }
  };

  const handleMinusCount = () => {
    if (count === 0) return;
    setCount((prevCount) => prevCount - 1);
  };

  return (
    <>
      {!isMumbaiTestnet && (
        <div className="w-full bg-color-sub-blue-default px-6 py-3 text-center">
          <p className="text-color-object-white">Please Switch Polygon Test Network</p>
        </div>
      )}
      <div className="bg-color-background-black min-h-screen">
        <Layout>
          <div className="flex items-center justify-center">
            <div className="w-1/3">
              <h1 className="text-color-sub-yellow-default">Scrappy Squirrels</h1>
              <p className="text-color-object-white mt-2 mb-6">
                Scrappy Squirrels is a collection of 10,000+ randomly generated NFTs. Scrappy Squirrels are meant for
                buyers, creators, and developers who are completely new to the NFT ecosystem. The community is built
                around education, collaboration, and opportunity. Learn about web3, explore its current use cases,
                discover new applications, and find members to collaborate on exciting projects with.
              </p>
              <a
                href="https://docs.google.com/document/d/1kMCLilkfgVOyzw9ldIYGe495vrPRw11VbeUSzP3fY-s/edit"
                target="_blank"
                rel="noreferrer"
              >
                <Button theme="secondary">→ Read the Vision Docs</Button>
              </a>
            </div>
            <div className="w-2/3 ml-8">
              <div className="flex items-center justify-between border border-color-border-default rounded-lg p-4 mb-6 mt-6">
                <img
                  src="https://lh3.googleusercontent.com/ztaMiyBNk3PVVRXhL5GDQWM4m5bep2XEUpn0HUV6dCukF-Rq1bU1G7SZFuHRMDWuWufPAYdWR4k7A1JnPB8v4Ze8ZuPHbkACi_oB=s130"
                  alt="Scrappy Squirrels"
                  className="rounded-lg"
                />
                <div className="ml-6">
                  <p className="text-color-object-white">Price Per NFT</p>
                  <h3 className="text-color-object-white">0.03 ETH Each</h3>
                </div>
              </div>
              <div className="flex items-center justify-between border border-color-border-default rounded-lg p-4 text-color-object-white mb-6">
                <div>
                  <p className="text-color-object-light text-large font-bold">10 Max</p>
                </div>
                <div className="flex">
                  <button className="px-4" onClick={handleMinusCount}>
                    <span>-</span>
                  </button>
                  <h3>{count}</h3>
                  <button className="px-4" onClick={handleAddCount}>
                    <span>+</span>
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between border-b border-color-border-default p-4 text-color-object-white mb-6">
                <div>
                  <p className="text-color-object-light text-large font-bold">Total</p>
                </div>
                <div>
                  <h3>{count * PRICE} ETH</h3>
                </div>
              </div>
              <div className="flex">
                <div className="ml-auto">
                  {currentAccount ? (
                    <Button theme="primary" onClick={handleMintNFT} disabled={mining} inProgress={mining}>
                      Mint 🔥
                    </Button>
                  ) : (
                    <Button theme="primary" onClick={connectWallet} disabled={mining}>
                      Connect Wallet 👛
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </div>
    </>
  );
};

export default Page;
