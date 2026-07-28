"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  LoaderCircle,
  LockKeyhole,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";

import { loginUserAction } from "@/app/data/actions/auth";
import SpinmobileLoader from "@/app/components/common/SpinmobileLoader";
import { useAuthStore } from "@/app/store/authstore";

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

const initialState = {
  success: false,
  message: "",
  token: "",
  username: "",
  role: "",
};

const styles = {
  container: "w-full max-w-[440px]",

  eyebrow:
    "mb-6 inline-flex items-center rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 shadow-sm lg:hidden",

  card:
    "rounded-lg border border-slate-200 bg-white/95 py-0 shadow-[0_24px_70px_rgba(15,23,42,0.13)] backdrop-blur",

  header: "space-y-3 px-6 pb-2 pt-7 sm:px-8 sm:pt-8",

  title: "text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl",

  description: "max-w-sm text-sm leading-6 text-slate-500",

  content: "space-y-5 px-6 pb-6 pt-4 sm:px-8",

  fieldGroup: "space-y-2",

  inputWrap:
    "flex h-12 items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 transition focus-within:border-teal-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-teal-500/10",

  icon: "h-5 w-5 shrink-0 text-slate-400",

  input:
    "h-10 border-0 bg-transparent px-0 text-[15px] shadow-none focus-visible:ring-0 focus-visible:border-0",

  footer: "flex flex-col gap-4 border-t border-slate-100 bg-slate-50/70 px-6 py-5 sm:px-8",

  button:
    "flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70",

  prompt: "text-center text-sm text-slate-500",

  link: "font-semibold text-teal-700 transition hover:text-teal-800",
};


export function SigninForm() {

  const router = useRouter();
  const searchParams = useSearchParams();

  const login = useAuthStore(
    (state) => state.login
  );
  const logout = useAuthStore(
    (state) => state.logout
  );
  const [redirecting, setRedirecting] = useState(false);


  const [state, formAction, pending] = useActionState(
    loginUserAction,
    initialState
  );

  useEffect(() => {
    if (searchParams.get("session") !== "expired") {
      return;
    }

    logout();
    localStorage.removeItem("auth-storage");
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    toast.info("Your session expired. Please sign in again.");
  }, [logout, searchParams]);


  useEffect(() => {

    if (!state.message) return;


    if (state.success) {
      // Save logged-in user details in Zustand
      login(
        state.token ?? "",
        {
          username: state.username ?? "",
          role: state.role ?? "",
        }
      );

      const redirectingTimeoutId = window.setTimeout(() => {
        setRedirecting(true);
      }, 0);

      const redirectTimeoutId = window.setTimeout(() => {
        router.replace("/dashboard");
      }, 500);

      return () => {
        window.clearTimeout(redirectingTimeoutId);
        window.clearTimeout(redirectTimeoutId);
      };

    } else {

      toast.error(state.message);

    }


  }, [state, login, router]);



  return (

    <div className={styles.container}>
      {redirecting && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-white/85 backdrop-blur-sm">
          <SpinmobileLoader label="Loading dashboard" />
        </div>
      )}

      <div className={styles.eyebrow}>Staff Innovation</div>

      <form action={formAction}>

        <Card className={styles.card}>

          <CardHeader className={styles.header}>

            <CardTitle className={styles.title}>
              Welcome back
            </CardTitle>


            <CardDescription className={styles.description}>
              Login to review ideas, manage implementation work, and keep
              your team moving.
            </CardDescription>


          </CardHeader>



          <CardContent className={styles.content}>


            <div className={styles.fieldGroup}>

              <Label htmlFor="username">
                Username
              </Label>

              <div className={styles.inputWrap}>
                <UserRound aria-hidden="true" className={styles.icon} />
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter username"
                  autoComplete="username"
                  className={styles.input}
                  required
                />
              </div>

            </div>




            <div className={styles.fieldGroup}>

              <Label htmlFor="password">
                Password
              </Label>

              <div className={styles.inputWrap}>
                <LockKeyhole aria-hidden="true" className={styles.icon} />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  autoComplete="current-password"
                  className={styles.input}
                  required
                />
              </div>


            </div>


          </CardContent>




          <CardFooter className={styles.footer}>


            <button

              type="submit"

              disabled={pending || redirecting}

              className={styles.button}

            >

              {(pending || redirecting) && (
                <LoaderCircle
                  aria-hidden="true"
                  className="h-4 w-4 animate-spin"
                />
              )}
              {redirecting ? "" : pending ? "Logging in..." : "Login"}


            </button>
          </CardFooter>
        </Card>
        <p className={styles.prompt}>

          Forgot password?


          <Link

            href="/auth/Reset_password"

            className={styles.link}

          >

            Reset Password


          </Link>


        </p>



      </form>


    </div>

  );
}
