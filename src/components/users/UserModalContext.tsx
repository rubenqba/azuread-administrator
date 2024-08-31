// ModalContext.tsx
import { getAllTeams } from "@action/teams";
import { Team } from "@model/teams";
import { User } from "@model/users";
import { useDisclosure } from "@nextui-org/react";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

interface UserModalContextProps {
  openModal: (record: User | null, onSuccess?: () => void) => void;
  closeModal: () => void;
  isOpen: boolean;
  onSuccess?: () => void;
  record: User | null;
  teams: Team[];
}

const ModalContext = createContext<UserModalContextProps | undefined>(undefined);

export const UserModalProvider = ({ children }: { children: ReactNode }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [record, setRecord] = useState<User | null>(null);
  const [onSuccess, setOnSuccess] = useState<(() => void) | undefined>();
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const { data } = await getAllTeams();
      setTeams(data ?? []);
    };
    fetchTeams();
  }, []);

  const openModal = (record: User | null, onSuccessCallback?: () => void) => {
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

  const memoizedTeams = useMemo(() => teams, [teams]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isOpen, onSuccess, record, teams: memoizedTeams }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useUserModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useUserModal must be used within a UserModalProvider");
  }
  return context;
};
