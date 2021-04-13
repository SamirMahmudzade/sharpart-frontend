import React from 'react'
import {CardProps} from '../../interfaces/cards'
import Card from './ImageCard'

interface Props {
      items: CardProps[]
}

export default function CardGroup({items}: Props): JSX.Element {
      return (
            <div className=" 
            items-center justify-center 
            grid grid-cols-1
            rounded-lg shadow-lg
            p-2
            bg-th-accent-light
            ">
               {items.map((item,  index) => 
                  <Card key={index} title={item.title} body={item.body} img={item.img} />
               )}

            </div>
      )
}