import React from "react";
import { formatDistance } from "date-fns";
import { Tooltip } from "@nextui-org/react";

function AuditorCell({ auditorName, auditedAt }: Readonly<{ auditorName: string; auditedAt: string }>) {
  return (
    <div className="flex flex-col">
      <p className="text-bold capitalize">{auditorName}</p>
      <Tooltip content={auditedAt}>
          <p className="text-bold text-sm text-default-400">{formatDistance(auditedAt, Date.now(), { addSuffix: true })}</p>
      </Tooltip>
    </div>
  );
}

export default AuditorCell;
