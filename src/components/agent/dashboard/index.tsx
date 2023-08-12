import React from "react";
import SubscriberPolicyStatsCardComponent from "@/components/subscriber/policies/stats-card/index.component";
import AgentLayout from "@/layouts/agent/index.layout";
import AgentPremiumHistoryChartComponent from "@/components/agent/dashboard/premium-history-chart";
import AgentNextPremiumComponent from "@/components/agent/dashboard/next-premium";
import AgentRecentPoliciesComponent from "@/components/agent/dashboard/recent-policies";
import AgentRecentTransactionsComponent from "@/components/agent/dashboard/recent-transactions";

const AgentDashboardComponent = () => {
  return (
    <AgentLayout title={"Overview"} caption={"View your policies and covers"}>
      <div className={"grid grid-cols-12 gap-8"}>
        <div className={"col-span-12 grid grid-cols-12 gap-8"}>
          <div className={"col-span-12 xl:col-span-3"}>
            <SubscriberPolicyStatsCardComponent
              type={"total"}
              value={123}
              change={+12}
            />
          </div>

          <div className={"col-span-12 xl:col-span-3"}>
            <SubscriberPolicyStatsCardComponent
              type={"active"}
              value={456}
              change={+16}
            />
          </div>

          <div className={"col-span-12 xl:col-span-3"}>
            <SubscriberPolicyStatsCardComponent
              type={"pending"}
              value={789}
              change={-8}
            />
          </div>

          <div className={"col-span-12 xl:col-span-3"}>
            <SubscriberPolicyStatsCardComponent
              type={"expired"}
              value={234}
              change={-4}
            />
          </div>
        </div>

        <div className={"col-span-12 xl:col-span-7"}>
          <AgentPremiumHistoryChartComponent />
        </div>

        <div className={"col-span-12 xl:col-span-5"}>
          <AgentNextPremiumComponent />
        </div>

        {/* <div className={"col-span-12 xl:col-span-7"}>
          <AgentRecentPoliciesComponent />
        </div>

        <div className={"col-span-12 xl:col-span-5"}>
          <AgentRecentTransactionsComponent />
        </div> */}
      </div>
    </AgentLayout>
  );
};

export default AgentDashboardComponent;
