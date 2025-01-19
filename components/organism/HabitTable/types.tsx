export  type HabitDataValue = {
    date: string;
    value: number;
    note: string;
}

export  type HabitDataType ={
    name: string;
    measurable: boolean;
    color: string;
    id: string;
    createdAt: string;
    value: Array<HabitDataValue>;
}

export  type HabitCellProps ={
    measurable: boolean;
    value: number;
    onClick: () => void;
    color: string;
}