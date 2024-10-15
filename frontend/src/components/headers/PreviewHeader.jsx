import { useNavigate, useLocation } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useNotification } from "../../hooks/useNotification";

export default function PreviewHeader() {
  const { notifySuccess } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  const fullUrl = `${window.location.origin}${location.pathname}`;

  const handleCopy = () => {
    notifySuccess("Link successfully copied to clipboard!");
  };

  const handleBackToEditor = () => {
    navigate("/");
  };

  return (
    <header className="bg-white flex flex-wrap items-center justify-between p-4 sm:px-6 sm:py-4 rounded-lg">
      <div>
        <button
          onClick={handleBackToEditor}
          className="border border-[#623BFE] rounded-lg px-3 py-2 sm:px-6 text-[#623BFE] font-semibold transition-all hover:bg-[#623BFE] hover:text-white">
          Back to Editor
        </button>
      </div>
      <div>
        <div>
          <CopyToClipboard text={fullUrl} onCopy={handleCopy}>
            <button className="border border-[#623BFE] rounded-lg bg-[#623BFE] font-semibold text-white px-3 py-2 sm:px-6 transition-all hover:bg-white hover:text-[#623BFE]">
              Share Link
            </button>
          </CopyToClipboard>
        </div>
      </div>
    </header>
  );
}
