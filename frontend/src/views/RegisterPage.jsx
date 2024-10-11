import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUserSchemaValidator } from "../utlis/schemaValidator";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerMutation } from "../services/auth.service";
import { useNotification } from "../hooks/useNotification";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerUserSchemaValidator),
    mode: "all",
  });

  const { mutate, data, isPending, isSuccess, reset } = useMutation({
    mutationKey: ["register-key"],
    mutationFn: registerMutation,
  });

  const { notifySuccess, notifyError } = useNotification();
  const navigate = useNavigate();

  const onSubmit = (formData) => {
    mutate(formData);
  };

  useEffect(() => {
    if (data && data.success && data.statusCode === 201) {
      notifySuccess(data.message);
      navigate("/auth/login");
    }

    if (data && data.success === false && data.statusCode === 400) {
      notifyError(data.message);
      reset();
    }
  }, [data, navigate, notifyError, notifySuccess, reset]);

  return (
    <section className="container mx-auto flex justify-center items-center">
      <div className="bg-white m-4 rounded-md p-6 w-10/12 sm:w-4/12 md:w-6/12 lg:w-5/12">
        <h2 className="text-2xl font-semibold text-[#505050] mb-4">
          Create an account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mb-4">
            <label htmlFor="firstName" className="mb-1">
              First name
            </label>
            <input
              className="bg-[#FAFAFA] p-[6px] rounded-md border"
              type="text"
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="mt-1 text-red-700 text-sm">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="lastName" className="mb-1">
              Last name
            </label>
            <input
              className="bg-[#FAFAFA] p-[6px] rounded-md border"
              type="text"
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="mt-1 text-red-700 text-sm">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="mb-1">
              Email
            </label>
            <input
              className="bg-[#FAFAFA] p-[6px] rounded-md border"
              type="email"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-red-700 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="password" className="mb-1">
              Password
            </label>
            <input
              className="bg-[#FAFAFA] p-[6px] rounded-md border"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-red-700 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="confirmPassword" className="mb-1">
              Confirm Password
            </label>
            <input
              className="bg-[#FAFAFA] p-[6px] rounded-md border"
              type="password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-red-700 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="flex justify-center items-center mb-4">
            <button
              className="bg-[#FAFAFA] p-[6px] rounded-md border w-full"
              disabled={isPending || isSuccess}
              type="submit">
              {isPending ? "Sending" : isSuccess ? "Done" : "Register"}
            </button>
          </div>

          <div className="flex justify-center items-center">
            <p className="text-center">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="text-[#2D68FF] transition-all hover:text-[#505050]">
                Login now
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
