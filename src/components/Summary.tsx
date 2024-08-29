import React from "react";

function Summary({ title, subtitle }: Readonly<{ title?: string; subtitle?: string }>) {
  return (
    <div className="flex flex-col">
      <p className="text-bold text-sm capitalize">{title}</p>
      <p className="text-bold text-sm capitalize text-default-400">{subtitle}</p>
    </div>
  );
}

export default Summary;
