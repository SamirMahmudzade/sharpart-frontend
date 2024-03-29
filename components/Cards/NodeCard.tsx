import React from 'react'
import { Childs } from '../../interfaces/childs'

 
interface NodeCardProps extends Childs {
      wFull?: boolean
}
export default function NodeCard({ children, wFull }: NodeCardProps): JSX.Element {

      return (
            <div className={`
            flex
            flex-col
            space-y-2
            items-center justify-center 
            md:space-y-4
            lg:space-y-8
            lg:p-6
            md:p-4
            sm:p-2
            rounded-lg
            shadow-lg
            bg-th-foreground
            ${wFull? `w-full` : `w-auto`}
            `}>
                {children}
            </div>
      )
}