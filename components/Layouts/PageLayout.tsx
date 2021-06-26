import React from 'react'
import { Childs } from '../../interfaces/childs'



export default function PageLayout({ children }: Childs): JSX.Element {
    return (
            <div className=" 
            grid grid-flow-row gap-4 md:gap-8 lg:gap-16
            justify-center items-center
            ">
                {children}
            </div>
    )
}