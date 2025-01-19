"use client";
import React, { useEffect } from "react";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { CellCallbackData, HabitDataType, HabitDataValue, HabitType } from "./types";
import HabitCell from "./HabitCell";
import dynamic from 'next/dynamic';
import { Trash2Icon } from "lucide-react";

import { UpdateHabitModal } from "../HabitUpdateModal";
import { useHabitContext } from "../HabitContext";
import EmptyTable from "../EmptyTable/noData";


const HabitList = () => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const { habits:localHabits, setHabits } = useHabitContext();
  const [open, setOpen] = React.useState(false);

  const getDayName = (date: Date) => {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return dayNames[date.getDay()];
  };
  const [parent, habits, setAction] = useDragAndDrop<HTMLTableSectionElement, HabitDataType>(localHabits);
  const [currentHabit, setCurrentHabit] = React.useState<CellCallbackData | null>(null);


  useEffect(() => {
    setAction(localHabits);
  }, [localHabits]);


  const getHabitValue = (value: HabitDataValue[], date:  Date)=>{
    
     const item =   value.find((v) => {
        return v.date === date.toISOString().split("T")[0];
    })

    return {
      value: item?.value || 0,
      notes: item?.note || "",
    }
  }


  const onHabitCellClick = (habit: CellCallbackData) => {
    setCurrentHabit(habit);
    setOpen(true);

  }

  const onHabitUpdate = (note: string, value: number) => {
    if (!currentHabit) return;

    const updatedHabits = habits.map((habit) => {
      if (habit.id === currentHabit.habitId) {
        const date = currentHabit.date.toISOString().split("T")[0];
        const existingValueIndex = habit.value.findIndex((v) => v.date === date);
        if (existingValueIndex !== -1) {
          habit.value[existingValueIndex] = { ...habit.value[existingValueIndex], note, value };
        } else {
          habit.value.push({ 
             date,
             note,
             value
             });
        }
      }
      return habit;
    });

    setHabits(updatedHabits);
    setOpen(false);
  };


  const hasGoalAchieved = (targetType: string, target:string, value:number) => {
    if(targetType === "At Most"){
      return value <= +target;
    }else{
      return value >= +target;
  }
}


if(habits.length === 0){
  return <EmptyTable />
}

  return (
<div  >
  
<table className="w-full p-4 mt-8">
  <thead>
    <tr>
      <th className="text-gray-300 w-[200px] text-left">Habit Name</th>
      {Array.from({ length: daysInMonth }, (_, i) => {
          const date = new Date(currentYear, currentMonth, i + 1);
          return (
            <th key={i + 1} className="text-gray-300">
              <span>{date.getDate()}</span>
              <br/>
              <span>{getDayName(date)}</span>
            </th>
          );
        })}
    </tr>
  </thead>
  <tbody ref={parent}>
  {habits.map((habit: HabitDataType) => (
        <tr className={``} data-label={habit.id} key={habit.id}>
          <td className={`w-[200px] text-${habit.color}-500`}>{habit.name}</td>
          {Array.from({ length: daysInMonth }, (_, i) => {
            const habitValue = getHabitValue(habit.value, new Date(currentYear, currentMonth, i + 1));
            return (
              <HabitCell key={i} 
              {...habitValue}
                measurable={habit.measurable}
                unit={habit.unit || ""}
                isCompleted={habit.measurable == HabitType.YES ? hasGoalAchieved(habit.targetType||"", habit.target || "0", habitValue.value): true}
                color={habit.color}
                 onClick={()=> {onHabitCellClick({
                  habitId: habit.id, date: new Date(currentYear, currentMonth, i + 1)
                  , ...habitValue,
                   measurable: habit.measurable})}} 
                />
          )})}
          <Trash2Icon className="w-6 h-6 text-red-500" onClick={()=>setHabits(habits.filter((h)=> h.id !== habit.id))}/>
        </tr>
      ))}
  </tbody>
</table>
<UpdateHabitModal
 isOpen={open} 
 measurable={currentHabit?.measurable || HabitType.NO}
 value={currentHabit?.value || 0}
 notes={currentHabit?.notes || ""}
 onClose={()=>setOpen(false)}
  onHabitUpdate={onHabitUpdate} />
</div>
  );
};
export default dynamic(() => Promise.resolve(HabitList), { ssr: false });
