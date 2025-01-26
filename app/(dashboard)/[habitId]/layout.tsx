
"use client";
import React, { ReactNode } from 'react'
import { HabitProvider } from '@/components/organism/HabitContext'
const layout = ({children}:{ children:ReactNode}) => {
  return (
    <HabitProvider>
        {children}
    </HabitProvider>
  )
}
export default layout