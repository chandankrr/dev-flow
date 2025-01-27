import { Metadata } from "next";
import { redirect } from "next/navigation";

import { SignUpCard } from "@/features/auth/components/sign-up-card";
import { getCurrent } from "@/features/auth/queries";

export const metadata: Metadata = {
  title: "Sign Up",
};

const SignUpPage = async () => {
  const user = await getCurrent();

  if (user) redirect("/");

  return <SignUpCard />;
};

export default SignUpPage;
