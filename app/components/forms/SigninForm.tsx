"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  loginUserAction,
} from "@/app/data/actions/auth";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const initialState: { success: boolean; message: string } = {
  success: false,
  message: "",
};

const styles = {
  container: "w-full max-w-md",
  header: "space-y-1",
  title: "text-3xl font-bold text-blue-500",
  content: "space-y-4",
  fieldGroup: "space-y-2",
  footer: "flex flex-col",
  button:
    "w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600",
  prompt: "mt-4 text-center text-sm",
  link: "ml-2 text-blue-500",
};

export function SigninForm() {
  const router = useRouter();

  const [state, formAction, pending] = useActionState(
    loginUserAction,
    initialState
  );

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);

      setTimeout(() => {
        router.push("/dashboard");
      }, 1200);
    } else {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <div className={styles.container}>
      <form action={formAction}>
        <Card>
          <CardHeader className={styles.header}>
            <CardTitle className={styles.title}>
              LOGIN
            </CardTitle>

            <CardDescription>
              Enter your username and password
            </CardDescription>
          </CardHeader>

          <CardContent className={styles.content}>
            <div className={styles.fieldGroup}>
              <Label htmlFor="username">
                Username
              </Label>

              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Enter username"
                required
              />
            </div>

            <div className={styles.fieldGroup}>
              <Label htmlFor="password">
                Password
              </Label>

              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                required
              />
            </div>
          </CardContent>

          <CardFooter className={styles.footer}>
            <button
              type="submit"
              disabled={pending}
              className={styles.button}
            >
              {pending
                ? "Logging In..."
                : "LOGIN"}
            </button>
          </CardFooter>
        </Card>

        <div className={styles.prompt}>
          Forgot password?
          <Link
            href="/auth/forgot-password"
            className={styles.link}
          >
            Reset Password
          </Link>
        </div>
      </form>
    </div>
  );
}