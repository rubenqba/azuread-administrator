import { Modal, ModalContent } from "@nextui-org/react";
import React from "react";
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
          <TeamUpdateForm team={team} onClose={onClose} onSuccess={onChange} />
        )}
      </ModalContent>
    </Modal>
  );
}

export default TeamEditModal;
