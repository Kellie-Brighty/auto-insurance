import { ArrowRightIcon } from "@heroicons/react/24/outline";
import SubscriberRecentTransactionItemComponent, {
  SubscriberRecentTransactionItemComponentProps,
} from "@/components/subscriber/dashboard/recent-transaction-item";
import React, { useEffect, useState } from "react";
import subscriberService from "../../../../../services/subscriber.service";
import { UserDataType } from "../../policies/index.component";
import moment from "moment";
import { useRouter } from "next/router";

const SubscriberRecentTransactionsComponent = () => {
  const [recentTransactions, setRecentTransactions] = useState<
    SubscriberRecentTransactionItemComponentProps[]
  >([]);
  const { GetPayments } = subscriberService;
  const router = useRouter();

  const getTransactionsAction = async () => {
    try {
      const userData = localStorage.getItem("AutoFlexUserData");
      let parsedData: UserDataType | null = null;
      if (userData) {
        parsedData = JSON.parse(userData) as UserDataType;
        const userId = parsedData.id;
        const res = await GetPayments(userId);
        console.log(res.data);
        setRecentTransactions(
          res.data.data.map((transaction: any) => ({
            type:
              transaction.transaction_status === "success"
                ? "success"
                : "pending",
            id: `#${transaction.transaction_id}`,
            date: moment(transaction.transaction_date).format("Do MMM, YYYY"),
            amount: transaction.transaction_amount,
          }))
        );
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTransactionsAction();
    //   {
    //     id: 1,
    //     data: {
    //       1: <FormCheckboxComponent />,
    //       2: <span>UIC/ERT/MIZP/164</span>,
    //       3: <span>UIC/ERT/MIZP/164</span>,
    //       4: <span>₦625,000</span>,
    //       5: <span>01.01.2022</span>,
    //       6: <SubscriberTransactionStatusChipComponent type={"success"} />,
    //       7: (
    //         <ButtonComponent size={"sm"} variant={"outlined"}>
    //           <span>View Details</span>
    //         </ButtonComponent>
    //       ),
    //     },
    //   },
    //   {
    //     id: 2,
    //     data: {
    //       1: <FormCheckboxComponent />,
    //       2: <span>UIC/ERT/MIZP/164</span>,
    //       3: <span>UIC/ERT/MIZP/164</span>,
    //       4: <span>₦625,000</span>,
    //       5: <span>01.01.2022</span>,
    //       6: <SubscriberTransactionStatusChipComponent type={"pending"} />,
    //       7: (
    //         <ButtonComponent size={"sm"} variant={"outlined"}>
    //           <span>View Details</span>
    //         </ButtonComponent>
    //       ),
    //     },
    //   },
    //   {
    //     id: 3,
    //     data: {
    //       1: <FormCheckboxComponent />,
    //       2: <span>UIC/ERT/MIZP/164</span>,
    //       3: <span>UIC/ERT/MIZP/164</span>,
    //       4: <span>₦625,000</span>,
    //       5: <span>01.01.2022</span>,
    //       6: <SubscriberTransactionStatusChipComponent type={"failed"} />,
    //       7: (
    //         <ButtonComponent size={"sm"} variant={"outlined"}>
    //           <span>View Details</span>
    //         </ButtonComponent>
    //       ),
    //     },
    //   },
    // ]);
  }, []);

  return (
    <div className={"w-full max-h-96 bg-white rounded-md overflow-auto"}>
      <div
        className={
          "p-6 flex items-center justify-between gap-3 border-b border-gray-main"
        }
      >
        <h3 className={"text-lg font-medium"}>Recent Transactions</h3>

        <button
          className={"flex items-center gap-2 text-primary"}
          onClick={() => router.push("/subscriber/transactions")}
        >
          <span className={"font-medium"}>View All</span>
          <ArrowRightIcon className={"w-5 h-5"} />
        </button>
      </div>

      <div className={"divide-y divide-y-gray-main"}>
        {recentTransactions.map((transaction) => (
          <SubscriberRecentTransactionItemComponent
            key={transaction.id}
            type={transaction.type}
            id={transaction.id}
            date={transaction.date}
            amount={transaction.amount}
          />
        ))}
      </div>
    </div>
  );
};

export default SubscriberRecentTransactionsComponent;
