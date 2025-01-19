import React, { createContext, useContext, ReactNode } from 'react';
import useLocalStorage from '@/lib/hooks/useLocalStorage';
import { HabitDataType } from '@/components/organism/HabitTable/types';

interface HabitContextType {
  habits: HabitDataType[];
  setHabits: (habits: HabitDataType[]) => void;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider = ({ children }: { children: ReactNode }) => {
  const [habits, setHabits] = useLocalStorage<HabitDataType[]>('habits', []);

  return (
    <HabitContext.Provider value={{ habits, setHabits}}>
      {children}
    </HabitContext.Provider>
  );
};

export const useHabitContext = () => {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error('useHabitContext must be used within a HabitProvider');
  }
  return context;
};