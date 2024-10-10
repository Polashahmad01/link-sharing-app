import { useSelector } from "react-redux";
import LinkForm from "../components/LinkForm";
import LinkShowCase from "../components/LinkShowCase";
import ProfileForm from "../components/ProfileForm";

export default function HomePage() {
  const tabs = useSelector((state) => state.tab);
  console.log("tabs", tabs);

  return (
    <section className="container mx-auto px-4 sm:px-0">
      <div className="flex gap-8">
        <div className="flex-none w-[30vw] bg-white rounded-lg">
          <LinkShowCase />
        </div>
        <div className="flex-initial w-full bg-white rounded-lg">
          {tabs.activeTab === "link" && <LinkForm />}
          {tabs.activeTab === "profile" && <ProfileForm />}
        </div>
      </div>
    </section>
  );
}
