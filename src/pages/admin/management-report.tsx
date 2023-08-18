import ExportButtonComponent from "@/common/export-btn/index.component";
import FormDateRangePickerComponent from "@/common/form-date-range-picker/index.component";
import FormInputComponent from "@/common/form-input/index.component";
import FormSelectComponent from "@/common/form-select/index.component";
import DashboardStatistics from "@/components/admin/DashboardStatistics";
import ManagmentReportsTable from "@/components/admin/ManagmentReportsTable";
import AdminLayout, { ManagementReportData } from "@/layouts/admin/index.layout";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const ManagementReport = () => {
  const [gains, setGains] = useState(0);
  const [losses, setLosses] = useState(0);
  const [totalAgent, setTotalAgent] = useState(0);
  const [totalSubscribers, setTotalSubscribers] = useState(0);

  const fetchReport = () => {
    const reportData = localStorage.getItem("ManagementReport");
    let parsedData: ManagementReportData | null = null;
    if (reportData) {
      parsedData = JSON.parse(reportData) as ManagementReportData;
      setGains(parsedData.gains);
      setLosses(parsedData.losses);
      setTotalAgent(parsedData.total_agent);
      setTotalSubscribers(parsedData.total_subscriber);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <AdminLayout
      title="Management Report"
      caption="View and manage management report"
    >
      <div className={`space-y-8`}>
        <DashboardStatistics
          firstBoxImageUrl="/assets/admin/total-premium.png"
          firstBoxTitle="Gains"
          firstBoxPrice={gains}
          secondBoxImageUrl="/assets/admin/total-commissions.png"
          secondBoxTitle="Losses"
          secondBoxPrice={losses}
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

        <ManagmentReportsTable />
      </div>
    </AdminLayout>
  );
};

export default ManagementReport;
