import DashboardStatistics from "@/components/admin/DashboardStatistics";
import PoliciesTable from "@/components/admin/PoliciesTable";
import AdminLayout, {
  ManagementReportData,
} from "@/layouts/admin/index.layout";
import FormInputComponent from "@/common/form-input/index.component";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import FormDateRangePickerComponent from "@/common/form-date-range-picker/index.component";
import FormSelectComponent from "@/common/form-select/index.component";
import ExportButtonComponent from "@/common/export-btn/index.component";
import { useEffect, useState } from "react";

const Policies = () => {
  const [activePolices, setActivePolicies] = useState(0);
  const [pendingPolicies, setPendingPolicies] = useState(0);
  const [inactivePolicies, setInactivePolicies] = useState(0);
  const [expiredPolicies, setExpiredPolices] = useState(0);
  const fetchReport = () => {
    const reportData = localStorage.getItem("ManagementReport");
    let parsedData: ManagementReportData | null = null;
    if (reportData) {
      parsedData = JSON.parse(reportData) as ManagementReportData;
      setActivePolicies(parsedData.active_policies);
      setPendingPolicies(parsedData.pending_policies);
      setInactivePolicies(parsedData.expired_policies);
      setExpiredPolices(parsedData.expired_policies);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <AdminLayout title="Policies" caption="View your policies and covers">
      <div className={`space-y-8`}>
        <DashboardStatistics
          firstBoxImageUrl="/assets/admin/active-policies.png"
          firstBoxTitle="Active Policies"
          firstBoxPrice={activePolices}
          secondBoxImageUrl="/assets/admin/active-renewals.png"
          secondBoxTitle="Awaiting Renewals"
          secondBoxPrice={pendingPolicies}
          thirdBoxImageUrl="/assets/admin/deactivated-policies.png"
          thirdBoxTitle="Deactivated Policies"
          thirdBoxPrice={inactivePolicies}
          fourthBoxImageUrl="/assets/admin/expired-policies.png"
          fourthBoxTitle="Expired Policies"
          fourthBoxPrice={expiredPolicies}
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

        <PoliciesTable />
      </div>
    </AdminLayout>
  );
};

export default Policies;
