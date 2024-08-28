import { Client } from "@model/users";
import { Modal, ModalContent } from "@nextui-org/react";
import { ClientUpdateForm } from "./ClientUpdateForm";
import { useUserEditModal } from "./ClientEditModalContext";
import { Team } from "@model/teams";

type ClientEditModalProps = {
  teams: Team[];
};

export default function ClientEditModal({ teams }: Readonly<ClientEditModalProps>) {
  const { record: client, isOpen, closeModal } = useUserEditModal();

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={closeModal} placement="top-center" backdrop="blur">
      <ModalContent>{(onClose) => <ClientUpdateForm client={client} teams={teams} />}</ModalContent>
    </Modal>
  );
}
