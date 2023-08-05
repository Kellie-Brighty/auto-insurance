import SettingsChangePasswordsComponent from "@/components/subscriber/settings/change-passwords";
import SettingsLayoutComponent from "@/components/subscriber/settings/layout";
import SubscriberLayout from "@/layouts/subscriber/index.layout";

const ChangePasswordsSettingsPage = () => {
  return (
    <SubscriberLayout
      title={"Personal Information"}
      caption={"Manage your personal information."}
    >
      <div className={"w-full flex bg-white rounded-lg"}>
        <SettingsLayoutComponent />
        <div className={"p-12 flex-1"}>
          <SettingsChangePasswordsComponent />
        </div>
      </div>
    </SubscriberLayout>
  );
};

export default ChangePasswordsSettingsPage;
