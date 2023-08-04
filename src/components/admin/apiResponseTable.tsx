import React, { useEffect, useState } from "react";
import TableComponent, {
  TableHeader,
  TableRow,
} from "@/common/table/index.component";
import FormCheckboxComponent from "@/common/form-checkbox/index.component";
import ButtonComponent from "@/common/button/index.component";
import SubscriberPolicyStatusChipsComponent from "../subscriber/policies/status-chips/index.component";
import Image from "next/image";
import ApiStatusChips from "../subscriber/policies/api-chips/index.components";

const ApiResponseTable = () => {
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
  //     { id: 4, label: <span>Server Name</span> },
  //     { id: 5, label: <span>Status</span> },
  //   ]);

  //   setPoliciesRows([
  //     {
  //       id: 1,
  //       data: {
  //         0: <FormCheckboxComponent />,
  //         1: <span>Auto Insurance - Monthly</span>,
  //         2: <span>UIC/ERT/MIZP/164</span>,
  //         3: <span>₦625,000</span>,
  //         4: <span>Middleware Server</span>,
  //         5: <ApiStatusChips type="not_delivered" />,
  //       },
  //     },
  //     {
  //       id: 2,
  //       data: {
  //         0: <FormCheckboxComponent />,
  //         1: <span>Auto Insurance - Monthly</span>,
  //         2: <span>UIC/ERT/MIZP/164</span>,
  //         3: <span>₦625,000</span>,
  //         4: <span>Middleware Server</span>,
  //         5: <ApiStatusChips type="delivered" />,
  //       },
  //     },
  //     {
  //       id: 3,
  //       data: {
  //         0: <FormCheckboxComponent />,
  //         1: <span>Auto Insurance - Monthly</span>,
  //         2: <span>UIC/ERT/MIZP/164</span>,
  //         3: <span>₦625,000</span>,
  //         4: <span>Middleware Server</span>,
  //         5: <ApiStatusChips type="not_delivered" />,
  //       },
  //     },
  //     {
  //       id: 4,
  //       data: {
  //         0: <FormCheckboxComponent />,
  //         1: <span>Auto Insurance - Monthly</span>,
  //         2: <span>UIC/ERT/MIZP/164</span>,
  //         3: <span>₦625,000</span>,
  //         4: <span>Middleware Server</span>,
  //         5: <ApiStatusChips type="delivered" />,
  //       },
  //     },
  //   ]);

  //   setPoliciesTotalPages(50);
  //   setPoliciesCurrentPage(1);
  // }, []);

  return (
    <div>
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
              No API responses yet
            </p>
            <p className={`text-[14px] text-[#94A3B8]`}>
              API responses will appear as soon as purchase have one
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiResponseTable;
