
import React, { ReactNode } from 'react'
import Header from '@/components/molecules/header'
const layout = ({children}:{ children:ReactNode}) => {
  return (
    <div>
      <Header/>
        {children}
    </div>
  )
}
export default layout