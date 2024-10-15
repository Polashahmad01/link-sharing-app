import { useSelector } from "react-redux";
import LinkForm from "../components/LinkForm";
import LinkShowCase from "../components/LinkShowCase";
import ProfileForm from "../components/ProfileForm";

export default function HomePage() {
  const tabs = useSelector((state) => state.tab);

  return (
    <section className="container mx-auto px-4 md:px-0">
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-none order-2 bg-white rounded-lg py-10 lg:w-[30vw] lg:order-1">
          <LinkShowCase />
        </div>
        <div className="flex-initial w-full bg-white rounded-lg order-1 lg:order-2">
          {tabs.activeTab === "link" && <LinkForm />}
          {tabs.activeTab === "profile" && <ProfileForm />}
        </div>
      </div>
    </section>
  );
}
