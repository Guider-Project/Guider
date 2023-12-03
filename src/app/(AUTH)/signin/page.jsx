"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import { Input, Button, Spinner } from "@nextui-org/react";

export default function SignIn() {
  const { status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (status === "authenticated") router.push("/");
  }, [status]);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (!email) return toast.error("Email is required.");
    if (!password) return toast.error("Password is required.");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return toast.error("Invalid email.");

    if (password.length < 6) return toast.error("Password must be at least 6 characters.");

    setLoading(true);
    try {
      await axios.post("/api/users", {
        email,
        password,
      });

      toast.success("Signed in successfully!");

      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
      });
    } catch (error) {
      console.log(error);
      let message = "Error signing in!";
      if (error.response?.data?.error) message = error.response.data.error;
      toast.error(message);
    }
    setLoading(false);
  };

  return (
    <>
      <ToastContainer />

      <div className="flex flex-col items-center justify-center w-full h-screen gap-4 bg-homepageBus">
        <div className="flex flex-col items-center justify-center w-full h-screen gap-4 bg-blue-300 bg-opacity-50">
          <div className="flex flex-col items-center justify-center w-1/3 h-1/2 bg-white rounded-2xl shadow-lg">
            <div className="flex flex-col items-center justify-center w-full p-10">
              <div className="flex justify-between items-center w-full pb-10">
                <p className="flex font-bold items-center text-inherit">
                  <img src="/logo/Guider_blue_low.png" alt="logo" width="100px" className="pr-8" />
                  Guider
                </p>
                <h1 className="text-xl font-bold text-primary pr-10">Sign In</h1>
              </div>
              <div className="flex flex-col gap-5 w-full">
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                  <Input
                    type="email"
                    label="Email"
                    placeholder="Enter your email"
                    labelPlacement="outside"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                  <Input
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                    labelPlacement="outside"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex w-full justify-center mt-5">
                <Button color="primary" className="w-full" onPress={handleSubmit} auto>
                  Sign In {loading && <Spinner size="sm" color="white" />}
                </Button>
              </div>

              <p className="text-sm text-gray-800 mt-5">
                Don’t have an account yet?{" "}
                <a href="/signup" className="font-medium text-primary-500 hover:underline">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
