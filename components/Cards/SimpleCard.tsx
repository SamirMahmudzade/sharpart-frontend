import React from 'react'
import { SimpleCardProps } from '../../interfaces/cards'

export default function SimpleCard({ title, body }: SimpleCardProps): JSX.Element {

      if (title && body) return (
            <div className=" 
            flex
            flex-col
            space-y-1
            items-center justify-center 
            md:space-y-2
            lg:space-y-8
            lg:py-6
            lg:px-6
            md:px-4
            md:py-4
            sm:px-2
            sm:py-2
            rounded-lg
            shadow-lg
            bg-th-foreground
            ">
                  <div className=" " >
                        <p className=" text-center text-sm sm:text-base md:text-lg lg:text-2xl text-th-primary-light ">
                              {title}
                        </p>
                  </div>
                  <div className=""  >
                        <p className="  text-center text-xs sm:text-sm lg:text-lg font-thin  text-th-primary-light  break-words">
                              {body}
                        </p>
                  </div>
            </div>
      )
      
      else return <div className="display-none"></div>
}