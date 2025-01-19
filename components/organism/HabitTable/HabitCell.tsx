import React from 'react'
import { Check } from 'lucide-react';
import { HabitCellProps, HabitType } from './types';

const HabitCell = ({ measurable, value, onClick, color, isCompleted, notes}: HabitCellProps) => {

  const colorClass = value && isCompleted ?  `text-${color}-500` : "text-gray-500";

  return (
    <td className="px-2 py-2 text-center relative" onClick={onClick}>
     {notes.length > 0 && <span className={`bg-${color}-500 w-1 h-1 rounded absolute right-[10px] top-[2px]`} ></span>}
      {measurable == HabitType.YES ? (<span className={`${colorClass} w-6 h-6 wrap`}>{value}</span>): 
      <Check className={` ${colorClass} w-6 h-6` }/> } 
   </td>
  )
}

export default HabitCell
