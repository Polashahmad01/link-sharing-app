import { IoMdAdd } from "react-icons/io";

export default function LinkForm() {
  return (
    <form className="p-8" onSubmit={(event) => event.preventDefault()}>
      <div className="mb-4">
        <h2 className="text-3xl font-semibold mb-4">Customize your links</h2>
        <p className="mb-6 text-[#6E6E6E] opacity-90">
          Add/edit/remove links below and then share all your profiles with
          world!
        </p>
      </div>
      <div className="mb-6 flex flex-wrap justify-center items-center">
        <button className="flex flex-wrap justify-center items-center gap-1 bg-[#EFECFE] w-full py-[1vh] font-semibold rounded-lg text-[#633BFB] border border-[#633BFB] cursor-pointer transition-all hover:text-black hover:border-black">
          <IoMdAdd />
          <span>Add new link</span>
        </button>
      </div>
      <hr className="mb-6" />
      <div className="flex flex-wrap justify-end">
        <button
          type="submit"
          className="bg-[#633BFB] px-[3vh] py-[1vh] rounded-lg text-white border border-[#633BFB] cursor-pointer transition-all hover:text-[#633BFB] hover:border-[#633BFB] hover:bg-[#EFECFE]">
          Save
        </button>
      </div>
    </form>
  );
}
