import FormSelectComponent from "@/common/form-select/index.component";
import AreaChartComponent, { AreaChartDatum } from "@/common/charts/area";
import React, { useEffect, useState } from "react";

const SubscriberPremiumHistoryChartComponent = () => {
  const [chartData, setChartData] = useState<AreaChartDatum[]>([]);

  useEffect(() => {
    setChartData([
      { x: "January", y: 31453 },
      { x: "February", y: 22647 },
      { x: "March", y: 25280 },
      { x: "April", y: 40273 },
      { x: "May", y: 19029 },
      { x: "June", y: 21928 },
    ]);
  }, []);

  return (
    <div className={"w-full p-6 space-y-3 bg-white rounded-md"}>
      <div className={"flex items-center justify-between gap-3"}>
        <div className={"flex flex-col"}>
          <span className={"text-sm text-gray-dark"}>
            Total Premium for the last one year:
          </span>

          <div className={"flex items-center gap-2"}>
            <span className={"text-lg font-bold"}>₦48,574.21</span>
            <span className={`text-sm text-green-500`}>+21%</span>
          </div>
        </div>
      </div>

      <AreaChartComponent data={chartData} />
    </div>
  );
};

export default SubscriberPremiumHistoryChartComponent;
