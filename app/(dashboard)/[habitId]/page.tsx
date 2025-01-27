"use client";
import { useHabitContext } from '@/components/organism/HabitContext';
import { useParams } from 'next/navigation'
import React, { useMemo } from 'react'
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { calculateStates } from '@/lib/utils';


//  TODO : 
// Impement habit details page for measuraing habit
// add trends map for the habit 
// adding habit map details


const HabitDetails = () => {

  const params = useParams();

  const {habitId} = params;

  const {habits} = useHabitContext();

  const habitData = useMemo(()=>{
    return habits.find(habit=>habit.id === habitId);

  }, [habitId])

  const habitStats = useMemo(()=>{
    if(!habitData) return null;
    return calculateStates(habitData);
  }, 
  [habitData])


  console.log(habitData,habits,params);

  const color = `text-${habitData?.color}-500`

  return (
    <div className='px-20 py-5'>
      <Link href={`/`}>
      <ArrowLeft className="w-8 h-8"  />
      </Link>
      <div className='mt-8'>
      <h1 className='text-lg font-bold'>{habitData?.name}</h1>
      <p className={`${color}`}>{habitData?.question}</p>
      </div>
      <div className='mt-8 p-4 rounded-xl relative w-full overflow-hidden rounded-3xl border transition duration-300 bg-secondary' >
        <div className='mt-4 flex space-x-4 justify-evenly items-center'>
          <div className='flex flex-col items-center space-y-2'>
            <h2 className='font-bold text-lg'>Total Days </h2>
            <p>{habitStats?.totalDays}</p> 
          </div>
          <div className='flex flex-col items-center space-y-2'>
          <h2 className='font-bold text-lg'>Days Done</h2>
            <p>{habitStats?.daysDone}</p>
          </div>
          <div className='flex flex-col items-center space-y-2'>
          <h2 className='font-bold text-lg'>Best Streak</h2>
            <p>{habitStats?.streak}</p>
          </div>
        </div>
      </div>
    </div>
  )
}


export default HabitDetails