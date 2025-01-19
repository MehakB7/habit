"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { schema } from "./validation";
import { Label } from "@/components/ui/label";
import RadioButton from "@/components/molecules/radioButton";
import SelectBox from "@/components/molecules/selectBox";
import { ErrorMessage } from "@/components/ui/errorMessage";

export function CreateHabitModal() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues:{
      name:"",
      question:"",
      unit: "",
      target: 0,
      targetType: "At Most" as "At Most" | "At Least",
      isMeasurable: "no" as "yes" | "no",
      color: "rose"
    },
    resolver: zodResolver(schema),
  });

  const isMeasurable = watch("isMeasurable") === "yes";

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Habit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Habit </DialogTitle>
          <DialogDescription>
            Create a new habit to track your progress.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
            <div>
              <Label htmlFor="name">Habit Name</Label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => <Input id="name" {...field} placeholder="eg:Walk 10,000 steps" />}
              />
              {errors.name && <ErrorMessage message={"" + errors?.name?.message}/> }
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Controller
                name="question"
                control={control}
                render={({ field }) => <Input id="question" {...field} placeholder="eg: Am I healthy" />}
              />
              {errors.question && (
                <ErrorMessage message={"" + errors?.question?.message}/> 
              )}
            </div>

            <div>
              <label>Is it a measurable habit?</label>
              <Controller
                name="isMeasurable"
                control={control}
                render={({ field }) => (
                 <RadioButton 
                 onValueChange={field.onChange}
                 defaultValue={field.value}
                  options={[
                    {value: "yes", label: "Yes"},
                    {value: "no", label: "No"}
                  ]}
                  className="flex"
                  />
                )}
              />
              {errors.isMeasurable && (
                <ErrorMessage message={"" + errors?.isMeasurable?.message}/> 
              )}
            </div>

            {isMeasurable && (
              <>
                <div>
                  <Label htmlFor="unit">Unit</Label>
                  <Controller
                    name="unit"
                    control={control}
                    render={({ field }) => <Input id="unit" {...field} placeholder="eg: mile" />}
                  />
                  {errors.unit && (
                <ErrorMessage message={"" + errors?.unit?.message}/> 
              )}
                </div>
                <div>
                  <Label htmlFor="unit">Target</Label>
                  <Controller
                    name="target"
                    control={control}
                    render={({ field }) => (
                      <Input type="number" id="target" {...field} placeholder="eg: 50" />
                    )} 
                  />
                  {errors.target &&<ErrorMessage message={"" + errors?.target?.message}/> }
                </div>
                <div>
                  <Label htmlFor="unit">Target Type</Label>
                  <Controller
                    name="targetType"
                    control={control}
                    render={({ field }) => (
                      <SelectBox 
                      value={field.value||""}
                      placeholder={"Select Target Type"} 
                       error={Boolean(errors.targetType)} errorMessage={""+errors?.targetType?.message||""}
                       onValueChange={field.onChange}
                        options={[
                          {value: "At Least", label: "At Least"},
                          {value: "At Most", label: "At Most"},
                        ]}>
                      </SelectBox>
                    )}
                  />
                 
                </div>
              </>
            )}

            <div>
              <Label htmlFor="color">Color</Label>
              <Controller
                name="color"
                control={control}
                render={({ field }) =>
                  <SelectBox 
                value={field.value||""}
                placeholder={"Select Target Type"} 
                 error={Boolean(errors.targetType)} errorMessage={""+errors?.color?.message||""}
                 onValueChange={field.onChange}
                 className={field.value? `bg-${field.value}-500` : ""}
                  options={[
                    {value: "rose", label: "", className:"bg-rose-500 py-2 border focus:bg-rose-200 focus:opacity-70"},
                    {value: "indigo", label: "", className:"bg-indigo-500 py-2  focus:bg-indigo-200 "},
                    {value: "green", label: "", className:"bg-green-500 py-2 focus:bg-green-200 "},
                    {value: "purple", label: "", className:"bg-purple-500 py-2 focus:bg-purple-200 "},
                    {value: "yellow", label: "", className:"bg-yellow-500 py-2 focus:bg-yellow-200 "},
                  ]}>
                </SelectBox>}
              />
            </div>
            <Button type="submit">Create Habit</Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
