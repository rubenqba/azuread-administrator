import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import React from "react";
import { updateClient } from "@action/clients";
import { Team } from "@model/teams";
import { TeamUpdateForm } from "./TeamUpdateForm";

type TeamEditModalProps = {
  isOpen: boolean;
  onChange: () => void;
  team?: Team;
};

function TeamEditModal({ isOpen, onChange, team }: Readonly<TeamEditModalProps>) {
  if (!team) return null;

  return (
    <Modal isOpen={isOpen} onOpenChange={onChange} placement="top-center" backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <form action={updateClient}>
            <ModalHeader className="flex flex-col gap-1">
              Edit team {team.name}
            </ModalHeader>
            <ModalBody>
              <TeamUpdateForm team={team} />
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

export default TeamEditModal;
