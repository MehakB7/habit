"use client";
import React from 'react'
import {lang} from '@/lib/lang';
import { CreateHabitModal } from '@/components/organism/HabitModal/HabitModal';
import HabitList from '@/components/organism/HabitTable';
import { HabitProvider } from '@/components/organism/HabitContext';

const DailyHabits = () => {
  return (
    <div className='container mx-auto'>
      <HabitProvider>
        <div className='flex justify-between items-center mt-4'>
        <h1 className='text-lg font-bold'>{lang.APP_TITLE}</h1>
        <CreateHabitModal/>
        </div>
        <HabitList/>
        </HabitProvider>
    </div>
  )
}


export default DailyHabits