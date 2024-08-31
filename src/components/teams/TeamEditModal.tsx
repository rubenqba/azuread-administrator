import { Modal, ModalContent } from "@nextui-org/react";
import React from "react";
import { Team } from "@model/teams";
import { TeamUpdateForm } from "./TeamUpdateForm";
import { useTeamModal } from "./TeamModalContext";

function TeamEditModal() {
  const { record: team, plans, isOpen, closeModal } = useTeamModal();

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={closeModal} placement="top-center" backdrop="blur">
      <ModalContent>{(onClose) => <TeamUpdateForm plans={plans} team={team} />}</ModalContent>
    </Modal>
  );
}

export default TeamEditModal;
