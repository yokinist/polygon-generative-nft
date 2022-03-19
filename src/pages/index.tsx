import { useWallet, useCollectibleContract } from '@/hooks';
import { Button, Layout } from '@/shared';

type Props = {
  //
};

const Page: React.VFC<Props> = ({}) => {
  const { currentAccount, isMumbaiTestnet, connectWallet } = useWallet();

  const { mining, handleMintNFT } = useCollectibleContract({ enable: isMumbaiTestnet });

  const renderSomethingBeforeConnectWallet = () => {
    return (
      <Button theme="primary" onClick={connectWallet}>
        Connect Wallet
      </Button>
    );
  };

  const renderSomethingAfterConnectWallet = () => {
    return (
      <div className="flex items-center">
        {!isMumbaiTestnet ? (
          <p>Please Switch Polygon Test Network</p>
        ) : (
          <>
            <div className="mr-4">
              <div className="mb-4">
                <h2>Scrappy Squirrels Tutorial</h2>
              </div>
              <Button theme="primary" onClick={handleMintNFT} disabled={mining}>
                {mining ? 'mining...' : 'Mint 👋'}
              </Button>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <Layout>{currentAccount ? renderSomethingAfterConnectWallet() : renderSomethingBeforeConnectWallet()}</Layout>
    </>
  );
};

export default Page;
