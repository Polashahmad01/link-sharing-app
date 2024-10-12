import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import AddNewLinkForm from "./AddNewLinkForm";
import { useNotification } from "../hooks/useNotification";
import { saveLinkMutation } from "../services/link.service";
import { addLink, removeLink } from "../store/slice/linkSlice";
import { getFromLocalStorage } from "../utlis/localStorage";
import { formDataFormatter } from "../utlis/dataFormatter";

export default function LinkForm() {
  const dispatch = useDispatch();
  const linksData = useSelector((state) => state.link);
  const [selectedSocials, setSelectedSocials] = useState({});
  const user = getFromLocalStorage("user");
  const { notifySuccess, notifyError } = useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { mutate, data, isPending } = useMutation({
    mutationKey: ["link-key"],
    mutationFn: saveLinkMutation,
  });

  const addNewLinkFormHandler = () => {
    dispatch(
      addLink({
        item: {
          id: uuidv4(),
          platformName: {
            name: "",
            icon: "",
            value: "",
            url: "",
          },
        },
      })
    );
    setErrorMessage("");
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

  const validateSocials = () => {
    if (Object.keys(selectedSocials).length === 0) {
      setErrorMessage("Please add a link first.");
      return false;
    }

    for (const social of Object.values(selectedSocials)) {
      if (!social.name || !social.url) {
        setErrorMessage("Please fill in all the fields for each link.");
        return false;
      }
    }

    setErrorMessage("");
    return true;
  };

  const subFormHandler = (event) => {
    event.preventDefault();
    setErrorMessage("");
    if (!validateSocials()) {
      return;
    }
    console.log("selectedSocials", selectedSocials);
    setIsLoading(true);
    const formData = formDataFormatter(selectedSocials);
    mutate({ _id: user.data._id, items: formData });
    setIsLoading(false);
  };

  useEffect(() => {
    if (data && data.success && data.statusCode === 200) {
      notifySuccess(data.message);
    }

    if (data && data.success === false && data.statusCode === 404) {
      notifyError(data.message);
    }

    if (data && data.success === false && data.statusCode === 422) {
      notifyError(data.message);
    }
  }, [data, notifyError, notifySuccess]);

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
      {errorMessage && (
        <p className="text-red-500 text-center font-semibold mb-4">
          {errorMessage}
        </p>
      )}
      <div className="flex flex-wrap justify-end">
        <button
          type="submit"
          disabled={isLoading || isPending}
          className="bg-[#633BFB] px-[3vh] py-[1vh] rounded-lg text-white border border-[#633BFB] cursor-pointer transition-all hover:text-[#633BFB] hover:border-[#633BFB] hover:bg-[#EFECFE]">
          {isPending || isLoading ? "Saving" : "Save"}
        </button>
      </div>
    </form>
  );
}
