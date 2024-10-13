export default function PreviewHeader() {
  return (
    <header className="bg-[#FFFFFF] flex flex-wrap items-center justify-between px-6 py-4 rounded-lg">
      <div className="flex justify-center items-center h-full">
        <button className="border px-6 py-2 border-[#623BFE] rounded-lg text-[#623BFE]">
          Back to Editor
        </button>
      </div>
      <div className="flex justify-center items-center h-full">
        <button className="border px-6 py-2 border-[#623BFE] rounded-lg bg-[#623BFE] text-white">
          Share Link
        </button>
      </div>
    </header>
  );
}
