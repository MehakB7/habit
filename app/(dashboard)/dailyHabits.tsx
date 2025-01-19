"use client";
import React from 'react'
import {lang} from '@/lib/lang';
import { CreateHabitModal } from '@/components/organism/HabitModal/HabitModal';
import HabitList from '@/components/organism/HabitTable';

const DailyHabits = () => {
  return (
    <div className='container mx-auto'>
        <div className='flex justify-between items-center'>
        <h1 className='text-lg font-bold'>{lang.APP_TITLE}</h1>
        <CreateHabitModal/>
        </div>
        <HabitList/>
    </div>
  )
}


export default DailyHabits