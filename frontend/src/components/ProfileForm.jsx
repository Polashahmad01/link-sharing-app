import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoImageOutline } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import { useNotification } from "../hooks/useNotification";
import { profileSchemaValidator } from "../utlis/schemaValidator";
import uploadToImageKit from "../utlis/imageKit";
import { saveProfileMutation } from "../services/profile.service";
import { addProfileInfo } from "../store/slice/profileSlice";
import { addFromDataBase } from "../store/slice/linkSlice";
import { getCurrentUserMutation } from "../services/auth.service";
import { getFromLocalStorage } from "../utlis/localStorage";

export default function ProfileForm() {
  const { notifySuccess, notifyError } = useNotification();
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchemaValidator),
    mode: "all",
  });

  const { mutate, data, isPending } = useMutation({
    mutationKey: ["profile-key"],
    mutationFn: saveProfileMutation,
  });

  const user = getFromLocalStorage("user");
  const { mutate: mutateCurrentUser, data: currentUserData } = useMutation({
    mutationKey: ["get-current-user"],
    mutationFn: getCurrentUserMutation,
  });

  const onSubmit = async (formData) => {
    setIsLoading(true);
    const imageUrl = await uploadToImageKit(formData.profilePicture);
    // form submit
    dispatch(
      addProfileInfo({
        imageUrl: imageUrl.url,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
      })
    );
    mutate({ ...formData, profilePicture: imageUrl.url });
    setIsLoading(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setValue("profilePicture", file);
      trigger("profilePicture");
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
        // handle file change
        dispatch(addProfileInfo({ imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setValue("profilePicture", "");
    // remove image
    dispatch(addProfileInfo({ imageUrl: null }));
  };

  useEffect(() => {
    if (data && data.success && data.statusCode === 200) {
      notifySuccess(data.message);
    }

    if (data && data.success === false && data.statusCode === 404) {
      notifyError(data.message);
    }
  }, [data, notifyError, notifySuccess]);

  // Get current user
  useEffect(() => {
    mutateCurrentUser({ _id: user.data._id });
  }, [mutateCurrentUser, user.data._id]);

  // Set the redux link slice with current user data
  useEffect(() => {
    if (currentUserData) {
      dispatch(
        addProfileInfo({
          imageUrl: currentUserData.data.profilePicture,
          name: `${currentUserData.data.firstName} ${currentUserData.data.lastName}`,
          email: currentUserData.data.email,
        })
      );
      dispatch(addFromDataBase({ items: currentUserData.data.links }));
    }
  }, [currentUserData, dispatch]);

  return (
    <form className="p-8" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
          Profile Details
        </h2>
        <p className="mb-6 text-[#6E6E6E] opacity-90">
          Add your profile to create a professional touch to your profile
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-0 bg-[#FAFAFA] p-4 rounded-lg">
          <div className="basis-4/12">
            <p className="text-[#6E6E6E] opacity-90">Profile picture</p>
          </div>
          <div className="basis-8/12 w-full flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
            <div className="flex-1">
              <div className="flex items-center justify-center w-full">
                {previewImage ? (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className={`z-10 absolute -top-3 -right-3 flex justify-center items-center gap-1 text-sm bg-[#EFECFE] w-8 h-8 rounded-full text-[#633BFB] border border-[#633BFB] cursor-pointer transition-all hover:text-black hover:border-black`}>
                      <RiDeleteBinLine />
                    </button>
                    <img
                      src={previewImage}
                      alt="Profile Preview"
                      className={`object-cover w-full rounded-lg border transition-all hover:opacity-20`}
                    />
                  </div>
                ) : (
                  <>
                    <label
                      htmlFor="file-upload"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <IoImageOutline size="30px" />
                      <p className="my-1 text-sm text-gray-500">
                        <span className="font-semibold">+ Upload Image</span>
                      </p>
                      <input
                        id="file-upload"
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        className="hidden"
                        {...register("profilePicture")}
                        onChange={handleFileChange}
                      />
                    </label>
                  </>
                )}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-[#6E6E6E] opacity-90 text-sm">
                Must be of below types. Use PNG, JPG, or JPEG
              </p>
              {errors.profilePicture && (
                <p className="text-red-700 text-sm mt-1">
                  {errors.profilePicture.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-[#FAFAFA] p-4 rounded-lg flex flex-wrap flex-col gap-2">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <label
              htmlFor="firstName"
              className="basis-4/12 text-[#6E6E6E] opacity-90">
              First name*
            </label>
            <div className="basis-8/12">
              <input
                className="bg-[#FFFFFF] text-[#6E6E6E] p-[6px] rounded-md border w-full"
                type="text"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="mt-1 ml-1 text-red-700 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <label
              htmlFor="lastName"
              className="basis-4/12 text-[#6E6E6E] opacity-90">
              Last name*
            </label>
            <div className="basis-8/12">
              <input
                className="bg-[#FFFFFF] text-[#6E6E6E] p-[6px] rounded-md border w-full"
                type="text"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="mt-1 ml-1 text-red-700 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <label
              htmlFor="email"
              className="basis-4/12 text-[#6E6E6E] opacity-90">
              Email*
            </label>
            <div className="basis-8/12">
              <input
                className="bg-[#FFFFFF] text-[#6E6E6E] p-[6px] rounded-md border w-full"
                type="email"
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1 ml-1 text-red-700 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <hr className="my-6" />
      <div className="flex flex-wrap justify-end">
        <button
          type="submit"
          disabled={isPending || isLoading}
          className={`${
            (isLoading || isLoading) && "cursor-not-allowed"
          } bg-[#633BFB] px-[3vh] py-[1vh] rounded-lg text-white border border-[#633BFB] cursor-pointer w-full sm:w-min transition-all hover:text-[#633BFB] hover:border-[#633BFB] hover:bg-[#EFECFE]`}>
          {isPending || isLoading ? "Saving" : "Save"}
        </button>
      </div>
    </form>
  );
}
