import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNotification } from "../hooks/useNotification";
import { profileSchemaValidator } from "../utlis/schemaValidator";

export default function ProfileForm() {
  const { notifySuccess, notifyError } = useNotification();
  const [previewImage, setPreviewImage] = useState(null);
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

  const onSubmit = (formData) => {
    console.log("formData", formData);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setValue("profilePicture", file);
      trigger("profilePicture");
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setValue("profilePicture", "");
  };

  return (
    <form className="p-8" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2 className="text-3xl font-semibold mb-4">Profile Details</h2>
        <p className="mb-6 text-[#6E6E6E] opacity-90">
          Add your profile to create a professional touch to your profile
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="flex items-center bg-[#FAFAFA] p-4 rounded-lg">
          <div className="basis-4/12">
            <p className="text-[#6E6E6E] opacity-90">Profile picture</p>
          </div>
          <div className="basis-8/12 w-full flex items-center justify-between gap-8">
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
                      <svg
                        className="w-10 h-10 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16V6a2 2 0 012-2h6a2 2 0 012 2v10m4 0v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2m4 0h10"></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>
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
                <p className="text-red-700 text-sm">
                  {errors.profilePicture.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-[#FAFAFA] p-4 rounded-lg flex flex-wrap flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between">
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
          <div className="flex flex-wrap items-center justify-between">
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
          <div className="flex flex-wrap items-center justify-between">
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
          className="bg-[#633BFB] px-[3vh] py-[1vh] rounded-lg text-white border border-[#633BFB] cursor-pointer transition-all hover:text-[#633BFB] hover:border-[#633BFB] hover:bg-[#EFECFE]">
          Save
        </button>
      </div>
    </form>
  );
}
