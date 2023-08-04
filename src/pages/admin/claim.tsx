import ExportButtonComponent from "@/common/export-btn/index.component";
import FormDateRangePickerComponent from "@/common/form-date-range-picker/index.component";
import FormInputComponent from "@/common/form-input/index.component";
import FormSelectComponent from "@/common/form-select/index.component";
import ClaimTable from "@/components/admin/ClaimTable";
import DashboardStatistics from "@/components/admin/DashboardStatistics";
import AdminLayout, {
  ManagementReportData,
} from "@/layouts/admin/index.layout";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";

const claim = () => {
  const [totalAgent, setTotalAgent] = useState(0);
  const [totalActivePolicies, setTotalActivePolicies] = useState(0);
  const [totalInactivePolicies, setTotalInactivePolicies] = useState(0);
  const [totalSubscribers, setTotalSubscribers] = useState(0);

  const fetchReport = () => {
    const reportData = localStorage.getItem("ManagementReport");
    let parsedData: ManagementReportData | null = null;
    if (reportData) {
      parsedData = JSON.parse(reportData) as ManagementReportData;
      setTotalAgent(parsedData.total_agent);
      // setTotalActivePolicies(parsedData.total_policy_amount);
      // setTotalInactivePolicies(parsedData.total_commission_amount);
      setTotalSubscribers(parsedData.total_subscriber);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <AdminLayout title="Claim" caption="View and manage claims">
      <div className={`space-y-8`}>
        <DashboardStatistics
          firstBoxImageUrl="/assets/admin/active-policies.png"
          firstBoxTitle="Total Active Policies"
          firstBoxPrice={totalActivePolicies}
          secondBoxImageUrl="/assets/admin/expired-policies.png"
          secondBoxTitle="Total Inactive Policies"
          secondBoxPrice={totalInactivePolicies}
          thirdBoxImageUrl="/assets/admin/total-agents.png"
          thirdBoxTitle="Total Agents"
          thirdBoxPrice={totalAgent}
          fourthBoxImageUrl="/assets/admin/total-subscribers.png"
          fourthBoxTitle="Total Subscribers"
          fourthBoxPrice={totalSubscribers}
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

        <ClaimTable />
      </div>
    </AdminLayout>
  );
};

export default claim;
