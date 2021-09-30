import { useDispatch, useSelector } from 'react-redux'
import {

      selectChoice, selectLoading,

} from '../../../lib/slices/gameSlice';


//TODO This totally needs optimising for more reusability.
//? Just being introduced.

export default function Submit({ clickHandler }): JSX.Element {
      const choice = useSelector(selectChoice)
      const loading = useSelector(selectLoading)


      if (choice === null) return (
            <div className='flex items-center justify-center'>
                  <button
                        className={`
                        p-4 lg:px-24 lg:py-12 text-center text-4xl text-th-primary-dark 
                        bg-gradient-to-r from-th-primary-dark 
                        via-th-primary-medium to-th-primary-light
                        antialiased focus:outline-none opacity-20
                        cursor-not-allowed
                        ${loading ? 'animate-shadowGlow' : 'animate-none'}
                        `}

                  >
                        Submit Order
                  </button>
            </div>
      )
      else return (
            <>
                  {loading === true &&
                        <div className='flex items-center justify-center'>
                              <button
                                    className={`
          p-4 lg:px-24 lg:py-12 text-center text-4xl text-th-primary-dark 
          bg-gradient-to-r from-th-primary-dark 
          via-th-primary-medium to-th-primary-light
          antialiased focus:outline-none opacity-20
          cursor-not-allowed
          ${loading ? 'animate-shadowGlow' : 'animate-none'}
          `}

                              >
                                    Submit Order
                              </button>
                        </div>
                  }
                  {loading === false &&

                        <div className='flex items-center justify-center'>
                              <button
                                    className={`
                              p-4 lg:px-24 lg:py-12 text-center text-4xl 
                              text-th-primary-dark 
                              bg-gradient-to-r from-th-primary-dark via-th-primary-medium to-th-primary-light
                              hover:ring-8 ring-offset-th-primary-medium
                              rounded-md
                              transform  hover:scale-110
                              transition duration-300 ease-in-out
                              antialiased focus:outline-none
      
                              `}
                                    onClick={clickHandler}
                              >
                                    Submit Order
                              </button>
                        </div>
                  }
            </>
      )
}