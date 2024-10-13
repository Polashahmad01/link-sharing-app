import { useSelector } from "react-redux";
import ProfileInfo from "./ProfileInfo";
import LinkItem from "./LinkItem";

export default function LinkShowCase() {
  const profileInfo = useSelector((state) => state.profile);
  const linkData = useSelector((state) => state.link);

  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-[#FAFAFA] border p-6 rounded-lg w-6/12">
        <ProfileInfo profileData={profileInfo} />
        {linkData.items &&
          linkData.items.map((item) => (
            <LinkItem key={item.item} linkInfo={item} />
          ))}
      </div>
    </div>
  );
}
