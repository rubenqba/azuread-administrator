"use client";

import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react";
import React, { Key, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import PlanEditModal from "./PlanEditModal";
import { Plan } from "@model/plans";
import { PlanModalProvider, usePlanModal } from "./PlanModalContext";
import { toast } from "react-toastify";
import { deletePlan } from "@action/plans";
import { SimpleMessage, FormErrorMessage } from "@component/ToastContent";
import AuditorCell from "@component/AuditorCell";

type PlanTableProps = {
  headerTitle: string;
  list: Plan[];
};

type IndexablePlan = Plan & {
  [key: string]: any;
};

const columns = [
  { name: "Name", uid: "name" },
  { name: "Created by", uid: "created" },
  { name: "Updated by", uid: "updated" },
  { name: "Actions", uid: "actions" },
];

const PlanTableData = ({ list, headerTitle }: Readonly<PlanTableProps>) => {
  const { openModal } = usePlanModal();
  const renderCell = useCallback((plan: IndexablePlan, columnKey: string | number) => {
    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-col">
            <p className="text-bold capitalize">{plan.name}</p>
            <p className="text-bold text-sm text-default-400">{plan.description}</p>
          </div>
        );
      case "created":
        return <AuditorCell auditorName={plan.createdBy} auditedAt={plan.createdAt} />;
      case "updated":
        return <AuditorCell auditorName={plan.updatedBy} auditedAt={plan.updatedAt} />;
      case "actions":
        return (
          <div className="relative flex justify-end gap-2">
            {/* <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <FontAwesomeIcon icon={faEye} />
              </span>
            </Tooltip>
            <Tooltip content="Edit plan">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <FontAwesomeIcon icon={faEdit} />
              </span>
            </Tooltip> */}
            <Tooltip content="Delete plan">
              <form>
                <Button
                  type="submit"
                  isIconOnly
                  color="danger"
                  variant="flat"
                  aria-label="Delete plan"
                  formAction={() => {
                    deletePlan(plan.id).then((st) => {
                      if (st.status === "error") {
                        toast.error(<SimpleMessage title={`Failed to delete plan`} description={st.message} />);
                      } else {
                        toast.success(`Plan ${plan.name} was deleted`);
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
        return "40%";
      case "created":
      case "updated":
        return "25%";
      case "actions":
        return "10%";
      default:
        return null;
    }
  }, []);

  const selectPlan = (key: Key) => {
    console.log("Select plan", key);
    const plan = list.find((u) => u.id === key);
    if (plan) {
      openModal(plan, () => toast.success(`Plan ${plan.name} was updated`));
    }
  };

  const createPlan = () => {
    openModal(null, () => toast.success(`Plan created`));
  };

  return (
    <section>
      <h1 className="text-2xl pb-5">{headerTitle}</h1>
      <div className="flex flex-col">
        <div className="flex justify-end gap-2 mb-2">
          <Button color="danger" onClick={createPlan}>
            Create plan
          </Button>
        </div>
        <Table aria-label="Subscription plans" onRowAction={selectPlan} className="flex flex-grow">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid} width={columnWidth(column.uid)}>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"No plans to display."} items={list}>
            {(item) => (
              <TableRow key={item.id} data-key={item.id}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <PlanEditModal />
    </section>
  );
};

export default function PlanTable({ list, headerTitle }: Readonly<PlanTableProps>) {
  return (
    <PlanModalProvider>
      <PlanTableData list={list} headerTitle={headerTitle} />
    </PlanModalProvider>
  );
}
