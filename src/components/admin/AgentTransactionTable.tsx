import React, { useEffect, useState } from "react";
import TableComponent, {
  TableHeader,
  TableRow,
} from "@/common/table/index.component";
import FormCheckboxComponent from "@/common/form-checkbox/index.component";
import ButtonComponent from "@/common/button/index.component";
import SubscriberPolicyStatusChipsComponent from "../subscriber/policies/status-chips/index.component";
import Image from "next/image";

const AgentTransactionTable = () => {
  const [policiesHeaders, setPoliciesHeaders] = useState<TableHeader[]>([]);
  const [policiesRows, setPoliciesRows] = useState<TableRow[]>([]);

  const [policiesTotalPages, setPoliciesTotalPages] = useState<number>(0);
  const [policiesCurrentPage, setPoliciesCurrentPage] = useState<number>(0);

  // useEffect(() => {
  //   setPoliciesHeaders([
  //     { id: 0, label: <FormCheckboxComponent /> },
  //     { id: 1, label: <span>Policy Name</span> },
  //     { id: 2, label: <span>Policy Number</span> },
  //     { id: 3, label: <span>Premium</span> },
  //     { id: 4, label: <span>Agent Wallet</span> },
  //     { id: 5, label: <span>Awaiting Settlement</span> },
  //     { id: 6, label: <span>Status</span> },
  //   ]);

  //   setPoliciesRows([
  //     {
  //       id: 1,
  //       data: {
  //         0: <FormCheckboxComponent />,
  //         1: <span>Adebayo Salami</span>,
  //         2: <span>08034518791</span>,
  //         3: <span>ianbuck@icloud.com</span>,
  //         4: <span>Port Harcourt</span>,
  //         5: <span>National ID Card</span>,
  //         6: <SubscriberPolicyStatusChipsComponent type={"active"} />,
  //       },
  //     },
  //     {
  //       id: 2,
  //       data: {
  //         0: <FormCheckboxComponent />,
  //         1: <span>Adebayo Salami</span>,
  //         2: <span>08034518791</span>,
  //         3: <span>ianbuck@icloud.com</span>,
  //         4: <span>Port Harcourt</span>,
  //         5: <span>National ID Card</span>,
  //         6: <SubscriberPolicyStatusChipsComponent type={"expired"} />,
  //       },
  //     },
  //     {
  //       id: 3,
  //       data: {
  //         0: <FormCheckboxComponent />,
  //         1: <span>Adebayo Salami</span>,
  //         2: <span>08034518791</span>,
  //         3: <span>ianbuck@icloud.com</span>,
  //         4: <span>Port Harcourt</span>,
  //         5: <span>National ID Card</span>,
  //         6: <SubscriberPolicyStatusChipsComponent type={"pending"} />,
  //       },
  //     },
  //     {
  //       id: 4,
  //       data: {
  //         0: <FormCheckboxComponent />,
  //         1: <span>Adebayo Salami</span>,
  //         2: <span>08034518791</span>,
  //         3: <span>ianbuck@icloud.com</span>,
  //         4: <span>Port Harcourt</span>,
  //         5: <span>National ID Card</span>,
  //         6: <SubscriberPolicyStatusChipsComponent type={"abandoned"} />,
  //       },
  //     },
  //   ]);

  //   setPoliciesTotalPages(50);
  //   setPoliciesCurrentPage(1);
  // }, []);

  return (
    <div className={"p-6 bg-white rounded-md"}>
      {policiesRows.length !== 0 ? (
        <TableComponent
          headers={policiesHeaders}
          rows={policiesRows}
          totalPages={policiesTotalPages}
          currentPage={policiesCurrentPage}
          onPageChange={() => {}}
        />
      ) : (
        <div className={`text-center p-[50px]`}>
          <p className={`font-grotesk text-[20px] font-bold`}>
            No Agent transaction yet
          </p>
          <p className={`text-[14px] text-[#94A3B8]`}>
            Agents transactions will appear as soon as soon as they register
          </p>
        </div>
      )}
    </div>
  );
};

export default AgentTransactionTable;
