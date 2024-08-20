"use client";

import { Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, useDisclosure, User } from "@nextui-org/react";
import React, { Key, useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import TeamEditModal from "./TeamEditModal";
import { SubscriptionColorMap, Team } from "@model/teams";

type TeamsTableProps = {
  headerTitle: string;
  teams: Team[];
};

type IndexableTeam = Team & {
  [key: string]: any;
};

const columns = [
  { name: "Name", uid: "name" },
  { name: "Subscription plan", uid: "plan" },
  { name: "Actions", uid: "actions" },
];

const TeamsTable = ({ teams, headerTitle }: Readonly<TeamsTableProps>) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [toEdit, setToEdit] = useState<Team>();
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
        return team.plan ? (
          <Chip className="capitalize" color={SubscriptionColorMap[team.plan]} size="sm" variant="flat" key={`${team.id}-${team.plan}`}>
            {team.plan}
          </Chip>
        ) : (
          <span />
        );
      case "actions":
        return (
          <div className="relative flex justify-end gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <FontAwesomeIcon icon={faEye} />
              </span>
            </Tooltip>
            <Tooltip content="Edit team">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <FontAwesomeIcon icon={faEdit} />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete team">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <FontAwesomeIcon icon={faTrash} />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return <span />;
    }
  }, []);

  const editTeam = (key: Key) => {
    setToEdit(teams.find((t) => t.id === key));
    onOpen();
  };

  return (
    <section>
      <h1>{headerTitle}</h1>
      <Table
        aria-label="Team list"
        // selectionMode="multiple"
        // selectionBehavior="toggle"
        onRowAction={editTeam}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No teams to display."} items={teams}>
          {(item) => (
            <TableRow key={item.id} data-key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TeamEditModal isOpen={isOpen} onChange={onOpenChange} team={toEdit} />
    </section>
  );
};

export default TeamsTable;
