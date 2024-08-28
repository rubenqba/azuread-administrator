"use client";
import { Controller, Form, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitForm } from "@action/forms";
import { objectToFormData } from "@lib/utils";
import { Button, Input, Switch } from "@nextui-org/react";

const formSchema = z.object({
  id: z.string().min(2, {
    message: "ID must be at least 2 characters.",
  }),
  selected: z.boolean().default(false),
});

export default function CheckboxFormWithSubmit() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "1",
    },
  });
  const {
    formState: { errors },
  } = form;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.debug(data);
    await submitForm(objectToFormData(data));
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="mt-5 flex flex-col gap-4">
        <Input {...form.register("id")} />
        <p>{errors.id?.message}</p>
        <Controller
          control={form.control}
          name="selected"
          render={({ field: { onChange, onBlur, value } }) => (
            <Switch onChange={onChange} onBlur={onBlur} checked={value}>
              Privileged user? {`${value}`}
            </Switch>
          )}
        />
        <p>{errors.selected?.message}</p>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
