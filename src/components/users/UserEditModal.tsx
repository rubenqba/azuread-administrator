import { Modal, ModalContent } from "@nextui-org/react";
import { UserUpdateForm } from "./UserUpdateForm";
import { useUserModal } from "./UserModalContext";

export default function UserEditModal() {
  const { record: user, teams, isOpen, closeModal } = useUserModal();

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={closeModal} placement="top-center" backdrop="blur">
      <ModalContent>{(onClose) => <UserUpdateForm user={user} teams={teams} />}</ModalContent>
    </Modal>
  );
}
