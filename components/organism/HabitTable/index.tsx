"use client";
import React, { useEffect } from "react";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import {
  CellCallbackData,
  HabitDataType,
  HabitDataValue,
  HabitType,
} from "./types";
import HabitCell from "./HabitCell";
import dynamic from "next/dynamic";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { UpdateHabitModal } from "../HabitUpdateModal";
import { useHabitContext } from "../HabitContext";
import EmptyTable from "../EmptyTable/noData";
import { ConfimationModal } from "@/components/molecules/confirmationModal";
import { EditHabitModal } from "../HabitModal/EditModal";
import { getDayName } from "@/lib/utils";

const HabitList = () => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const { habits: localHabits, setHabits } = useHabitContext();
  const [open, setOpen] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [currentHabitId, setDeleteHabitId] = React.useState("");
  const [editModal, setEditModal] = React.useState(false);

  const [parent, habits, setAction] = useDragAndDrop<
    HTMLTableSectionElement,
    HabitDataType
  >(localHabits);
  const [currentHabit, setCurrentHabit] =
    React.useState<CellCallbackData | null>(null);

  useEffect(() => {
    setAction(localHabits);
  }, [localHabits]);

  const getHabitValue = (value: HabitDataValue[], date: Date) => {
    const item = value.find((v) => {
      return v.date === date.toISOString().split("T")[0];
    });

    return {
      value: item?.value || 0,
      notes: item?.note || "",
    };
  };

  const onHabitCellClick = (habit: CellCallbackData) => {
    setCurrentHabit(habit);
    setOpen(true);
  };

  const onHabitUpdate = (note: string, value: number) => {
    if (!currentHabit) return;
    const updatedHabits = habits.map((habit) => {
      if (habit.id === currentHabit.habitId) {
        const date = currentHabit.date.toISOString().split("T")[0];
        const existingValueIndex = habit.value.findIndex(
          (v) => v.date === date
        );
        if (existingValueIndex !== -1) {
          habit.value[existingValueIndex] = {
            ...habit.value[existingValueIndex],
            note,
            value,
          };
        } else {
          habit.value.push({
            date,
            note,
            value,
          });
        }
      }
      return habit;
    });

    setHabits(updatedHabits);
    setOpen(false);
  };

  const onEdit = (habitId: string) => {
    setEditModal(true);
    setDeleteHabitId(habitId);
  }

  const hasGoalAchieved = (
    targetType: string,
    target: string,
    value: number
  ) => {
    if (targetType === "At Most") {
      return value <= +target;
    } else {
      return value >= +target;
    }
  };

  if (habits.length === 0) {
    return <EmptyTable />;
  }

  const openDeleteModal = (habitId: string) => {
    setDeleteHabitId(habitId);
    setDeleteModalOpen(true);
  };

  const onDelete = () => {
    setHabits(habits.filter((h) => h.id !== currentHabitId));
    setDeleteModalOpen(false);
  };

  const getEditDetails = () => {
    
    const {id, name, question, target, targetType, measurable, color } = habits.find((habit) => habit.id === currentHabitId) || {};
    
    return { id: id||"",
      name: name||"",
      question: question||"",
      target: target||"",
      targetType: targetType||undefined,
      measurable: measurable|| HabitType.NO,
      color: color||"rose"
     };
  }

  return (
    <div>
      <table className="min-h-[124px] min-w-full mt-8">
        <thead className="bg-secondary">
          <tr className="bg-secondary rounded-lg">
            <th className="w-[200px] text-left rounded-tl-xl p-4 text-sm">
              Habit Name
            </th>
            {Array.from({ length: daysInMonth }, (_, i) => {
              const date = new Date(currentYear, currentMonth, i + 1);
              return (
                <th key={i + 1} className="bg-secondary text-sm">
                  <span>{date.getDate()}</span>
                  <br />
                  <span>{getDayName(date)}</span>
                </th>
              );
            })}
            <th className="text-gray-300 w-[50px] rounded-tr-xl"></th>
          </tr>
        </thead>
        <tbody ref={parent}>
          {habits.map((habit: HabitDataType) => (
            <tr
              className={`even:bg-secondary`}
              data-label={habit.id}
              key={habit.id}
            >
              <td
                className={`w-[200px] text-${habit.color}-500  text-left font-medium p-4 cursor-pointer`}
              >
                {habit.name}
              </td>
              {Array.from({ length: daysInMonth }, (_, i) => {
                const habitValue = getHabitValue(
                  habit.value,
                  new Date(currentYear, currentMonth, i + 1)
                );
                return (
                  <HabitCell
                    key={i}
                    {...habitValue}
                    measurable={habit.measurable}
                    unit={habit.unit || ""}
                    isCompleted={
                      habit.measurable == HabitType.YES
                        ? hasGoalAchieved(
                            habit.targetType || "",
                            habit.target || "0",
                            habitValue.value
                          )
                        : true
                    }
                    color={habit.color}
                    onClick={() => {
                      onHabitCellClick({
                        habitId: habit.id,
                        date: new Date(currentYear, currentMonth, i + 1),
                        ...habitValue,
                        measurable: habit.measurable,
                      });
                    }}
                  />
                );
              })}
              <td>
                <PencilIcon
                  className="w-4 h-4 cursor-pointer text-gray-400 hover:text-red-500  inline-flex mr-2"
                  onClick={() => onEdit(habit.id)}
                />
                <Trash2Icon
                  className="w-4 h-4 cursor-pointer text-gray-400 hover:text-red-500  inline-flex "
                  onClick={() => openDeleteModal(habit.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <UpdateHabitModal
        isOpen={open}
        measurable={currentHabit?.measurable || HabitType.NO}
        value={currentHabit?.value || 0}
        notes={currentHabit?.notes || ""}
        onClose={() => setOpen(false)}
        onHabitUpdate={onHabitUpdate}
      />
      <ConfimationModal
        isOpen={deleteModalOpen}
        cancelCb={() => setDeleteModalOpen(false)}
        confirmCb={onDelete}
        title={"Delete Habit"}
        description={"Are you sure you want to give up on this habit?"}
        cancelText={"Cancel"}
        confirmText={"Delete"}
      />
      <EditHabitModal open={editModal} setOpen={setEditModal}  {...getEditDetails()} />
    </div>
  );
};
export default dynamic(() => Promise.resolve(HabitList), { ssr: false });
