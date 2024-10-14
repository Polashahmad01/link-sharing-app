import { useSelector } from "react-redux";
import ProfileInfo from "./ProfileInfo";
import LinkItem from "./LinkItem";

export default function LinkShowCase() {
  const profileInfo = useSelector((state) => state.profile);
  const linkData = useSelector((state) => state.link);

  return (
    <div className="flex justify-center items-center h-full">
      <div className="border border-[#9a9a9a] w-[300px] h-[600px] rounded-[50px] px-2 py-2">
        <div className="relative px-8 py-8 border border-[#9a9a9a] rounded-[40px] h-full m-auto">
          <div className="absolute -top-[6px] left-1/2 right-1/2 transform -translate-x-1/2 h-[18px] w-[18px] rounded-full border-[6px] border-[#b5b5b5]"></div>
          <ProfileInfo profileData={profileInfo} />
          <div className="max-h-[320px] overflow-y-auto">
            {linkData.items && linkData.items.length === 0 && (
              <div className="flex flex-wrap flex-col gap-2">
                <div className="font-semibold rounded-lg py-[2px] text-sm bg-[#FAFAFA] w-full">
                  <span className="opacity-0">Empty link</span>
                </div>
                <div className="font-semibold rounded-lg py-[2px] text-sm bg-[#FAFAFA] w-full">
                  <span className="opacity-0">Empty link</span>
                </div>
                <div className="font-semibold rounded-lg py-[2px] text-sm bg-[#FAFAFA] w-full">
                  <span className="opacity-0">Empty link</span>
                </div>
              </div>
            )}
            {linkData.items &&
              linkData.items.map((item) => (
                <LinkItem key={item.item} linkInfo={item} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
