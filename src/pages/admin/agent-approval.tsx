import ExportButtonComponent from "@/common/export-btn/index.component";
import FormDateRangePickerComponent from "@/common/form-date-range-picker/index.component";
import FormInputComponent from "@/common/form-input/index.component";
import FormSelectComponent from "@/common/form-select/index.component";
import AgentApprovalTable from "@/components/admin/AgentApprovalTable";
import DashboardStatistics from "@/components/admin/DashboardStatistics";
import AdminLayout, {
  ManagementReportData,
} from "@/layouts/admin/index.layout";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const AgentApproval = () => {
  const [totalAgent, setTotalAgent] = useState(0);
  const [pendingAgent, setPendingAgent] = useState(0);
  const [approvedAgent, setApprovedAgent] = useState(0);
  const [rejectedAgent, setRejectedAgent] = useState(0);

  const fetchReport = () => {
    const reportData = localStorage.getItem("ManagementReport");
    let parsedData: ManagementReportData | null = null;
    if (reportData) {
      parsedData = JSON.parse(reportData) as ManagementReportData;
      setTotalAgent(parsedData.total_agent);
      // setPendingPolicies(parsedData.pending_policies);
      // setInactivePolicies(parsedData.inactive_commission_amount);
      // setExpiredPolices(parsedData.expired_policies);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <AdminLayout
      title="Agent Approval"
      caption="View agents and approve their application"
    >
      <div className={`space-y-8`}>
        <DashboardStatistics
          firstBoxImageUrl="/assets/admin/total-agents.png"
          firstBoxTitle="Total Agents"
          firstBoxPrice={totalAgent}
          secondBoxImageUrl="/assets/admin/pending-agents.png"
          secondBoxTitle="Pending Agents"
          secondBoxPrice={pendingAgent}
          thirdBoxImageUrl="/assets/admin/approved-agents.png"
          thirdBoxTitle="Approved Agents"
          thirdBoxPrice={approvedAgent}
          fourthBoxImageUrl="/assets/admin/rejected-agents.png"
          fourthBoxTitle="Rejected Agents"
          fourthBoxPrice={rejectedAgent}
        />

        <div className={"flex items-center justify-between gap-8"}>
          <FormInputComponent
            placeholder={"Search Anything"}
            Icon={<MagnifyingGlassIcon className={"w-5 h-5"} />}
          />

          <div className={"flex items-center gap-3"}>
            <FormDateRangePickerComponent value={null} onChange={() => {}} />
            <FormSelectComponent Icon={<FunnelIcon className={"w-5 h-5"} />}>
              <option>All Policies</option>
              <option>All Policies</option>
              <option>All Policies</option>
            </FormSelectComponent>
            <ExportButtonComponent />
          </div>
        </div>

        <AgentApprovalTable />
      </div>
    </AdminLayout>
  );
};

export default AgentApproval;
