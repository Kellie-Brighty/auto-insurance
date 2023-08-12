import React, { useContext, useEffect, useState } from "react";
import AgentKycStepsComponent from "@/components/agent/kyc-steps/index.component";
import AgentDashboardComponent from "@/components/agent/dashboard";
import { GlobalContext } from "../../../services/context";

export default function AgentOverview() {
  const [kycCompleted, setKycCompleted] = useState(false);
  const { agentConfirmed } = useContext(GlobalContext);

  useEffect(() => {
    setKycCompleted(false);
  }, []);

  return agentConfirmed ? (
    <AgentDashboardComponent />
  ) : (
    <AgentKycStepsComponent />
  );
}
