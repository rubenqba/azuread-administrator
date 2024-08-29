import { Modal, ModalContent } from "@nextui-org/react";
import React from "react";
import { PlanUpdateForm } from "./PlanUpdateForm";
import { usePlanModal } from "./PlanModalContext";


function PlanEditModal() {
  const { record: plan, isOpen, closeModal } = usePlanModal();

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={closeModal} placement="top-center" backdrop="blur">
      <ModalContent>{(onClose) => <PlanUpdateForm plan={plan} />}</ModalContent>
    </Modal>
  );
}

export default PlanEditModal;
