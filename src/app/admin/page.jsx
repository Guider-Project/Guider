"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import NavBar from "@/components/common/navbar";
import Form from "@/components/admin/form";

export default function Admin() {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log(session);
    console.log(status);
  }, [session, status]);

  return (
    <>
      <NavBar />
      <Form />
    </>
  );
}
