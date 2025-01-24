import { HabitDataType } from "../HabitTable/types";

export  type EditHabitModalProps = Omit<HabitDataType, "value" | "createdAt"> & {
    open: boolean;
    setOpen: (value: boolean) => void;
}