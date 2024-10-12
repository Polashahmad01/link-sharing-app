import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import AddNewLinkForm from "./AddNewLinkForm";
import { addLink, removeLink } from "../store/slice/linkSlice";

export default function LinkForm() {
  const dispatch = useDispatch();
  const linksData = useSelector((state) => state.links);
  const [selectedSocials, setSelectedSocials] = useState({});

  const addNewLinkFormHandler = () => {
    dispatch(
      addLink({
        item: {
          id: uuidv4(),
          link: "",
        },
      })
    );
  };

  const removeNewLinkFormHandler = (linkId) => {
    dispatch(
      removeLink({
        itemId: linkId,
      })
    );
    setSelectedSocials((prevSocials) => {
      const updatedSocials = { ...prevSocials };
      delete updatedSocials[linkId];
      return updatedSocials;
    });
  };

  const handleSocialSelect = (linkId, selectedSocial) => {
    setSelectedSocials((prevSocials) => ({
      ...prevSocials,
      [linkId]: selectedSocial,
    }));
  };

  const subFormHandler = (event) => {
    event.preventDefault();
    console.log("selectedSocials", selectedSocials);
  };

  return (
    <form className="p-8" onSubmit={subFormHandler}>
      <div className="mb-4">
        <h2 className="text-3xl font-semibold mb-4">Customize your links</h2>
        <p className="mb-6 text-[#6E6E6E] opacity-90">
          Add/edit/remove links below and then share all your profiles with
          world!
        </p>
      </div>
      <div className="mb-6 flex flex-wrap justify-center items-center">
        <button
          type="button"
          onClick={addNewLinkFormHandler}
          className="flex flex-wrap justify-center items-center gap-1 bg-[#EFECFE] w-full py-[1vh] font-semibold rounded-lg text-[#633BFB] border border-[#633BFB] cursor-pointer transition-all hover:text-black hover:border-black">
          <IoMdAdd />
          <span>Add new link</span>
        </button>
      </div>

      <div className="max-h-[450px] overflow-y-auto">
        {linksData.items &&
          linksData.items.map((item) => (
            <AddNewLinkForm
              key={item.id}
              linkItem={item}
              onSocialSelect={handleSocialSelect}
              onRemoveNewLinkHandler={removeNewLinkFormHandler}
            />
          ))}
        {linksData && !linksData.items.length && (
          <p className="text-center mb-6 font-bold text-[#2D68FF] text-lg">
            No links found! Click the button above to add new link.
          </p>
        )}
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
