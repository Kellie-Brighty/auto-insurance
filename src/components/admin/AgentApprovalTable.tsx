import React, { useEffect, useState } from "react";
import TableComponent, {
  TableHeader,
  TableRow,
} from "@/common/table/index.component";
import FormCheckboxComponent from "@/common/form-checkbox/index.component";
import Image from "next/image";
import adminService from "../../../services/admin.service";

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

const AgentApprovalTable = () => {
  const [policiesHeaders, setPoliciesHeaders] = useState<TableHeader[]>([]);
  const [policiesRows, setPoliciesRows] = useState<TableRow[]>([]);

  const [policiesTotalPages, setPoliciesTotalPages] = useState<number>(0);
  const [policiesCurrentPage, setPoliciesCurrentPage] = useState<number>(0);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isAgentTableDialog, setIsAgentTableDialog] = useState(false);
  const [viewAgentModal, setViewAgentModal] = useState(false);
  const [approveAgentModal, setApproveAgentModal] = useState(false);
  const [rejectAgentModal, setRejectAgentModal] = useState(false);
  const [deleteAgentModal, setDeleteAgentModal] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const { GetAllAgents, AgentActivation } = adminService;

  const getAllAgentsAction = async () => {
    setPoliciesHeaders([
      { id: 0, label: <FormCheckboxComponent /> },
      { id: 1, label: <span>Agent Name</span> },
      { id: 2, label: <span>Phone Number</span> },
      { id: 3, label: <span>Email</span> },
      { id: 4, label: <span>Branch</span> },
      { id: 5, label: <span>Means of Identification</span> },
      { id: 6, label: <span>More</span> },
    ]);

    const res = await GetAllAgents();
    if (res.status === 200 || res.status === 201) {
      setPoliciesRows(
        res.data.data.map((agent: any) => ({
          id: agent.id,
          data: {
            0: <FormCheckboxComponent />,
            1: (
              <span>
                {agent.firstname} {agent.lastname}
              </span>
            ),
            2: <span>{agent.phoneNumber}</span>,
            3: <span>{agent.email}</span>,
            4: <span>{agent.branch}</span>,
            5: <span>{agent.id_type}</span>,
            6: (
              <Image
                src={"/assets/admin/more-icon.svg"}
                alt="more-icon"
                width={24}
                height={24}
                className={`cursor-pointer`}
                onClick={() => {
                  setIsAgentTableDialog(true);
                  setSelectedAgent(agent);
                }}
              />
            ),
          },
        }))
      );
    }

    setPoliciesTotalPages(50);
    setPoliciesCurrentPage(1);
  };

  useEffect(() => {
    getAllAgentsAction();
  }, []);

  const approveAgentAction = async () => {
    setApproveLoading(true);

    try {
      const res = await AgentActivation("approved", selectedAgent?.id);
      console.log(res.data);
      setApproveLoading(false);
    } catch (err: any) {
      console.log(err.response.data.message);
      setApproveLoading(false);
    }
  };

  const rejectAgentAction = async () => {
    setRejectLoading(true);

    try {
      const res = await AgentActivation("rejected", selectedAgent?.id);
      console.log(res.data);
      setRejectLoading(false);
    } catch (err: any) {
      console.log(err.response.data.message);
      setRejectLoading(false);
    }
  };

  return (
    <div className={"p-6 bg-white rounded-md"}>
      {policiesRows.length !== 0 ? (
        <TableComponent
          headers={policiesHeaders}
          rows={policiesRows}
          totalPages={policiesTotalPages}
          currentPage={policiesCurrentPage}
          onPageChange={() => {}}
          selectedAgent={selectedAgent}
          setSelectedAgent={setSelectedAgent}
          setViewAgentModal={setViewAgentModal}
          isAgentTableDialog={isAgentTableDialog}
          setApproveAgentModal={setApproveAgentModal}
          setRejectAgentModal={setRejectAgentModal}
          setDeleteAgentModal={setDeleteAgentModal}
        />
      ) : (
        <div className={`text-center p-[50px]`}>
          <p className={`font-grotesk text-[20px] font-bold`}>No Agent yet</p>
          <p className={`text-[14px] text-[#94A3B8]`}>
            Agents will appear as soon as soon as they register
          </p>
        </div>
      )}

      {viewAgentModal && (
        <div
          className={`absolute top-0 left-0 h-full w-full bg-[#0000004a] px-40 py-[20px]`}
        >
          <div className={`bg-white rounded-xl pb-[24px]`}>
            <div className={`flex items-center justify-between p-[24px]`}>
              <p className={`font-inter text-[18px] font-bold`}>
                Agent Information
              </p>

              <div
                className={`bg-[#F8FAFC] flex items-center justify-center 
                p-[12px] rounded-md cursor-pointer`}
                onClick={() => {
                  setViewAgentModal(false);
                  setIsAgentTableDialog(false);
                }}
              >
                <Image
                  src={"/assets/admin/close.svg"}
                  alt="close"
                  width={24}
                  height={24}
                />
              </div>
            </div>
            <div className={`w-full h-[1px] bg-gray-300`} />

            <div className={`p-[24px]`}>
              <div className={`flex space-x-4`}>
                <Image
                  src={"/assets/admin/agent-image.png"}
                  alt="agent-image"
                  width={100}
                  height={100}
                />
                <div>
                  <div>
                    <p
                      className={`text-[#64748B] font-inter text-[12px] font-normal`}
                    >
                      Agent Name
                    </p>
                    <p className={`font-grotesk text-[24px] font-bold`}>
                      {selectedAgent?.firstname} {selectedAgent?.lastname}
                    </p>
                  </div>
                  <div>
                    <p
                      className={`text-[#64748B] font-inter text-[12px] font-normal mt-[5px]`}
                    >
                      Agent ID
                    </p>
                    <p className={`font-grotesk text-[14px] font-bold`}>
                      {selectedAgent?.id}
                    </p>
                  </div>
                </div>
              </div>

              <div className={`mt-[49px]`}>
                <p className={`text-[#64748B] text-[16px]`}>User Details</p>
                <div className={`w-full h-[1px] bg-[#DFDFDF] mt-[18px]`} />

                <div className={`mt-[33px] space-y-[30px]`}>
                  <div className={`flex items-center justify-between w-[85%]`}>
                    <div className={`space-y-4`}>
                      <p className={`text-[#64748B] text-[14px]`}>
                        Email Address
                      </p>

                      <p className={`text-[14px] font-inter font-bold`}>
                        {selectedAgent?.email}
                      </p>
                    </div>
                    <div className={`space-y-4`}>
                      <p className={`text-[#64748B] text-[14px]`}>
                        Phone Number
                      </p>

                      <p className={`text-[14px] font-inter font-bold`}>
                        {selectedAgent?.phoneNumber}
                      </p>
                    </div>
                    <div className={`space-y-4`}>
                      <p className={`text-[#64748B] text-[14px]`}>Gender</p>

                      <p className={`text-[14px] font-inter font-bold`}>
                        {selectedAgent?.gender}
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-center justify-between w-[85%]`}>
                    <div className={`space-y-4`}>
                      <p className={`text-[#64748B] text-[14px]`}>
                        Date of Birth
                      </p>

                      <p className={`text-[14px] font-inter font-bold`}>
                        {selectedAgent?.dateofbirth}
                      </p>
                    </div>
                    <div className={`space-y-4`}>
                      <p className={`text-[#64748B] text-[14px]`}>Email</p>

                      <p className={`text-[14px] font-inter font-bold`}>
                        {selectedAgent?.email}
                      </p>
                    </div>
                    <div className={`space-y-4`}>
                      <p className={`text-[#64748B] text-[14px]`}>Branch</p>

                      <p className={`text-[14px] font-inter font-bold`}>
                        {selectedAgent?.branch}
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-center justify-between w-[85%]`}>
                    <div className={`space-y-4`}>
                      <p className={`text-[#64748B] text-[14px]`}>
                        Means of Identification
                      </p>

                      <p className={`text-[14px] font-inter font-bold`}>
                        {selectedAgent?.id_type}
                      </p>
                    </div>
                    <div className={`space-y-4`}>
                      <p className={`text-[#64748B] text-[14px]`}>Address</p>

                      <p className={`text-[14px] font-inter font-bold`}>
                        {selectedAgent?.homeAddress}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {approveAgentModal && (
        <div
          className={`absolute top-0 left-0 h-full w-full bg-[#0000004a] 
          flex justify-center`}
        >
          <div
            className={`bg-white rounded-md w-[544px] h-[296px] mt-[100px] px-[32px] py-[24px]`}
          >
            <div className={`flex justify-center`}>
              <Image
                src={"/assets/admin/approve-modal-icon.png"}
                alt="approve-icon"
                width={80}
                height={80}
              />
            </div>

            <p
              className={`font-inter text-[24px] font-medium text-center mt-[16px]`}
            >
              Do you want to approve this agent?
            </p>
            <p
              className={`text-[#87898E] text-[16px] font-medium font-inter text-center`}
            >
              This action can’t be undone
            </p>

            <div className={`flex items-center mt-[32px] justify-evenly`}>
              <div
                className={`bg-[#F1F1F1] w-[232px] h-[56px] 
                flex items-center justify-center rounded-full cursor-pointer`}
                onClick={() => {
                  setApproveAgentModal(false);
                  setIsAgentTableDialog(false);
                }}
              >
                <p className={`font-inter text-[16px] font-normal`}>Cancel</p>
              </div>
              <div
                className={`bg-[#05A660] w-[232px] h-[56px] 
                flex items-center justify-center rounded-full cursor-pointer`}
                onClick={() => approveAgentAction()}
              >
                <p className={`font-inter text-[16px] font-normal text-[#fff]`}>
                  {approveLoading ? "Approving..." : "Approve"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {rejectAgentModal && (
        <div
          className={`absolute top-0 left-0 h-full w-full bg-[#0000004a] 
          flex justify-center`}
        >
          <div
            className={`bg-white rounded-md w-[544px] h-[296px] mt-[100px] px-[32px] py-[24px]`}
          >
            <div className={`flex justify-center`}>
              <Image
                src={"/assets/admin/reject-modal-icon.png"}
                alt="approve-icon"
                width={80}
                height={80}
              />
            </div>

            <p
              className={`font-inter text-[24px] font-medium text-center mt-[16px]`}
            >
              Do you want to reject this agent?
            </p>
            <p
              className={`text-[#87898E] text-[16px] font-medium font-inter text-center`}
            >
              This action can’t be undone
            </p>

            <div className={`flex items-center mt-[32px] justify-evenly`}>
              <div
                className={`bg-[#F1F1F1] w-[232px] h-[56px] 
                flex items-center justify-center rounded-full cursor-pointer`}
                onClick={() => {
                  setRejectAgentModal(false);
                  setIsAgentTableDialog(false);
                }}
              >
                <p className={`font-inter text-[16px] font-normal`}>Cancel</p>
              </div>
              <div
                className={`bg-[#3772FF] w-[232px] h-[56px] 
                flex items-center justify-center rounded-full cursor-pointer`}
                onClick={() => rejectAgentAction()}
              >
                <p className={`font-inter text-[16px] font-normal text-[#fff]`}>
                  {rejectLoading ? "Rejecting..." : "Reject"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteAgentModal && (
        <div
          className={`absolute top-0 left-0 h-full w-full bg-[#0000004a] 
          flex justify-center`}
        >
          <div
            className={`bg-white rounded-md w-[544px] h-[296px] mt-[100px] px-[32px] py-[24px]`}
          >
            <div className={`flex justify-center`}>
              <Image
                src={"/assets/admin/delete-modal-icon.png"}
                alt="approve-icon"
                width={80}
                height={80}
              />
            </div>

            <p
              className={`font-inter text-[24px] font-medium text-center mt-[16px]`}
            >
              Do you want to delete this agent?
            </p>
            <p
              className={`text-[#87898E] text-[16px] font-medium font-inter text-center`}
            >
              This action can’t be undone
            </p>

            <div className={`flex items-center mt-[32px] justify-evenly`}>
              <div
                className={`bg-[#F1F1F1] w-[232px] h-[56px] 
                flex items-center justify-center rounded-full cursor-pointer`}
                onClick={() => {
                  setDeleteAgentModal(false);
                  setIsAgentTableDialog(false);
                }}
              >
                <p className={`font-inter text-[16px] font-normal`}>Cancel</p>
              </div>
              <div
                className={`bg-[#E53535] w-[232px] h-[56px] 
                flex items-center justify-center rounded-full cursor-pointer`}
              >
                <p className={`font-inter text-[16px] font-normal text-[#fff]`}>
                  Delete
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentApprovalTable;
