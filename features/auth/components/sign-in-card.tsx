"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { DottedSeparater } from "@/components/dotted-separater";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "@/features/auth/components/icons";
import { signUpWithGithub, signUpWithGoogle } from "@/lib/oauth";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

import { useLogin } from "../api/use-login";
import { loginSchema } from "../schemas";

export const SignInCard = () => {
  const { mutate, isPending } = useLogin();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    mutate({ json: values });
  };

  return (
    <Card className="h-full w-full border-none shadow-none md:w-[487px]">
      <CardHeader className="flex items-center justify-center p-7 text-center">
        <CardTitle className="text-2xl">Welcome back!</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparater />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending} size="lg" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <DottedSeparater />
      </div>
      <CardContent className="flex flex-col gap-y-4 p-7">
        <Button
          onClick={() => signUpWithGoogle()}
          disabled={isPending}
          variant="secondary"
          size="lg"
          className="w-full"
        >
          <Icons.google
            size={22}
            className={cn("mr-2", isPending && "fill-muted-foreground")}
          />
          Login with Google
        </Button>
        <Button
          disabled={isPending}
          variant="secondary"
          size="lg"
          className="w-full"
          onClick={() => signUpWithGithub()}
        >
          <Icons.github
            size={20}
            className={cn("mr-2", isPending && "fill-muted-foreground/40")}
          />
          Login with GitHub
        </Button>
      </CardContent>
      <div className="px-7">
        <DottedSeparater />
      </div>
      <CardContent className="flex items-center justify-center p-7">
        <p className="text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-blue-700 hover:underline">
            Sign Up
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
