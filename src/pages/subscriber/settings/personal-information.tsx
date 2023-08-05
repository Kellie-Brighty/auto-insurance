import SettingsLayoutComponent from "@/components/subscriber/settings/layout";
import SettingsPersonalInformationComponent from "@/components/subscriber/settings/personal-information";
import SubscriberLayout from "@/layouts/subscriber/index.layout";

const PersonalInformationSettingsPage = () => {
  return (
    <SubscriberLayout
      title={"Personal Information"}
      caption={"Manage your personal information."}
    >
      <div className={"w-full flex bg-white rounded-lg"}>
        <SettingsLayoutComponent />
        <div className={"p-12 flex-1"}>
          <SettingsPersonalInformationComponent />
        </div>
      </div>
    </SubscriberLayout>
  );
};

export default PersonalInformationSettingsPage;
