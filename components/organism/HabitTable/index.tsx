"use client";
import React from "react";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { HabitDataType, HabitDataValue } from "./types";
import HabitCell from "./HabitCell";
import useLocalStorage from "@/lib/hooks/useLocalStorage";



/*TODO :
 1: Add model to  update the data
 2. Add delete icon to remove the habit
 3. fix the design so it looks more pretty
 4. Add link to the habit detail page


*/


const HabitList = () => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const [localHabits ] = useLocalStorage('habits', []);

  const getDayName = (date: Date) => {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return dayNames[date.getDay()];
  };
  const [parent, habits] = useDragAndDrop<HTMLTableSectionElement, HabitDataType>(localHabits);


  const getHabitValue = (value: HabitDataValue[], date:  Date)=>{
    
     const item =   value.find((v) => {
        return v.date === date.toISOString().split("T")[0];
    })
    return {
      value: item?.value || 0,
      note: item?.note ||"",
    }
  }


  return (
<div  >
<table className="w-full p-4 mt-8">
  <thead>
    <tr>
      <th>Habit Name</th>
      {Array.from({ length: daysInMonth }, (_, i) => {
          const date = new Date(currentYear, currentMonth, i + 1);
          return (
            <th key={i + 1} className="">
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
          {Array.from({ length: daysInMonth }, (_, i) => (
              <HabitCell key={i} measurable={habit.measurable} {...getHabitValue(habit.value, new Date(currentYear, currentMonth, i + 1))} color={habit.color} onClick={()=> {}} />
          ))}
        </tr>
      ))}
  </tbody>
</table>


</div>
  );
};

export default HabitList;
