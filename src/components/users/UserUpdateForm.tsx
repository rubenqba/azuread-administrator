"use client";

import { faPerson, faEnvelope, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Team } from "@model/teams";
import { Control, Controller, useForm, useFormState } from "react-hook-form";
import { User, UserEditFormSchema } from "@model/users";
import { z } from "zod";
import { Button, Input, ModalBody, ModalFooter, ModalHeader, Select, SelectItem, Switch } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser, updateUser } from "@action/users";
import { wrapObjectIntoFormData } from "@lib/utils";
import { useUserModal } from "./UserModalContext";
import { toast } from "react-toastify";
import { FormErrorMessage } from "@component/ToastContent";

type UserUpdateFormProps = {
  user: User | null;
  teams: Team[];
};

function SubmitButton({ control }: Readonly<{ control: Control<z.infer<typeof UserEditFormSchema>, any> }>) {
  const { isSubmitting } = useFormState({ control });
  return (
    <Button color="primary" aria-disabled={isSubmitting} type="submit" isLoading={isSubmitting}>
      Update
    </Button>
  );
}

export function UserUpdateForm({ user, teams }: Readonly<UserUpdateFormProps>) {
  const { onSuccess, closeModal } = useUserModal();

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof UserEditFormSchema>>({
    resolver: zodResolver(UserEditFormSchema),
    defaultValues: {
      ...user,
      team: user?.team?.id,
      isPrivileged: user?.roles?.includes("staff") ?? false,
    },
  });

  const onSubmit = async (data: z.infer<typeof UserEditFormSchema>) => {
    console.debug(data);
    const body = wrapObjectIntoFormData({ ...data, roles: data.isPrivileged ? ["staff", "buyer"] : ["buyer"] });
    console.debug("send body: ", body);
    const res = data.id ? await updateUser(body) : await createUser(body);
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader className="flex flex-col gap-1">
        Edit user {user?.firstName} {user?.lastName}
      </ModalHeader>
      <ModalBody>
        <Input type="hidden" {...register("id")} />
        <Input
          autoFocus
          endContent={<FontAwesomeIcon icon={faPerson} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
          label="First name"
          placeholder="Enter client first name"
          variant="bordered"
          {...register("firstName")}
          errorMessage={errors.firstName?.message}
          isInvalid={!!errors.firstName}
          required
        />
        <Input
          endContent={<FontAwesomeIcon icon={faPerson} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
          label="Last name"
          placeholder="Enter client last name"
          variant="bordered"
          {...register("lastName")}
          errorMessage={errors.lastName?.message}
          isInvalid={!!errors.lastName}
        />
        <Input
          endContent={<FontAwesomeIcon icon={faEnvelope} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
          label="Email"
          placeholder="Enter your email"
          variant="bordered"
          {...register("email")}
          errorMessage={errors.email?.message}
          isInvalid={!!errors.email}
          required
        />
        <Controller
          control={control}
          name="team"
          render={({ field: { onChange, onBlur, value } }) => (
            <Select
              endContent={<FontAwesomeIcon icon={faPeopleGroup} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
              label="Team"
              placeholder="Select user team"
              variant="bordered"
              items={teams}
              selectionMode="single"
              onSelectionChange={(keys) => onChange(keys.currentKey)}
              onClose={onBlur}
              selectedKeys={value ? new Set([value]) : undefined}
              errorMessage={errors.team?.message}
              isInvalid={!!errors.team}
            >
              {(team) => <SelectItem key={team.id}>{team.name}</SelectItem>}
            </Select>
          )}
        />
        <Controller
          control={control}
          name="isPrivileged"
          render={({ field: { onChange, value } }) => (
            <Switch onChange={onChange} isSelected={value}>
              Privileged user?
            </Switch>
          )}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onPress={closeModal}>
          Close
        </Button>
        <SubmitButton control={control} />
      </ModalFooter>
    </form>
  );
}
