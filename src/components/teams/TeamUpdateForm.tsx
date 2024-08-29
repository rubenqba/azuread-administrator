import FormSubmitButton from "@component/FormSubmitButton";
import { faPeopleGroup, faCirclePlay, faHandHoldingDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Team, TeamEditValidatorSchema } from "@model/teams";
import { UserEditFormSchema } from "@model/users";
import { Button, Input, ModalBody, ModalFooter, ModalHeader, Select, SelectItem } from "@nextui-org/react";
import { Control, Controller, useForm, useFormState } from "react-hook-form";
import { z } from "zod";
import { useTeamModal } from "./TeamModalContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { wrapObjectIntoFormData } from "@lib/utils";
import { createTeam, updateTeam } from "@action/teams";
import { toast } from "react-toastify";
import { FormErrorMessage } from "@component/ToastContent";
import { Plan } from "@model/plans";

type TeamUpdateFormProps = {
  team: Team | null;
  plans: Plan[];
};

export function TeamUpdateForm({ team, plans }: Readonly<TeamUpdateFormProps>) {
  const { onSuccess, closeModal } = useTeamModal();
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof TeamEditValidatorSchema>>({
    resolver: zodResolver(TeamEditValidatorSchema),
    defaultValues: { id: team?.id, name: team?.name, plan: team?.plan?.id },
  });

  const submitForm = async (data: z.infer<typeof TeamEditValidatorSchema>) => {
    console.debug(data);
    const body = wrapObjectIntoFormData(data);
    console.debug("send body: ", body);
    const res = data.id ? await updateTeam(body) : await createTeam(body);
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
        {!team ? "Create" : "Edit"} team {team?.name}
      </ModalHeader>
      <ModalBody>
        <Input type="hidden" {...register("id")} />
        <Input
          autoFocus
          endContent={<FontAwesomeIcon icon={faPeopleGroup} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
          label="Team name"
          placeholder="Enter team name"
          variant="bordered"
          {...register("name")}
          isInvalid={!!errors.name}
          errorMessage={errors.name?.message}
          required
        />
        <Controller
          control={control}
          name="plan"
          render={({ field: { onChange, onBlur, value } }) => (
            <Select
              endContent={<FontAwesomeIcon icon={faHandHoldingDollar} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
              label="Subscription plan"
              placeholder="Select subscription plan"
              variant="bordered"
              items={plans}
              selectionMode="single"
              onSelectionChange={(keys) => onChange(keys.currentKey)}
              onClose={onBlur}
              selectedKeys={value ? new Set([value]) : undefined}
              errorMessage={errors.plan?.message}
              isInvalid={!!errors.plan}
            >
              {(plan) => <SelectItem key={plan.id}>{plan.name}</SelectItem>}
            </Select>
          )}
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
