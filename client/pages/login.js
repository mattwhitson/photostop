import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Cookies from "js-cookie";
import userService from "../services/userService";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useContext(UserContext);
  const validationSchema = yup.object({
    username: yup.string().required("Username is required."),
    password: yup.string().required("Password is required."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const login = async (userObj) => {
    await userService
      .login(userObj)
      .then((res) => {
        Cookies.set("user", JSON.stringify(res.data));
        setUser(res.data);
        router.push("/");
      })
      .catch((err) => console.log(err.response.data.message));
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex flex-col items-center justify-center bg-[#f7f7f7] sm:bg-white">
      <form
        onSubmit={handleSubmit(login)}
        className="flex flex-col w-96 px-12 pb-12 rounded sm:bg-[#f7f7f7] sm:shadow-xl"
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
        <div className="flex flex-col mb-8">
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
        <button
          type="submit"
          className="py-2 px-4 rounded bg-blue-700 mb-4 text-white"
        >
          Login
        </button>

        <p className="text-sm text-center horizontal-lines">OR</p>

        <Link href="/register" passHref>
          <button className="py-2 px-4 rounded bg-blue-700 mb-4 text-white mt-6">
            Register
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
