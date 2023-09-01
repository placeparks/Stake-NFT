import {
  ConnectWallet,
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useContractRead,
  useOwnedNFTs,
  useTokenBalance,
  Web3Button
} from "@thirdweb-dev/react"
import { ethers } from "ethers"
import { useEffect, useState } from "react"
import NFTCard from "../components/NFTCard"
import {
  editionDropContractAddress,
  stakingContractAddress,
  tokenContractAddress
} from "../consts/contractAddresses"
import styles from "../styles/Home.module.css"

const Stake = () => {
  const address = useAddress()
  const { contract: nftDropContract } = useContract(
    editionDropContractAddress,
    "edition-drop"
  )
  const { contract: tokenContract } = useContract(tokenContractAddress, "token")
  const { contract, isLoading } = useContract(stakingContractAddress)
  const { data: ownedNfts } = useOwnedNFTs(nftDropContract, address)
  const { data: tokenBalance } = useTokenBalance(tokenContract, address)
  const [claimableRewards, setClaimableRewards] = useState()
  const { data: stakedTokens } = useContractRead(
    contract,
    "getStakeInfo",
    [address]  // Make sure you pass the arguments in an array if that's the expected format.
  );
  

  useEffect(() => {
    if (!contract || !address) return

    async function loadClaimableRewards() {
      const stakeInfo = await contract?.call("getStakeInfoForToken", [0, address]);

      setClaimableRewards(stakeInfo[1])
    }

    loadClaimableRewards()
  }, [address, contract])
  
  

  async function stakeNft(id) {
    if (!address) return;

    const isApproved = await nftDropContract?.isApproved(
      address,
      stakingContractAddress
    );
    if (!isApproved) {
      await nftDropContract?.setApprovalForAll(stakingContractAddress, true);
    }
    await contract?.call("stake", [id, "1"]);
  }

  if (isLoading) {
    return <div className={styles.container}>Loading...</div>
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Stake Your NFTs</h1>
      <hr className={`${styles.divider} ${styles.spacerTop}`} />

      {!address ? (
        <ConnectWallet />
      ) : (
        <>
          <h2>Your Tokens</h2>
          <div className={styles.tokenGrid}>
            <div className={styles.tokenItem}>
              <h3 className={styles.tokenLabel}>Claimable Rewards</h3>
     
              <p className={styles.tokenValue}>
                <b>
                  {!claimableRewards
                    ? "No rewards"
                    : ethers.utils.formatUnits(claimableRewards, 18)}
                </b>{" "}
                {tokenBalance?.symbol}
              </p>
            </div>
            <div className={styles.tokenItem}>
              <h3 className={styles.tokenLabel}>Current Balance</h3>
              <p className={styles.tokenValue}>
                <b>{tokenBalance?.displayValue}</b> {tokenBalance?.symbol}
              </p>
            </div>
          </div>

          <Web3Button
      contractAddress="0xF26a7338e6882ecBb6477be9025cFe723b9E8113"
      action={(contract) => {
        contract.call("claimRewards", [0])
      }}
    >
      claimRewards
    </Web3Button>

          <hr className={`${styles.divider} ${styles.spacerTop}`} />
          <h2>Your Staked NFTs</h2>
          <div className={styles.nftBoxGrid}>
            {stakedTokens &&
              stakedTokens[0]?.map(stakedToken => (
                <NFTCard
                  tokenId={stakedToken.toNumber()}
                  key={stakedToken.toString()}
                />
              ))}
          </div>

          <hr className={`${styles.divider} ${styles.spacerTop}`} />
          <h2>Your Unstaked NFTs</h2>
          <div className={styles.nftBoxGrid}>
            {ownedNfts?.map(nft => (
              <div className={styles.nftBox} key={nft.metadata.id.toString()}>
                <ThirdwebNftMedia
                  metadata={nft.metadata}
                  className={styles.nftMedia}
                />
                <h3>{nft.metadata.name}</h3>
                <Web3Button
            contractAddress="0xF26a7338e6882ecBb6477be9025cFe723b9E8113"
            action={(contract) => {
              contract.call("stake", [nft.metadata.id.toString(), "1"]);
            }}
          >
            Stake
          </Web3Button>

              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Stake
