import { faHandHoldingDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Plan, PlanEditFormSchema } from "@model/plans";
import { Button, Input, ModalBody, ModalFooter, ModalHeader, Textarea } from "@nextui-org/react";
import { Control, useForm, useFormState } from "react-hook-form";
import { z } from "zod";
import { usePlanModal } from "./PlanModalContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { wrapObjectIntoFormData } from "@lib/utils";
import { createPlan, updatePlan } from "@action/plans";
import { toast } from "react-toastify";
import { FormErrorMessage } from "@component/ToastContent";
import FormSubmitButton from "@component/FormSubmitButton";

type PlanUpdateFormProps = {
  plan: Plan | null;
};

export function PlanUpdateForm({ plan }: Readonly<PlanUpdateFormProps>) {
  const { onSuccess, closeModal } = usePlanModal();
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof PlanEditFormSchema>>({
    resolver: zodResolver(PlanEditFormSchema),
    defaultValues: { ...plan },
  });

  const submitForm = async (data: z.infer<typeof PlanEditFormSchema>) => {
    console.debug(data);
    const body = wrapObjectIntoFormData(data);
    console.debug("send body: ", body);
    const res = data.id ? await updatePlan(body) : await createPlan(body);
    if (res.status === "success") {
      if (onSuccess) {
        console.debug("calling onSuccess");
        onSuccess();
      }
      closeModal();
    } else {
      toast.error(<FormErrorMessage error={res} />);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <ModalHeader className="flex flex-col gap-1">
        {!plan ? "Create" : "Edit"} plan {plan?.name}
      </ModalHeader>
      <ModalBody>
        <Input type="hidden" {...register("id")} />
        <Input
          autoFocus
          endContent={
            <FontAwesomeIcon icon={faHandHoldingDollar} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          label="Plan name"
          placeholder="Enter plan name"
          variant="bordered"
          {...register("name")}
          isInvalid={!!errors.name}
          errorMessage={errors.name?.message}
          required
        />
        <Textarea
          {...register("description")}
          variant="bordered"
          label="Description"
          placeholder="Enter plan description"
          isInvalid={!!errors.description}
          errorMessage={errors.description?.message}
          className="width-full"
        />
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onPress={closeModal}>
          Close
        </Button>
        <FormSubmitButton control={control} />
      </ModalFooter>
    </form>
  );
}
