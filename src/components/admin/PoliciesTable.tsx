import React, { useEffect, useState } from "react";
import TableComponent, {
  TableHeader,
  TableRow,
} from "@/common/table/index.component";
import FormCheckboxComponent from "@/common/form-checkbox/index.component";
import ButtonComponent from "@/common/button/index.component";
import SubscriberPolicyStatusChipsComponent from "../subscriber/policies/status-chips/index.component";
import adminService from "../../../services/admin.service";

const PoliciesTable = () => {
  const [policiesHeaders, setPoliciesHeaders] = useState<TableHeader[]>([]);
  const [policiesRows, setPoliciesRows] = useState<TableRow[]>([]);

  const [policiesTotalPages, setPoliciesTotalPages] = useState<number>(0);
  const [policiesCurrentPage, setPoliciesCurrentPage] = useState<number>(0);
  const { GetAllPolicies } = adminService;

  const getAllPoliciesAction = async () => {
    setPoliciesHeaders([
      { id: 0, label: <FormCheckboxComponent /> },
      { id: 1, label: <span>Policy Name</span> },
      { id: 2, label: <span>Policy Number</span> },
      { id: 3, label: <span>Premium</span> },
      { id: 4, label: <span>Start Date</span> },
      { id: 5, label: <span>Expiring Date</span> },
      { id: 6, label: <span>Status</span> },
      { id: 7, label: <span>Actions</span> },
    ]);

    const res = await GetAllPolicies();
    console.log("Policy res:::", res.data.data.policies);
    if (res.status === 200 || res.status === 201) {
      setPoliciesRows(
        res.data.data.policies.map((policy: any) => ({
          id: policy.id,
          data: {
            0: <FormCheckboxComponent />,
            1: policy.policyName,
            2: policy.policyNumber === null ? "---" : policy.policyNumber,
            3: policy.policy_amount,
            4: policy.start_date === null ? "---" : policy.start_date,
            5: policy.end_date === null ? "---" : policy.end_date,
            6: <SubscriberPolicyStatusChipsComponent type={policy.status} />,
            7: (
              <ButtonComponent size={"sm"} variant={"outlined"}>
                <span>View Details</span>
              </ButtonComponent>
            ),
          },
        }))
      );
      setPoliciesTotalPages(50);
      setPoliciesCurrentPage(1);
    }
  };

  useEffect(() => {
    getAllPoliciesAction();
  }, []);

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
            No Policies yet
          </p>
          <p className={`text-[14px] text-[#94A3B8]`}>
            Policies will appear as soon as purchase have one
          </p>
        </div>
      )}
    </div>
  );
};

export default PoliciesTable;
