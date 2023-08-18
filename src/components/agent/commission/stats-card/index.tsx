import React from "react";
import { ClipboardIcon } from "@heroicons/react/24/outline";

interface AgentCommissionStatsCardComponentProps {
  type: "total" | "active" | "pending" | "expired";
  value: number;
  change: number;
}

const agentCommissionStatsCardTypeMap = {
  total: "Total Commission",
  active: "Active Policies",
  pending: "Pending Policies",
  expired: "Expired Policies",
};

const AgentCommissionStatsCardComponent: React.FC<
  AgentCommissionStatsCardComponentProps
> = ({ type, value, change }) => {
  return (
    <div className={"p-6 flex items-center gap-3 bg-white rounded-md h-[130px]"}>
      <div
        className={`p-3 ${
          type === "total"
            ? "text-primary bg-primary"
            : type === "active"
            ? "text-green-500 bg-green-500"
            : type === "pending"
            ? "text-yellow-500 bg-yellow-500"
            : type === "expired"
            ? "text-red-500 bg-red-500"
            : ""
        } bg-opacity-10 rounded-md`}
      >
        <ClipboardIcon className={"w-8 h-8"} />
      </div>

      <div className={"flex flex-col"}>
        <span className={"text-gray-dark font-medium"}>
          {agentCommissionStatsCardTypeMap[type]}
        </span>

        <div className={"flex items-center gap-2"}>
          <span className={"text-2xl font-grotesk font-bold"}>{value}</span>
          <span
            className={`text-sm ${
              change >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {change >= 0 && "+"}
            {change}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default AgentCommissionStatsCardComponent;
