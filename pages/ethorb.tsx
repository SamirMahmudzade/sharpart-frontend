import { useEffect } from 'react'
import { GetServerSideProps } from 'next'
import Moralis from 'moralis'
import { useMoralis, useMoralisCloudFunction, useMoralisQuery } from 'react-moralis'
import { useDispatch, useSelector } from 'react-redux'
import Web3 from 'web3'
import axios from "axios";
import { XYPlot, LineSeries } from 'react-vis';
import { useRouter } from 'next/router'
import { useInterval } from '../hooks/useInterval'
import SimpleCard from '../components/Cards/SimpleCard';
import AlertCard from '../components/Cards/AlertCard'
import NftList from '../components/Cards/NftList';
import {
      selectAccount,
      selectUris,
      resetUris,
      setUrisThunk,
      setAccount,
} from '../lib/slices/accountSlice';
import {
      selectHistoric,
      selectPrice,
      setPriceThunk
} from '../lib/slices/ethpriceSlice'
import {
      selectError,
      selectGameWin,
      setError,
      selectChoice,
      ethOrb,
      setChoiceUp,
      setChoiceDown,
      selectLoading,
      setGameSession,
      selectGameSession,
      setLoading,
      endLoading,
      selectGameResult
} from '../lib/slices/gameSlice';
import ModalCard from '../components/Cards/ModalCard';



export default function EthOrb() {
      const dispatch = useDispatch()
      const tokens = useSelector(selectUris)
      const eth = useSelector(selectPrice)
      const ethHistoric = useSelector(selectHistoric)
      const choice = useSelector(selectChoice)
      const gameWin = useSelector(selectGameWin)
      const gameResult = useSelector(selectGameResult)
      const gameError = useSelector(selectError)

      const gameSession = useSelector(selectGameSession)
      const gameLoading = useSelector(selectLoading)

      //* moralis state/hook
      const { isAuthenticated, user } = useMoralis()
      const address = user?.get('ethAddress')
      const authData = user?.get('authData')
      const userSign = authData?.moralisEth.signature
      const gameSesh = Moralis.Object.extend("GameSession");
      const gameRes = Moralis.Object.extend("GameResults")
      const gameResQuery = new Moralis.Query(gameRes)
      const gameQuery = new Moralis.Query(gameSesh)
      const gamesession = new gameSesh()

      async function queryUserSession() {
            console.log(userSign)
            gameQuery.equalTo("userSign", userSign)
            await gameQuery.first()
                  .then(async (results) => {
                        if (!results) {
                              gamesession.set('ethAddress', address);
                              gamesession.set('userSign', userSign);
                              await gamesession.save().then(
                                    dispatch(setGameSession(true))
                              );
                              console.log(`no game session was found for ${address}, therefore one has been made`)
                        }
                        else {
                              dispatch(setGameSession(true))
                        }
                  })

      }

      async function playGame() {

            if (!address || eth == 0 || choice === null) {
                  console.log('no addres or what')
                  dispatch(setError('no address, eth price, choice was found'))
            }
            else if (!isAuthenticated) {
                  //this shouldnt happen because the markup should be re-rendered. jic
                  console.log('no auth data foound')
                  dispatch(setError('User not authenticated'))
            }
            else if (!gameSession) {
                  dispatch(setError('Client not synced'))
            }
            else {
                  //set a gamesession then post backend
                  dispatch(ethOrb(address, eth, choice, userSign))
            }
      }
      async function testGarbage() {

            gameResQuery.equalTo("ethAddress", address)
            await gameResQuery.first()
                  .then(async (results) => {
                        if (!results) {
                              console.log(`no game session was found for ${address}, therefore one has been made`)
                        }
                        else {
                              const date = results.createdAt
                              const minutes = date.getHours()
                              console.log(minutes)
                        }
                  })
      }


      // click handlers for game UI. call the  game 



      const fetchEth = () => {
            dispatch(setPriceThunk())
      }

      useInterval(fetchEth, 5000);

      /*
      useEffect(() =>{
            dispatch(setUrisThunk(address))
      }, [user])
*/
      if (!isAuthenticated || !address) return (

            <div className="flex items-center justify-center py-10">
                  <AlertCard title="Whoa There!" body="You require metamask to use these decentralised applications" failure />

            </div>
      )

      //todo: rebuild layout
      //todo: populate with game redux state neatly
      else return (
            <div className="flex flex-col justify-center items-center">
                  <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row gap-8 md:gap-16 lg:gap-32 py-4">
                        <div className="flex flex-col justify-center items-center">

                              <SimpleCard title="Welcome" body={address} />

                              <p className="py-8 text-th-primary-light">Price of ETH in USD is ${eth}</p >


                              {gameSession && <ModalCard
                                    body="Where will the price (usd) of Eth be in 2 minutes? "
                                    action1={
                                          <button
                                                onClick={() => dispatch(setChoiceUp())}
                                                className={choice === true ? ' p-2 text-center  text-xs md:text-sm lg:text-xl   text-th-primary-light rounded-lg bg-opacity-100 bg-th-accent-success  focus:outline-none   transition duration-300 ease-in-out'
                                                      : ' p-2 text-center  text-xs md:text-sm lg:text-xl   text-th-primary-light  rounded-lg bg-opacity-0   focus:outline-none   transition duration-300 ease-in-out'}
                                          >
                                                Mooning
                                          </button>
                                    }
                                    action2={
                                          <button
                                                onClick={() => dispatch(setChoiceDown())}
                                                className={choice === false ? ' p-2 text-center  text-xs md:text-sm lg:text-xl   text-th-primary-light rounded-lg bg-opacity-100 bg-th-accent-failure  focus:outline-none   transition duration-300 ease-in-out'
                                                      : ' p-2 text-center  text-xs md:text-sm lg:text-xl   text-th-primary-light  rounded-lg bg-opacity-0   focus:outline-none   transition duration-300 ease-in-out'}
                                          >
                                                Dropping
                                          </button>
                                    }
                              />}


                              <button onClick={queryUserSession} className='m-6 text-th-accent-success' >Create Game Session</button>
                              <button onClick={testGarbage} className='m-6 text-th-accent-success' >testing date</button>
                              {choice !== null && gameSession && <button onClick={playGame} className='m-6 text-th-accent-success' >Play Game</button>}
                              {gameLoading && <p className="text-th-primary-light" ><svg className="animate-spin h-5 w-5"> </svg> game is loading </p>}
                              {gameResult && <AlertCard title={gameResult} body="whatever bud" success={gameWin ? true : false} failure={!gameResult ? false : true} />}
                        </div>
                        <div className="flex flex-col justify-center items-center">
                              <NftList items={tokens} />
                        </div>



                  </div>


            </div>
      );

}
