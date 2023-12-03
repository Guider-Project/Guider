"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";

import { Input, Button, Spinner } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";

import SelectorIcon from "@/icons/selectorIcon";

const ROLES = [
  {
    label: "Make a reservation",
    value: "client",
  },
  {
    label: "Register a bus",
    value: "bus",
  },
];

export default function SignUp() {
  const [userCreated, setUserCreated] = useState(false);

  const { status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (status === "authenticated") router.push("/");
  }, [status]);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleChangeRole = (e) => setRole(e.target.value);

  const handleSubmit = async () => {
    if (!email) return toast.error("Email is required.");
    if (!role) return toast.error("Role is required.");
    if (!password) return toast.error("Password is required.");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return toast.error("Invalid email.");

    if (password.length < 6) return toast.error("Password must be at least 6 characters.");

    const data = {
      email,
      password,
      role,
    };

    setLoading(true);

    try {
      await axios.post("/api/signup", data);
      toast.success(`Account created successfully!`);

      setEmail("");
      setPassword("");
      setRole("");
      setUserCreated(true);
    } catch (error) {
      console.log(error);
      let message = "Error signing up!";
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
            <div className="flex flex-col items-center justify-center w-full py-0 px-10">
              <div className="flex justify-between items-center w-full pb-10">
                <p className="flex font-bold items-center text-inherit">
                  <img src="/logo/Guider_blue_low.png" alt="logo" width="100px" className="pr-8" />
                  Guider
                </p>
                <h1 className="text-xl font-bold text-primary pr-10">Sign Up</h1>
              </div>

              {userCreated ? (
                <div className="flex flex-col items-center justify-center w-full p-10">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
                    Account created successfully!
                  </h1>

                  <p className="text-sm text-gray-500 mt-2">
                    Go to the{" "}
                    <a href="/signin" className="underline font-bold text-blue-600">
                      Sign in
                    </a>{" "}
                    page to sign in.
                  </p>
                </div>
              ) : (
                <>
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
                      <Select
                        label="Role"
                        placeholder="Select an option"
                        labelPlacement="outside"
                        className="w-full"
                        disableSelectorIconRotation
                        selectorIcon={<SelectorIcon />}
                        onChange={handleChangeRole}
                      >
                        {ROLES.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            {role.label}
                          </SelectItem>
                        ))}
                      </Select>
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
                      Sign Up {loading && <Spinner size="sm" color="white" />}
                    </Button>
                  </div>

                  <p className="text-sm text-gray-800 mt-5">
                    Already have an account?{" "}
                    <a href="/signin" className="font-medium text-primary-500 hover:underline">
                      Sign in
                    </a>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
