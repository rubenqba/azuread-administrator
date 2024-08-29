"use client";

import { Button, Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react";
import React, { Key, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import TeamEditModal from "./TeamEditModal";
import { Team } from "@model/teams";
import { TeamModalProvider, useTeamModal } from "./TeamModalContext";
import { toast } from "react-toastify";
import { deleteTeam } from "@action/teams";
import { SimpleMessage } from "@component/ToastContent";
import AuditorCell from "@component/AuditorCell";
import Summary from "@component/Summary";

type TeamsTableProps = {
  headerTitle: string;
  list: Team[];
};

type IndexableTeam = Team & {
  [key: string]: any;
};

const columns = [
  { name: "Name", uid: "name" },
  { name: "Subscription plan", uid: "plan" },
  { name: "Created by", uid: "created" },
  { name: "Updated by", uid: "updated" },
  { name: "Actions", uid: "actions" },
];

const TeamTableData = ({ list, headerTitle }: Readonly<TeamsTableProps>) => {
  const { openModal } = useTeamModal();
  const renderCell = useCallback((team: IndexableTeam, columnKey: string | number) => {
    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{team.name}</p>
            <p className="text-bold text-sm capitalize text-default-400">{team.id}</p>
          </div>
        );
      case "plan":
        console.debug("team.plan", team.plan);
        return (<Summary title={team.plan?.name} subtitle={team.plan?.id} />);
      case "created":
        return <AuditorCell auditorName={team.createdBy} auditedAt={team.createdAt} />;
      case "updated":
        return <AuditorCell auditorName={team.updatedBy} auditedAt={team.updatedAt} />;
      case "actions":
        return (
          <div className="relative flex justify-end gap-2">
            <Tooltip content="Delete plan">
              <form>
                <Button
                  type="submit"
                  isIconOnly
                  color="danger"
                  variant="flat"
                  aria-label="Delete plan"
                  formAction={() => {
                    deleteTeam(team.id).then((st) => {
                      if (st.status === "error") {
                        toast.error(<SimpleMessage title={`Failed to delete plan`} description={st.message} />);
                      } else {
                        toast.success(`Team ${team.name} was deleted`);
                      }
                    });
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </form>
            </Tooltip>
          </div>
        );
      default:
        return <span />;
    }
  }, []);
  const columnWidth = useCallback((columnKey: string | number) => {
    switch (columnKey) {
      case "name":
        return "30%";
      case "plan":
      case "created":
      case "updated":
        return "20%";
      case "actions":
        return "10%";
      default:
        return null;
    }
  }, []);

  const selectTeam = (key: Key) => {
    console.log("Selected team", key);
    const team = list.find((u) => u.id === key);
    if (team) {
      openModal(team, () => toast.success(`Team ${team.name} was updated`));
    }
  };

  const createTeam = () => {
    openModal(null, () => toast.success(`Team created`));
  };

  return (
    <section>
      <h1 className="text-2xl pb-5">{headerTitle}</h1>
      <div className="flex flex-col">
        <div className="flex justify-end gap-2 mb-2">
          <Button color="danger" onClick={createTeam}>
            Create team
          </Button>
        </div>
        <Table aria-label="Registered teams" onRowAction={selectTeam}>
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid} width={columnWidth(column.uid)}>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"No teams to display."} items={list}>
            {(item) => (
              <TableRow key={item.id} data-key={item.id}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TeamEditModal />
    </section>
  );
};

export default function TeamTable({ list, headerTitle }: Readonly<TeamsTableProps>) {
  return (
    <TeamModalProvider>
      <TeamTableData list={list} headerTitle={headerTitle} />
    </TeamModalProvider>
  );
}
