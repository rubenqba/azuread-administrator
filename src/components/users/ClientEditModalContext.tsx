// ModalContext.tsx
import { Client } from "@model/users";
import { useDisclosure } from "@nextui-org/react";
import { createContext, ReactNode, useContext, useState } from "react";

interface UserModalContextProps {
  openModal: (record: Client, onSuccess?: () => void) => void;
  closeModal: () => void;
  isOpen: boolean;
  onSuccess?: () => void;
  record: Client | null;
}

const ModalContext = createContext<UserModalContextProps | undefined>(undefined);

export const UserModalProvider = ({ children }: { children: ReactNode }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [record, setRecord] = useState<Client | null>(null);
  const [onSuccess, setOnSuccess] = useState<(() => void) | undefined>();

  const openModal = (record: Client, onSuccessCallback?: () => void) => {
    setRecord(record);
    setOnSuccess(() => onSuccessCallback);
    onOpen();
  };

  const closeModal = () => {
    console.debug("calling closeModal");
    onOpenChange();
    setRecord(null);
    setOnSuccess(undefined);
  };

  return <ModalContext.Provider value={{ openModal, closeModal, isOpen, onSuccess, record }}>{children}</ModalContext.Provider>;
};

export const useUserEditModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useUserEditModal must be used within a UserModalProvider");
  }
  return context;
};
