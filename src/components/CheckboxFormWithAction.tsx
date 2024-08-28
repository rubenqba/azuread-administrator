"use client";
import { submitForm } from "@action/forms";
import { Controller, Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Input, Switch } from "@nextui-org/react";

type FormValues = {
  id: string;
  selected: string;
};

const formSchema = z.object({
  id: z.string().min(2, {
    message: "ID must be at least 2 characters.",
  }),
  selected: z.boolean().default(false).optional(),
});

export default function CheckboxFormWithAction() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: new Date().toISOString(),
      selected: false,
    },
  });

  return (
    <form
      action={async (data: FormData) => {
        console.debug(Object.fromEntries(data.entries()));
        await submitForm(data);
      }}
    >
      <div className="mt-5 flex flex-col gap-4">
        <Input id={"id"} type="hidden" hidden={true} {...form.register("id")} />
        <Controller
          control={form.control}
          name="selected"
          render={({ field: { onChange, onBlur, value } }) => (
            <Switch onChange={onChange} onBlur={onBlur} checked={value}>
              Privileged user? {`${value}`}
            </Switch>
          )}
        />
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
