import React from "react";
import PaginationComponent from "@/common/pagination/index.component";
import Image from "next/image";

export interface TableHeader {
  id: number;
  label: React.ReactNode;
}

interface TableRowData {
  [keyName: string]: React.ReactNode;
}

export interface TableRow {
  id: number;
  data: TableRowData;
}

interface Agent {
  branch: string;
  createdAt: string;
  dateofbirth: string;
  deletedAt: null;
  email: string;
  emailVerified: false;
  firstname: string;
  gender: string;
  homeAddress: string;
  id: number;
  id_type: string;
  lastname: string;
  middlename: string;
  phoneNumber: string;
  role: string;
  status: string;
  updatedAt: string;
}

interface TableComponentProps {
  headers: TableHeader[];
  rows: TableRow[];
  paginate?: boolean;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  selectedAgent?: Agent | null;
  setSelectedAgent: React.Dispatch<React.SetStateAction<Agent | null>>;
  setViewAgentModal: React.Dispatch<React.SetStateAction<boolean>>;
  isAgentTableDialog: boolean;
  setApproveAgentModal: React.Dispatch<React.SetStateAction<boolean>>;
  setRejectAgentModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteAgentModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const TableComponent: React.FC<TableComponentProps> = ({
  headers,
  rows,
  paginate = true,
  totalPages,
  currentPage,
  onPageChange,
  selectedAgent,
  setSelectedAgent,
  setViewAgentModal,
  isAgentTableDialog,
  setApproveAgentModal,
  setRejectAgentModal,
  setDeleteAgentModal,
}) => {
  return (
    <div className={"space-y-3 bg-white rounded-md"}>
      <div className={"max-w-full overflow-auto"}>
        <table className={"w-full"}>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th
                  key={header.id}
                  className={`py-6 px-6 text-gray-dark text-left font-medium bg-gray-light ${
                    index === 0 || index === headers.length - 1
                      ? "rounded-md"
                      : ""
                  } whitespace-nowrap`}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className={`relative`}>
            <>
              {rows.map((row) => (
                <tr key={row.id} className={"border-b-2 border-gray-light"}>
                  {headers.map((header) => (
                    <>
                      <td
                        key={header.id}
                        className={`py-6 px-6 text-left font-grotesk font-bold whitespace-nowrap relative`}
                      >
                        {row.data[header.id?.toString()]}
                      </td>
                    </>
                  ))}
                </tr>
              ))}
              {isAgentTableDialog && (
                <div
                  className={`absolute right-[80px] top-4`}
                  // onClick={() => setSelectedAgent(null)}
                >
                  <div
                    className={`bg-white p-4 rounded-md shadow-md w-[195px] space-y-5`}
                  >
                    <div
                      className={`flex items-center space-x-4 cursor-pointer`}
                      onClick={() => {
                        setViewAgentModal(true);
                      }}
                    >
                      <Image
                        src={"/assets/admin/view-agent.svg"}
                        alt="view-agents"
                        width={17}
                        height={17}
                      />
                      <p>View Agent</p>
                    </div>
                    <div
                      className={`flex items-center space-x-4 cursor-pointer`}
                      onClick={() => {
                        setApproveAgentModal(true);
                      }}
                    >
                      <Image
                        src={"/assets/admin/approve-agent.svg"}
                        alt="view-agents"
                        width={17}
                        height={17}
                      />
                      <p>Approve Agent</p>
                    </div>
                    <div
                      className={`flex items-center space-x-4 cursor-pointer`}
                      onClick={() => setRejectAgentModal(true)}
                    >
                      <Image
                        src={"/assets/admin/reject-agent.svg"}
                        alt="view-agents"
                        width={17}
                        height={17}
                      />
                      <p>Reject Agent</p>
                    </div>
                    <div
                      className={`flex items-center space-x-4 cursor-pointer`}
                      onClick={() => setDeleteAgentModal(true)}
                    >
                      <Image
                        src={"/assets/admin/delete-agent.svg"}
                        alt="view-agents"
                        width={17}
                        height={17}
                      />
                      <p>Delete Agent</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          </tbody>
        </table>
      </div>

      {paginate ? (
        <div className={"flex items-center justify-end"}>
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TableComponent;
