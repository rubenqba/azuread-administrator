"use client";
import { Button, Checkbox, Input } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";

type FormValues = {
  id: string;
  selected: string;
};

export default function CheckboxFormWithSubmit() {
  const { register, handleSubmit, control } = useForm<FormValues>({defaultValues: {
    id: new Date().toISOString(),
    selected: "false"
  }});

  return (
    <form onSubmit={handleSubmit((d) => console.debug(d))}>
      <div className="mt-5 flex flex-col gap-4">
        <Input id={"id"} type="hidden" hidden={true} {...register("id")} />
        <Controller
          control={control}
          name="selected"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Checkbox
              ref={ref}
              onChange={(v) => onChange(`${v.target.checked}`)} // send value to hook form
              onBlur={onBlur} // notify when input is touched/blur
              isSelected={value==="true"}
            >
              Select to test
            </Checkbox>
          )}
        />
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
