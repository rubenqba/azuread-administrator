import { faPeopleGroup, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Team } from "@model/teams";
import { UserEditFormSchema } from "@model/users";
import { Button, Input, ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";
import { Control, useForm, useFormState } from "react-hook-form";
import { z } from "zod";

type TeamUpdateFormProps = {
  team: Team;
  onClose: () => void;
  onSuccess: () => void;
};

function SubmitButton({ control }: { control: Control<z.infer<typeof UserEditFormSchema>, any> }) {
  const { isSubmitting } = useFormState({ control });
  return (
    <Button color="primary" aria-disabled={isSubmitting} type="submit" isLoading={isSubmitting}>
      Update
    </Button>
  );
}

type FormData = {
  name: string;
  plan: string;
};

export function TeamUpdateForm({ team, onClose, onSuccess }: Readonly<TeamUpdateFormProps>) {
  const { register, control } = useForm();

  return (
    <form>
      <ModalHeader className="flex flex-col gap-1">Edit team {team.name}</ModalHeader>
      <ModalBody>
        <Input type="hidden" {...register("id")} value={team.id} />
        <Input
          autoFocus
          endContent={<FontAwesomeIcon icon={faPeopleGroup} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
          label="Team name"
          placeholder="Enter team name"
          variant="bordered"
          {...register("name")}
          value={team.name}
          errorMessage="Team name is required"
          required
        />
        <Input
          endContent={<FontAwesomeIcon icon={faCirclePlay} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
          label="Subscription plan"
          placeholder="Enter subscription plan name"
          variant="bordered"
          {...register("plan")}
          value={team.plan}
          errorMessage="Subscription plan is invalid"
        />
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onPress={onClose}>
          Close
        </Button>
        <SubmitButton control={control} />
      </ModalFooter>
    </form>
  );
}
