import AlertCard from "../components/Cards/AlertCard";
import Link from "next/link";
import { useMoralis } from "react-moralis";
import MoralisAuth from "../components/Buttons/MoralisAuth";

export default function EtherDapps() {
  //@ts-ignore
  const { isAuthenticated, user } = useMoralis();
  const ethAddress = user?.get("ethAddress");

  //? No Auth
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col py-16 space-y-4 sm:space-y-10 lg:space-y-16 items-center justify-center ">
        <AlertCard
          title="Whoa There!"
          body="You require metamask to use these decentralised applications"
          failure
        />
        <MoralisAuth />
        <Link href="/ethorbtest">
          <a
            className=" 
                                    subpixel-antialiased  rounded-md
                                    text-center text-xs md:text-base lg:text-3xl
                                    text-th-primary-light
                                    border-b-4 border-th-primary-medium
                                    hover:border-transparent text-shadow-sm
                                    transition duration-300 ease-in-out 
                                    hover:text-th-primary-medium
                                    transform hover:scale-110 
                                    "
          >
            Eth Orb Test - {`(no results are saved, no metamask required)`}
          </a>
        </Link>
        <a
          target="blank"
          rel="noopener noreferrer"
          href="https://sharpart-web3-dapp.vercel.app/"
          className=" 
                                    subpixel-antialiased  rounded-md
                                    text-center text-xs md:text-base lg:text-3xl
                                    text-th-primary-light
                                    border-b-4 border-th-primary-medium
                                    hover:border-transparent text-shadow-sm
                                    transition duration-300 ease-in-out 
                                    hover:text-th-primary-medium
                                    transform hover:scale-110 
                                    "
        >
         SharpArt Web3 Dapp - Your dashboard for DEX, Transfers, Balances and more.
        </a>
      </div>
    );
  }
  //? Authed
  else
    return (
      <div className="flex flex-col py-16 space-y-4 sm:space-y-10 lg:space-y-16 items-center justify-center ">
        <AlertCard success title="You're all set" body={ethAddress} />
        <Link href="/makeadao">
          <a
            className=" 
                                    subpixel-antialiased  rounded-md
                                    text-center text-xs md:text-base lg:text-3xl
                                    text-th-primary-light
                                    border-b-4 border-th-primary-medium
                                    hover:border-transparent text-shadow-sm
                                    transition duration-300 ease-in-out 
                                    hover:text-th-primary-medium
                                    transform hover:scale-110 
                                    "
          >
            Deploy a DAO contract (in alpha on Mumbai Testnet)
          </a>
        </Link>
        <Link href="/ethorb">
          <a
            className=" 
                                subpixel-antialiased  rounded-md
                                text-center text-xs md:text-base lg:text-3xl
                                text-th-primary-light
                                border-b-4 border-th-primary-medium
                                hover:border-transparent text-shadow-sm
                                transition duration-300 ease-in-out 
                                hover:text-th-primary-medium
                                transform hover:scale-110 
                                    "
          >
            Eth Orb - Guess market movements.
          </a>
        </Link>
        <Link href="/ethorbtest">
          <a
            className="
                             subpixel-antialiased  rounded-md
                             text-center text-xs md:text-base lg:text-3xl
                             text-th-primary-light
                             border-b-4 border-th-primary-medium
                             hover:border-transparent text-shadow-sm
                             transition duration-300 ease-in-out 
                             hover:text-th-primary-medium
                             transform hover:scale-110 
                                    
                                    "
          >
            Eth Orb Test - {`(no results are saved, no metamask required)`}
          </a>
        </Link>
        <a
          target="blank"
          rel="noopener noreferrer"
          href="https://sharpart-web3-dapp.vercel.app/"
          className=" 
                                    subpixel-antialiased  rounded-md
                                    text-center text-xs md:text-base lg:text-3xl
                                    text-th-primary-light
                                    border-b-4 border-th-primary-medium
                                    hover:border-transparent text-shadow-sm
                                    transition duration-300 ease-in-out 
                                    hover:text-th-primary-medium
                                    transform hover:scale-110 
                                    "
        >
         SharpArt Web3 Dapp - Your dashboard for DEX, Transfers, Balances and more.
        </a>
      </div>
    );
}
/*
export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = axios.get(process.env.HOST_PROD + "/api/fetcheth")

  return {
    props: data
  }
}
*/
