"use client";
import React from 'react'
import {lang} from '@/lib/lang';
import { CreateHabitModal } from '@/components/organism/HabitModal/HabitModal';


const DailyHabits = () => {
  return (
    <div className='container mx-auto mt-4'>
        <div className='flex justify-between items-center'>
        <h1 className='text-lg font-bold'>{lang.APP_TITLE}</h1>
        <CreateHabitModal/>
        </div>
    </div>
  )
}


export default DailyHabits