import ExportButtonComponent from "@/common/export-btn/index.component";
import FormInputComponent from "@/common/form-input/index.component";
import FormSelectComponent from "@/common/form-select/index.component";
import ManageUserTable from "@/components/admin/ManageUserTable";
import AdminLayout from "@/layouts/admin/index.layout";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";

const ManageUsers = () => {
  return (
    <AdminLayout title="Manage Users" caption="View and manage users">
      <div className={`space-y-8`}>
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
            <ExportButtonComponent />
          </div>
        </div>

        <ManageUserTable />
      </div>
    </AdminLayout>
  );
};

export default ManageUsers;
