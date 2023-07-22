import { useEffect, useState } from "react";
import TableComponent, {
  TableHeader,
  TableRow,
} from "@/common/table/index.component";
import FormCheckboxComponent from "@/common/form-checkbox/index.component";
import ButtonComponent from "@/common/button/index.component";
import SubscriberLayout from "@/layouts/subscriber/index.layout";
import FormInputComponent from "@/common/form-input/index.component";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import FormDateRangePickerComponent from "@/common/form-date-range-picker/index.component";
import FormSelectComponent from "@/common/form-select/index.component";
import SubscriberTransactionStatusChipComponent from "@/components/subscriber/transactions/status-chip";

const SubscriberTransactionsComponent = () => {
  const [transactionsHeaders, setTransactionsHeaders] = useState<TableHeader[]>(
    [
      { id: 1, label: <FormCheckboxComponent /> },
      { id: 2, label: <span>Policy Number</span> },
      { id: 3, label: <span>Transaction ID</span> },
      { id: 4, label: <span>Premium</span> },
      { id: 5, label: <span>Transaction Date</span> },
      { id: 6, label: <span>Status</span> },
      { id: 7, label: <span>Actions</span> },
    ],
  );
  const [transactionsRows, setTransactionsRows] = useState<TableRow[]>([]);

  const [transactionsTotalPages, setTransactionsTotalPages] = useState(0);
  const [transactionsCurrentPage, setTransactionsCurrentPage] = useState(0);

  useEffect(() => {
    setTransactionsRows([
      {
        id: 1,
        data: {
          1: <FormCheckboxComponent />,
          2: <span>UIC/ERT/MIZP/164</span>,
          3: <span>UIC/ERT/MIZP/164</span>,
          4: <span>₦625,000</span>,
          5: <span>01.01.2022</span>,
          6: <SubscriberTransactionStatusChipComponent type={"success"} />,
          7: (
            <ButtonComponent size={"sm"} variant={"outlined"}>
              <span>View Details</span>
            </ButtonComponent>
          ),
        },
      },
      {
        id: 2,
        data: {
          1: <FormCheckboxComponent />,
          2: <span>UIC/ERT/MIZP/164</span>,
          3: <span>UIC/ERT/MIZP/164</span>,
          4: <span>₦625,000</span>,
          5: <span>01.01.2022</span>,
          6: <SubscriberTransactionStatusChipComponent type={"pending"} />,
          7: (
            <ButtonComponent size={"sm"} variant={"outlined"}>
              <span>View Details</span>
            </ButtonComponent>
          ),
        },
      },
      {
        id: 3,
        data: {
          1: <FormCheckboxComponent />,
          2: <span>UIC/ERT/MIZP/164</span>,
          3: <span>UIC/ERT/MIZP/164</span>,
          4: <span>₦625,000</span>,
          5: <span>01.01.2022</span>,
          6: <SubscriberTransactionStatusChipComponent type={"failed"} />,
          7: (
            <ButtonComponent size={"sm"} variant={"outlined"}>
              <span>View Details</span>
            </ButtonComponent>
          ),
        },
      },
    ]);

    setTransactionsTotalPages(50);
    setTransactionsCurrentPage(1);
  }, []);

  return (
    <SubscriberLayout
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
          <TableComponent
            headers={transactionsHeaders}
            rows={transactionsRows}
            totalPages={transactionsTotalPages}
            currentPage={transactionsCurrentPage}
            onPageChange={() => {}}
          />
        </div>
      </div>
    </SubscriberLayout>
  );
};

export default SubscriberTransactionsComponent;
