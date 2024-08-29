// ModalContext.tsx
import { getAllPlans } from "@action/plans";
import { Plan } from "@model/plans";
import { Team } from "@model/teams";
import { useDisclosure } from "@nextui-org/react";
import { createContext, memo, ReactNode, useContext, useEffect, useMemo, useState } from "react";

interface TeamModalContextProps {
  openModal: (record: Team | null, onSuccess?: () => void) => void;
  closeModal: () => void;
  isOpen: boolean;
  onSuccess?: () => void;
  record: Team | null;
  plans: Plan[];
}

const ModalContext = createContext<TeamModalContextProps | undefined>(undefined);

export const TeamModalProvider = ({ children }: { children: ReactNode }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [record, setRecord] = useState<Team | null>(null);
  const [onSuccess, setOnSuccess] = useState<(() => void) | undefined>();
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const { data: plans } = await getAllPlans();
      setPlans(plans ?? []);
    };
    fetchPlans();
  }, []);

  const openModal = (record: Team | null, onSuccessCallback?: () => void) => {
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

  const memoizedPlans = useMemo(() => plans, [plans]);

  return <ModalContext.Provider value={{ openModal, closeModal, isOpen, onSuccess, record, plans: memoizedPlans }}>{children}</ModalContext.Provider>;
};

export const useTeamModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useTeamModal must be used within a TeamModalProvider");
  }
  return context;
};
