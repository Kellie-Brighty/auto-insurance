import React, { useEffect, useState } from "react";
import TableComponent, {
  TableHeader,
  TableRow,
} from "@/common/table/index.component";
import FormCheckboxComponent from "@/common/form-checkbox/index.component";
import ButtonComponent from "@/common/button/index.component";
import SubscriberPolicyStatusChipsComponent from "../subscriber/policies/status-chips/index.component";
import Image from "next/image";

const SubscriberTransactionTable = () => {
  const [policiesHeaders, setPoliciesHeaders] = useState<TableHeader[]>([]);
  const [policiesRows, setPoliciesRows] = useState<TableRow[]>([]);

  const [policiesTotalPages, setPoliciesTotalPages] = useState<number>(0);
  const [policiesCurrentPage, setPoliciesCurrentPage] = useState<number>(0);

  // useEffect(() => {
  //   setPoliciesHeaders([
  //     { id: 0, label: <FormCheckboxComponent /> },
  //     { id: 1, label: <span>Subscriber Name</span> },
  //     { id: 2, label: <span>Phone Number</span> },
  //     { id: 3, label: <span>Premium</span> },
  //     { id: 4, label: <span>Agent Name</span> },
  //     { id: 5, label: <span>Premium</span> },
  //     { id: 6, label: <span>Status</span> },
  //   ]);

  //   setPoliciesRows([
  //     {
  //       id: 1,
  //       data: {
  //         0: <FormCheckboxComponent />,
  //         1: <span>Adebayo Salami</span>,
  //         2: <span>08034518791</span>,
  //         3: <span>₦625,000</span>,
  //         4: <span>Solomon Ideh</span>,
  //         5: <span>₦625,000</span>,
  //         6: <SubscriberPolicyStatusChipsComponent type={"active"} />,
  //       },
  //     },
  //     {
  //       id: 2,
  //       data: {
  //         0: <FormCheckboxComponent />,
  //         1: <span>Adebayo Salami</span>,
  //         2: <span>08034518791</span>,
  //         3: <span>₦625,000</span>,
  //         4: <span>Solomon Ideh</span>,
  //         5: <span>₦625,000</span>,
  //         6: <SubscriberPolicyStatusChipsComponent type={"expired"} />,
  //       },
  //     },
  //     {
  //       id: 3,
  //       data: {
  //         0: <FormCheckboxComponent />,
  //         1: <span>Adebayo Salami</span>,
  //         2: <span>08034518791</span>,
  //         3: <span>₦625,000</span>,
  //         4: <span>Solomon Ideh</span>,
  //         5: <span>₦625,000</span>,
  //         6: <SubscriberPolicyStatusChipsComponent type={"abandoned"} />,
  //       },
  //     },
  //     {
  //       id: 4,
  //       data: {
  //         0: <FormCheckboxComponent />,
  //         1: <span>Adebayo Salami</span>,
  //         2: <span>08034518791</span>,
  //         3: <span>₦625,000</span>,
  //         4: <span>Solomon Ideh</span>,
  //         5: <span>₦625,000</span>,
  //         6: <SubscriberPolicyStatusChipsComponent type={"pending"} />,
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
            No Subscriber transaction yet
          </p>
          <p className={`text-[14px] text-[#94A3B8]`}>
            Subscriber transactions will appear as soon as soon as they register
          </p>
        </div>
      )}
    </div>
  );
};

export default SubscriberTransactionTable;
