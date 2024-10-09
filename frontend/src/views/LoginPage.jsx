import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { loginUserSchemaValidator } from "../utlis/schemaValidator";
import { loginMutation } from "../services/auth.service";
import { useNotification } from "../hooks/useNotification";
import { login } from "../store/slice/authSlice";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginUserSchemaValidator),
    mode: "all",
  });

  const { mutate, data, isPending, isSuccess, reset } = useMutation({
    mutationKey: ["login-key"],
    mutationFn: loginMutation,
  });

  const { notifySuccess, notifyError } = useNotification();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (formData) => {
    mutate(formData);
  };

  if (data && data.success && data.statusCode === 200) {
    notifySuccess(data.message);
    dispatch(login({ user: data }));
    navigate("/app");
  }

  if (data && data.success === false && data.statusCode === 401) {
    notifyError(data.message);
    reset();
  }

  return (
    <section className="container mx-auto flex justify-center items-center">
      <div className="bg-white m-4 rounded-md p-6 w-10/12 sm:w-4/12 md:w-6/12 lg:w-5/12">
        <h2 className="text-2xl font-semibold text-[#505050] mb-4">
          Login to your account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
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

          <div className="flex justify-center items-center mb-4">
            <button
              disabled={isPending || isSuccess}
              className="bg-[#FAFAFA] p-[6px] rounded-md border w-full"
              type="submit">
              {isPending ? "Sending" : isSuccess ? "Done" : "Login"}
            </button>
          </div>

          <div className="flex justify-center items-center">
            <p className="text-center">
              Already have an account?{" "}
              <Link
                to="/auth/register"
                className="text-[#2D68FF] transition-all hover:text-[#505050]">
                Register now
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
