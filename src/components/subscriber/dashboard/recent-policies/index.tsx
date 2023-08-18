import { ArrowRightIcon } from "@heroicons/react/24/outline";
import TableComponent, { TableRow } from "@/common/table/index.component";
import React, { useEffect, useState } from "react";
import FormCheckboxComponent from "@/common/form-checkbox/index.component";
import SubscriberPolicyStatusChipsComponent from "@/components/subscriber/policies/status-chips/index.component";
import ButtonComponent from "@/common/button/index.component";
import subscriberService from "../../../../../services/subscriber.service";
import { UserDataType } from "../../policies/index.component";
import { useRouter } from "next/router";

const SubscriberRecentPoliciesComponent = () => {
  const [recentPoliciesHeaders, setRecentPoliciesHeaders] = useState([
    { id: 1, label: <FormCheckboxComponent /> },
    { id: 2, label: <span>Policy</span> },
    { id: 3, label: <span>Premium</span> },
    { id: 4, label: <span>Effective Date</span> },
    { id: 5, label: <span>Status</span> },
    { id: 6, label: <span>Active</span> },
  ]);
  const [recentPoliciesRows, setRecentPoliciesRows] = useState<TableRow[]>([]);
  const { GetPolicies } = subscriberService;
  const router = useRouter();

  const getPoliciesAction = async () => {
    setRecentPoliciesHeaders([
      { id: 1, label: <FormCheckboxComponent /> },
      { id: 2, label: <span>Policy</span> },
      { id: 3, label: <span>Premium</span> },
      { id: 4, label: <span>Effective Date</span> },
      { id: 5, label: <span>Status</span> },
      { id: 6, label: <span>Active</span> },
    ]);
    const userData = localStorage.getItem("AutoFlexUserData");
    let parsedData: UserDataType | null = null;
    if (userData) {
      parsedData = JSON.parse(userData) as UserDataType;
      const userId = parsedData.id;
      const res = await GetPolicies(userId);
      if (res.status === 200 || res.status === 201) {
        setRecentPoliciesRows(
          res.data.data.policies.map((policy: any) => ({
            id: policy.id,
            data: {
              1: <FormCheckboxComponent />,
              2: policy.policyNumber === null ? "---" : policy.policyNumber,
              3: policy.policy_amount,
              4: policy.start_date === null ? "---" : policy.start_date,
              5: <SubscriberPolicyStatusChipsComponent type={policy.status} />,
              6: (
                <ButtonComponent size={"sm"} variant={"outlined"}>
                  <span>View Details</span>
                </ButtonComponent>
              ),
            },
          }))
        );
      }
    }
  };

  useEffect(() => {
    getPoliciesAction();
  }, []);

  return (
    <div className={"w-full h-full max-h-96 bg-white rounded-md overflow-auto"}>
      <div
        className={
          "p-6 flex items-center justify-between gap-3 border-b border-gray-main"
        }
      >
        <h3 className={"text-lg font-medium"}>Recent Policies</h3>

        <button
          className={"flex items-center gap-2 text-primary"}
          onClick={() => router.push("/subscriber/policies")}
        >
          <span className={"font-medium"}>View All</span>
          <ArrowRightIcon className={"w-5 h-5"} />
        </button>
      </div>

      <div className={"p-6"}>
        <TableComponent
          headers={recentPoliciesHeaders}
          rows={recentPoliciesRows}
          paginate={false}
          totalPages={1}
          currentPage={1}
          onPageChange={() => {}}
        />
      </div>
    </div>
  );
};

export default SubscriberRecentPoliciesComponent;
