import AuthLayout from "@/layouts/auth/index.layout";
import FormInputComponent from "@/common/form-input/index.component";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import ButtonComponent from "@/common/button/index.component";

interface ResetPasswordInterface {
  routeParam: any;
  action: () => void;
  loading: boolean;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  setOldPassword: React.Dispatch<React.SetStateAction<string>>;
  setNewPassword: React.Dispatch<React.SetStateAction<string>>;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  resendEmail: () => void;
  resendLoading: boolean;
}

const IndexComponent = ({
  routeParam,
  action,
  loading,
  newPassword,
  confirmPassword,
  setOldPassword,
  setNewPassword,
  setConfirmPassword,
  error,
  setError,
  resendEmail,
  resendLoading,
}: ResetPasswordInterface) => {
  return (
    <AuthLayout title={"Set Password"}>
      <div className={"space-y-3"}>
        {error !== "" && <p className={`text-red-500 text-[14px]`}>{error}</p>}
        <FormInputComponent
          type={"password"}
          label={"New Password"}
          Icon={<LockClosedIcon className={"w-5 h-5 text-gray-dark"} />}
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            setError("");
          }}
        />

        <FormInputComponent
          type={"password"}
          label={"Confirm Password"}
          Icon={<LockClosedIcon className={"w-5 h-5 text-gray-dark"} />}
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setError("");
          }}
        />

        <ButtonComponent
          size={"base"}
          fullWidth={true}
          variant={"filled"}
          onClick={action}
        >
          {loading ? "Please wait..." : "Set Password"}
        </ButtonComponent>

        <p className={`cursor-pointer`} onClick={resendEmail}>
          {resendLoading ? "Resending..." : "Resend Email"}
        </p>
      </div>
    </AuthLayout>
  );
};

export default IndexComponent;
