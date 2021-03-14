import React from 'react';
import Link from 'next/link';
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAccounts } from '../redux/actions/accountActions';

type listItem = {
      id: number,
      text: string,
      link: string
}


export const Nav = () => {
      const dispatch = useDispatch()
      const [active, setActive] = useState(false);
      const listItems: listItem[] = [
            {
                  id: 1,
                  text: 'Home',
                  link: ''
            },
            {
                  id: 2,
                  text: 'Artists',
                  link: 'artists'
            },
            {
                  id: 3,
                  text: 'Contact',
                  link: 'contact'
            },
      ]


      const handleClick = () => {
            setActive(!active);
      };
      const handleMmask = () => {
            dispatch(fetchAccounts())
      }

      return (
            <>
                  <nav className='flex items-center flex-wrap bg-blue-400 p-3 shadow-lg'>
                        <Link href='/'>
                              <a className='inline-flex items-center p-2 mr-4 hover:shadow-lg rounded transition duration-500 ease-in-out transform  hover:scale-105  antialiased' >
                                    <svg
                                          viewBox='0 0 24 24'
                                          xmlns='http://www.w3.org/2000/svg'
                                          className='fill-current text-white h-8 w-8 mr-2'
                                    >
                                          <path d='M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z' />
                                    </svg>
                                    <span className='text-xl text-white font-bold uppercase tracking-wide'>
                                          SharpArt
                                    </span>
                              </a>
                        </Link>


                        <button
                              className=' inline-flex p-3 hover:bg-darkblue-600 rounded lg:hidden text-white ml-auto hover:text-white outline-none'
                              onClick={handleClick}
                        >
                              <svg
                                    className='w-6 h-6'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                    xmlns='http://www.w3.org/2000/svg'
                              >
                                    <path
                                          strokeLinecap='round'
                                          strokeLinejoin='round'
                                          strokeWidth={2}
                                          d='M4 6h16M4 12h16M4 18h16'
                                    />
                              </svg>
                        </button>


                        <div
                              className={`${active ? '' : 'hidden'
                                    }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
                        >
                              <div className='g:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto text-gray-100'  >
                                    {listItems.map((listItem, index) => 
                                          <Link key={index} href={`/` + listItem.link}>
                                                <a className=' subpixel-antialiased lg:inline-flex lg:w-auto w-full px-3 py-2 rounded-lg font-bold items-center justify-center hover:bg-darkblue-600 hover:shadow-lg rounded transition duration-500 ease-in-out '>
                                                      {listItem.text}
                                                </a>
                                          </Link>
                                    )}
                                    <button onClick={handleMmask} className='   lg:inline-flex px-3 py-2 rounded-lg  font-bold items-ltef hover:bg-amber-500 hover:shadow-lg rounded transition duration-500 ease-in-out'>
                                          MetaMask
                                    </button>
                              </div>
                        </div>        
                  </nav>
            </>
      );
};


export default Nav;



