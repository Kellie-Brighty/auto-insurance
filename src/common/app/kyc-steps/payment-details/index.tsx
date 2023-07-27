import { TruckIcon } from "@heroicons/react/24/outline";
import React from "react";

interface PaymentDetailsComponentProps {
  totalAmount: number;
}

const PaymentDetailsComponent: React.FC<PaymentDetailsComponentProps> = ({
  totalAmount,
}) => {
  return (
    <div className={"w-full bg-white rounded-md"}>
      <div className={"p-6 border-b border-gray-main"}>
        <h3 className={"text-lg font-medium"}>Payment Details</h3>
      </div>

      <div className={"p-6 grid grid-cols-12 gap-3"}>
        <div
          className={
            "relative col-span-12 xl:col-span-6 p-6 space-y-6 text-white bg-secondary rounded-md"
          }
        >
          <div
            className={
              "absolute top-0 left-0 -translate-y-1/4 -translate-x-1/4 w-32 h-48 rounded-full bg-white opacity-25 blur-2xl"
            }
          />

          <div className={"space-y-3"}>
            <div className={"flex flex-col"}>
              <span>Selected Plan</span>
              <span className={"text-2xl font-grotesk font-bold"}>
                Yearly at 5.0% of the car worth.
              </span>
            </div>

            <div>
              <span>
                Suitable for car lovers seeking all rounded protection, this
                plan covers:
              </span>
            </div>
          </div>

          <div className={"w-full h-0.5 bg-white bg-opacity-75"} />

          <div className={"grid grid-cols-12 gap-3"}>
            <div className={"col-span-6 lg:col-span-4 flex items-center gap-2"}>
              <TruckIcon className={"w-5 h-5"} />
              <span className={"text-sm text-white opacity-75 truncate"}>
                Accident
              </span>
            </div>

            <div className={"col-span-6 lg:col-span-4 flex items-center gap-2"}>
              <TruckIcon className={"w-5 h-5"} />
              <span className={"text-sm text-white opacity-75 truncate"}>
                Third Party Liability
              </span>
            </div>

            <div className={"col-span-6 lg:col-span-4 flex items-center gap-2"}>
              <TruckIcon className={"w-5 h-5"} />
              <span className={"text-sm text-white opacity-75 truncate"}>
                Personal Cover
              </span>
            </div>

            <div className={"col-span-6 lg:col-span-4 flex items-center gap-2"}>
              <TruckIcon className={"w-5 h-5"} />
              <span className={"text-sm text-white opacity-75 truncate"}>
                Theft
              </span>
            </div>

            <div className={"col-span-6 lg:col-span-4 flex items-center gap-2"}>
              <TruckIcon className={"w-5 h-5"} />
              <span className={"text-sm text-white opacity-75 truncate"}>
                Natural Calamities
              </span>
            </div>

            <div className={"col-span-6 lg:col-span-4 flex items-center gap-2"}>
              <TruckIcon className={"w-5 h-5"} />
              <span className={"text-sm text-white opacity-75 truncate"}>
                Add-on Choice
              </span>
            </div>
          </div>

          <div
            className={
              "absolute bottom-0 right-0 translate-y-1/4 translate-x-1/4 w-32 h-48 rounded-full bg-white opacity-25 blur-2xl"
            }
          />
        </div>

        <div
          className={
            "col-span-12 xl:col-span-6 p-6 space-y-6 border border-gray-main rounded-md"
          }
        >
          <span className={"text-2xl font-grotesk font-bold"}>
            Single Year Comprehensive Insurance Summary:
          </span>

          <div className={"space-y-3"}>
            <div className={"grid grid-cols-12 items-center gap-2"}>
              <span className={"col-span-9 text-sm text-gray-dark"}>
                Damage due to natural calamities - Fire, Earthquake, Cyclone,
                Flood, etc...
              </span>

              <span className={"col-span-3 text-sm font-medium text-right"}>
                ₦1,200,000
              </span>
            </div>

            <div className={"grid grid-cols-12 items-center gap-2"}>
              <span className={"col-span-9 text-sm text-gray-dark"}>
                Damage due to events
              </span>

              <span className={"col-span-3 text-sm font-medium text-right"}>
                ₦1,200,000
              </span>
            </div>

            <div className={"grid grid-cols-12 items-center gap-2"}>
              <span className={"col-span-9 text-sm text-gray-dark"}>
                Damage to third party vehicle
              </span>

              <span className={"col-span-3 text-sm font-medium text-right"}>
                ₦1,200,000
              </span>
            </div>

            <div className={"w-full h-0.5 bg-gray-main"} />

            <div className={"grid grid-cols-12 gap-2"}>
              <span className={"col-span-9 text-gray-dark"}>Total</span>

              <span className={"col-span-3 font-medium text-right"}>
                ₦{totalAmount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsComponent;
