import { Button } from "@nextui-org/react";
import { Control, useFormState } from "react-hook-form";

export default function FormSubmitButton({ control }: { control: Control<any> }) {
  const { isSubmitting } = useFormState({ control });
  return (
    <Button color="primary" aria-disabled={isSubmitting} type="submit" isLoading={isSubmitting}>
      Save
    </Button>
  );
}
