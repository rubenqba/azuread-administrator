"use client";

import { Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, useDisclosure, User } from "@nextui-org/react";
import React, { Key, useCallback, useState } from "react";
import { Client, StatusColorMap } from "@model/users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import ClientEditModal from "./ClientEditModal";

type UserTableProps = {
  headerTitle: string;
  users: Client[];
};

type IndexableClient = Client & {
  [key: string]: any;
};

const columns = [
  { name: "Name", uid: "name" },
  { name: "Team", uid: "team" },
  { name: "Roles", uid: "roles" },
  { name: "Actions", uid: "actions" },
];

const UserTable = ({ users, headerTitle }: Readonly<UserTableProps>) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [toEdit, setToEdit] = useState<Client>();
  const renderCell = useCallback((user: IndexableClient, columnKey: string | number) => {
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{
              radius: "lg",
              src: `https://i.pravatar.cc/150?u=${user.email}`,
            }}
            description={user.email}
            name={`${user.firstName} ${user.lastName}`}
          >
            {user.email}
          </User>
        );
      case "team":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{user.team}</p>
            <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
          </div>
        );
      case "roles":
        const roles = user.roles ?? [];
        return <div className="flex gap-1">
          {roles.map((role) => (
            <Chip
              className="capitalize"
              color={StatusColorMap[role]}
              size="sm"
              variant="flat"
              key={`${user.id}-${role}`}
            >
              {role}
            </Chip>
          ))}
        </div>;
      case "actions":
        return (
          <div className="relative flex justify-end gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <FontAwesomeIcon icon={faEye} />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <FontAwesomeIcon icon={faEdit} />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
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

  const editClient = (key: Key) => {
    setToEdit(users.find((u) => u.id === key));
    onOpen();
  };

  return (
    <section>
      <h1>{headerTitle}</h1>
      <Table
        aria-label="Client list"
        // selectionMode="multiple"
        // selectionBehavior="toggle"
        onRowAction={editClient}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No users to display."} items={users}>
          {(item) => (
            <TableRow key={item.id} data-key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* <ClientEditModal isOpen={isOpen} onChange={onOpenChange} client={toEdit} /> */}
    </section>
  );
};

export default UserTable;
