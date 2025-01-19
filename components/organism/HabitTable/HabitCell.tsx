import React from 'react'
import { Check } from 'lucide-react';
import { HabitCellProps } from './types';

const HabitCell = ({ measurable, value, onClick, color}: HabitCellProps) => {

  const colorClass = value ?  `text-${color}-500` : "text-gray-500";
  return (
    
    <td  className="px-2 py-2 text-center">
      {measurable ? (<span className={`${colorClass} w-6 h-6 `} onClick={onClick}>{value}</span>): 
      <Check className={` ${colorClass} w-6 h-6` } onClick={onClick}/> }
             
   </td>
  )
}

export default HabitCell