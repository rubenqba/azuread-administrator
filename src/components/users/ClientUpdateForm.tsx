"use client";

import { faPerson, faEnvelope, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getTeams } from "@action/teams";
import { Team } from "@model/teams";
import { Input, Select, SelectItem, Checkbox, Switch } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Controller, useForm, useFormState } from "react-hook-form";
import { Client } from "@model/users";

type FormValues = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  team?: string;
  isPrivileged: boolean;
};

type ClientUpdateFormProps = {
  client: Client;
};

export function ClientUpdateForm({ client }: Readonly<ClientUpdateFormProps>) {
  const [teams, setTeams] = useState<Team[]>([]);
  const { register, control, getValues } = useForm<FormValues>({
    defaultValues: {
      ...client,
      isPrivileged: client.roles?.includes("staff") ?? false,
    },
  });
  const { dirtyFields, touchedFields, validatingFields,  } = useFormState({ control });

  useEffect(() => {
    const loadTeams = async () => {
      const teams = await getTeams();
      setTeams(teams);
    };

    loadTeams();
  }, []);

  useEffect(() => {
    console.debug(getValues("isPrivileged"));
  }, [dirtyFields.isPrivileged]);

  return (
    <>
      <Input type="hidden" {...register("id")} />
      <Input
        autoFocus
        endContent={<FontAwesomeIcon icon={faPerson} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
        label="First name"
        placeholder="Enter client first name"
        variant="bordered"
        {...register("firstName")}
        errorMessage="First name is required"
        required
      />
      <Input
        endContent={<FontAwesomeIcon icon={faPerson} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
        label="Last name"
        placeholder="Enter client last name"
        variant="bordered"
        {...register("lastName")}
        errorMessage="Last name is required"
        required
      />
      <Input
        endContent={<FontAwesomeIcon icon={faEnvelope} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
        label="Email"
        placeholder="Enter your email"
        variant="bordered"
        {...register("email")}
        errorMessage="Email is required and must be valid"
        required
      />
      <Select
        endContent={<FontAwesomeIcon icon={faPeopleGroup} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
        label="Team"
        placeholder="Select user team"
        variant="bordered"
        items={teams}
        {...register("team")}
        errorMessage="Team is required"
        required
      >
        {(team) => <SelectItem key={team.id}>{team.name}</SelectItem>}
      </Select>
      {/* <Switch {...register("isPrivileged")} content="Privileged user?" /> */}
      <Controller
        control={control}
        name="isPrivileged"
        render={({ field: { onChange, onBlur, value } }) => (
          <Switch onChange={onChange} onBlur={onBlur} checked={value}>
            Privileged user? {`${value}`}
          </Switch>
        )}
      />
      {dirtyFields.isPrivileged ? <p>Field is dirty.</p> : null}
      {validatingFields.isPrivileged ? <p>Field is valid.</p> : null}
      {touchedFields.isPrivileged ? <p>Field is touched.</p> : null}
    </>
  );
}
