"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";

export default function SignUp() {
  const [userCreated, setUserCreated] = useState(false);

  const { status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (status === "authenticated") router.push("/");
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, role } = e.target.elements;

    if (password.value.length < 6) {
      return toast.error("Password must be at least 6 characters.");
    }

    try {
      const response = await axios.post("/api/signup", {
        email: email.value,
        password: password.value,
        role: role.value,
      });

      toast.success(`Account created successfully! ${response.data.user}`);
      setUserCreated(true);
    } catch (error) {
      console.log(error);
      let message = "Error signing up!";
      if (error.response?.data?.error) message = error.response.data.error;
      toast.error(message);
    }
  };

  return (
    <>
      <ToastContainer />

      <section className="bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-white">
            Guider.lk
          </a>
          <div className="w-full bg-gray-800 border-gray-700 rounded-lg shadow sm:max-w-md xl:p-0">
            {userCreated ? (
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                  Account created successfully!
                </h1>
                <p className="text-sm font-light text-gray-400">
                  Go to the{" "}
                  <a href="/signin" className="underline font-bold text-blue-600">
                    Sign in
                  </a>{" "}
                  page to sign in.
                </p>
              </div>
            ) : (
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                  Create your new account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="name@example.com"
                      required
                      className="bg-gray-700 border border-gray-600 placeholder-gray-400 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      required
                      className="bg-gray-700 border border-gray-600 placeholder-gray-400 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="block mb-2 text-sm font-medium text-white">
                      What you need to do?
                    </label>
                    <select
                      name="role"
                      id="role"
                      required
                      className="bg-gray-700 border border-gray-600 placeholder-gray-400 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                      <option value="client">Make a Booking</option>
                      <option value="bus">Register a Bus</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Sign up
                  </button>
                  <p className="text-sm font-light text-gray-400">
                    Already have an account?{" "}
                    <a href="/signin" className="font-medium text-primary-500 hover:underline">
                      Sign in
                    </a>
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
