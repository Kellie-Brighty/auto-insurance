import React, { useEffect, useState } from "react";
import TableComponent, {
  TableHeader,
  TableRow,
} from "@/common/table/index.component";
import FormCheckboxComponent from "@/common/form-checkbox/index.component";
import ButtonComponent from "@/common/button/index.component";
import SubscriberPolicyStatusChipsComponent from "../subscriber/policies/status-chips/index.component";
import Image from "next/image";

const ManageUserTable = () => {
  const [policiesHeaders, setPoliciesHeaders] = useState<TableHeader[]>([]);
  const [policiesRows, setPoliciesRows] = useState<TableRow[]>([]);

  const [policiesTotalPages, setPoliciesTotalPages] = useState<number>(0);
  const [policiesCurrentPage, setPoliciesCurrentPage] = useState<number>(0);

  // useEffect(() => {
  //   setPoliciesHeaders([
  //     { id: 0, label: <FormCheckboxComponent /> },
  //     { id: 1, label: <span>Name</span> },
  //     { id: 2, label: <span>User ID</span> },
  //     { id: 3, label: <span>Email</span> },
  //     { id: 4, label: <span>Phone Number</span> },
  //     { id: 5, label: <span>Action</span> },
  //     { id: 6, label: <span></span> },
  //   ]);

  //   setPoliciesRows([
  //     {
  //       id: 1,
  //       data: {
  //         0: <FormCheckboxComponent />,
  //         1: <span>Adebayo Salami</span>,
  //         2: <span>613793046</span>,
  //         3: <span>ianbuck@icloud.com</span>,
  //         4: <span>+234 7054504793</span>,
  //         5: (
  //           <div
  //             className={`bg-[#E9EFFD] text-center rounded-md py-[8px] w-[85px] cursor-pointer`}
  //           >
  //             <p>View</p>
  //           </div>
  //         ),
  //         6: (
  //           <Image
  //             src={"/assets/admin/more-icon.svg"}
  //             alt="more-icon"
  //             width={24}
  //             height={24}
  //             className={`cursor-pointer`}
  //           />
  //         ),
  //       },
  //     },
  //     {
  //       id: 2,
  //       data: {
  //         0: <FormCheckboxComponent />,
  //         1: <span>Adebayo Salami</span>,
  //         2: <span>613793046</span>,
  //         3: <span>ianbuck@icloud.com</span>,
  //         4: <span>+234 7054504793</span>,
  //         5: (
  //           <div
  //             className={`bg-[#E9EFFD] text-center rounded-md py-[8px] w-[85px] cursor-pointer`}
  //           >
  //             <p>View</p>
  //           </div>
  //         ),
  //         6: (
  //           <Image
  //             src={"/assets/admin/more-icon.svg"}
  //             alt="more-icon"
  //             width={24}
  //             height={24}
  //             className={`cursor-pointer`}
  //           />
  //         ),
  //       },
  //     },
  //     {
  //       id: 3,
  //       data: {
  //         0: <FormCheckboxComponent />,
  //         1: <span>Adebayo Salami</span>,
  //         2: <span>613793046</span>,
  //         3: <span>ianbuck@icloud.com</span>,
  //         4: <span>+234 7054504793</span>,
  //         5: (
  //           <div
  //             className={`bg-[#E9EFFD] text-center rounded-md py-[8px] w-[85px] cursor-pointer`}
  //           >
  //             <p>View</p>
  //           </div>
  //         ),
  //         6: (
  //           <Image
  //             src={"/assets/admin/more-icon.svg"}
  //             alt="more-icon"
  //             width={24}
  //             height={24}
  //             className={`cursor-pointer`}
  //           />
  //         ),
  //       },
  //     },
  //     {
  //       id: 4,
  //       data: {
  //         0: <FormCheckboxComponent />,
  //         1: <span>Adebayo Salami</span>,
  //         2: <span>613793046</span>,
  //         3: <span>ianbuck@icloud.com</span>,
  //         4: <span>+234 7054504793</span>,
  //         5: (
  //           <div
  //             className={`bg-[#E9EFFD] text-center rounded-md py-[8px] w-[85px] cursor-pointer`}
  //           >
  //             <p>View</p>
  //           </div>
  //         ),
  //         6: (
  //           <Image
  //             src={"/assets/admin/more-icon.svg"}
  //             alt="more-icon"
  //             width={24}
  //             height={24}
  //             className={`cursor-pointer`}
  //           />
  //         ),
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
          <p className={`font-grotesk text-[20px] font-bold`}>No Users yet</p>
          <p className={`text-[14px] text-[#94A3B8]`}>
            Users will appear as soon as soon as they register
          </p>
        </div>
      )}
    </div>
  );
};

export default ManageUserTable;
