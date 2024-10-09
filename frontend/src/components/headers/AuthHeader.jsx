import DeskTopAuthHeader from "./DesktopAuthHeader";
import MobileAuthHeader from "./MobileAuthHeader";

export default function AuthHeader() {
  return (
    <>
      <div className="hidden sm:block">
        <DeskTopAuthHeader />
      </div>
      <div className="block sm:hidden">
        <MobileAuthHeader />
      </div>
    </>
  );
}
