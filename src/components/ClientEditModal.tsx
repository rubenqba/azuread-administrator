import { Client } from "@model/users";
import { Modal, ModalContent, ModalHeader, ModalBody, Input, Checkbox, ModalFooter, Button, Select, SelectItem } from "@nextui-org/react";
import TeamService from "@service/teams";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ClientUpdateForm } from "./forms/client";
import { updateClient } from "@action/clients";

type ClientEditModalProps = {
  isOpen: boolean;
  onChange: () => void;
  client?: Client;
};

const teams = new TeamService([
  {
    id: "1",
    name: "Team A",
  },
  {
    id: "2",
    name: "Team B",
  },
]);

function ClientEditModal({ isOpen, onChange, client }: Readonly<ClientEditModalProps>) {
  if (!client) return null;

  return (
    <Modal isOpen={isOpen} onOpenChange={onChange} placement="top-center" backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <form action={updateClient}>
            <ModalHeader className="flex flex-col gap-1">
              Edit user {client.firstName} {client.lastName}
            </ModalHeader>
            <ModalBody>
              <ClientUpdateForm client={client} teams={teams.getAllTeams()} />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button type="submit" color="primary">
                Update
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ClientEditModal;
