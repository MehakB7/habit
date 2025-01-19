import React from 'react'
import NoData from "./noData.gif"
import Image from 'next/image'
import { lang } from '@/lib/lang'

const EmptyTable = () => {
  return (
    <div className='container mx-auto flex flex-col h-[400px] justify-center items-center'>
        <Image src={NoData} alt="No Data" />
        <h4>
           {lang.EMPTY_STATE}
        </h4>
    </div>
  )
}



export default EmptyTable