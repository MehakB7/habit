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
import { lang } from '@/lib/lang';
import { TARGET_TYPE_OPTIONS, COLOR_OPTIONS } from '@/lib/constants';

export function CreateHabitModal() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      question: "",
      unit: "",
      target: 0,
      targetType: "At Most" as "At Most" | "At Least",
      isMeasurable: "no" as "yes" | "no",
      color: "rose",
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
        <Button variant="outline">{lang.CREATE_HABIT_BUTTON}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{lang.CREATE_HABIT_TITLE}</DialogTitle>
          <DialogDescription>
            {lang.CREATE_HABIT_DESCRIPTION}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
            <div>
              <Label htmlFor="name">{lang.HABIT_NAME_LABEL}</Label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => <Input id="name" {...field} placeholder={lang.HABIT_NAME_PLACEHOLDER} />}
              />
              {errors.name && <ErrorMessage message={"" + errors?.name?.message} />}
            </div>

            <div>
              <Label htmlFor="description">{lang.HABIT_DESCRIPTION_LABEL}</Label>
              <Controller
                name="question"
                control={control}
                render={({ field }) => <Input id="question" {...field} placeholder={lang.HABIT_DESCRIPTION_PLACEHOLDER} />}
              />
              {errors.question && (
                <ErrorMessage message={"" + errors?.question?.message} />
              )}
            </div>

            <div>
              <label>{lang.IS_MEASURABLE_LABEL}</label>
              <Controller
                name="isMeasurable"
                control={control}
                render={({ field }) => (
                  <RadioButton
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    options={[
                      { value: "yes", label: lang.YES_OPTION },
                      { value: "no", label: lang.NO_OPTION },
                    ]}
                    className="flex"
                  />
                )}
              />
              {errors.isMeasurable && (
                <ErrorMessage message={"" + errors?.isMeasurable?.message} />
              )}
            </div>

            {isMeasurable && (
              <>
                <div>
                  <Label htmlFor="unit">{lang.UNIT_LABEL}</Label>
                  <Controller
                    name="unit"
                    control={control}
                    render={({ field }) => <Input id="unit" {...field} placeholder={lang.UNIT_PLACEHOLDER} />}
                  />
                  {errors.unit && (
                    <ErrorMessage message={"" + errors?.unit?.message} />
                  )}
                </div>
                <div>
                  <Label htmlFor="target">{lang.TARGET_LABEL}</Label>
                  <Controller
                    name="target"
                    control={control}
                    render={({ field }) => (
                      <Input type="number" id="target" {...field} placeholder={lang.TARGET_PLACEHOLDER} />
                    )}
                  />
                  {errors.target && <ErrorMessage message={"" + errors?.target?.message} />}
                </div>
                <div>
                  <Label htmlFor="targetType">{lang.TARGET_TYPE_LABEL}</Label>
                  <Controller
                    name="targetType"
                    control={control}
                    render={({ field }) => (
                      <SelectBox
                        value={field.value || ""}
                        placeholder={lang.SELECT_TARGET_TYPE_PLACEHOLDER}
                        error={Boolean(errors.targetType)}
                        errorMessage={"" + errors?.targetType?.message || ""}
                        onValueChange={field.onChange}
                        options={TARGET_TYPE_OPTIONS}
                      />
                    )}
                  />
                </div>
              </>
            )}

            <div>
              <Label htmlFor="color">{lang.COLOR_LABEL}</Label>
              <Controller
                name="color"
                control={control}
                render={({ field }) => (
                  <SelectBox
                    value={field.value || ""}
                    placeholder={lang.SELECT_TARGET_TYPE_PLACEHOLDER}
                    error={Boolean(errors.color)}
                    errorMessage={"" + errors?.color?.message || ""}
                    onValueChange={field.onChange}
                    className={field.value ? `bg-${field.value}-500` : ""}
                    options={COLOR_OPTIONS}
                  />
                )}
              />
            </div>
            <Button type="submit">{lang.SUBMIT_BUTTON}</Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}