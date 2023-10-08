"use client";

import { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";

export default function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  const handleEmailChange = (e) => {
    setInvalidEmail(false);
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setInvalidPassword(false);
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(email)) {
      setInvalidEmail(true);
      return;
    }

    await signIn("credentials", {
      email: email.toLowerCase(),
      password: password,
      redirect: false,
    });

    console.log();
  };

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center h-[calc(100vh-20vh)]">
        <div className="flex flex-col gap-5 bg-purple-200 p-10 rounded-2xl w-[calc(100vw-70vw)]">
          <div className="flex justify-center">
            <img
              src="/images/logo.png"
              alt="Guider logo"
              style={{
                height: "150px",
              }}
            />
          </div>

          <Input
            isRequired
            type="email"
            label="Email"
            value={email}
            onChange={handleEmailChange}
            isInvalid={invalidEmail}
            errorMessage={invalidEmail && "Please enter a valid email"}
          />

          <Input
            isRequired
            type="password"
            label="password"
            value={password}
            onChange={handlePasswordChange}
            isInvalid={invalidPassword}
            errorMessage={invalidPassword && "Please enter a valid password"}
          />

          <Button color="warning" onClick={handleSubmit}>
            Login
          </Button>
        </div>
      </div>
    </>
  );
}
