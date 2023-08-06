import SubscriberLayout from "@/layouts/subscriber/index.layout";
import FormInputComponent from "@/common/form-input/index.component";
import {
  FunnelIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import FormSelectComponent from "@/common/form-select/index.component";
import ButtonComponent from "@/common/button/index.component";
import { useEffect, useState } from "react";
import SubscriberVehicleCardComponent from "@/components/subscriber/vehicles/vehicle-card";
import PaginationComponent from "@/common/pagination/index.component";
import { useRouter } from "next/router";
import subscriberService from "../../../../services/subscriber.service";
import useUserBasicInfo from "@/hooks/useUserBasicInfo";

// Todo: replace the interface object with actual vehicle object
interface Vehicle {
  chasisNumber: string;
  createdAt: string;
  deletedAt: null;
  engineNumber: string;
  id: number;
  plateNumber: string;
  updatedAt: string;
  user_id: number;
  vehicleColor: string;
  vehicleName: string;
  vehicleType: null;
  vehicleWorth: number;
  vehicleYear: string;
  VehicleMedia: {
    createdAt: string;
    deletedAt: null;
    id: number;
    updatedAt: string;
    vehicle_back: null;
    vehicle_dashboard: null;
    vehicle_front: null;
    vehicle_id: number;
    vehicle_left_side: null;
    vehicle_right_side: null;
    vehicle_video: null;
  };
}

const SubscriberVehiclesComponent = () => {
  const { userBasicInfo } = useUserBasicInfo();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const [vehiclesTotalPages, setVehiclesTotalPages] = useState(0);
  const [vehiclesCurrentPage, setVehiclesCurrentPage] = useState(1);
  const router = useRouter();
  const { GetSubscriberVehicles } = subscriberService;

  const getVehiclesAction = async (pageNumber: any) => {
    const autoFlexUserDataString = localStorage.getItem("AutoFlexUserData");

    if (autoFlexUserDataString) {
      const autoFlexUserData = JSON.parse(autoFlexUserDataString) as any;
      try {
        const res = await GetSubscriberVehicles(
          autoFlexUserData.id,
          pageNumber,
        );
        console.log(res.data.data);
        setVehicles(res.data.data.vehicle);

        // Backend guy needs to add these properties:
        setVehiclesTotalPages(res.data.data.totalPages || 50);
      } catch (err: any) {
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    getVehiclesAction(vehiclesCurrentPage);
  }, [vehiclesCurrentPage]);

  return (
    <SubscriberLayout title={"Vehicles"} caption={"Manage your vehicles."}>
      <div className={"space-y-8"}>
        <div className={"flex items-center justify-between gap-8"}>
          <FormInputComponent
            placeholder={"Search Anything"}
            Icon={<MagnifyingGlassIcon className={"w-5 h-5"} />}
          />

          <div className={"flex items-center gap-3"}>
            <FormSelectComponent Icon={<FunnelIcon className={"w-5 h-5"} />}>
              <option>All Policies</option>
              <option>All Policies</option>
              <option>All Policies</option>
            </FormSelectComponent>

            <ButtonComponent
              size={"base"}
              variant={"filled"}
              onClick={() => router.push("/subscriber/vehicles/create")}
            >
              <div className={"flex items-center justify-center gap-2"}>
                <PlusIcon className={"w-5 h-5"} />
                <span>Add New Vehicle</span>
              </div>
            </ButtonComponent>
          </div>
        </div>

        {vehicles.length === 0 ? (
          <div
            className={
              "w-full h-96 p-6 flex flex-col items-center justify-center bg-white rounded-md"
            }
          >
            <h3 className={"text-lg font-medium"}>No vehicles added yet.</h3>
            <span className={"text-gray-dark"}>
              New vehicles will start appearing here as soon as you add them.
            </span>
          </div>
        ) : (
          <div className={"grid grid-cols-12 gap-3"}>
            {vehicles.map((vehicle) => (
              <SubscriberVehicleCardComponent
                key={vehicle.id}
                carName={vehicle.vehicleName}
                plateNumber={vehicle.plateNumber}
                registrationName={vehicle.vehicleName}
                color={vehicle.vehicleColor}
                premium={vehicle.vehicleWorth}
              />
            ))}

            <div className={"col-span-12 flex items-center justify-end"}>
              <PaginationComponent
                totalPages={vehiclesTotalPages}
                currentPage={vehiclesCurrentPage}
                onPageChange={(page) => {
                  setVehiclesCurrentPage(page);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </SubscriberLayout>
  );
};

export default SubscriberVehiclesComponent;
