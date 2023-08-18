import React, { useEffect, useState } from "react";
import TableComponent, {
  TableHeader,
  TableRow,
} from "@/common/table/index.component";
import FormCheckboxComponent from "@/common/form-checkbox/index.component";
import ButtonComponent from "@/common/button/index.component";
import SubscriberPolicyStatusChipsComponent from "../subscriber/policies/status-chips/index.component";
import Image from "next/image";

const RevenueShareTable = () => {
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
  //     { id: 4, label: <span>Commission</span> },
  //     { id: 5, label: <span>Action</span> },
  //   ]);

  //   setPoliciesRows([
  //     {
  //       id: 1,
  //       data: {
  //         0: <FormCheckboxComponent />,
  //         1: <span>Auto Insurance - Monthly</span>,
  //         2: <span>UIC/ERT/MIZP/164</span>,
  //         3: <span>₦625,000</span>,
  //         4: <span>₦25,000</span>,
  //         5: (
  //           <div className={`flex items-center space-x-4`}>
  //             <div
  //               className={`flex items-center space-x-2 bg-[#E9FAEF] 
  //               rounded-sm py-[8px] px-[16px] cursor-pointer`}
  //             >
  //               <p className={`text-[#16A34A]`}>Approve</p>
  //               {/* <Image
  //                   src={"/assets/admin/approve-icon.svg"}
  //                   alt="approve-icon"
  //                   width={17}
  //                   height={17}
  //                 /> */}
  //             </div>

  //             <div
  //               className={`flex items-center space-x-3 bg-[#FFEBEB] 
  //               rounded-sm py-[8px] px-[16px] cursor-pointer`}
  //             >
  //               <p className={`text-[#E53535]`}>Reject</p>
  //               {/* <Image
  //                 src={"/assets/admin/reject-icon.svg"}
  //                 alt="approve-icon"
  //                 width={17}
  //                 height={17}
  //                 className={`bg-transparent`}
  //               /> */}
  //             </div>
  //           </div>
  //         ),
  //       },
  //     },
  //     {
  //       id: 2,
  //       data: {
  //         0: <FormCheckboxComponent />,
  //         1: <span>Auto Insurance - Monthly</span>,
  //         2: <span>UIC/ERT/MIZP/164</span>,
  //         3: <span>₦625,000</span>,
  //         4: <span>₦25,000</span>,
  //         5: (
  //           <div className={`flex items-center space-x-4`}>
  //             <div
  //               className={`flex items-center space-x-2 bg-[#E9FAEF] 
  //                 rounded-sm py-[8px] px-[16px] cursor-pointer`}
  //             >
  //               <p className={`text-[#16A34A]`}>Approve</p>
  //               {/* <Image
  //                     src={"/assets/admin/approve-icon.svg"}
  //                     alt="approve-icon"
  //                     width={17}
  //                     height={17}
  //                   /> */}
  //             </div>

  //             <div
  //               className={`flex items-center space-x-3 bg-[#FFEBEB] 
  //                 rounded-sm py-[8px] px-[16px] cursor-pointer`}
  //             >
  //               <p className={`text-[#E53535]`}>Reject</p>
  //               {/* <Image
  //                   src={"/assets/admin/reject-icon.svg"}
  //                   alt="approve-icon"
  //                   width={17}
  //                   height={17}
  //                   className={`bg-transparent`}
  //                 /> */}
  //             </div>
  //           </div>
  //         ),
  //       },
  //     },
  //     {
  //       id: 3,
  //       data: {
  //         0: <FormCheckboxComponent />,
  //         1: <span>Auto Insurance - Monthly</span>,
  //         2: <span>UIC/ERT/MIZP/164</span>,
  //         3: <span>₦625,000</span>,
  //         4: <span>₦25,000</span>,
  //         5: (
  //           <div className={`flex items-center space-x-4`}>
  //             <div
  //               className={`flex items-center space-x-2 bg-[#E9FAEF] 
  //                 rounded-sm py-[8px] px-[16px] cursor-pointer`}
  //             >
  //               <p className={`text-[#16A34A]`}>Approve</p>
  //               {/* <Image
  //                     src={"/assets/admin/approve-icon.svg"}
  //                     alt="approve-icon"
  //                     width={17}
  //                     height={17}
  //                   /> */}
  //             </div>

  //             <div
  //               className={`flex items-center space-x-3 bg-[#FFEBEB] 
  //                 rounded-sm py-[8px] px-[16px] cursor-pointer`}
  //             >
  //               <p className={`text-[#E53535]`}>Reject</p>
  //               {/* <Image
  //                   src={"/assets/admin/reject-icon.svg"}
  //                   alt="approve-icon"
  //                   width={17}
  //                   height={17}
  //                   className={`bg-transparent`}
  //                 /> */}
  //             </div>
  //           </div>
  //         ),
  //       },
  //     },
  //     {
  //       id: 4,
  //       data: {
  //         0: <FormCheckboxComponent />,
  //         1: <span>Auto Insurance - Monthly</span>,
  //         2: <span>UIC/ERT/MIZP/164</span>,
  //         3: <span>₦625,000</span>,
  //         4: <span>₦25,000</span>,
  //         5: (
  //           <div className={`flex items-center space-x-4`}>
  //             <div
  //               className={`flex items-center space-x-2 bg-[#E9FAEF] 
  //                 rounded-sm py-[8px] px-[16px] cursor-pointer`}
  //             >
  //               <p className={`text-[#16A34A]`}>Approve</p>
  //               {/* <Image
  //                     src={"/assets/admin/approve-icon.svg"}
  //                     alt="approve-icon"
  //                     width={17}
  //                     height={17}
  //                   /> */}
  //             </div>

  //             <div
  //               className={`flex items-center space-x-3 bg-[#FFEBEB] 
  //                 rounded-sm py-[8px] px-[16px] cursor-pointer`}
  //             >
  //               <p className={`text-[#E53535]`}>Reject</p>
  //               {/* <Image
  //                   src={"/assets/admin/reject-icon.svg"}
  //                   alt="approve-icon"
  //                   width={17}
  //                   height={17}
  //                   className={`bg-transparent`}
  //                 /> */}
  //             </div>
  //           </div>
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
          <p className={`font-grotesk text-[20px] font-bold`}>
            No Revenues yet
          </p>
          <p className={`text-[14px] text-[#94A3B8]`}>
            Revenues will appear as soon as purchase have one
          </p>
        </div>
      )}
    </div>
  );
};

export default RevenueShareTable;
