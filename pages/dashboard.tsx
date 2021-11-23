import { useState, useEffect, useCallback } from 'react';
import {
      useMoralis,
      useMoralisQuery,
      useMoralisWeb3Api,
      useMoralisWeb3ApiCall,
} from 'react-moralis';
import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion';
import { RefreshIcon } from '@heroicons/react/solid';
import MoralisAuth from '../components/Buttons/MoralisAuth';
import PolygonImg from '../public/polygon-png.png';
import AlertCard from '../components/Cards/AlertCard';
import PageLayout from '../components/Layouts/PageLayout';
import Heading from '../components/Typography/Heading';
import NftCard from '../components/Cards/NftCard';
import NodeCard from "../components/Cards/NodeCard";
export default function Dashboard() {

      //? Token state
      const [nftState, setNftState] = useState({
            eth: [],
            polygon: [],
            avax: [],
            isDashLoading: false
      })

      //? Auth user and get address with moralis hook. Address will be passed to useMoralisWeb3ApiCall
      const { isAuthenticated, user, Moralis } = useMoralis()
      const userAddress = user?.get('ethAddress')

      //? Assign useMoralisWeb3Api hook to var.
      const web3API = useMoralisWeb3Api()

      //? hooks for each of the following chains: Ethereum, Polygon, Avalanche
      const { fetch: fetchEth, data: ethData, error: ethError, isLoading: ethIsLoading } = useMoralisWeb3ApiCall(web3API.account.getNFTs, {
            chain: 'eth',
            format: 'decimal' || 'hex',
            address: userAddress
      });
      const { fetch: fetchPolygon, data: polygonData, error: polygonError, isLoading: polygonIsLoading } = useMoralisWeb3ApiCall(web3API.account.getNFTs, {
            chain: 'polygon',
            format: 'decimal' || 'hex',
            address: userAddress
      });
      const { fetch: fetchAvax, data: avaxData, error: avaxError, isLoading: avaxIsLoading } = useMoralisWeb3ApiCall(web3API.account.getNFTs, {
            chain: 'avalanche',
            format: 'decimal' || 'hex',
            address: userAddress
      });

      const getNFTs = async () => {
            //? Clear the state
            setNftState({
                  eth: [],
                  polygon: [],
                  avax: [],
                  isDashLoading: true
            });
            //? Promise array of different chain fetches for promise.all
            let promiseArray = [];
            //? let object for new state after promises
            let localObj = {
                  eth: [],
                  polygon: [],
                  avax: []
            }
            fetchEth().then(() => {
                  ethData?.result.map((item, index) => {
                        const nft = JSON.parse(item.metadata)

                        console.log(nft)
                        if (nft === null) {
                              return
                        }
                        else {
                              localObj.eth.push(nft)
                              setNftState({ ...nftState, eth: localObj.eth })
                        }
                  })
            })
            fetchPolygon().then(() => {
                  polygonData?.result.map((item, index) => {
                        const nft = JSON.parse(item.metadata)
  
                        console.log(nft)
                        if (nft === null) {
                              return
                        }
                        else {
                              localObj.polygon.push(nft)
                              setNftState({ ...nftState, polygon: localObj.polygon })
                        }
                  })
            })


      }


      useEffect(() => {
            
            getNFTs()
      }, [])

      if (!isAuthenticated) return (
            <PageLayout>
                  <AlertCard
                        title='Stop right there, Chad'
                        body='
                  You will need to
                  authenticate to
                  query with account. 
                  Please select the correct 
                  account before moving on.'
                        warning
                  />
                  <MoralisAuth />
            </PageLayout>
      )
      return (
            <motion.div
                  initial={{ opacity: 0, translateX: -50, }}
                  animate={{ opacity: 1, translateX: 0 }}
                  transition={{ duration: 0.75 }}
                  className=''
            >
                  <PageLayout>


                        <NodeCard>
                              <Heading title={`Welcome ${userAddress}`} fontSize='text-sm sm:text-md md:text-4xl' />
                              <p className='text-center text-th-primary-light'>
                                    View your Ethereum & Polygon NFTs
                              </p>
                              <Image className='animate-spin ' src={PolygonImg} height={75} width={75} />
                        </NodeCard>
                        <button
                              onClick={() => getNFTs()}
                              className='
                        flex justify-center items-center
                        p-2 text-xl rounded-lg
                        text-th-primary-light 
                        focus:outline-none
                        hover:shadow-lg bg-th-primary-dark 
                        transition duration-300 transform
                        hover:scale-125 ease-in-out
                  '>
                              Fetch/Refresh

                              <RefreshIcon width={50} height={50} />
                        </button>

                        <Heading title='Ethereum NFTs' />
                        <div className='flex justify-center items-center'>
                              <div className='grid gap-8
                              grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-4
                              items-center justify-center '>
                                    {nftState.eth.map((item, index) =>
                                          <div key={index} className='ring-4 flex items-center justify-center'>
                                                <NftCard nft={item} />
                                          </div>
                                    )}
                              </div>
                        </div>
                        <Heading title='Polygon NFTs' />
                        <div className='flex justify-center items-center'>
                              <div className='grid gap-8
                              grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-4
                              items-center justify-center '>
                                    {nftState.polygon.map((item, index) =>
                                          <div key={index} className='ring-4 flex items-center justify-center'>
                                                <NftCard nft={item} />
                                          </div>
                                    )}
                              </div>
                        </div>


                  </PageLayout>
            </motion.div>
      )
}
