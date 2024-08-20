import { faPeopleGroup, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Team } from "@model/teams";
import { Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";

type TeamUpdateFormProps = {
  team: Team;
};

type FormData = {
  name: string;
  plan: string;
};

export function TeamUpdateForm({ team }: Readonly<TeamUpdateFormProps>) {
  const { register } = useForm();

  return (
    <>
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
    </>
  );
}
