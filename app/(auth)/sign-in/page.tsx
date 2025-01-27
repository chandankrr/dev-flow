import { redirect } from "next/navigation";

import { SignInCard } from "@/features/auth/components/sign-in-card";
import { getCurrent } from "@/features/auth/queries";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

const SignInPage = async () => {
  const user = await getCurrent();

  if (user) redirect("/");

  return <SignInCard />;
};

export default SignInPage;
