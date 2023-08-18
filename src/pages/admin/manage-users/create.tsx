import ButtonComponent from "@/common/button/index.component";
import FormFileInputComponent from "@/common/form-file-input/index.component";
import FormInputComponent from "@/common/form-input/index.component";
import FormSelectComponent from "@/common/form-select/index.component";
import AdminLayout from "@/layouts/admin/index.layout";
import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const AdminCreateUserPage = () => {
  return (
    <AdminLayout title={"Create New User"} caption={"Create and manage users."}>
      <div className={"p-8 space-y-8 bg-white rounded-lg"}>
        <span className={"text-lg font-medium"}>Add New User</span>

        <div className={"grid grid-cols-12 gap-4"}>
          <div className={"col-span-12"}>
            <FormFileInputComponent label={"User Image"} />
          </div>

          <div className={"col-span-4"}>
            <FormInputComponent
              label={"First Name"}
              Icon={<UserIcon className={"w-5 h-5"} />}
            />
          </div>

          <div className={"col-span-4"}>
            <FormInputComponent
              label={"Middle Name"}
              Icon={<UserIcon className={"w-5 h-5"} />}
            />
          </div>

          <div className={"col-span-4"}>
            <FormInputComponent
              label={"Last Name"}
              Icon={<UserIcon className={"w-5 h-5"} />}
            />
          </div>

          <div className={"col-span-4"}>
            <FormInputComponent
              type={"email"}
              label={"Email"}
              Icon={<EnvelopeIcon className={"w-5 h-5"} />}
            />
          </div>

          <div className={"col-span-4"}>
            <FormInputComponent
              label={"Phone Number"}
              Icon={<PhoneIcon className={"w-5 h-5"} />}
            />
          </div>

          <div className={"col-span-4"}>
            <FormSelectComponent label={"Gender"}>
              <option>Male</option>
              <option>Female</option>
            </FormSelectComponent>
          </div>

          <div className={"col-span-4"}>
            <FormSelectComponent label={"Role"}>
              <option>Role 1</option>
              <option>Role 2</option>
            </FormSelectComponent>
          </div>

          <div className={"col-span-8"}>
            <FormInputComponent
              label={"Address"}
              Icon={<MapPinIcon className={"w-5 h-5"} />}
            />
          </div>

          <div className={"col-span-12"}>
            <ButtonComponent size={"base"} variant={"filled"}>
              Create Account
            </ButtonComponent>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCreateUserPage;
