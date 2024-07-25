import { faPerson, faEnvelope, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Team } from "@model/teams";
import { Client } from "@model/users";
import { Input, Select, SelectItem, Checkbox } from "@nextui-org/react";
import { useForm } from "react-hook-form";

type ClientUpdateFormProps = {
  client: Client;
  teams: Team[];
};

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  teamId: string;
  isPrivileged: boolean;
};

export function ClientUpdateForm({ client, teams }: Readonly<ClientUpdateFormProps>) {
  const { register } = useForm();

  return (
    <>
      <Input type="hidden" {...register("id")} value={client.id} />
      <Input
        autoFocus
        endContent={<FontAwesomeIcon icon={faPerson} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
        label="First name"
        placeholder="Enter client first name"
        variant="bordered"
        {...register("firstName")}
        value={client.firstName}
        errorMessage="First name is required"
        required
      />
      <Input
        endContent={<FontAwesomeIcon icon={faPerson} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
        label="Last name"
        placeholder="Enter client last name"
        variant="bordered"
        {...register("lastName")}
        value={client.lastName}
        errorMessage="Last name is required"
        required
      />
      <Input
        endContent={<FontAwesomeIcon icon={faEnvelope} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
        label="Email"
        placeholder="Enter your email"
        variant="bordered"
        {...register("email")}
        value={client.email}
        errorMessage="Email is required and must be valid"
        required
      />
      <Select
        endContent={<FontAwesomeIcon icon={faPeopleGroup} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
        label="Team"
        placeholder="Select user team"
        variant="bordered"
        items={teams}
        {...register("teamId")}
        errorMessage="Team is required"
        required
        value={client.team}
      >
        {(team) => <SelectItem key={team.id}>{team.name}</SelectItem>}
      </Select>
      <Checkbox {...register("isPrivileged")} value={"true"}>Privileged user?</Checkbox>
    </>
  );
}
