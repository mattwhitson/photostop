import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import userService from "../services/userService";

const Register = () => {
  const router = useRouter();
  const validationSchema = yup.object({
    username: yup.string().required("Username is required."),
    password: yup.string().required("Password is required."),
    email: yup.string().required("Email is required."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const createUser = async (user) => {
    await userService
      .register(user)
      .then((res) => {
        router.push("/login");
      })
      .catch((err) => console.log(err.response.data.message));
    router.push("/login");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex flex-col items-center justify-center bg-[#f7f7f7] sm:bg-white">
      <form
        onSubmit={handleSubmit(createUser)}
        className="flex flex-col w-full sm:w-96 px-12 pb-12 rounded sm:bg-[#f7f7f7] sm:shadow-xl"
      >
        <h3 className="text-xl text-center mb-12 mt-6 font-semibold">
          PhotoStop
        </h3>
        <div className="flex flex-col mb-4">
          <input
            {...register("username")}
            className="focus:outline-none rounded h-8 pl-1"
            placeholder="Username"
          />
          {errors.username && (
            <label className="text-sm text-red-500">
              {errors.username.message}
            </label>
          )}
        </div>
        <div className="flex flex-col mb-4">
          <input
            {...register("password")}
            className="focus:outline-none rounded h-8 pl-1"
            placeholder="Password"
            type="password"
          />
          {errors.password && (
            <label className="text-sm text-red-500">
              {errors.password.message}
            </label>
          )}
        </div>
        <div className="flex flex-col mb-8">
          <input
            {...register("email")}
            className="focus:outline-none rounded h-8 pl-1"
            placeholder="Email"
          />
          {errors.email && (
            <label className="text-sm text-red-500">
              {errors.email.message}
            </label>
          )}
        </div>
        <button className="py-2 px-4 rounded bg-blue-700 mb-4 text-white">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
