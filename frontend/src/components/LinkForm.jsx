import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import AddNewLinkForm from "./AddNewLinkForm";
import { useNotification } from "../hooks/useNotification";
import { getCurrentUserMutation } from "../services/auth.service";
import { saveLinkMutation, deleteLinkMutation } from "../services/link.service";
import { addLink, removeLink, addFromDataBase } from "../store/slice/linkSlice";
import { addProfileInfo } from "../store/slice/profileSlice";
import { getFromLocalStorage } from "../utlis/localStorage";
import { formDataFormatter } from "../utlis/dataFormatter";

export default function LinkForm() {
  const dispatch = useDispatch();
  const linksData = useSelector((state) => state.link);
  const [selectedSocials, setSelectedSocials] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const user = getFromLocalStorage("user");
  const { notifySuccess, notifyError } = useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [linkIdentifier, setLinkIdentifier] = useState("");
  const { mutate, data, isPending } = useMutation({
    mutationKey: ["link-key"],
    mutationFn: saveLinkMutation,
  });
  const {
    mutate: mutateDeleteLink,
    data: dataOfDeletedLink,
    isPending: deleteLinkPending,
  } = useMutation({
    mutationKey: ["link-delete"],
    mutationFn: deleteLinkMutation,
  });
  const { mutate: mutateCurrentUser, data: currentUserData } = useMutation({
    mutationKey: ["get-current-user"],
    mutationFn: getCurrentUserMutation,
  });

  // Get current user
  useEffect(() => {
    mutateCurrentUser({ _id: user.data._id });
  }, [mutateCurrentUser, user.data._id]);

  // Set the redux link slice with current user data
  useEffect(() => {
    if (currentUserData) {
      dispatch(addFromDataBase({ items: currentUserData.data.links }));
      dispatch(
        addProfileInfo({
          imageUrl: currentUserData.data.profilePicture,
          name: `${currentUserData.data.firstName} ${currentUserData.data.lastName}`,
          email: currentUserData.data.email,
        })
      );
    }
  }, [currentUserData, dispatch]);

  const addNewLinkFormHandler = () => {
    dispatch(
      addLink({
        item: {
          id: uuidv4(),
        },
      })
    );
  };

  const removeNewLinkFormHandler = (linkId) => {
    const currentLink = linksData.items.find((item) => item.id === linkId);

    if (currentLink.platformName && currentLink.id) {
      mutateDeleteLink({ _id: user.data._id, linkId });
      dispatch(removeLink({ itemId: linkId }));
    } else {
      dispatch(removeLink({ itemId: linkId }));
    }

    setSelectedSocials((prevSocials) => {
      return Object.fromEntries(
        Object.entries(prevSocials).filter(([key]) => key !== linkId)
      );
    });

    setFormErrors((prevErrors) => {
      return Object.fromEntries(
        Object.entries(prevErrors).filter(([key]) => key !== linkId)
      );
    });
  };

  const handleSocialSelect = (linkId, selectedSocial) => {
    setSelectedSocials((prevSocials) => ({
      ...prevSocials,
      [linkId]: selectedSocial,
    }));
  };

  const handleFormError = (linkId, hasError) => {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [linkId]: hasError,
    }));
  };

  const subFormHandler = (event) => {
    event.preventDefault();
    const hasErrors = Object.values(formErrors).some((error) => error);
    const noLinksAdded = Object.keys(selectedSocials).length === 0;

    if (hasErrors) {
      notifyError("Please fix the errors in the links before submitting.");
      return;
    }

    if (noLinksAdded) {
      notifyError("Please add at least one social media link.");
      return;
    }

    setIsLoading(true);
    const formData = formDataFormatter(selectedSocials);
    mutate({ _id: user.data._id, items: formData });
    if (currentUserData) {
      dispatch(addFromDataBase({ items: currentUserData.data.links }));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (data && data.success && data.statusCode === 200) {
      notifySuccess(data.message);
      // save links to reduxt after form submit save button
      dispatch(addFromDataBase({ items: data.data.links }));
    }

    if (data && data.success === false && data.statusCode === 404) {
      notifyError(data.message);
    }

    if (data && data.success === false && data.statusCode === 422) {
      notifyError(data.message);
    }
  }, [data, dispatch, notifyError, notifySuccess]);

  useEffect(() => {
    if (
      dataOfDeletedLink &&
      dataOfDeletedLink.success &&
      dataOfDeletedLink.statusCode === 200
    ) {
      notifySuccess(dataOfDeletedLink.message);
      dispatch(removeLink({ itemId: linkIdentifier }));
    }

    if (
      dataOfDeletedLink &&
      dataOfDeletedLink.success === false &&
      dataOfDeletedLink.statusCode === 422
    ) {
      notifyError(dataOfDeletedLink.message);
    }

    if (
      dataOfDeletedLink &&
      dataOfDeletedLink.success === false &&
      dataOfDeletedLink.statusCode === 404
    ) {
      notifyError(dataOfDeletedLink.message);
    }
  }, [dataOfDeletedLink, dispatch, linkIdentifier, notifyError, notifySuccess]);

  return (
    <form className="p-8" onSubmit={subFormHandler}>
      <div className="mb-4">
        <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
          Customize your links
        </h2>
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
              currentLinkItems={currentUserData?.data?.links}
              isDeleteLinkPending={deleteLinkPending}
              onError={handleFormError}
              onSocialSelect={handleSocialSelect}
              onSetLinkIdentifier={setLinkIdentifier}
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
          disabled={isLoading || isPending}
          className="bg-[#633BFB] px-[3vh] py-[1vh] rounded-lg text-white border border-[#633BFB] cursor-pointer w-full sm:w-min transition-all hover:text-[#633BFB] hover:border-[#633BFB] hover:bg-[#EFECFE]">
          {isPending || isLoading ? "Saving" : "Save"}
        </button>
      </div>
    </form>
  );
}
