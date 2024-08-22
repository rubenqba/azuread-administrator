import { Client } from "@model/users";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Code } from "@nextui-org/react";
import { ClientUpdateForm } from "@component/users/ClientUpdateForm";
import { updateClient } from "@action/clients";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import { FormStatus } from "@model/forms";

type ClientEditModalProps = {
  isOpen: boolean;
  onChange: () => void;
  client?: Client;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button color="primary" aria-disabled={pending} type="submit" isLoading={pending}>
      Update
    </Button>
  );
}

function ClientEditModal({ isOpen, onChange, client }: Readonly<ClientEditModalProps>) {
  const [state, formAction] = useFormState<FormStatus | null, FormData>(updateClient, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state && state?.status === "success") {
      // apply logic here
      // if (formRef.current) requestFormReset(formRef.current);
      onChange();
    }
  }, [state]);

  if (!client) return null;

  return (
    <Modal isOpen={isOpen} onOpenChange={onChange} placement="top-center" backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <form ref={formRef} action={formAction}>
            <ModalHeader className="flex flex-col gap-1">
              Edit user {client.firstName} {client.lastName}
            </ModalHeader>
            <ModalBody>
              <ClientUpdateForm client={{ ...client }} />
            </ModalBody>
            <ModalFooter>
              {state?.status === "error" && <Code>{state.message}</Code>}
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <SubmitButton />
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ClientEditModal;
