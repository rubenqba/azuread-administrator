// ModalContext.tsx
import { Plan } from "@model/plans";
import { useDisclosure } from "@nextui-org/react";
import { createContext, ReactNode, useContext, useState } from "react";

interface PlanModalContextProps {
  openModal: (record: Plan | null, onSuccess?: () => void) => void;
  closeModal: () => void;
  isOpen: boolean;
  onSuccess?: () => void;
  record: Plan | null;
}

const ModalContext = createContext<PlanModalContextProps | undefined>(undefined);

export const PlanModalProvider = ({ children }: { children: ReactNode }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [record, setRecord] = useState<Plan | null>(null);
  const [onSuccess, setOnSuccess] = useState<(() => void) | undefined>();

  const openModal = (record: Plan | null, onSuccessCallback?: () => void) => {
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

export const usePlanModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("usePlanModal must be used within a PlanModalProvider");
  }
  return context;
};
