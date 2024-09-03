"use client";

import { Button, Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react";
import React, { Key, useCallback } from "react";
import { User, StatusColorMap } from "@model/users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import UserEditModal from "@component/users/UserEditModal";
import { UserModalProvider, useUserModal } from "./UserModalContext";
import { toast } from "react-toastify";
import { deleteUser } from "@action/users";
import { SimpleMessage } from "@component/ToastContent";
import UserAvatar from "@component/UserAvatar";
import Summary from "@component/Summary";
import AuditorCell from "@component/AuditorCell";

type UserTableProps = {
  headerTitle: string;
  users: User[];
};

type IndexableClient = User & {
  [key: string]: any;
};

const columns = [
  { name: "Name", uid: "name" },
  { name: "Team", uid: "team" },
  { name: "Roles", uid: "roles" },
  { name: "Created", uid: "created" },
  { name: "Updated", uid: "updated" },
  { name: "Actions", uid: "actions" },
];

const UserTableData = ({ users, headerTitle }: Readonly<UserTableProps>) => {
  const { openModal } = useUserModal();
  const renderCell = useCallback((user: IndexableClient, columnKey: string | number) => {
    switch (columnKey) {
      case "name":
        return <UserAvatar displayName={`${user.firstName} ${user.lastName}`} email={user.email} />;
      case "team":
        return <Summary title={user.team?.name} subtitle={user.team?.id} />;
      case "roles":
        return (
          <div className="flex gap-1">
            {user.roles?.map((role) => (
              <Chip className="capitalize" color={StatusColorMap[role]} size="sm" variant="flat" key={`${user.id}-${role}`}>
                {role}
              </Chip>
            ))}
          </div>
        );
      case "created":
        return <AuditorCell auditorName={user.createdBy} auditedAt={user.createdAt} />;
      // case "updated":
      //   return <AuditorCell auditorName={user.updatedBy} auditedAt={user.updatedAt} />;
      case "actions":
        return (
          <div className="relative flex justify-end gap-2">
            <Tooltip content="Delete user">
              <form>
                <Button
                  type="submit"
                  isIconOnly
                  color="danger"
                  variant="flat"
                  aria-label="Delete user"
                  formAction={() => {
                    deleteUser(user.id).then((st) => {
                      if (st.status === "error") {
                        toast.error(<SimpleMessage title={`Failed to delete user`} description={st.message} />);
                      } else {
                        toast.success(`User ${user.name} was deleted`);
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
      case "team":
        return "30%";
      case "roles":
        return "5%"
      case "created":
      case "updated":
        return "20%";
      case "actions":
        return "10%";
      default:
        return null;
    }
  }, []);

  const selectClient = (key: Key) => {
    console.log("Edit user", key);
    const client = users.find((u) => u.id === key);
    if (client) {
      openModal(client, () => toast.success(`User ${client.id} was updated`));
    }
  };

  return (
    <section>
      <h1 className="text-2xl pb-5">{headerTitle}</h1>
      <div className="flex flex-col">
        <div className="flex justify-end gap-2 mb-2">
          <Button color="danger" onClick={() => openModal(null, () => toast.success(`User created`))}>
            Create user
          </Button>
        </div>
        <Table aria-label="Client list" onRowAction={selectClient}>
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid} width={columnWidth(column.uid)}>
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
      </div>
      <UserEditModal />
    </section>
  );
};

export default function UserTable({ users, headerTitle }: Readonly<UserTableProps>) {
  return (
    <UserModalProvider>
      <UserTableData users={users} headerTitle={headerTitle} />
    </UserModalProvider>
  );
}
