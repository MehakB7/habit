import { HabitType } from "../HabitTable/types";

export type UpdateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  notes: string;
  measurable: HabitType;
  value: number;
  onHabitUpdate: (notes: string, value: number) => void;
};
