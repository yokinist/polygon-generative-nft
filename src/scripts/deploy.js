async function main() {
  // あなたのコレクションの Base Token URI を記入してください。
  const baseTokenURI = 'ipfs://QmQucGymPwB47xrzYpoUY1Y2JXzzSnQdvwkBHJdogs6HF2/';

  // オーナー/デプロイヤーのウォレットアドレスを取得する
  const [owner] = await hre.ethers.getSigners();

  // デプロイしたいコントラクトを取得
  const contractFactory = await hre.ethers.getContractFactory('Collectible');

  // 正しいコンストラクタ引数（baseTokenURI）でコントラクトをデプロイ
  const contract = await contractFactory.deploy(baseTokenURI);

  // このトランザクションがマイナーに承認（mine）されるのを待つ
  await contract.deployed();

  // コントラクトアドレスをターミナルに出力
  console.info('Contract deployed to:', contract.address);

  // コントラクト所有者の保有するtokenIdsを取得
  let tokens = await contract.tokensOfOwner(owner.address);
  console.info('Owner has tokens: ', tokens);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
