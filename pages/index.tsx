import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import { useState, useEffect, Suspense } from 'react';
import { ethers } from 'ethers'
import { motion, useAnimation } from 'framer-motion';
import { useInView } from "react-intersection-observer";
import { ClipboardCopyIcon, ExternalLinkIcon } from '@heroicons/react/solid';
import { fetcher } from "../lib/helpers/fetchers";
import copyToBoard from '../lib/helpers/copyToClipboard';
import PolygonImg from '../public/polygon-png.png';
import EthImg from '../public/eth.png'
import xDaiImg from '../public/xDai.png'
import Heading from '../components/Typography/Heading';
import SimpleCard from '../components/Cards/SimpleCard';
import PageLayout from '../components/Layouts/PageLayout';
import NodeCard from '../components/Cards/NodeCard';

export default function Home() {
      //todo - Add xDai logo, and equal size to polygon or eth image size.
      const { data: xdaiGas, error: xdaiGasError } = useSWR(
            'https://blockscout.com/xdai/mainnet/api/v1/gas-price-oracle',
            fetcher,
            { refreshInterval: 300060 }
      )
      const { data: maticGas, error: maticGasError } = useSWR(
            'https://gasstation-mainnet.matic.network',
            fetcher,
            { refreshInterval: 10000 }
      )
      const { data: ethGas, error: ethGasError } = useSWR(
            '/api/gasPrice',
            fetcher,
            { refreshInterval: 10000 }
      )

      //todo - move into its own ethers util hook?
      //todo - add copyToClipboard button
      const [ethersBytes, setEthersBytes] = useState({
            stringed: '',
            hexed: ''
      })
      const handleChange = (e) => {
            //* Set formatting input on change of text box
            //* Cannot use square brackets, as the target depends on ethers util.
            if (e.target.name === 'stringed') {
                  setEthersBytes({ ...ethersBytes, stringed: ethers.utils.formatBytes32String(e.target.value) });

            }
            else if (e.target.name === 'hexed') {
                  setEthersBytes({ ...ethersBytes, hexed: ethers.utils.toUtf8String(e.target.value) })
            }
      }

      //* intersection observer hook

      if (!maticGas) return (
            <div id="div1" className="flex flex-col items-center justify-center ">
                  <Heading title="This is SharpArt" hScreen={true}>
                        <p className="text-center text-base sm:text-xl lg:text-2xl 
                              text-th-primary-light text-shadow-md subpixel-antialiased 
                              ">
                              The bridge between talented artists, and the secret of digital asset demand.
                        </p>
                  </Heading>
            </div>
      );

      else return (
            <div >
                  <motion.div key={ethGas}
                        initial={{ opacity: 0, translateX: -50, }}
                        animate={{ opacity: 1, translateX: 0 }}
                        transition={{ duration: 0.75 }}
                        className='grid grid-flow-row space-y-0 md:space-y-10 lg:space-y-16'
                  >
                        {ethGas &&
                              <div className="
                              grid grid-cols-5 
                              gap-4 md:gap-8 lg:gap-10 
                              ">
                                    <a target='blank' href='https://etherscan.io/gastracker' rel="noopener noreferrer" >
                                          <div className='
                                          antialiased rounded-3xl
                                          ring-offset-th-primary-medium 
                                          hover:scale-110 transform
                                          hover:ring-8 hover:shadow-xl 
                                          transition duration-300 
                                          ease-in-out hover:cursor-pointer
                                          flex flex-col 
                                          space-y-1 sm:space-y-4 
                                          lg:space-y-6 xl:space-y-10
                                          items-center justify-center'>
                                                <Image className='animate-spin' src={EthImg} height={110} width={110} />
                                                <p className='text-center text-xs sm:text-sm lg:text-2xl font-thin text-th-primary-light break-all'>
                                                      Mainnet
                                                      <ExternalLinkIcon className='inline-flex antialiased' width={30} height={30} />
                                                </p>
                                          </div>
                                    </a>
                                    <SimpleCard title="Safe Low gas price" body={ethGas.safeLow + ' ' + 'Gwei'} />
                                    <SimpleCard title="Standard gas price" body={ethGas.standard + ' ' + 'Gwei'} />
                                    <SimpleCard title="Fast gas price" body={ethGas.fastest + ' ' + 'Gwei'} />
                                    <SimpleCard title="Next block base" body={ethGas.nextBase + ' ' + 'Gwei'} />
                              </div>
                        }



                        <div className='
                        grid grid-cols-5 
                        gap-4 md:gap-8 lg:gap-10 
                        '>
                              <a target='blank' href='https://polygonscan.com/gastracker/' rel="noopener noreferrer">
                                    <div className='
                                          antialiased rounded-3xl
                                          ring-offset-th-primary-medium 
                                          hover:scale-110 transform
                                          hover:ring-8 hover:shadow-xl 
                                          transition duration-300 
                                          ease-in-out hover:cursor-pointer
                                          flex flex-col 
                                          hover:text-th-primary-medium  
                                          space-y-1 sm:space-y-4 
                                          lg:space-y-6 xl:space-y-10
                                          items-center justify-center'>
                                          <Image className='animate-spin' src={PolygonImg} height={110} width={110} />
                                          <p className='text-center text-xs sm:text-sm lg:text-2xl font-thin text-th-primary-light'>
                                                Polygon
                                                <ExternalLinkIcon className='inline-flex antialiased' width={30} height={30} />
                                          </p>
                                    </div>
                              </a>
                              <SimpleCard title="Safe Low gas price" body={maticGas.safeLow.toFixed(2).toString() + ' ' + 'Gwei'} />
                              <SimpleCard title="Standard gas price" body={maticGas.standard.toFixed(2).toString() + ' ' + 'Gwei'} />
                              <SimpleCard title="Fast gas price" body={maticGas.fast.toFixed(2).toString() + ' ' + 'Gwei'} />
                              <SimpleCard title="Fastest gas price" body={maticGas.fastest.toFixed(2).toString() + ' ' + 'Gwei'} />
                        </div>

                        {xdaiGas &&
                              <div className="
                              grid grid-cols-5
                              gap-4 md:gap-8 lg:gap-10 
                               ">
                                    <a href="https://blockscout.com/xdai/mainnet/" target="blank" rel="noopener noreferrer">
                                          <div className='
                                          antialiased rounded-3xl
                                          ring-offset-th-primary-medium 
                                          hover:scale-110 transform
                                          hover:ring-8 hover:shadow-xl 
                                          transition duration-300 
                                          ease-in-out hover:cursor-pointer
                                          flex flex-col 
                                          hover:text-th-primary-medium  
                                          space-y-1 sm:space-y-4 
                                          lg:space-y-6 xl:space-y-10
                                          items-center justify-center'>
                                                <Image className='animate-spin' src={xDaiImg} height={110} width={110} />
                                                <p className='text-center text-xs sm:text-sm lg:text-2xl font-thin text-th-primary-light '>
                                                      xDai Gas
                                                      <ExternalLinkIcon className='inline-flex antialiased' width={30} height={30} />
                                                </p>
                                          </div>
                                    </a>
                                    <SimpleCard title="Safe Low gas price" body={xdaiGas.slow.toFixed(2).toString() + ' ' + 'Gwei'} />
                                    <SimpleCard title="Standard gas price" body={xdaiGas.average.toFixed(2).toString() + ' ' + 'Gwei'} />
                                    <SimpleCard title="Fast gas price" body={xdaiGas.fast.toFixed(2).toString() + ' ' + 'Gwei'} />
                              </div>
                        }
                  </motion.div>


                  <Heading title="This is SharpArt" hScreen={true}>
                        <p className="text-center text-base sm:text-xl lg:text-2xl 
                                    text-th-primary-light  subpixel-antialiased 
                              ">
                              The bridge between talented artists, and the secret of digital asset demand.
                        </p>
                  </Heading>

                  <PageLayout>
                        <Heading
                              title='Some Helper Functions'
                              fontSize='text-base sm:text-1xl md:text-5xl '
                        />
                        <NodeCard wFull>
                              <Heading
                                    title='Convert String to Bytes32'
                                    fontSize='text-base sm:text-1xl md:text-3xl '
                              />
                              <div className='
                              flex flex-col 
                              justify-center items-center 
                              space-y-4 text-center'>
                                    < input
                                          type='text'
                                          name='stringed'
                                          onChange={(e) => { handleChange(e) }}
                                          className='
                                          focus:outline-none text-xl 
                                          text-th-primary-dark focus:bg-th-accent-light 
                                          transition-colors duration-300 
                                          ease-in-out bg-opacity-25 p-2'/>
                                    <p className='text-th-accent-light text-center text-lg' >
                                          <span className='
                                          uppercase tracking-wide 
                                          font-extrabold text-th-primary-light'>
                                                Result:
                                          </span>
                                          {' ' + ethersBytes.stringed}
                                          <button
                                                onClick={() => copyToBoard(ethersBytes.stringed)}
                                                className='
                                          focus:outline-none 
                                          text-th-primary-light
                                          transition duration-300 ease-in-out
                                          hover:text-th-primary-medium
                                          transform hover:scale-110
                                          '>
                                                <ClipboardCopyIcon className='inline-flex antialiased' width={30} height={30} />
                                          </button>
                                    </p>
                              </div>
                        </NodeCard>
                        <NodeCard wFull>
                              <Heading
                                    title='Convert Bytes32 to String'
                                    fontSize='text-base sm:text-1xl md:text-3xl '
                              />
                              <div className='
                              flex flex-col 
                              justify-center items-center 
                              space-y-4 text-center'>
                                    < input
                                          type='text'
                                          name='hexed'
                                          onChange={(e) => { handleChange(e) }}
                                          className='
                                          focus:outline-none text-xl 
                                          text-th-primary-dark focus:bg-th-accent-light 
                                          transition-colors duration-300 
                                          ease-in-out bg-opacity-25 p-2'/>
                                    <p className='text-th-accent-light text-center text-lg' >
                                          <span className='
                                          uppercase tracking-wide 
                                          font-extrabold text-th-primary-light'>
                                                Result:
                                          </span>
                                          {' ' + ethersBytes.hexed.trim()}
                                          <button
                                                onClick={() => copyToBoard(ethersBytes.hexed)}
                                                className='
                                          focus:outline-none 
                                          text-th-primary-light
                                          transition duration-300 ease-in-out
                                          hover:text-th-primary-medium
                                          transform hover:scale-110
                                          '>
                                                <ClipboardCopyIcon className='inline-flex antialiased' width={30} height={30} />
                                          </button>
                                          test text
                                    </p>
                              </div>
                        </NodeCard>
                  </PageLayout>
            </div >
      )
}
