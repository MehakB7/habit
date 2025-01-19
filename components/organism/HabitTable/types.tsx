export enum HabitType {
  YES = "yes",
  NO = "no",
}


export interface HabitDataValue {
  date: string;
  value: number;
  note: string;
}

export interface HabitDataType {
  id: string;
  name: string;
  question: string;
  measurable: HabitType;
  unit?: string;
  target?: string;
  targetType?: "At Most" | "At Least";
  color: string;
  createdAt: Date;
  value: HabitDataValue[];
}

export interface CellCallbackData {
  habitId: string;
  date: Date;
  value: number;
  notes: string;
  measurable: HabitType;
}

export  type HabitCellProps ={
    measurable: HabitType;
    value: number;
    onClick: () => void;
    color: string;
    isCompleted: boolean;
    unit: string;
    notes: string;
}
