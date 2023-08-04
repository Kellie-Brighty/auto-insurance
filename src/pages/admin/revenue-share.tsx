import ExportButtonComponent from "@/common/export-btn/index.component";
import FormDateRangePickerComponent from "@/common/form-date-range-picker/index.component";
import FormInputComponent from "@/common/form-input/index.component";
import FormSelectComponent from "@/common/form-select/index.component";
import DashboardStatistics from "@/components/admin/DashboardStatistics";
import RevenueShareTable from "@/components/admin/RevenueShareTable";
import AdminLayout, {
  ManagementReportData,
} from "@/layouts/admin/index.layout";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";

const RevenueShare = () => {
  const [totalAgent, setTotalAgent] = useState(0);
  const [totalPremium, setTotalPremium] = useState(0);
  const [totalCommissions, setTotalCommissions] = useState(0);
  const [totalSubscribers, setTotalSubscribers] = useState(0);

  const fetchReport = () => {
    const reportData = localStorage.getItem("ManagementReport");
    let parsedData: ManagementReportData | null = null;
    if (reportData) {
      parsedData = JSON.parse(reportData) as ManagementReportData;
      setTotalAgent(parsedData.total_agent);
      setTotalPremium(parsedData.total_policy_amount);
      setTotalCommissions(parsedData.total_commission_amount);
      setTotalSubscribers(parsedData.total_subscriber);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <AdminLayout title="Revenue Share" caption="View and manage your revenue">
      <div className={`space-y-8`}>
        <DashboardStatistics
          firstBoxImageUrl="/assets/admin/total-premium.png"
          firstBoxTitle="Total Premium"
          firstBoxPrice={totalPremium}
          secondBoxImageUrl="/assets/admin/total-commissions.png"
          secondBoxTitle="Total Commission"
          secondBoxPrice={totalCommissions}
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

        <RevenueShareTable />
      </div>
    </AdminLayout>
  );
};

export default RevenueShare;
