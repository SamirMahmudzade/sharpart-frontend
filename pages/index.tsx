import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import { motion, useAnimation } from 'framer-motion';
import { ClipboardCopyIcon, ExternalLinkIcon } from '@heroicons/react/solid';
import { fetcher } from "../lib/helpers/fetchers";
import copyToBoard from '../lib/helpers/copyToClipboard';
import PolygonImg from '../public/polygon-png.png';
import EthImg from '../public/eth.png'
import xDaiImg from '../public/xDai.png'
import Heading from '../components/Typography/Heading';
import PageLayout from '../components/Layouts/PageLayout';
import NodeCard from '../components/Cards/NodeCard';
import { useEthersBytes } from '../hooks/useEthersBytes';

export default function Home() {
      //todo - Add xDai logo, and equal size to polygon or eth image size.
      const { data: xdaiGas, error: xdaiGasError } = useSWR(
            'https://blockscout.com/xdai/mainnet/api/v1/gas-price-oracle',
            fetcher,
            { refreshInterval: 300090 }
            //* 300060 is earliest possible fetch
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

      //? Moved form state for ethersBytes conversion into its own hook
      const { ethersBytes, handleChange } = useEthersBytes()


      if (!maticGas || !ethGas || !xdaiGas) return (
            <div className="flex flex-col items-center justify-center ">
                  <div className='border-b-2 w-32 h-32 border-th-primary-light rounded-full animate-spinFast'></div>
            </div>
      );

      else return (
            <div className='grid grid-flow-row space-y-0 md:space-y-10 lg:space-y-16' >
                  <div className=' 
                  grid grid-flow-col 
                  grid-cols-5 
                  items-center 
                  justify-center
                  '>
                        <div className=''>
                              <Heading title="Network" fontSize='text-sm md:text-lg lg:text-5xl' />
                        </div>
                        <p className='text-center text-th-primary-light text-sm lg:text-base xl:text-3xl'>
                              Safe Low gas price
                        </p>
                        <p className='text-center text-th-primary-light text-sm lg:text-base xl:text-3xl'>
                              Standard gas price
                        </p>
                        <p className='text-center text-th-primary-light text-sm lg:text-base xl:text-3xl'>
                              Fast gas price
                        </p>
                        <p className='text-center text-th-primary-light text-sm lg:text-base xl:text-3xl'>
                              Other
                        </p>

                  </div>
                  <motion.div
                        initial={{ opacity: 0, translateX: 0, translateY: -200 }}
                        animate={{ opacity: 1, translateX: 0, translateY: 0 }}
                        transition={{ duration: 0.75, delay: 0.5 }}
                        className=''
                  >
                        {ethGas &&
                              <div className="
                              grid grid-cols-5 
                              gap-0 md:gap-8 lg:gap-10 
                              ">
                                    <a className='focus:outline-none' target='blank' href='https://etherscan.io/gastracker' rel="noopener noreferrer" >
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
                                    <p className='flex items-center justify-center text-center text-th-primary-light text-base md:text-lg lg:text-xl'>
                                          {ethGas.safeLow + ' ' + 'Gwei'}
                                    </p>
                                    <p className='flex items-center justify-center text-center text-th-primary-light text-base md:text-lg lg:text-xl'>
                                          {ethGas.standard + ' ' + 'Gwei'}
                                    </p>
                                    <p className='flex items-center justify-center text-center text-th-primary-light text-base md:text-lg lg:text-xl'>
                                          {ethGas.fastest + ' ' + 'Gwei'}
                                    </p>
                                     <p className='flex items-center justify-center text-center text-th-primary-light text-base md:text-lg lg:text-xl'>
                                         Next Base {ethGas.nextBase + ' ' + 'Gwei'}
                                    </p>
                              </div>
                        }

                  </motion.div>
                  <motion.div
                        initial={{ opacity: 0, translateX: +150, translateY: -150 }}
                        animate={{ opacity: 1, translateX: 0, translateY: 0 }}
                        transition={{ duration: 0.75, delay: 1 }}
                        className='grid grid-flow-row space-y-0 md:space-y-10 lg:space-y-16'
                  >

                        <div className='
                        grid grid-cols-5 
                        gap-4 md:gap-8 lg:gap-10 
                        '>
                              <a className='focus:outline-none' target='blank' href='https://polygonscan.com/gastracker/' rel="noopener noreferrer">
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
                              <p className='flex items-center justify-center text-center text-th-primary-light text-base md:text-lg lg:text-xl'>
                                    {maticGas.safeLow.toFixed(2).toString() + ' ' + 'Gwei'}
                              </p>
                              <p className='flex items-center justify-center text-center text-th-primary-light text-base md:text-lg lg:text-xl'>
                                    {maticGas.standard.toFixed(2).toString() + ' ' + 'Gwei'}
                              </p>
                              <p className='flex items-center justify-center text-center text-th-primary-light text-base md:text-lg lg:text-xl'>
                                    {maticGas.fast.toFixed(2).toString() + ' ' + 'Gwei'}
                              </p>
                              <p className='flex items-center justify-center text-center text-th-primary-light text-base md:text-lg lg:text-xl'>
                                    {maticGas.fastest.toFixed(2).toString() + ' ' + 'Gwei'}
                              </p>
                        </div>
                  </motion.div>
                  <motion.div
                        initial={{ opacity: 0, translateX: -150, translateY: -150 }}
                        animate={{ opacity: 1, translateX: 0, translateY: 0 }}
                        transition={{ duration: 0.75, delay: 1.5 }}
                        className='grid grid-flow-row space-y-0 md:space-y-10 lg:space-y-16'
                  >
                        {xdaiGas &&
                              <div className="
                              grid grid-cols-5
                              gap-4 md:gap-8 lg:gap-10 
                               ">
                                    <a className='focus:outline-none' href="https://blockscout.com/xdai/mainnet/" target="blank" rel="noopener noreferrer">
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
                                    <p className='flex items-center justify-center text-center text-th-primary-light text-base md:text-lg lg:text-l'>
                                          {xdaiGas.slow.toFixed(2).toString() + ' ' + 'Gwei'}
                                    </p>
                                    <p className='flex items-center justify-center text-center text-th-primary-light text-base md:text-lg lg:text-xl'>
                                          {xdaiGas.average.toFixed(2).toString() + ' ' + 'Gwei'}
                                    </p>
                                    <p className='flex items-center justify-center text-center text-th-primary-light text-base md:text-lg lg:text-xl'>
                                          {xdaiGas.fast.toFixed(2).toString() + ' ' + 'Gwei'}
                                    </p>
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
                              title='Some useful functions for contracts'
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
                                          name='hexed'
                                          onChange={(e) => { handleChange(e) }}
                                          className='
                                          rounded-lg
                                          focus:outline-none text-xl 
                                          text-th-primary-dark focus:bg-th-primary-light 
                                          transition-colors duration-300 
                                          ease-in-out bg-opacity-25 p-2'/>
                                    <p className='text-th-primary-medium text-center text-lg' >
                                          <span className='
                                          uppercase tracking-wide 
                                          font-extrabold text-th-primary-light'>
                                                Result:
                                          </span>
                                          {' ' + ethersBytes.hexed}
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
                                          name='stringed'
                                          onChange={(e) => { handleChange(e) }}
                                          className='
                                          rounded-lg
                                          focus:outline-none text-xl 
                                          text-th-primary-dark focus:bg-th-primary-light 
                                          transition-colors duration-300 
                                          ease-in-out bg-opacity-25 p-2'/>
                                    <p className='text-th-primary-medium text-center text-lg' >
                                          <span className='
                                          uppercase tracking-wide 
                                          font-extrabold text-th-primary-light'>
                                                Result:
                                          </span>
                                          {' ' + ethersBytes.stringed.trim()}
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
                  </PageLayout>
            </div >
      )
}
