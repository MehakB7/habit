import { HabitDataType } from "@/components/organism/HabitTable/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getDayName = (date: Date) => {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return dayNames[date.getDay()];
};

export const calculateStates = (habit: HabitDataType) => {
  const totalDaysFromStart = (startDate: Date) => {
    const today = new Date();
    const timeDiff = today.getTime() - startDate.getTime();
    return Math.floor(timeDiff / (1000 * 3600 * 24)) + 1;
  };

  const totalDaysDone = (values: { date: string; value: number, note:string }[]) => {
   return values.reduce((prev, {value}) => prev + value, 0);
  };

  const bestStreak = (values: { date: string; value: number, note:string }[]) => {
    let maxStreak = 0;
    let currentStreak = 0;
    let lastDate: Date | null = null;
 

    values.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });


    values.forEach((entry) => {
      const currentDate = new Date(entry.date);
      if (lastDate) {
        const diff = (currentDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24);
        if (diff === 1 && entry.value > 0) {
          currentStreak++;
        } else {
          currentStreak = 1;
        }
      } else {
        currentStreak = 1;
      }
      lastDate = currentDate;
      if (currentStreak > maxStreak) {
        maxStreak = currentStreak;
      }
    });

    return maxStreak;
  };

  const totalDays = totalDaysFromStart(new Date(habit.createdAt));
  const daysDone = totalDaysDone(habit.value);
  const streak = bestStreak(habit.value);

  return {
    totalDays,
    daysDone,
    streak,
  };
};

export const dayDiff = (date1: Date, date2: Date) => {
  const days=  Math.floor((date1.getTime() - date2.getTime()) / (60*60*24*1000));
  return days;
}