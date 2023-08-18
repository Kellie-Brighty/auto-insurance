import { useEffect, useState } from "react";
import TableComponent, {
  TableHeader,
  TableRow,
} from "@/common/table/index.component";
import FormCheckboxComponent from "@/common/form-checkbox/index.component";
import ButtonComponent from "@/common/button/index.component";
import FormInputComponent from "@/common/form-input/index.component";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import FormDateRangePickerComponent from "@/common/form-date-range-picker/index.component";
import FormSelectComponent from "@/common/form-select/index.component";
import SubscriberTransactionStatusChipComponent from "@/components/subscriber/transactions/status-chip";
import subscriberService from "../../../../services/subscriber.service";
import { UserDataType } from "@/components/subscriber/policies/index.component";
import moment from "moment";
import AgentLayout from "@/layouts/agent/index.layout";

const currencyCode = "NGN";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: currencyCode,
});

const AgentTransactionsComponent = () => {
  const [transactionsHeaders, setTransactionsHeaders] = useState<TableHeader[]>(
    [
      { id: 1, label: <FormCheckboxComponent /> },
      { id: 2, label: <span>Policy Number</span> },
      { id: 3, label: <span>Transaction ID</span> },
      { id: 4, label: <span>Premium</span> },
      { id: 5, label: <span>Transaction Date</span> },
      { id: 6, label: <span>Status</span> },
      { id: 7, label: <span>Actions</span> },
    ]
  );
  const [transactionsRows, setTransactionsRows] = useState<TableRow[]>([]);

  const [transactionsTotalPages, setTransactionsTotalPages] = useState(0);
  const [transactionsCurrentPage, setTransactionsCurrentPage] = useState(0);
  const { GetPayments } = subscriberService;

  const getTransactionsAction = async () => {
    setTransactionsHeaders([
      { id: 1, label: <FormCheckboxComponent /> },
      { id: 2, label: <span>Policy Number</span> },
      { id: 3, label: <span>Transaction ID</span> },
      { id: 4, label: <span>Premium</span> },
      { id: 5, label: <span>Transaction Date</span> },
      { id: 6, label: <span>Status</span> },
      { id: 7, label: <span>Actions</span> },
    ]);

    try {
      const userData = localStorage.getItem("AutoFlexUserData");
      let parsedData: UserDataType | null = null;
      if (userData) {
        parsedData = JSON.parse(userData) as UserDataType;
        const userId = parsedData.id;
        const res = await GetPayments(userId);
        console.log(res.data);
        setTransactionsRows(
          res.data.data.map((transaction: any) => ({
            id: 1,
            data: {
              1: <FormCheckboxComponent />,
              2: <span>{transaction.Policy.policyNumber || "---"}</span>,
              3: <span>{transaction.transaction_id}</span>,
              4: (
                <span>{formatter.format(transaction.transaction_amount)}</span>
              ),
              5: (
                <span>
                  {moment(transaction.transaction_date).format("DD.MM.yyyy")}
                </span>
              ),
              6: (
                <SubscriberTransactionStatusChipComponent
                  type={
                    transaction.transaction_status === "success"
                      ? "success"
                      : "pending"
                  }
                />
              ),
              7: (
                <ButtonComponent size={"sm"} variant={"outlined"}>
                  <span>View Details</span>
                </ButtonComponent>
              ),
            },
          }))
        );
        setTransactionsTotalPages(50);
        setTransactionsCurrentPage(1);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTransactionsAction();
  }, []);

  return (
    <AgentLayout
      title={"Transactions"}
      caption={"View your policies and covers."}
    >
      <div className={"space-y-8"}>
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
          </div>
        </div>

        <div className={"p-6 bg-white rounded-md"}>
          {transactionsRows.length !== 0 ? (
            <TableComponent
              headers={transactionsHeaders}
              rows={transactionsRows}
              totalPages={transactionsTotalPages}
              currentPage={transactionsCurrentPage}
              onPageChange={() => {}}
            />
          ) : (
            <div className={`text-center p-[50px]`}>
              <p className={`font-grotesk text-[20px] font-bold`}>
                No Transactioons yet
              </p>
              <p className={`text-[14px] text-[#94A3B8]`}>
                Your transactions will appear as soon as you make one
              </p>
            </div>
          )}
        </div>
      </div>
    </AgentLayout>
  );
};

export default AgentTransactionsComponent;
