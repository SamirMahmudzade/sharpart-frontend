import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { RefreshIcon } from '@heroicons/react/solid';
import {
      selectResults,
      fetchUserScores,
      selectWins,
      selectLosses,
} from '../../lib/slices/gameSlice';
import Heading from "../Typography/Heading";
import Dropdown from '../Dropdown'


interface Props {
      address: string;

}

//todo - Make a separate module for the reusable version

export default function UserScoreTable({ address }: Props): JSX.Element {
      const dispatch = useDispatch()
      const userResults = useSelector(selectResults)

      const userWins = useSelector(selectWins)
      const userLosses = useSelector(selectLosses)
      //* State and options for dropdown
      const [menuSelect, setMenu] = useState('Overall')
      const options = ['Overall', 'Wins', 'Losses']



      return (
            <div className=" min-h-full">
                  <div className="
                        grid grid-flow-row gap-4 md:gap-12 lg:gap-20 
                        p-2 md:p-4 lg:p-8
                        items-center justify-center
                        bg-th-foreground rounded-md">

                        <Heading title="Trade Order History" hScreen={false} />

                        <div className='flex flex-row justify-end items-center'>

                              <Dropdown options={options} clickHandler={setMenu} title={menuSelect} />
                              <button
                                    className=' flex justify-center items-center
                                          antialiased focus:outline-none text-th-primary-light
                                          hover:shadow-lg rounded-lg 
                                          transition duration-200 ease-in-out transform hover:scale-125 '
                                    onClick={() => dispatch(fetchUserScores(address))}
                              >
                                    <RefreshIcon width={50} height={50} />
                              </button>
                        </div>

                        <table className="table-auto border-2">
                              <thead className=" text-th-primary-light border-b-2 border-th-primary-light ">
                                    <tr className="">
                                          <th className="text-center p-2 border-t-2 border-l-2 border-r-2 border-th-primary-light">games played</th>
                                          <th className="text-center p-2 border-t-2 border-l-2 border-r-2 border-th-primary-light">choice</th>
                                          <th className="text-center p-2 border-t-2 border-l-2 border-r-2 border-th-primary-light">result</th>
                                          <th className="text-center p-2 border-t-2 border-l-2 border-r-2 border-th-primary-light">win?</th>
                                          <th className="text-center p-2 border-t-2 border-l-2 border-r-2 border-th-primary-light">old eth</th>
                                          <th className="text-center p-2 border-t-2 border-l-2 border-r-2 border-th-primary-light">new eth</th>
                                          <th className="text-center p-2 border-t-2 border-l-2 border-r-2 border-th-primary-light">date</th>

                                    </tr>
                              </thead>
                              <tbody className="text-th-primary-light ">
                                    {menuSelect == 'Overall' && userResults.map((item, index) =>
                                          <tr className=" border-b-2 border-th-primary-light rounded-b-lg" key={index}>
                                                <td className=" border-r-2 border-l-2 text-center p-5 ">{index + 1}</td>
                                                <td className="border-r-2 border-l-2 text-center p-5">{item.gameChoice}</td>
                                                <td className="border-r-2 border-l-2 text-center p-5">{item.gameResult}</td>
                                                <td className="border-r-2 border-l-2 text-center p-5">{item.gameWin ? 'Victory' : 'Defeat'}</td>
                                                <td className="border-r-2 border-l-2 text-center p-5">$ {item.oldPrice}</td>
                                                <td className="border-r-2 border-l-2 text-center p-5">$ {item.newPrice}</td>
                                                <td className="border-r-2 border-l-2 text-center p-5">{item.gameDate}</td>
                                          </tr>
                                    )}
                                    {menuSelect == 'Wins' && userWins.map((item, index) =>
                                          <tr className=" border-b-2 border-th-primary-light rounded-b-lg" key={index}>
                                                <td className="border-r-2 border-l-2 text-center p-5 ">{index + 1}</td>
                                                <td className="border-r-2 border-l-2 text-center p-5">{item.gameChoice}</td>
                                                <td className="border-r-2 border-l-2 text-center p-5">{item.gameResult}</td>
                                                <td className="border-r-2 border-l-2 text-center p-5">{item.gameWin ? 'Victory' : 'Defeat'}</td>
                                                <td className="border-r-2 border-l-2 text-center p-5">$ {item.oldPrice}</td>
                                                <td className="border-r-2 border-l-2 text-center p-5">$ {item.newPrice}</td>
                                                <td className="border-r-2 border-l-2 text-center p-5">{item.gameDate}</td>
                                          </tr>
                                    )}
                                    {menuSelect == 'Losses' && userLosses.map((item, index) =>
                                          <tr className=" border-b-2 border-th-primary-light rounded-b-lg" key={index}>
                                                <td className="border-r-2 border-l-2 text-center p-5 ">{index + 1}</td>
                                                <td className="border-r-2 border-l-2 text-center p-5">{item.gameChoice}</td>
                                                <td className="border-r-2 border-l-2 text-center p-5">{item.gameResult}</td>
                                                <td className="border-r-2 border-l-2 text-center p-5">{item.gameWin ? 'Victory' : 'Defeat'}</td>
                                                <td className="border-r-2 border-l-2 text-center p-5">$ {item.oldPrice}</td>
                                                <td className="border-r-2 border-l-2 text-center p-5">$ {item.newPrice}</td>
                                                <td className="border-r-2 border-l-2 text-center p-5">{item.gameDate}</td>
                                          </tr>
                                    )}
                              </tbody>
                        </table>
                  </div>
            </div>
      )
}