import { ThirdwebNftMedia, useContract, useNFT, Web3Button } from "@thirdweb-dev/react";
import { editionDropContractAddress } from "../consts/contractAddresses";
import styles from "../styles/Home.module.css";
import { useState } from "react";

const NFTCard = ({ initialTokenId }) => {
  const [tokenId, setTokenId] = useState(initialTokenId || "0"); // Initialize state with prop or "0"
  const { contract } = useContract(editionDropContractAddress, "edition-drop");
  const { data: nft } = useNFT(contract, tokenId);

  const _amount = "1"; // You can define this dynamically

  return (
    <>
      {nft && (
        <div className={styles.nftBox}>
          {nft.metadata && (
            <ThirdwebNftMedia
              metadata={nft.metadata}
              className={styles.nftMedia}
            />
          )}
          <h3>{nft.metadata.name}</h3>
          <Web3Button
            contractAddress="0xF26a7338e6882ecBb6477be9025cFe723b9E8113"
            action={(contract) => {
              contract.call("withdraw", [tokenId, _amount])
            }}
          >
            withdraw
          </Web3Button>
        </div>
      )}
    </>
  );
};

export default NFTCard;
