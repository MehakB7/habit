"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import RadioButton from "@/components/molecules/radioButton";
import { UpdateModalProps } from "./type";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";
import { lang } from '@/lib/lang';
import { YES_NO_OPTIONS } from "@/lib/constants";
import { HabitType } from "../HabitTable/types";
import { useEffect } from "react";

export function UpdateHabitModal({isOpen, onClose, notes, measurable, onHabitUpdate, value}: UpdateModalProps) {
  const {
    control,
    handleSubmit,
    reset
  } = useForm({
    defaultValues:{
      note: notes,
      value: value,
    },
  });


  useEffect(()=>{
    reset({note: notes, value: value});
  }, [isOpen])

  const onUpdate = (data: {note:string, value: number}) => {
    onHabitUpdate(data.note,  +data.value);
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="flex items-center space-x-8 pt-4">
          <form onSubmit={handleSubmit(onUpdate)} className="space-y-4 w-full">
            <Controller
              name="note"
              control={control}
              render={({ field }) => <Textarea id="note" {...field} placeholder={lang.NOTE_PLACEHOLDER} />}
            />

            {measurable == HabitType.YES ? (
              <div className="mt-4 flex flex-col gap-4 items-start">
                <Controller
                  name="value"
                  control={control}
                  render={({ field }) => (
                    <Input type="number" id="value" {...field} placeholder={lang.VALUE_PLACEHOLDER} />
                  )}
                />
                <Button type="submit">{lang.SAVE_BUTTON}</Button>
              </div>
            ) : (
              <div className="mt-4 flex flex-col gap-4 items-start">
                <Label>{lang.DID_YOU_CRUSH_IT_LABEL}</Label>
                <Controller
                  name="value"
                  control={control}
                  render={({ field }) => (
                    <RadioButton
                      onValueChange={field.onChange}
                      defaultValue={"" + field.value}
                      options={YES_NO_OPTIONS}
                      className="flex"
                    />
                  )}
                />
                <Button type="submit">{lang.SAVE_BUTTON}</Button>
              </div>
            )}
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}