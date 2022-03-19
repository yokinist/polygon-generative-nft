import Link from 'next/link';
import { DiscordLogo, ServiceLogo, TwitterLogo, OpenseaLogo } from '../../public/images';
import { OPENSEA_URL } from '@/constants';

type Props = {
  //
};

export const Header: React.VFC<Props> = ({}) => {
  return (
    <div className="bg-color-background-black">
      <div className="border-b border-gray-800 px-32 py-4 flex items-center max-w-6xl mx-auto">
        <Link href="/">
          <a>
            <img src={ServiceLogo} className="h-8" alt="service logo" />
          </a>
        </Link>
        <ul className="ml-auto flex">
          <li className="mr-4">
            <a href="https://discord.com/invite/8UqJXTX7Kd" target="_blank" rel="noreferrer">
              <img src={DiscordLogo} alt="Discord" />
            </a>
          </li>
          <li className="mr-4">
            <a href="https://twitter.com/ScrappyNfts" target="_blank" rel="noreferrer">
              <img src={TwitterLogo} alt="Twitter" />
            </a>
          </li>
          <li className="w-5 h-5">
            <a href={OPENSEA_URL} target="_blank" rel="noreferrer">
              <img src={OpenseaLogo} alt="OpenSea" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
