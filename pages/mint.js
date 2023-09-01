import { Web3Button} from "@thirdweb-dev/react"
import { useRouter } from "next/router"
import { editionDropContractAddress } from "../consts/contractAddresses"
import styles from "../styles/Home.module.css"


const Mint = () => {
  const router = useRouter()
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Mint An NFT!</h1>

      <p className={styles.explain}>
        Here is where we use our <b>Edition Drop</b> contract to allow users to
        mint one of the NFTs that we lazy minted.
      </p>
      
      <hr className={`${styles.smallDivider} ${styles.detailPageHr}`} />
      <iframe
    src="https://embed.ipfscdn.io/ipfs/bafybeigtqeyfmqkfbdu7ubjlwhtqkdqckvee7waks4uwhmzdfvpfaqzdwm/erc1155.html?contract=0xd3a12Ec39c68554c6aC994f79FeC6E4d9fBF1aE5&chain=%7B%22name%22%3A%22Mumbai%22%2C%22chain%22%3A%22Polygon%22%2C%22rpc%22%3A%5B%22https%3A%2F%2Fmumbai.rpc.thirdweb.com%2F%24%7BTHIRDWEB_API_KEY%7D%22%5D%2C%22nativeCurrency%22%3A%7B%22name%22%3A%22MATIC%22%2C%22symbol%22%3A%22MATIC%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22maticmum%22%2C%22chainId%22%3A80001%2C%22testnet%22%3Atrue%2C%22slug%22%3A%22mumbai%22%2C%22icon%22%3A%7B%22url%22%3A%22ipfs%3A%2F%2FQmcxZHpyJa8T4i63xqjPYrZ6tKrt55tZJpbXcjSDKuKaf9%2Fpolygon%2F512.png%22%2C%22height%22%3A512%2C%22width%22%3A512%2C%22format%22%3A%22png%22%7D%7D&clientId=b348d6571045948f6cc34cffc3589041&tokenId=0&primaryColor=purple"
    width="600px"
    height="600px"
    style={{maxWidth:"100%;"}}
    frameborder="0"
></iframe>

    </div>
  )
}

export default Mint
